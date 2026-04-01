export interface ICommentListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: number;
}

export interface ICommentResponse {
  id: string;
  reviewId: string;
  parentId?: string | null;
  userId: string;
  userName: string;
  locationId: string;
  locationName: string;
  reviewContent: string;
  content: string;
  status: number;
  statusName: string;
  createdAt: string;
}
