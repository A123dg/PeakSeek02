import axiosClient from "@/configs/axios";
import type { IResponsePagination } from "@/shared/types/response.type";
import { stringtifyQuery } from "@/shared/utils";

export const getUserList =  (params: any) : Promise<IResponsePagination<any>> => {
    const query = params ? stringtifyQuery(params) : '';
    return axiosClient.get(`User?${query}`);
}