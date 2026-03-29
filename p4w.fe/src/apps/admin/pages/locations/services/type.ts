export interface ILocationListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: number;
  status?: number;
}

export interface ILocationPayload {
  ownerId?: string | null;
  locationName: string;
  description?: string;
  address: string;
  addressLink?: string;
  openingHours?: string;
  closingHours?: string;
  type: number;
  status: number;
}

export interface ILocationResponse {
  id: string;
  ownerId?: string | null;
  ownerName?: string | null;
  locationName: string;
  description?: string | null;
  address: string;
  addressLink?: string | null;
  type: number;
  openingHours?: string | null;
  closingHours?: string | null;
  status: number;
  statusName: string;
}
