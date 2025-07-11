export class ScreeningRoomData{
    id!:number;
    name!:string;
    noOfRows!:number;
    noOfSeatsOnRow!:number;
    //supportedFormats!:Format[];
    occupiedSeats?: string[];
}
