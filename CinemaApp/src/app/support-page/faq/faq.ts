import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq implements OnInit {
  faqs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFaqData();
  }

  loadFaqData(): void {
    this.http.get<any[]>('assets/faq-data.json').subscribe({
      next: (data) => {
        this.faqs = data;
      },
      error: (error) => {
        console.error('Error loading FAQ data:', error);
      },
    });
  }

  toggle(faq: any): void {
    faq.expanded = !faq.expanded;
  }
}
