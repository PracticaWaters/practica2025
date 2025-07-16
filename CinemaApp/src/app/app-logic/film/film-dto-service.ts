import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmDTO } from './film-dto';

@Injectable({
  providedIn: 'root'
})
export class FilmDtoService {
  private apiUrl = 'https://localhost:25867/api/cinema/film';

  constructor(private httpClient: HttpClient) {}

  addReview(filmDTO: FilmDTO): void {
    this.httpClient
      .post<FilmDTO>(this.apiUrl, filmDTO)
      .subscribe((data) => {
        console.log('Filmul a fost adaugat:', data);
      });
  }
}
