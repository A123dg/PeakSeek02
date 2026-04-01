import axiosClient from "@/configs/axios";
import type { IResponse } from "@/shared/types/response.type";
import type { IAdminDashboardResponse } from "./type";

export const getAdminDashboard = (): Promise<IResponse<IAdminDashboardResponse>> => {
  return axiosClient.get("admin/dashboard");
};
