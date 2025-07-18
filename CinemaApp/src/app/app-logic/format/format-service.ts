import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Format } from './format';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  private apiUrl = 'https://localhost:25867/api/cinema/format';

  constructor(private httpClient: HttpClient) {}

  getFormats(): Observable<Format[]> {
    return this.httpClient.get<Format[]>(this.apiUrl);
  }

  getFormatById(id: number): Observable<Format> {
    return this.httpClient.get<Format>(`${this.apiUrl}/${id}`);
  }
  addFormat(format: Format): void {
      this.httpClient
        .post<Format>(this.apiUrl, format)
        .subscribe((data) => {
          console.log(data);
        });
    }

  updateFormat(format: Format): void {
    this.httpClient.put<Format>(this.apiUrl, format).subscribe((data) => {
      console.log('Format actualizat:', data);
    });
  }

  deleteFormat(review: Format): void {
    this.httpClient
      .request('delete', this.apiUrl, { body: review })
      .subscribe((data) => {
        console.log('Format sters:', data);
      });
  }
}
