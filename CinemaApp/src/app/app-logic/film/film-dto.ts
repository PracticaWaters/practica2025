export interface FilmDTO {
    id:number;
    name:string;
    actorsIds:number[];
    reviewsIds:number[];
    image:string;
    trailer:string;
    description:string;
    releaseDate:Date;
    ageRating:string;
    duration:number;
    startRunningDate:Date;
    endRunningDate:Date;
}