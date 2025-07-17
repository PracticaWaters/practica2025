import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewDto } from './review-dto-model';

@Injectable({
  providedIn: 'root',
})
export class ReviewDtoService {
  private apiUrl = 'https://localhost:25867/api/cinema/review';

  constructor(private httpClient: HttpClient) {}

  addReview(reviewDto: ReviewDto): void {
    this.httpClient
      .post<ReviewDto>(this.apiUrl, reviewDto)
      .subscribe((data) => {
        console.log('Review adăugat:', data);
      });
  }
}
