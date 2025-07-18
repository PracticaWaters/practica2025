import { Injectable } from '@angular/core';
import { Film } from './film/film';
import { ScreeningRoom } from '../screening-room/screening-room';
import { ScreeningRoomData } from './screening-room-data';

@Injectable({
  providedIn: 'root',
})
export class AddTimeslotTransfer {
  private selectedMovie?: Film;
  private selectedScreeningRoom?: ScreeningRoomData;

  setMovie(movie: Film): void {
    this.selectedMovie = movie;
  }

  setScreeningRoom(screeningRoom: ScreeningRoomData): void {
    this.selectedScreeningRoom = screeningRoom;
  }

  getMovie() : Film | undefined{
    return this.selectedMovie;
  }

  getScreeningRoom() : ScreeningRoomData | undefined{
    return this.selectedScreeningRoom;
  }
}
