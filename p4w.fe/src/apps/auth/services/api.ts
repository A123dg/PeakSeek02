import axiosClient from '@configs/axios';
import type { IResponse } from '@/shared/types/response.type';
import type { TLoginRequest, ILoginRespone } from '@apps/auth/services/types';

export const login = (payload: TLoginRequest): Promise<IResponse<ILoginRespone>> => {
  const url = "/Account/login";
  return axiosClient.post(url, payload);
}

export const getAccoungList = (): Promise<any> => {
  const url = "/Account/list";
  return axiosClient.get(url);
}