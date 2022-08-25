import { useGithubDropBoard } from "./GithubDropBoardProvider";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";

import cn from "classnames";

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
    <Breadcrumb className={cn("fw-bold h4", className)}>
      <Breadcrumb.Item
        target="_blank"
        href={`https://github.com/${owner}`}
        children={owner}
      />
      <Breadcrumb.Item
        target="_blank"
        href={`https://github.com/${owner}/${repo}`}
        children={repo}
      />
    </Breadcrumb>
  );
};
