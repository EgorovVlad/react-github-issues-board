import { githubApiInstance } from "../lib";
import {
  createGithubPaginationParams,
  GithubIssueState,
  GithubPaginationPayload,
  GithubRepoIssue,
} from "../models";

export type GetIssuesPayload = {
  owner  : string;
  repo   : string;
  since? : Date;
  state? : GithubIssueState;
  labels?: string[];
};

export const getGithubRepoIssues = async ({
  owner,
  repo,
  state,
  labels,
  since,
  ...listParams
}: GithubPaginationPayload<GetIssuesPayload>) => {
  try {
    const { data } = await githubApiInstance.get<GithubRepoIssue[]>(
      `/repos/${owner}/${repo}/issues`,
      {
        params: createGithubPaginationParams(listParams, {
          state,
          labels: labels?.join(","),
          since: since?.toISOString(),
        }),
      }
    );
    return data;
  } catch {
    return [];
  }
};
