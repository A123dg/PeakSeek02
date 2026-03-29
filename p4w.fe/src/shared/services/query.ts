import { useQuery } from 'react-query';
import type { UseQueryOptions, UseQueryResult } from 'react-query';

import type { IUserProfileResponse } from '@/shared/services/type'
import { getUserInfo } from '@/shared/services/api'
import type { IResponse } from '@/shared/types/response.type';
import type { IQueryParams } from '@/shared/types';

/**
 * @query
 * @description Lấy thông tin người dùng
 */
export const useGetUserInfo = ({ options }: IQueryParams = {}): UseQueryResult<IUserProfileResponse> => {
  const _options: UseQueryOptions<IResponse<IUserProfileResponse>, any, IUserProfileResponse> = {
    queryKey: 'getUserInfo',
    queryFn: getUserInfo,
    select: (response) => response.data,
    ...options,
  };
  return useQuery(_options);
};
