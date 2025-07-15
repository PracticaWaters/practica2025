import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone : false,
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

  // Pentru a afișa stelele: pline sau goale în funcție de hover sau rating
  get displayedStars(): string[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (this.hoverRating > 0) return i < this.hoverRating ? '★' : '☆';
      return i < this.selectedRating ? '★' : '☆';
    });
  }

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

    this.reviewSubmitted = true;

    // Resetează formularul
    this.selectedRating = 0;
    this.reviewText = '';
    this.hoverRating = 0;
  }
}
