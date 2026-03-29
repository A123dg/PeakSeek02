import type { IQueryParams } from "@/shared/types";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";
import { getReportList } from "./api";
import type { IReportListParams } from "./type";

export const useReportListQuery = ({
  params,
  options,
}: IQueryParams<IReportListParams> = {}): UseQueryResult<any> => {
  const queryKey = params ? ["reportList", params] : ["reportList"];
  const queryOptions: UseQueryOptions<any, any, any> = {
    queryKey,
    queryFn: () => getReportList(params),
    enabled: !!queryKey,
    ...options,
  };

  return useQuery(queryOptions);
};
