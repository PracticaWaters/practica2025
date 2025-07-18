import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ReviewDtoService } from '../app-logic/review-dto/review-dto-service';
import { ReviewDto } from '../app-logic/review-dto/review-dto-model';
import { ReviewModel } from '../app-logic/review/review-model';
import { ReviewService } from '../app-logic/review/review-service';

@Component({
  standalone: false,
  selector: 'app-vizualizare-film',
  templateUrl: './vizualizare-film.html',
  styleUrls: ['./vizualizare-film.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VizualizareFilm implements OnInit {
  // ⭐ Rating / Review
  selectedRating: number = 0;
  hoverRating: number = 0;
  reviewText: string = '';
  reviewSubmitted: boolean = false;

  reviews: ReviewModel[] = [];

  // ❤️ Wishlist
  isWishlisted: boolean = false;

  // Returnează stelele pentru afișare
  //harcode filmId and userId
  filmId: number = 1;
  userId: number = 2;

  constructor(
    private reviewDtoService: ReviewDtoService,
    private reviewService: ReviewService
  ) {}

  get displayedStars(): string[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (this.hoverRating > 0) return i < this.hoverRating ? '★' : '☆';
      return i < this.selectedRating ? '★' : '☆';
    });
  }

  ngOnInit(): void {
    this.loadReviews();
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
      userId: this.userId,
    };

    this.reviewDtoService.addReview(reviewDto);

    this.reviewSubmitted = true;

    // Resetare formular după submit
    this.selectedRating = 0;
    this.reviewText = '';
    this.hoverRating = 0;

    setTimeout(() => {
      this.loadReviews();
    }, 300);
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe((data) => {
      this.reviews = data;
    });
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

  @ViewChild('reviewsContainer', { static: false }) reviewsContainer!: ElementRef;

scrollReviews(direction: 'left' | 'right') {
  const container = this.reviewsContainer.nativeElement as HTMLElement;
  const scrollAmount = 320 + 24; // lățimea cardului + spațiere

  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}


}
