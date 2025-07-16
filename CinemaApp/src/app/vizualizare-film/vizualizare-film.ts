import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-vizualizare-film',
  templateUrl: './vizualizare-film.html',
  styleUrls: ['./vizualizare-film.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VizualizareFilm {
  // ⭐ Rating / Review
  selectedRating: number = 0;
  hoverRating: number = 0;
  reviewText: string = '';
  reviewSubmitted: boolean = false;

  // ❤️ Wishlist
  isWishlisted: boolean = false;

  // Returnează stelele pentru afișare
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

    this.reviewSubmitted = true;

    // Resetare formular după submit
    this.selectedRating = 0;
    this.reviewText = '';
    this.hoverRating = 0;
  }

  // 🔴❤️ Toggle Wishlist
  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;

    // TODO: Trimite cerere către baza de date aici
    console.log(
      this.isWishlisted
        ? 'Film adăugat la wishlist'
        : 'Film eliminat din wishlist'
    );
  }
}
