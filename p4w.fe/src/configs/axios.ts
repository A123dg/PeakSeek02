import axios from 'axios';
import { notification } from 'antd';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { IResponse } from '../shared/types/response.type';
import { handleRefreshToken } from '@utils/refreshToken';
import tokenManager from '@utils/tokenManager';
import { resolveServerMessage } from '@shared/utils/serverMessage';

export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = tokenManager.getAccessToken();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  config.validateStatus = (status) => (status >= 200 && status < 300) || status === 404;
  return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const handleResponse = (response: AxiosResponse) => response.data;

const handleResponseError = async (error: AxiosError<IResponse<any>>) => {
  console.log('Request error: ', { error });

  const originalRequest = error.config as IOriginRequest;
  const resolvedMessage = resolveServerMessage(error.response?.data?.message);

  if (error.response?.status === 401 && !originalRequest._retry) {
    return handleRefreshToken(originalRequest);
  }

  if (error.response?.status === 500) {
    notification.error({
      message: 'Thất bại!',
      description: resolvedMessage || 'Đã có lỗi xảy ra',
    });
    return Promise.reject(error.response);
  }

  if (error.response?.status !== 404 && error.response?.status !== 403) {
    notification.error({
      message: 'Thất bại!',
      description: resolvedMessage || error.message,
    });
  }

  return Promise.reject(error.response);
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(handleRequest as any, handleRequestError);
axiosClient.interceptors.response.use(handleResponse, handleResponseError);

export default axiosClient;
