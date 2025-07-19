import { Injectable } from '@angular/core';
import { Film } from './film/film';
import { ScreeningRoom } from '../screening-room/screening-room';
import { ScreeningRoomData } from './screening-room-data';
import { Format } from './format/format';
import { js } from 'three/src/nodes/TSL.js';

@Injectable({
  providedIn: 'root',
})
export class AddTimeslotTransfer {
  private readonly MOVIE_KEY = 'addTimeslotTransfer_movie';
  private readonly ROOM_KEY = 'addTimeslotTransfer_room';
  private readonly FORMAT_KEY = 'addTimeslotTransfer_format'

  setMovie(movie: Film): void {
    localStorage.setItem(this.MOVIE_KEY, JSON.stringify(movie));
  }

  setScreeningRoom(screeningRoom: ScreeningRoomData): void {
    localStorage.setItem(this.ROOM_KEY, JSON.stringify(screeningRoom));
  }

  setFormat(format: Format): void{
    localStorage.setItem(this.FORMAT_KEY, JSON.stringify(format));
  }

  getMovie() : Film | undefined{
    const json = localStorage.getItem(this.MOVIE_KEY);
    return json ? JSON.parse(json) : undefined;
  }

  getScreeningRoom() : ScreeningRoomData | undefined{
    const json = localStorage.getItem(this.ROOM_KEY);
    return json ? JSON.parse(json) : undefined;
  }

  getFormat() : Format | undefined{
    const json = localStorage.getItem(this.FORMAT_KEY);
    return json ? JSON.parse(json) : undefined;
  }

  clear(): void {
    localStorage.removeItem(this.MOVIE_KEY);
    localStorage.removeItem(this.ROOM_KEY);
    localStorage.removeItem(this.FORMAT_KEY);
  }
}
