import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormatModel } from './format-model';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  private apiUrl = 'https://localhost:25867/api/cinema/review';

  constructor(private httpClient: HttpClient) {}

  getFormats(): Observable<FormatModel[]> {
    return this.httpClient.get<FormatModel[]>(this.apiUrl);
  }

  getFormatById(id: number): Observable<FormatModel> {
    return this.httpClient.get<FormatModel>(`${this.apiUrl}/${id}`);
  }

  updateFormat(review: FormatModel): void {
    this.httpClient.put<FormatModel>(this.apiUrl, review).subscribe((data) => {
      console.log('Format actualizat:', data);
    });
  }

  deleteFormat(review: FormatModel): void {
    this.httpClient
      .request('delete', this.apiUrl, { body: review })
      .subscribe((data) => {
        console.log('Format sters:', data);
      });
  }
}
