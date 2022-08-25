import { useCallback, useEffect, useRef, useState } from "react";
import { useGithubPagination } from "module/github/hooks";

import { DragDropContextProps } from "react-beautiful-dnd";
import { createContextHook } from "core/lib";

import { getGithubRepoIssues, GetIssuesPayload } from "module/github/api";
import { GithubIssueState } from "module/github/models";
import {
  BOARD_KEY,
  BOARD_STATE,
  BoardStateIndex,
  BoardState,
  setBoardCache,
  getBoardCache,
  initBoardRemap,
  initBoardNoRemap,
  remapToState,
} from "./config";

export const [useGithubDropBoard, GithubDropBoardProvider] = createContextHook(
  () => {
    const boardShadow = useRef<BoardState>();
    const [board, setBoard] = useState(BOARD_STATE);
    const [boardKey, setBoardKey] = useState(BOARD_KEY);
    const [subscriber, pages, isLoading] = useGithubPagination(
      getGithubRepoIssues,
      { defaultPayload: BOARD_KEY }
    );

    const onReload = useCallback(
      (payload: Pick<GetIssuesPayload, "owner" | "repo">) => {
        setBoardKey({ owner: payload.owner, repo: payload.repo });
      },
      []
    );

    const onDragEnd: DragDropContextProps["onDragEnd"] = useCallback(
      ({ source, destination }) => {
        if (!destination) return;

        const sourceIdx = source.index;
        const sourceCol = source.droppableId as GithubIssueState;

        const destIdx = destination.index;
        const destCol = destination.droppableId as GithubIssueState;

        const isSameCol = destCol === sourceCol;
        if (isSameCol && destIdx === sourceIdx) return;

        setBoard((board) => {
          const sourceCopy = board[sourceCol].concat();
          const issue = sourceCopy.splice(sourceIdx, 1)[0];

          const destCopy = isSameCol ? sourceCopy : board[destCol].concat();
          destCopy.splice(destIdx, 0, issue);

          const updatedBoard = {
            ...board,
            [destCol]: destCopy,
            [sourceCol]: sourceCopy,
          };

          boardShadow.current = updatedBoard;
          return updatedBoard;
        });
      },
      []
    );

    useEffect(() => {
      if (!boardKey.owner || !boardKey.repo) return setBoard(BOARD_STATE);

      const boardCache = getBoardCache({
        owner: boardKey.owner,
        repo: boardKey.repo,
      });

      pages.reload({
        owner: boardKey.owner,
        repo: boardKey.repo,
        page: 1,
        perPage: 100,
      });

      const unmountReload = subscriber("reload", (page) => {
        const remap = initBoardRemap();
        const noRemap = initBoardNoRemap();

        for (const issue of page) {
          if (!boardCache.has(issue.id)) {
            noRemap[issue.state].push(issue);
            continue;
          }

          const [idx, state] = boardCache.get(issue.id)!;
          remap[BoardStateIndex[state] || issue.state][idx] = issue;
        }

        setBoard(remapToState(remap, noRemap));
      });

      const updateBoardCache = () => {
        boardShadow.current && setBoardCache(boardKey, boardShadow.current);
      };
      window.addEventListener("beforeunload", updateBoardCache);

      return () => {
        window.removeEventListener("beforeunload", updateBoardCache);
        unmountReload();
        updateBoardCache();
      };
    }, [boardKey, pages, subscriber]);

    return { board, isLoading, boardKey, onReload, onDragEnd } as const;
  }
);
