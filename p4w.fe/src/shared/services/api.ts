import axiosClient from '@configs/axios';
import tokenManager from '@utils/tokenManager';
import type { IUpdateProfileRequest, IUserProfileResponse } from './type';
import type { IResponse } from '@/shared/types/response.type';

/** Lấy thông tin user */
export const getUserInfo = () => {
  const accessToken = tokenManager.getAccessToken();
  if (!accessToken) return;
  
  const url = '/User/profile';
  return axiosClient.get(url);
};

export const updateProfile = (payload: IUpdateProfileRequest): Promise<IResponse<IUserProfileResponse>> => {
  return axiosClient.put('/Auth/update-profile', payload);
};

export const uploadImage = (file: File): Promise<IResponse<string>> => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosClient.post("/UploadFile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
