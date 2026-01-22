import { useQuery } from 'react-query';
import type { UseQueryOptions, UseQueryResult } from 'react-query';

import type { IUser } from '@/shared/services/type'
import { getUserInfo } from '@/shared/services/api'
import type { IQueryParams } from '@/shared/types';

/**
 * @query
 * @description Lấy thông tin người dùng
 */
export const useGetUserInfo = ({ options }: IQueryParams = {}): UseQueryResult<IUser> => {
  const _options: UseQueryOptions<IUser, any, any> = {
    queryKey: 'getUserInfo',
    queryFn: getUserInfo,
    ...options,
  };
  return useQuery(_options);
};