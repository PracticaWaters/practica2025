import { User } from './user.model';

export interface LoginResponse {
  user: User;
<<<<<<< HEAD
  token: string;
=======
  accessToken: string;
  refreshToken: string;
>>>>>>> d8907fadb5b707183763ebe14e7c1749a734f40d
}
