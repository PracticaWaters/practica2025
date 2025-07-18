import { ReviewModel } from "../review/review-model";
import { Actor } from "./actor";

export class Film {
    id!:number;
    name!:string;
    actors!:Actor[];
    image!:string;
    trailer!:string;
    // timeSlot:TimeSlot[];
    description!:string;
    releaseDate!:Date;
    ageRating!:string;
    reviews!:ReviewModel[];
    duration!:number;
    startRunningDate!:Date;
    endRunningDate!:Date;
    reservation?:any;
    whishlist?:any;

    constructor(film?:Partial<Film>){
        Object.assign(this, film);
    }


}

