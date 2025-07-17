import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OnInit } from '@angular/core';
import { Film } from '../app-logic/film/film'; 
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilmService } from '../app-logic/film/film-service';

@Component({
  standalone: true, // ✅ definește componenta ca standalone
  selector: 'app-program-cinema',
  templateUrl: './program-cinema.html',
  styleUrls: ['./program-cinema.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  encapsulation: ViewEncapsulation.None
})


export class ProgramCinema implements OnInit {

 // filmeAfisate!: MatTableDataSource<Film>;
 filmeAfisate: Film[] = [];

  constructor(private filmService:FilmService) {
  }

ngOnInit(): void {
  this.filmService.getFilms().subscribe(data => {
    if (data) {
      this.filmeAfisate = data;
      this.filmeCarousel = data;

      // pentru centrarea caruselului
      if (this.filmeCarousel.length < 3) {
        this.currentIndex = Math.floor(this.filmeCarousel.length / 2);
      } else {
        this.currentIndex = 2;
      }
    }
  });
}

  ziSelectata: Date = new Date();
  calendarOpen: boolean = false;


  formate: string[] = ['2D', '3D', 'IMAX', '4DX'];
  formatSelectat: string = '';

  filme: string[] = ['Dune: Part II', 'Inside Out 2', 'Despicable Me 4'];
  filmSelectat: string = '';

  zileSaptamana = this.genereazaZileSaptamana();

  genereazaZileSaptamana() {
  const zile = [];
  const azi = new Date();
  const zileShort = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(azi.getDate() + i);

    const esteAstazi = azi.toDateString() === d.toDateString();

    zile.push({
      eticheta: esteAstazi ? 'Astăzi' : zileShort[d.getDay() === 0 ? 6 : d.getDay() - 1],
      date: d
    });
  }

  return zile;
}


  selecteazaZi(date: Date) {
    this.ziSelectata = date;
    this.calendarOpen = false;
  }

  esteAzi(date: Date): boolean {
    const azi = new Date();
    return azi.toDateString() === date.toDateString();
  }


objectKeys = Object.keys;



getFilmeFiltrate() {
  return this.filmeAfisate.filter(film => {
    //const potrivesteFormat = this.formatSelectat ? film.format === this.formatSelectat : true;
    const potrivesteTitlu = this.filmSelectat ? film.name === this.filmSelectat : true;
    return potrivesteTitlu;
  });
}



resetFiltre() {
  this.formatSelectat = '';
  this.filmSelectat = '';
}


filtruDateValide = (d: Date | null): boolean => {
  if (!d) return false;
  const azi = new Date();
  // Setăm ora la 00:00 pentru comparație corectă
  azi.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  return d >= azi; // permite doar datele de azi sau din viitor
};



filmeCarousel = [
  { name: 'Onward', image: 'onward.jpg' },
  { name: 'Free Guy', image: 'freeguy.jpg' },
  { name: 'Inside Out 2', image: 'insideout2.jpg' },
  { name: 'Despicable Me 4', image: 'despicable4.jpg' },
  { name: 'World War Z', image: 'wwz.jpg' },
  { name: 'Looper', image: 'looper.jpg' },
  { name: 'Smallfoot', image: 'smallfoot.jpg' }
];


// Start de la indexul 2 (al treilea film) pentru a avea spațiu stânga-dreapta
currentIndex = 2;

moveLeft() {
  this.currentIndex =
    (this.currentIndex - 1 + this.filmeCarousel.length) %
    this.filmeCarousel.length;
}

moveRight() {
  this.currentIndex =
    (this.currentIndex + 1) % this.filmeCarousel.length;
}

getVisibleFilme() {
  const total = this.filmeCarousel.length;

  const leftIndex = (this.currentIndex - 1 + total) % total;
  const centerIndex = this.currentIndex % total;
  const rightIndex = (this.currentIndex + 1) % total;

  return [
    this.filmeCarousel[leftIndex],
    this.filmeCarousel[centerIndex],
    this.filmeCarousel[rightIndex],
  ];
}

getStyleForIndex(index: number) {
  const total = this.filmeCarousel.length;
  const offsetRaw = index - this.currentIndex;

  // carusel circular (calculare offset relativ)
  let relativeOffset =
    offsetRaw > total / 2
      ? offsetRaw - total
      : offsetRaw < -total / 2
      ? offsetRaw + total
      : offsetRaw;

  // doar 3 filme vizibile (stânga, centru, dreapta)
  if (Math.abs(relativeOffset) > 1) {
    return {
      transform: `translateX(${relativeOffset * 200}px) scale(0.5)`,
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'all 0.5s ease',
    };
  }

  const translateX = relativeOffset * 440; 
  const rotateY = relativeOffset * 20;
  const scale = relativeOffset === 0 ? 1.15 : 0.95;

  return {
    transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity: 1,
    zIndex: 10 - Math.abs(relativeOffset),
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    willChange: 'transform',
  };
}
}

type ProgramPerFormat = {
  [key: string]: string[];
};

