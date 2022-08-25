import { getTimeAgo } from "core/lib";
import { GithubRepoIssue } from "module/github/models";
import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "react-bootstrap/esm/Card";

export type GithubDropBoardRowProps = {
  issue: GithubRepoIssue;
  index: number;
};

export const GithubDropBoardRow: React.VFC<GithubDropBoardRowProps> = ({
  issue,
  index,
}) => {
  const timeAgo = useMemo(
    () => getTimeAgo(issue.created_at),
    [issue.created_at]
  );
  return (
    <Draggable
      index={index}
      draggableId={issue.id.toString()}
      children={(provided) => (
        <div
          className="mb-3"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Card bg="Light" border="light" className="p-2">
            <Card.Body>
              <Card.Title className="text-truncate fw-bold fs-5" children={issue.title} />
              <Card.Text
                className="text-muted text-truncate"
                children={`#${issue.number} opened ${timeAgo} ago by ${issue.user.login}`}
              />
            </Card.Body>
          </Card>
        </div>
      )}
    />
  );
};
