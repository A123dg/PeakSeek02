export interface IAdminDashboardRatio {
  approvedCount: number;
  pendingCount: number;
  approvedPercentage: number;
  pendingPercentage: number;
}

export interface IAdminDashboardResponse {
  totalUsers: number;
  locations: IAdminDashboardRatio;
  reports: IAdminDashboardRatio;
}
