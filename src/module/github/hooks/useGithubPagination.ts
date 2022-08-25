import { usePagination, PaginationOptionsOverride } from "core/hooks";
import { GithubPaginationPayload } from "../models";

const adapter = <Params extends object = {}>(
  payload: GithubPaginationPayload<Params>
) => {
  const perPage = payload.perPage ?? 30;
  return {
    payload: {
      ...payload,
      perPage,
      page: (payload.page ?? 0) + 1,
    },
    pageSize: perPage,
  };
};

export const useGithubPagination = <
  T extends object,
  Params extends object = {},
  Payload extends GithubPaginationPayload<Params> = GithubPaginationPayload<Params>
>(
  getPage: (payload: Payload) => Promise<T[]>,
  { defaultPayload }: PaginationOptionsOverride<Payload>
) =>
  usePagination(getPage, {
    defaultPayload,
    adapter,
  });
