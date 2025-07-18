import { Format } from './format/format';

export class ScreeningRoomData {
  id!: number;
  name!: string;
  numOfRow!: number;
  numOfSeatsPerRow!: number;
  format?: Format;
  seatList?: string[];

  constructor(screeningRoomData?: Partial<ScreeningRoomData>) {
    Object.assign(this, screeningRoomData);
  }
}
