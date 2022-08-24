export interface GithubRepoIssue {
  id                : number;
  node_id           : string;
  url               : string;
  repository_url    : string;
  labels_url        : string;
  comments_url      : string;
  events_url        : string;
  html_url          : string;
  number            : number;
  state             : GithubIssueState;
  title             : string;
  body              : string;
  user              : Assignee;
  labels            : Label[];
  assignee          : Assignee;
  assignees         : Assignee[];
  milestone         : Milestone;
  locked            : boolean;
  active_lock_reason: string;
  comments          : number;
  pull_request      : PullRequest;
  closed_at         : null;
  created_at        : string;
  updated_at        : string;
  closed_by         : Assignee;
  author_association: string;
}

export interface Assignee {
  login              : string;
  id                 : number;
  node_id            : string;
  avatar_url         : string;
  gravatar_id        : string;
  url                : string;
  html_url           : string;
  followers_url      : string;
  following_url      : string;
  gists_url          : string;
  starred_url        : string;
  subscriptions_url  : string;
  organizations_url  : string;
  repos_url          : string;
  events_url         : string;
  received_events_url: string;
  type               : string;
  site_admin         : boolean;
}

export interface Label {
  id         : number;
  node_id    : string;
  url        : string;
  name       : string;
  description: string;
  color      : string;
  default    : boolean;
}

export interface Milestone {
  url          : string;
  html_url     : string;
  labels_url   : string;
  id           : number;
  node_id      : string;
  number       : number;
  state        : string;
  title        : string;
  description  : string;
  creator      : Assignee;
  open_issues  : number;
  closed_issues: number;
  created_at   : string;
  updated_at   : string;
  closed_at    : string;
  due_on       : string;
}

export interface PullRequest {
  url      : string;
  html_url : string;
  diff_url : string;
  patch_url: string;
}

export enum GithubIssueState {
  All   = "all",
  Open  = "open",
  Close = "closed",
}
export const GithubIssueStates = Object.values(GithubIssueState);