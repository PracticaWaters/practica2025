import { Component, OnDestroy, OnInit } from '@angular/core';
import { PromoProvider } from '../app-logic/promo/promo-provider';
import { PromoData } from '../app-logic/promo/promo-data';

@Component({
  selector: 'app-promotii',
  standalone: false,
  templateUrl: './promotii.html',
  styleUrl: './promotii.css'
})
export class Promotii implements OnInit, OnDestroy {
   slides: PromoData[] = [];
  currentIndex = 0;
  autoSlideInterval: any;

  constructor(private promoProvider: PromoProvider) {}

  ngOnInit() {
    this.slides = this.promoProvider.getPromos();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    // Clean up the interval on component destroy
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 seconds
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
