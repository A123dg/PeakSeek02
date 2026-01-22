import axiosClient from '@configs/axios';
import tokenManager from '@utils/tokenManager';

/** Lấy thông tin user */
export const getUserInfo = () => {
  const accessToken = tokenManager.getAccessToken();
  if (!accessToken) return;
  
  const url = '/v1/auth/user/info';
  return axiosClient.get(url);
};