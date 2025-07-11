import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ importă modulul

@Component({
  standalone: true,
  selector: 'app-freq-questions',
  templateUrl: './freq-questions.html',
  styleUrls: ['./freq-questions.css'],
  imports: [CommonModule] // ✅ adaugă aici
})
export class FreqQuestionsComponent {
  faqs = [
    {
      question: 'Are the tickets with reserved seats?',
      answer: 'Yes. Please note the seat number on the ticket. Online or phone reservations lose validity 30 minutes before the show starts.',
      expanded: true
    },
    {
      question: 'How early should I arrive before the show?',
      answer: 'It is recommended to arrive at least 15–20 minutes in advance.',
      expanded: false
    },
    {
      question: 'Why is my account blocked and I can’t book anymore?',
      answer: 'Your account may be blocked due to repeated no-shows or cancellation policy violations.',
      expanded: false
    },
    {
      question: 'Why do Romanian movie titles differ from the English ones?',
      answer: 'Titles are localized for better audience understanding or marketing reasons.',
      expanded: false
    },
    {
      question: 'What does "Live Transmission" mean?',
      answer: 'It refers to a live broadcast of an event happening in real time.',
      expanded: false
    },
    {
      question: 'How do I know if the movie is dubbed or subtitled?',
      answer: 'Check the language and subtitle info next to the movie listing.',
      expanded: false
    },
    {
      question: 'When is the new movie schedule published?',
      answer: 'Usually on Wednesdays for the upcoming weekend.',
      expanded: false
    },
    {
      question: 'Where can I find ticket prices?',
      answer: 'Ticket prices are available in the ticket section or at the cinema.',
      expanded: false
    }
  ];

  toggle(faq: any): void {
    faq.expanded = !faq.expanded;
  }
}
