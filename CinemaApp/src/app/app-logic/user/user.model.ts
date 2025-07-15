export type Role = 0 | 1;

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  avatarUrl: string;
  password: string;
  role: Role;
  createdAt: string;
  modifiedAt: string;
  isDeleted: boolean;
  token: string;
}
