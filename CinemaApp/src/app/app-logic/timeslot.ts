import { Time } from "@angular/common";
import { ScreeningRoomData } from "./screening-room-data";
import { Film } from "./film/film";

export interface Timeslot{
    id: number;
    startTime: Time;
    endTime: Time;
    screeningRoom: ScreeningRoomData;
    movie: Film
}