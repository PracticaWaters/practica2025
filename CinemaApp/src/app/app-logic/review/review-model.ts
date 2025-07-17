export interface ReviewModel {
  id: number;
  rating: number;
  date: Date;
  comment: string;
  user?: {name:string};
  film?:any;
  //film: Film;
  //user: User;
}
