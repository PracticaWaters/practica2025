import { Time } from "@angular/common";
import { ScreeningRoomData } from "./screening-room-data";

export class Timeslot{
    id!: number;
    startTime!: Time;
    endTime!: Time;
    screeningRoom!: ScreeningRoomData;
    //format:
}