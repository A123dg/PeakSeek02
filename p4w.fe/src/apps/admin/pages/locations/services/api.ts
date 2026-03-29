import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";
import { stringtifyQuery } from "@/shared/utils";
import type { ILocationListParams, ILocationPayload, ILocationResponse } from "./type";

export const getLocationList = (
  params?: ILocationListParams
): Promise<IResponsePagination<ILocationResponse>> => {
  const query = params ? stringtifyQuery(params) : "";
  return axiosClient.get(`admin/locations${query ? `?${query}` : ""}`);
};

export const createLocation = (data: ILocationPayload): Promise<IResponse<ILocationResponse>> => {
  return axiosClient.post("admin/locations", data);
};

export const updateLocation = (
  id: string,
  data: ILocationPayload
): Promise<IResponse<ILocationResponse>> => {
  return axiosClient.put(`admin/locations/${id}`, data);
};

export const hideLocation = (id: string): Promise<IResponse<ILocationResponse>> => {
  return axiosClient.delete(`admin/locations/${id}`);
};
