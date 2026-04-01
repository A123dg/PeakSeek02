export interface IReviewListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: number;
  minRating?: number;
}

export interface IReviewStatusPayload {
  status: number;
}

export interface IReviewResponse {
  id: string;
  userId: string;
  userName: string;
  locationId: string;
  locationName: string;
  rating: number;
  content: string;
  status: number;
  statusName: string;
  createdAt: string;
  mediaLinkUrls?: string[];
}
