import { useCommentListQuery } from "../../services/query";

export type CommentStatus = "active" | "inactive";

export interface CommentRow {
  id: string;
  reviewId: string;
  parentId?: string | null;
  userId: string;
  userName: string;
  locationId: string;
  locationName: string;
  reviewContent: string;
  content: string;
  status: CommentStatus;
  statusCode: number;
  createdAt: string;
}

export const useCommentData = (filter?: { page?: number; pageSize?: number; search?: string; status?: number }) => {
  const { data: apiRes, isLoading } = useCommentListQuery({
    params: filter ?? {},
    options: {
      select: (res) => res,
    },
  });

  const mappedData: CommentRow[] =
    apiRes?.data?.map((item: any) => ({
      id: item.id,
      reviewId: item.reviewId,
      parentId: item.parentId,
      userId: item.userId,
      userName: item.userName || "Người dùng đã khóa",
      locationId: item.locationId,
      locationName: item.locationName,
      reviewContent: item.reviewContent,
      content: item.content,
      status: item.statusName,
      statusCode: item.status,
      createdAt: item.createdAt,
    })) ?? [];

  return {
    data: mappedData,
    isLoading,
    total: apiRes?.metaData?.total ?? 0,
  };
};

