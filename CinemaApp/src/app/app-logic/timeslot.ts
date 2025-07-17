import { Time } from "@angular/common";
import { ScreeningRoomData } from "./screening-room-data";
import { FilmModel } from "./film/film.model";

export class Timeslot{
    id!: number;
    startTime!: Time;
    endTime!: Time;
    screeningRoom?: ScreeningRoomData;
    movie?: FilmModel

    constructor(item?: Partial<Timeslot>) {
    Object.assign(this, item);
  }
}