import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Film } from '../film';
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
export class ProgramCinema implements OnInit{

  filmeAfisate:Film = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe((data: Film[]) => {
      this.filmeAfisate = data;
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
  return this.filmeAfisate['filter']((film: { format: string; titlu: string; }) => {
    const potrivesteFormat = this.formatSelectat ? film.format === this.formatSelectat : true;
    const potrivesteTitlu = this.filmSelectat ? film.titlu === this.filmSelectat : true;
    return potrivesteFormat && potrivesteTitlu;
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
  { titlu: 'Onward', poster: 'onward.jpg' },
  { titlu: 'Free Guy', poster: 'freeguy.jpg' },
  { titlu: 'Inside Out 2', poster: 'insideout2.jpg' },
  { titlu: 'Despicable Me 4', poster: 'despicable4.jpg' },
  { titlu: 'World War Z', poster: 'wwz.jpg' },
  { titlu: 'Looper', poster: 'looper.jpg' },
  { titlu: 'Smallfoot', poster: 'smallfoot.jpg' }
];

// Start de la indexul 2 (al treilea film) pentru a avea spațiu stânga-dreapta
currentIndex = 2;

moveLeft() {
  if (this.currentIndex > 1) {
    this.currentIndex--;
  }
}

moveRight() {
  if (this.currentIndex < this.filmeCarousel.length - 2) {
    this.currentIndex++;
  }
}

getVisibleFilme() {
  // Returnează mereu 3 filme: [stanga, centru, dreapta]
  return this.filmeCarousel.slice(this.currentIndex - 1, this.currentIndex + 2);
}

getStyleForIndex(index: number) {
  const offset = index - this.currentIndex;

  // Filme în afara celor 3: ascunse
  if (Math.abs(offset) > 1) {
    return {
      transform: 'scale(0) translateX(0px)',
      opacity: 0,
      pointerEvents: 'none',
    };
  }

  // Filmele vizibile: poziționate 3D
  const translateX = offset * 130; 
  const rotateY = offset * 20;   
  const scale = offset === 0 ? 1.15 : 0.95;

  return {
    transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
    zIndex: 10 - Math.abs(offset),
    opacity: 1,
  };
}





}
type ProgramPerFormat = {
  [key: string]: string[];
};


