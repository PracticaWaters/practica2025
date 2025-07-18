import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewModel } from './review-model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:25867/api/cinema/review';

  constructor(private httpClient: HttpClient) {}

  getReviews(): Observable<ReviewModel[]> {
    return this.httpClient.get<ReviewModel[]>(this.apiUrl);
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
