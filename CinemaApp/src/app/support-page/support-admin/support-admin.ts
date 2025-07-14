import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupportTicket } from '../support-ticket';

@Component({
  selector: 'app-support-admin',
  standalone: false,
  templateUrl: './support-admin.html',
  styleUrl: './support-admin.css'
})


export class SupportAdmin {
  tickete: SupportTicket[] = []; // inițial gol, poți adăuga mock data
  ticketeFiltrate: SupportTicket[] = [];

  paginaCurenta = 1;
  ticketePerPagina = 5;
  filtru = '';

  selecteazaTot = false;

  constructor(private fb: FormBuilder) {
    // Poți adăuga date de test:
    for (let i = 1; i <= 23; i++) {
      this.tickete.push({
        nume: `Utilizator ${i}`,
        email: `utilizator${i}@exemplu.com`,
        mesaj: `Mesaj testgldfgjdklfgjkdflgjkldfgjkldfgjkldfgjdflgjldfggjdf gkljdflgjgkldfjgkdlfgjdf kdfjgkljgldfjlgdjgkldf gjdfglkdjgkldfjgkldfgj gkdfjgjdgdkfljgldf ${i}`,
        data: new Date().toLocaleDateString(),
        selectat: false,
        active:true,
      });
    }
    this.aplicaFiltrare();
  }

  aplicaFiltrare() {
    const filtruLower = this.filtru.toLowerCase();
    this.ticketeFiltrate = this.tickete.filter(ticket =>
      Object.values(ticket).some(val =>
        String(val).toLowerCase().includes(filtruLower)
      )
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
    vizibile.forEach(t => (t.selectat = this.selecteazaTot));
  }

  toggleSelect(ticket: SupportTicket) {
    ticket.selectat = !ticket.selectat;
    const vizibile = this.paginare();
    this.selecteazaTot = vizibile.every(t => t.selectat);
  }
}
