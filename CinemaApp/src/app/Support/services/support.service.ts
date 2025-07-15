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

  sendTicket(ticket: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket);
  }

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateTicketStatus(ticketId: number): Observable<SupportTicket> {
    console.log('Service: Sending PUT request with ticketId:', ticketId);
    return this.http.put<SupportTicket>(this.apiUrl, ticketId);
  }
}
