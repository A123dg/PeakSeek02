export interface AdminUserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}

export type UserStatus = 'active' | 'locked' | 'inactive';

export interface IUser {
  id?: string;
  userName: string;
  email: string;
  roleId: string;
  status: number;
  dateOfBirth?: string;
  mediaLinkUrl?: string;
}

export interface IUserResponse {
  id: string;
  userName: string;
  email: string;
  roleName: string;
  roleId: string;
  status: number;
  statusName: string;
  dateOfBirth?: string;
  mediaLinkUrl?: string;
  createdAt: string;
  ownedLocations?: Array<{
    id: string;
    locationName?: string;
    address?: string;
    status?: number;
    statusName?: string;
  }>;
}
