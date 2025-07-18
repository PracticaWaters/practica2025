import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatDto } from './format-dto';

@Injectable({
  providedIn: 'root',
})
export class FormatDtoService {
  private apiUrl = 'https://localhost:25867/api/cinema/format';

  constructor(private httpClient: HttpClient) {}

  addFormat(formatDto: FormatDto): void {
    this.httpClient
      .post<FormatDto>(this.apiUrl, formatDto)
      .subscribe((data) => {
        console.log('Format adaugat:', data);
      });
  }
}
