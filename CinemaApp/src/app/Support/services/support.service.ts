import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SuportTicket {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private apiUrl = 'https://localhost:25856/api/cinema/ticketsupport';

  constructor(private http: HttpClient) {}

  sendTicket(ticket: SuportTicket): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket);
  }
}
