import axios from 'axios';

import type { IOriginRequest } from '@configs/axios';
import axiosClient from '@configs/axios';
import { LOGIN_ROUTE, REFRESH_TOKEN_URL } from '@/constants';
import tokenManager from './tokenManager';

interface IFailedQueue {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: IFailedQueue[] = [];

const clearAuthAndRedirect = () => {
  tokenManager.removeAccessToken();
  tokenManager.removeRefreshToken();
  window.location.href = LOGIN_ROUTE;
};

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export const handleRefreshToken = async (originalRequest: IOriginRequest) => {
  if (isRefreshing) {
    return new Promise((resolve: (token: string | null) => void, reject: (error: Error) => void) => {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        if (token && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }

        return axiosClient(originalRequest);
      })
      .catch((error) => Promise.reject(error));
  }

  originalRequest._retry = true;
  isRefreshing = true;

  return new Promise((resolve, reject) => {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      const error = new Error('Refresh token is missing');
      processQueue(error, null);
      clearAuthAndRedirect();
      isRefreshing = false;
      reject(error);
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_API_URL}${REFRESH_TOKEN_URL}`,
        { refreshToken },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(({ data }: any) => {
        const nextAccessToken = data?.data?.accessToken;
        const nextRefreshToken = data?.data?.refreshToken;

        if (!nextAccessToken || !nextRefreshToken) {
          const error = new Error('Refresh token response is invalid');
          processQueue(error, null);
          clearAuthAndRedirect();
          reject(error);
          return;
        }

        tokenManager.setAccessToken(nextAccessToken);
        tokenManager.setRefreshToken(nextRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
        }

        processQueue(null, nextAccessToken);
        resolve(axiosClient(originalRequest));
      })
      .catch((error: any) => {
        console.log('refresh token err: ', error);
        processQueue(error instanceof Error ? error : new Error('Refresh token failed'), null);
        clearAuthAndRedirect();
        reject(error);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
};
