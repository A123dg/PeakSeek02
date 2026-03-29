import { useReportListQuery } from "../../services/query";

export type ReportStatus = "pending" | "approved" | "rejected";
export type ReportType = "user" | "location" | "review" | "comment";

export interface ReportRow {
  id: string;
  reportedBy: string;
  reportedItemType: ReportType;
  reportedItem: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  statusCode: number;
  reportedItemId: string;
}

export const useReportData = (filter?: { page?: number; pageSize?: number }) => {
  const { data: apiRes, isLoading } = useReportListQuery({
    params: filter ?? {},
    options: {
      select: (res) => res,
    },
  });

  const mappedData: ReportRow[] =
    apiRes?.data?.map((item: any) => ({
      id: item.id,
      reportedBy: item.reportedBy,
      reportedItemType: item.reportedItemType,
      reportedItem: item.reportedItem,
      reportedItemId: item.reportedItemId,
      reason: item.reason,
      status: item.statusName,
      createdAt: item.createdAt,
      statusCode: item.status,
    })) ?? [];

  return {
    data: mappedData,
    isLoading,
    total: apiRes?.metaData?.total ?? 0,
    pageIndex: apiRes?.metaData?.page ?? filter?.page ?? 1,
    pageSize: apiRes?.metaData?.pageSize ?? filter?.pageSize ?? 10,
  };
};
