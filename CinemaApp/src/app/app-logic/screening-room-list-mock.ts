import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScreeningRoomData } from './screening-room-data';

@Injectable({
  providedIn: 'root',
})
export class ScreeningRoomListMock {
  data: Array<ScreeningRoomData> = [];

  private apiUrl = 'https://localhost:25867/api/cinema/screeningRoom';

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<Array<ScreeningRoomData>> {
    return this.httpClient.get<Array<ScreeningRoomData>>(this.apiUrl);
  }

  addScreeningRoom(screeningRoom: ScreeningRoomData): void {
    this.httpClient
      .post<ScreeningRoomData>(this.apiUrl, screeningRoom)
      .subscribe((data) => {
        console.log(data);
      });
  }

  getLastId(): number {
    return Math.max.apply(
      Math,
      this.data.map(function (o) {
        return o.id;
      })
    );
  }

  getScreeningRoomById(id: number): Observable<ScreeningRoomData> {
    return this.httpClient.get<ScreeningRoomData>(`${this.apiUrl}/${id}`);
  }

  updateScreeningRoom(item: ScreeningRoomData): void {
    this.httpClient
      .put<ScreeningRoomData>(this.apiUrl, item)
      .subscribe((data) => {
        console.log(data);
      });
  }

  delete(item: ScreeningRoomData): void{
    const url = `${this.apiUrl}/${item.id}`;
    this.httpClient
    .delete(url)
    .subscribe(() =>{
      console.log(`Deleted item with id:${item.id}`);
    })
  }
}
