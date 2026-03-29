export type TLoginRequest = {
  userName: string;
  password: string;
};

export interface IRole {
  roleId: string;
  roleName: string;
  idDonvi?: number;
  chucvu?: string;
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  roleId: string;
  roleName: string;
  status: number;
}

export interface ILoginRespone {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
  refreshTokenExpiryTime?: string;
}
