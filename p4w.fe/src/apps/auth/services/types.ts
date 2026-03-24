export type TLoginRequest = {
  userName: string;
  password: string;
}

export interface IRole {
  roleId: number;
  roleName: string;
  idDonvi: number;
  chucvu: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  roles: IRole[];
  idDơnVi: number;
  tenDonVi: string;
}

export interface ILoginRespone {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}