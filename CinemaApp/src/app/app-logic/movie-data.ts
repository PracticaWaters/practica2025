import { Injectable } from '@angular/core';
import { Film } from './film/film';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieData {
  data: Array<Film> = [];

  private apiUrl = 'https://localhost:25867/api/cinema/film';

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<Array<Film>> {
    return this.httpClient.get<Array<Film>>(this.apiUrl);
  }
}
