import { User } from './user.model';

export interface LoginResponse {
  user: User;
  token: string;
}
