import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
  animations: [
    trigger('slideDown', [
      state('void', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('*', style({
        height: '*',
        opacity: '1',
        overflow: 'hidden'
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({
        opacity: '0',
        transform: 'translateY(20px)'
      })),
      state('*', style({
        opacity: '1',
        transform: 'translateY(0)'
      })),
      transition('void <=> *', [
        animate('400ms ease-out')
      ])
    ])
  ]
})
export class Faq implements OnInit {
  faqs: any[] = [];
  showAll: boolean = false;
  initialCount: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFaqData();
  }

  loadFaqData(): void {
    this.http.get<any[]>('assets/support/faq-data.json').subscribe({
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

  get visibleFaqs(): any[] {
    return this.showAll ? this.faqs : this.faqs.slice(0, this.initialCount);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  hasMoreFaqs(): boolean {
    return this.faqs.length > this.initialCount;
  }

  trackByFaq(index: number, faq: any): any {
    return faq.question;
  }
}
