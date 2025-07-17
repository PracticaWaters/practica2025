import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewModel } from './review-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:25867/api/cinema/review';

  constructor(private httpClient: HttpClient) {}

  // getReviews(): Observable<ReviewModel[]> {
  //   return this.httpClient.get<ReviewModel[]>(this.apiUrl);
  // }

  getReviews(): Observable<ReviewModel[]> {
  return this.httpClient.get<any[]>(this.apiUrl).pipe(
    // Prelucrează fiecare review pentru a păstra doar câmpurile relevante
    map(reviews => reviews.map(r => ({
      id: r.id,
      rating: r.rating,
      date: new Date(r.date),
      comment: r.comment,
      // Hardcodăm userul cu un nume, dacă nu avem modelul User
      user: { name: 'UserTest' },
      // Ignorăm filmul complet sau îl poți pune null
      film: null
    })))
  );
}

  getReviewById(id: number): Observable<ReviewModel> {
    return this.httpClient.get<ReviewModel>(`${this.apiUrl}/${id}`);
  }

  updateReview(review: ReviewModel): void {
    this.httpClient.put<ReviewModel>(this.apiUrl, review).subscribe((data) => {
      console.log('Review actualizat:', data);
    });
  }

  deleteReview(review: ReviewModel): void {
    this.httpClient
      .request('delete', this.apiUrl, { body: review })
      .subscribe((data) => {
        console.log('Review șters:', data);
      });
  }
}
