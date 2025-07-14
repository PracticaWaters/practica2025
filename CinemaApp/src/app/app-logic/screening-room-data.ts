export class ScreeningRoomData {
  id!: number;
  name!: string;
  noOfRows!: number;
  noOfSeatsOnRow!: number;
  supportedFormats?: string[];
  occupiedSeats?: string[];

  constructor(screeningRoomData?: Partial<ScreeningRoomData>) {
    Object.assign(this, screeningRoomData);
  }
}
