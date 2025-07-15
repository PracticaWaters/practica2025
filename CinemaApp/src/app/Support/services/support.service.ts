import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicket } from './support-ticket';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private apiUrl = 'https://localhost:25867/api/cinema/ticketsupport';

  constructor(private http: HttpClient) {}

  sendTicket(ticket: SupportTicket): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket);
  }
}
