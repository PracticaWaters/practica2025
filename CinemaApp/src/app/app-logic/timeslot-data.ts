import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { Timeslot } from './timeslot';

@Injectable({
  providedIn: 'root',
})
export class TimeslotData {
  timeslotList: Array<Timeslot> = [];

  private apiUrl = 'https://localhost:25867/api/';

  constructor(private httpClient: HttpClient) {}

  addTimeslot(timeslot: Timeslot): void {
    this.httpClient
      .post<Timeslot>(this.apiUrl, timeslot)
      .subscribe((data) => {
        console.log(data);
      });
  }

  getTimeslotById(id: number): Observable<Timeslot> {
    return this.httpClient.get<Timeslot>(`${this.apiUrl}/${id}`);
  }

  updateTimeslot(item: Timeslot): void {
    this.httpClient.put<Timeslot>(this.apiUrl, item).subscribe((data) => {
      console.log(data);
    });
  }

  getData(): Observable<Array<Timeslot>> {
    return this.httpClient.get<Array<Timeslot>>(this.apiUrl);
  }

  delete(item: Timeslot): void {
    const url = `${this.apiUrl}/${item.id}`;
    this.httpClient.delete(url).subscribe(() => {
      console.log(`Deleted item with id:${item.id}`);
    });
  }
}
