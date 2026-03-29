export interface IReportListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  targetType?: string;
  status?: number;
}

export interface IReportStatusPayload {
  status: number;
}

export interface IReportResponse {
  id: string;
  userId: string;
  reportedBy: string;
  reason: string;
  reportedItemType: string;
  reportedItemId: string;
  reportedItem: string;
  status: number;
  statusName: string;
  createdAt: string;
}
