 
 
 export interface AdminUserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}
export type UserStatus = 'active' | 'suspended' | 'pending';