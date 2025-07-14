export class ScreeningRoomData {
  id!: number;
  name!: string;
  numOfRow!: number;
  numOfSeatsPerRow!: number;
  format?: string[];
  seatList?: string[];

  constructor(screeningRoomData?: Partial<ScreeningRoomData>) {
    Object.assign(this, screeningRoomData);
  }
}
