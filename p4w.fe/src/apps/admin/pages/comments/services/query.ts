import type { IQueryParams } from "@/shared/types";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";
import { getCommentList } from "./api";
import type { ICommentListParams } from "./type";

export const useCommentListQuery = ({
  params,
  options,
}: IQueryParams<ICommentListParams> = {}): UseQueryResult<any> => {
  const queryKey = params ? ["commentList", params] : ["commentList"];
  const queryOptions: UseQueryOptions<any, any, any> = {
    queryKey,
    queryFn: () => getCommentList(params),
    enabled: !!queryKey,
    ...options,
  };

  return useQuery(queryOptions);
};
