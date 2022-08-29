import { useCallback } from "react";
import { useGithubDropBoard } from "./GithubDropBoardProvider";
import { GithubRepoSearch, GithubRepoSearchProps } from "../GithubRepoSearch";

export type GithubDropBoardSearchProps = {
  className?: string;
};

export const GithubDropBoardSearch: React.VFC<GithubDropBoardSearchProps> = ({
  className,
}) => {
  const { onReload, isLoading } = useGithubDropBoard();

  const onClickLoad: GithubRepoSearchProps["onClickLoad"] = useCallback(
    (link, owner, repo) => {
      window.history.replaceState({ link }, "");
      onReload({ owner, repo });
    },
    [onReload]
  );

  return (
    <GithubRepoSearch
      defaultURL={window.history.state?.link}
      className={className}
      disabled={isLoading}
      onClickLoad={onClickLoad}
    />
  );
};
