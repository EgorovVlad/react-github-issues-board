export type GithubPaginationPayload<
  P extends object,
  Sort extends string = string
> = P & {
  page?     : number;
  perPage?  : number;
  sort?     : Sort;
  direction?: "asc" | "desc";
};

export const createGithubPaginationParams = <E extends object = {}>(
  { page, perPage, sort, direction }: GithubPaginationPayload<{}>,
  extend?: E
) => ({
  page,
  sort,
  direction,
  per_page: perPage,
  ...extend,
});
