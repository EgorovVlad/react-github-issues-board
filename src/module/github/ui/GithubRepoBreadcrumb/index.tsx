import { memo } from "react";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import cn from "classnames";

export type GithubRepoBreadcrumbProps = {
  repo: string;
  owner: string;
  className?: string;
};

export const GithubRepoBreadcrumb: React.VFC<GithubRepoBreadcrumbProps> = memo(
  ({ owner, repo, className }) => (
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
  )
);
