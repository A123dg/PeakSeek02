import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";

import type { IQueryParams } from "@/shared/types";
import { getAdminDashboard } from "./api";
import type { IAdminDashboardResponse } from "./type";

export const useAdminDashboardQuery = ({
  options,
}: IQueryParams<never, UseQueryOptions<any, any, IAdminDashboardResponse>> = {}): UseQueryResult<IAdminDashboardResponse> => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const response = await getAdminDashboard();
      return response.data;
    },
    ...options,
  });
};
