import { Film } from '../film/film';
import { User } from '../user/user.model';

export interface ReviewModel {
  id: number;
  rating: number;
  date: Date;
  comment: string;
  film: Film;
  user: User;
}
