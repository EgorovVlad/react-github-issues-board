import { GithubRepoIssue } from "module/github/models";
import { Droppable } from "react-beautiful-dnd";
import { GithubDropBoardRow } from "./GithubDropBoardRow";

export type GithubDropBoardColumnProps = {
  state: string;
  title: string;
  list: readonly GithubRepoIssue[];
};

export const GithubDropBoardColumn: React.VFC<GithubDropBoardColumnProps> = ({
  list,
  state,
  title,
}) => {
  return (
    <div className="flex-grow-1 w-25 min-h-100 mx-2 overflow-hidden">
      <h2 className="fw-bold mb-3 mt-4" children={title} />
      <Droppable droppableId={state}>
        {(provider) => (
          <div className="h-100" ref={provider.innerRef}>
            {list.map((issue, index) => (
              <GithubDropBoardRow key={issue.id} index={index} issue={issue} />
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
