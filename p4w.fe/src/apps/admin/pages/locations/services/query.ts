import type { IQueryParams } from "@/shared/types";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";
import { getLocationList } from "./api";
import type { ILocationListParams } from "./type";

export const useLocationListQuery = ({
  params,
  options,
}: IQueryParams<ILocationListParams> = {}): UseQueryResult<any> => {
  const queryKey = params ? ["locationList", params] : ["locationList"];
  const queryOptions: UseQueryOptions<any, any, any> = {
    queryKey,
    queryFn: () => getLocationList(params),
    enabled: !!queryKey,
    ...options,
  };

  return useQuery(queryOptions);
};
