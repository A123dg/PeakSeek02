import axiosClient from "@/configs/axios";
import type { IResponsePagination } from "@/shared/types/response.type";
import { stringtifyQuery } from "@/shared/utils";
import type { IUser } from "./type";

export const getUserList = (params: any): Promise<IResponsePagination<any>> => {
  const query = params ? stringtifyQuery(params) : "";
  return axiosClient.get(`User${query ? `?${query}` : ""}`);
};

export const createUser = (data: IUser): Promise<IResponsePagination<any>> => {
  return axiosClient.post("User", data);
};

export const updateUser = (id: string, data: IUser): Promise<IResponsePagination<any>> => {
  return axiosClient.put(`User/${id}`, data);
};

export const lockUser = (id: string): Promise<IResponsePagination<any>> => {
  return axiosClient.put(`User/${id}/lock`);
};

export const unlockUser = (id: string): Promise<IResponsePagination<any>> => {
  return axiosClient.put(`User/${id}/unlock`);
};
