import { useGithubDropBoard } from "./GithubDropBoardProvider";
import { GithubRepoBreadcrumb } from "../GithubRepoBreadcrumb";

export type GithubDropBoardBreadcrumbProps = {
  className?: string;
};

export const GithubDropBoardBreadcrumb: React.VFC<
  GithubDropBoardBreadcrumbProps
> = ({ className }) => {
  const {
    boardKey: { owner, repo },
  } = useGithubDropBoard();

  if (!owner || !repo) return null;
  return (
    <GithubRepoBreadcrumb owner={owner} repo={repo} className={className} />
  );
};
