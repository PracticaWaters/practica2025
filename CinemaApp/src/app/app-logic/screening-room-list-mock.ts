import { Injectable } from '@angular/core';
import { ScreeningRoom } from '../screening-room/screening-room';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreeningRoomListMock {
  data: Array<ScreeningRoom> = [];

  private apiUrl = 'https://localhost:7022/api/cinema/screeningRoom';

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<Array<ScreeningRoom>> {
    return this.httpClient.get<ScreeningRoom[]>(this.apiUrl);
  }
}
