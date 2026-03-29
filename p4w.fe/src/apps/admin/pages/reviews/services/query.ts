import type { IQueryParams } from "@/shared/types";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";
import { getReviewList } from "./api";
import type { IReviewListParams } from "./type";

export const useReviewListQuery = ({
  params,
  options,
}: IQueryParams<IReviewListParams> = {}): UseQueryResult<any> => {
  const queryKey = params ? ["reviewList", params] : ["reviewList"];
  const queryOptions: UseQueryOptions<any, any, any> = {
    queryKey,
    queryFn: () => getReviewList(params),
    enabled: !!queryKey,
    ...options,
  };

  return useQuery(queryOptions);
};
