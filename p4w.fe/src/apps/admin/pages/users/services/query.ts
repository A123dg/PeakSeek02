import type { IQueryParams } from "@/shared/types";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";
import { getUserList } from "./api";

export const useUserListQuery = ({params, options} : IQueryParams<any> = {}):UseQueryResult<any> => {
    const queryKey = params ? ['userList', params] : ['userList'];
    const _options : UseQueryOptions<any,any,any> = {
        queryKey,
        queryFn: () => getUserList(params),
        enabled: !!queryKey,
        ...options
    };
    return useQuery(_options);
};