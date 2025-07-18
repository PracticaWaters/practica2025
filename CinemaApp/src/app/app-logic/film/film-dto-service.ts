import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmDTO } from './film-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmDtoService {
  private apiUrl = 'https://localhost:25867/api/cinema/film';

  constructor(private httpClient: HttpClient) {}

  addFilm(filmDTO: FilmDTO): Observable<FilmDTO> {
    return this.httpClient.post<FilmDTO>(this.apiUrl, filmDTO);
  }

  getFilms(): Observable<FilmDTO[]> {
    return this.httpClient.get<FilmDTO[]>(this.apiUrl);
  }
}
