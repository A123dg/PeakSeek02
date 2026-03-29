import axiosClient from "@configs/axios";
import type { IResponse } from "@/shared/types/response.type";
import type { TLoginRequest } from "@apps/auth/services/types";
import { stringtifyQuery } from "@/shared/utils";

export const login = (payload: TLoginRequest): Promise<IResponse<any>> => {
  return axiosClient.post("/Auth/admin-login", payload);
};

export const getAccoungList = (params?: any): Promise<any> => {
  const query = params ? stringtifyQuery(params) : "";
  return axiosClient.get(`/User${query ? `?${query}` : ""}`);
};
