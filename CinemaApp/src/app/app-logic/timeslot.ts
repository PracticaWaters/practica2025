import { Time } from "@angular/common";
import { ScreeningRoomData } from "./screening-room-data";
import { FilmModel } from "./film/film.model";

export interface Timeslot{
    id: number;
    startTime: Time;
    endTime: Time;
    screeningRoom: ScreeningRoomData;
    movie: FilmModel
}