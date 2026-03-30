export type ApiResponse<T> = {
  code: number;
  success: boolean;
  message?: string;
  data: T;
  metaData?: {
    page: number;
    pageSize: number;
    total: number;
    totalPage: number;
  } | null;
};

export type LoginRequest = {
  userName: string;
  password: string;
};

export type GoogleLoginRequest = {
  idToken: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
  refreshTokenExpiryTime?: string;
};

export type RegisterRequest = {
  email: string;
  userName: string;
  dateOfBirth?: string;
  mediaLinkUrl?: string;
};

export type UpdateProfileRequest = {
  email: string;
  userName: string;
  dateOfBirth?: string;
  password?: string;
  mediaLinkUrl?: string;
};

export type CreateLocationRequest = {
  locationName: string;
  description?: string;
  address: string;
  addressLink?: string;
  openingHours?: string;
  closingHours?: string;
  type: number;
};

export type OwnedLocationDetail = {
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
};

export type LocationCard = {
  id: string;
  locationName: string;
  description?: string | null;
  address: string;
  addressLink?: string | null;
  type: number;
  openingHours?: string | null;
  closingHours?: string | null;
  averageRating: number;
  reviewCount: number;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  rating: number;
  content: string;
  createdAt: string;
  commentCount: number;
};

export type LocationDetail = {
  id: string;
  locationName: string;
  description?: string | null;
  address: string;
  addressLink?: string | null;
  type: number;
  openingHours?: string | null;
  closingHours?: string | null;
  averageRating: number;
  reviewCount: number;
  recentReviews: Review[];
};

export type UserProfile = {
  id: string;
  roleId: string;
  googleUserId?: string | null;
  email: string;
  userName: string;
  dateOfBirth?: string | null;
  password?: string | null;
  status: number;
  refreshTokenExpiryTime?: string | null;
  createdAt: string;
  mediaLinkUrl: string;
  recentLocation?: {
    id: string;
    locationName: string;
    address?: string | null;
  } | null;
  ownedLocations?: OwnedLocation[] | null;
};

export type OwnedLocation = {
  id: string;
  locationName: string;
  address: string;
  status: number;
  statusName: string;
};

export type CreateReviewRequest = {
  locationId: string;
  rating: number;
  content: string;
};

export type CreateReportRequest = {
  reason: string;
  targetType: string;
  targetId: string;
};

const FALLBACK_API_URL = "https://p4w-production.up.railway.app/api";

const normalizeApiUrl = (value: string) => value.trim().replace(/\/+$/, "");
export const API_BASE_URL = normalizeApiUrl(process.env.EXPO_PUBLIC_API_URL ?? FALLBACK_API_URL);

type RequestOptions = RequestInit & {
  token?: string | null;
};

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const parseResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const text = await response.text();
  const payload = text ? (JSON.parse(text) as ApiResponse<T>) : null;

  if (!response.ok || !payload?.success) {
    throw new ApiError(payload?.message || "Request failed", response.status);
  }

  return payload;
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}) => {
  const headers = new Headers(options.headers);
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError(
      `Khong ket noi duoc API (${API_BASE_URL}). Hay kiem tra EXPO_PUBLIC_API_URL hoac backend co dang chay khong.`,
      0
    );
  }

  return parseResponse<T>(response);
};

export const loginApi = (payload: LoginRequest) =>
  apiRequest<LoginResponse>("/Auth/admin-login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const loginWithGoogleApi = (payload: GoogleLoginRequest) =>
  apiRequest<LoginResponse>("/Auth/login-google", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerApi = (payload: RegisterRequest) =>
  apiRequest<boolean>("/Auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateProfileApi = (payload: UpdateProfileRequest, token: string) =>
  apiRequest<UserProfile>("/Auth/update-profile", {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  });

export const refreshTokenApi = (refreshToken: string) =>
  apiRequest<LoginResponse>("/Auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

export const createLocationApi = (payload: CreateLocationRequest, token: string) =>
  apiRequest<OwnedLocationDetail>("/Location", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });

export const getProfileApi = (token: string) =>
  apiRequest<UserProfile>("/User/profile", {
    token,
  });

export const getLocationsApi = (search = "") =>
  apiRequest<LocationCard[]>(`/Location${search ? `?search=${encodeURIComponent(search)}` : ""}`);

export const getLocationDetailApi = (locationId: string) =>
  apiRequest<LocationDetail>(`/Location/${locationId}`);

export const createReviewApi = (payload: CreateReviewRequest, token: string) =>
  apiRequest<Review>("/Location/reviews", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });

export const createReportApi = (payload: CreateReportRequest, token: string) =>
  apiRequest<unknown>("/Report", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });

export const uploadImageApi = (file: {
  uri: string;
  name?: string;
  type?: string;
}) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name ?? "avatar.jpg",
    type: file.type ?? "image/jpeg",
  } as unknown as Blob);

  return apiRequest<string>("/UploadFile/image", {
    method: "POST",
    body: formData,
  });
};
