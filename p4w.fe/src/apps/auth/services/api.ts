import axiosClient from '@configs/axios';
import type { IResponse } from '@/shared/types/response.type';
import type { TLoginRequest } from '@apps/auth/services/types';
import { stringtifyQuery } from '@/shared/utils';

export const login = (payload: TLoginRequest): Promise<IResponse<any>> => {
  const url = "/Auth/admin-login";
  return axiosClient.post(url, payload);
}

export const getAccoungList = (params?:any): Promise<any> => {
  const query = params ? stringtifyQuery(params) : '';
  const url = `/Account/list${query}`;
  return axiosClient.get(url);
}
