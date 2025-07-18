import { Actor } from "./actor";

export interface Film {
    id:number;
    name:string;
    actors:Actor[];
    image:string;
    trailer:string;
    // timeSlot:TimeSlot[];
    description:string;
    releaseDate:Date;
    ageRating:string;
    // reviews:Review[];
    duration:number;
    startRunningDate:Date;
    endRunningDate:Date;
    // reservation:Reservation;
    // whishlist:Whishlist;
}


// export function formatDuration(minutes: number): string {
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;
//   return `${h}h ${m}min`;
// }
