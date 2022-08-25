import {
  GithubIssueState,
  GithubIssueStates,
  GithubRepoIssue,
} from "module/github/models";

type Remap = Record<number, GithubRepoIssue>;

/**
 * [id, [idx, state]]
 */
export type BoardCache = [number, [number, keyof typeof BoardStateIndex]];
export type BoardKey = { owner: string; repo: string };
export type BoardState = Record<GithubIssueState, readonly GithubRepoIssue[]>;
export type BoardRemap = Record<GithubIssueState, Remap>;
export type BoardNoRemap = Record<GithubIssueState, GithubRepoIssue[]>;

export const BoardStateIndex = {
  0: 0,
  1: GithubIssueState.All,
  2: GithubIssueState.Open,
  3: GithubIssueState.Close,
} as const;

export const BoardStateToCache = {
  [GithubIssueState.All]: 1,
  [GithubIssueState.Open]: 2,
  [GithubIssueState.Close]: 3,
} as const;

export const initBoardRemap = () => {
  return GithubIssueStates.reduce((board, state) => {
    board[state] = {};
    return board;
  }, {} as BoardRemap);
};

export const initBoardNoRemap = () => {
  return GithubIssueStates.reduce((board, state) => {
    board[state] = [];
    return board;
  }, {} as BoardNoRemap);
};

export const remapToState = (remap: BoardRemap, noRemap: BoardNoRemap) => {
  return GithubIssueStates.reduce((board, state) => {
    board[state] = Object.values(remap[state]).concat(noRemap[state]);
    return board;
  }, {} as BoardState);
};

export const getBoardCache = ({ owner, repo }: BoardKey) => {
  const cacheKey = `${owner}[${repo}]`;
  const cacheData = localStorage.getItem(cacheKey) || "[]";
  return new Map(JSON.parse(cacheData) as BoardCache[]);
};

export const setBoardCache = ({ owner, repo }: BoardKey, board: BoardState) => {
  const cacheKey = `${owner}[${repo}]`;
  const cacheData = GithubIssueStates.reduce<BoardCache[]>((cache, col) => {
    const colCache = board[col].map((issue, idx) => {
      const state = issue.state === col ? 0 : BoardStateToCache[col];
      return [issue.id, [idx, state]] as BoardCache;
    });
    return cache.concat(colCache);
  }, []);
  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};

export const BOARD_STATE: BoardState = initBoardNoRemap();
export const BOARD_TITLE = {
  [GithubIssueState.All]: "Backlog",
  [GithubIssueState.Open]: "In Progress",
  [GithubIssueState.Close]: "Completed",
};

export const BOARD_KEY: BoardKey = {
  owner: "",
  repo: "",
};
