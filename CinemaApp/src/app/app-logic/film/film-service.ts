import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'https://localhost:25867/api/cinema/film';

  constructor(private httpClient: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.apiUrl);
  }

  getFilmById(id: number): Observable<Film> {
    return this.httpClient.get<Film>(`${this.apiUrl}/${id}`);
  }

updateFilm(film: Film): Observable<Film> {
  return this.httpClient.put<Film>(`${this.apiUrl}/${film.id}`, film);
}

  
  deleteFilm(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
