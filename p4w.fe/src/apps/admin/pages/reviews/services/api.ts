import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";
import { stringtifyQuery } from "@/shared/utils";
import type { IReviewListParams, IReviewResponse, IReviewStatusPayload } from "./type";

export const getReviewList = (
  params?: IReviewListParams
): Promise<IResponsePagination<IReviewResponse>> => {
  const query = params ? stringtifyQuery(params) : "";
  return axiosClient.get(`admin/reviews${query ? `?${query}` : ""}`);
};

export const updateReviewStatus = (
  id: string,
  data: IReviewStatusPayload
): Promise<IResponse<IReviewResponse>> => {
  return axiosClient.put(`admin/reviews/${id}/status`, data);
};

export const hideReview = (id: string): Promise<IResponse<IReviewResponse>> => {
  return axiosClient.delete(`admin/reviews/${id}`);
};
