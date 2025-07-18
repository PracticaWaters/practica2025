import { Component, ViewEncapsulation } from '@angular/core';
import { ReviewDtoService } from '../app-logic/review-dto/review-dto-service';
import { ReviewDto } from '../app-logic/review-dto/review-dto-model';

@Component({
  standalone: false,
  selector: 'app-vizualizare-film',
  templateUrl: './vizualizare-film.html',
  styleUrls: ['./vizualizare-film.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VizualizareFilm {
  selectedRating: number = 0;
  hoverRating: number = 0;
  reviewText: string = '';
  reviewSubmitted: boolean = false;

  isWishlisted: boolean = false;

  // Returnează stelele pentru afișare
  //harcode filmId
  filmId: number = 1;

  constructor(private reviewService: ReviewDtoService) {}

  get displayedStars(): string[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (this.hoverRating > 0) return i < this.hoverRating ? '★' : '☆';
      return i < this.selectedRating ? '★' : '☆';
    });
  }

  // Stele hover
  onStarEnter(index: number): void {
    this.hoverRating = index + 1;
  }

  onStarLeave(): void {
    this.hoverRating = 0;
  }

  onStarClick(index: number): void {
    this.selectedRating = index + 1;
  }

  onTextChange(value: string): void {
    this.reviewText = value;
  }

  submitReview(): void {
    if (this.selectedRating === 0 || this.reviewText.trim() === '') {
      alert('Te rugăm să oferi un rating și să scrii un comentariu.');
      return;
    }

    const reviewDto: ReviewDto = {
      id: 0,
      rating: this.selectedRating,
      date: new Date(),
      comment: this.reviewText.trim(),
      filmId: this.filmId,
    };

    this.reviewService.addReview(reviewDto);

    this.reviewSubmitted = true;

    this.selectedRating = 0;
    this.reviewText = '';
    this.hoverRating = 0;
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;

    console.log(
      this.isWishlisted
        ? 'Film adăugat la wishlist'
        : 'Film eliminat din wishlist'
    );
  }
}
