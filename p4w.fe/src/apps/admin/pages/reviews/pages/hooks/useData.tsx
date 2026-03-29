import { useReviewListQuery } from "../../services/query";

export type ReviewStatus = "active" | "inactive";

export interface ReviewRow {
  id: string;
  user: string;
  location: string;
  rating: number;
  content: string;
  status: ReviewStatus;
  createdAt: string;
  statusCode: number;
}

export const useReviewData = (filter?: { page?: number; pageSize?: number }) => {
  const { data: apiRes, isLoading } = useReviewListQuery({
    params: filter ?? {},
    options: {
      select: (res) => res,
    },
  });

  const mappedData: ReviewRow[] =
    apiRes?.data?.map((item: any) => ({
      id: item.id,
      user: item.userName,
      location: item.locationName,
      rating: item.rating,
      content: item.content,
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
