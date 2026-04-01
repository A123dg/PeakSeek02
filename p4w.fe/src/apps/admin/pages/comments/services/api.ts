import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";
import { stringtifyQuery } from "@/shared/utils";
import type { ICommentListParams, ICommentResponse } from "./type";

export const getCommentList = (params?: ICommentListParams): Promise<IResponsePagination<ICommentResponse>> => {
  const query = params ? stringtifyQuery(params) : "";
  return axiosClient.get(`admin/comments${query ? `?${query}` : ""}`);
};

export const getCommentDetail = (id: string): Promise<IResponse<ICommentResponse>> => {
  return axiosClient.get(`admin/comments/${id}`);
};

export const hideComment = (id: string): Promise<IResponse<ICommentResponse>> => {
  return axiosClient.delete(`admin/comments/${id}`);
};
