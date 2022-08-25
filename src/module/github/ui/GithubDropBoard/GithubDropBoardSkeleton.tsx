import Skeleton from "react-loading-skeleton";
import { GithubIssueStates } from "module/github/models";
import { BOARD_TITLE } from "./config";

const SkeletonRow: React.VFC = () => (
  <Skeleton className="w-100 mb-2" height={106} />
);

const SkeletonColumn: React.VFC<{ title: string }> = ({ title }) => (
  <div className="flex-grow-1 w-25 h-100 mx-2">
    <h2 className="fw-bold mb-3 mt-4" children={title} />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </div>
);

export const GithubDropBoardSkeleton: React.VFC = () => {
  return (
    <div className="d-flex min-h-100 bg-light container-fluid">
      {GithubIssueStates.map((title) => (
        <SkeletonColumn key={title} title={BOARD_TITLE[title]} />
      ))}
    </div>
  );
};
