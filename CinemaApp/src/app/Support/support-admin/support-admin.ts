import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupportTicket } from '../services/support-ticket';
import { SupportService } from '../services/support.service';

@Component({
  selector: 'app-support-admin',
  standalone: false,
  templateUrl: './support-admin.html',
  styleUrl: './support-admin.css',
})
export class SupportAdmin implements OnInit {
  tickete: SupportTicket[] = [];
  ticketeFiltrate: SupportTicket[] = [];

  paginaCurenta = 1;
  ticketePerPagina = 5;
  filtru = '';
  loading = false;
  error = '';

  selecteazaTot = false;

  constructor(
    private fb: FormBuilder,
    private supportService: SupportService
  ) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.error = '';
    
    this.supportService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickete = tickets.map(ticket => ({
          ...ticket,
          selectat: false
        }));
        this.aplicaFiltrare();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tickets:', err);
        this.error = 'Eroare la încărcarea tichetelor';
        this.loading = false;
      }
    });
  }

  toggleTicketStatus(ticket: SupportTicket) {
    console.log('Sending ticketId:', ticket.id, 'Current status:', ticket.status);
    
    this.supportService.updateTicketStatus(ticket.id).subscribe({
      next: (updatedTicket) => {
        console.log('Success response:', updatedTicket);
        // Update local ticket with the returned data
        ticket.status = updatedTicket.status;
        console.log('Updated local status to:', ticket.status);
      },
      error: (err) => {
        console.error('Error updating ticket status:', err);
        alert('Eroare la actualizarea statusului ticketului');
      }
    });
  }

  getStatusText(status: boolean): string {
    return status ? 'Activ' : 'Inactiv';
  }

  getStatusClass(status: boolean): string {
    return status 
      ? 'bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium'
      : 'bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium';
  }

  aplicaFiltrare() {
    const filtruLower = this.filtru.toLowerCase();
    this.ticketeFiltrate = this.tickete.filter((ticket) =>
      ticket.name.toLowerCase().includes(filtruLower) ||
      ticket.email.toLowerCase().includes(filtruLower) ||
      ticket.message.toLowerCase().includes(filtruLower) ||
      this.getStatusText(ticket.status).toLowerCase().includes(filtruLower)
    );
    this.paginaCurenta = 1;
  }

  paginare(): SupportTicket[] {
    const start = (this.paginaCurenta - 1) * this.ticketePerPagina;
    const end = start + this.ticketePerPagina;
    return this.ticketeFiltrate.slice(start, end);
  }

  totalPagini(): number {
    return Math.ceil(this.ticketeFiltrate.length / this.ticketePerPagina);
  }

  toggleSelectToate() {
    const vizibile = this.paginare();
    this.selecteazaTot = !this.selecteazaTot;
    vizibile.forEach((t) => (t.selectat = this.selecteazaTot));
  }

  toggleSelect(ticket: SupportTicket) {
    ticket.selectat = !ticket.selectat;
    const vizibile = this.paginare();
    this.selecteazaTot = vizibile.every((t) => t.selectat);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
