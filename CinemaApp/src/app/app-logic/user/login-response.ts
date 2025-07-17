import { User } from './user.model';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
