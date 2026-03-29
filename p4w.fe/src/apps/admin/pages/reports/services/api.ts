import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";
import { stringtifyQuery } from "@/shared/utils";
import type { IReportListParams, IReportResponse, IReportStatusPayload } from "./type";

export const getReportList = (
  params?: IReportListParams
): Promise<IResponsePagination<IReportResponse>> => {
  const query = params ? stringtifyQuery(params) : "";
  return axiosClient.get(`Report${query ? `?${query}` : ""}`);
};

export const updateReportStatus = (
  id: string,
  data: IReportStatusPayload
): Promise<IResponse<IReportResponse>> => {
  return axiosClient.put(`Report/${id}/status`, data);
};
