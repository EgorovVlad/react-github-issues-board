import { useGithubDropBoard } from "./GithubDropBoardProvider";

import { DragDropContext } from "react-beautiful-dnd";
import { GithubDropBoardColumn } from "./GithubDropBoardColumn";
import { GithubDropBoardSkeleton } from "./GithubDropBoardSkeleton";

import { GithubIssueStates } from "module/github/models";
import { BOARD_TITLE } from "./config";

export type GithubDropBoardProps = {};

export const GithubDropBoard: React.VFC<GithubDropBoardProps> = () => {
  const { board, isLoading, onDragEnd } = useGithubDropBoard();
  if (isLoading) return <GithubDropBoardSkeleton />;

  return (
    <div className="d-flex min-h-100 bg-light container-fluid">
      <DragDropContext onDragEnd={onDragEnd}>
        {GithubIssueStates.map((state) => (
          <GithubDropBoardColumn
            key={state}
            state={state}
            title={BOARD_TITLE[state]}
            list={board[state]}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export * from "./GithubDropBoardProvider";
export * from "./GithubDropBoardBreadcrumb";
export * from "./GithubDropBoardSearch";
