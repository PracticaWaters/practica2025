import { Component, OnInit } from '@angular/core';
import { FilmDTO } from '../app-logic/film/film-dto';
import { FilmDtoService } from '../app-logic/film/film-dto-service';
import { Film } from '../app-logic/film/film';
import { FilmService } from '../app-logic/film/film-service';

@Component({
  standalone: false,
  selector: 'app-administrare-film',
  templateUrl: './administrare-film.html',
  styleUrls: ['./administrare-film.css'],
})
export class AdministrareFilm implements OnInit {
  formDeschis = false;

  ngOnInit() {
    this.filmService.getFilms().subscribe({
      next: (data: Film[]) => {
        this.filme = data.map((film) => this.convertFilmToDto(film));
      },
      error: (err: any) => {
        console.error('Eroare la preluarea filmelor:', err);
      },
    });
  }

  filme: FilmDTO[] = [];
filmEditatId: number | null = null;
filmEditat: Partial<FilmDTO> = {};

  filmNou: Partial<FilmDTO> = {
    name: '',
    actorsIds: [],
    reviewsIds: [],
    image: '',
    trailer: '',
    description: '',
    releaseDate: new Date(),
    ageRating: '',
    duration: 0,
    startRunningDate: new Date(),
    endRunningDate: new Date(),
  };

  constructor(
    private filmDtoService: FilmDtoService,
    private filmService: FilmService
  ) {}

  toggleForm() {
    this.formDeschis = !this.formDeschis;
  }

  adaugaFilm() {
    const newFilm: FilmDTO = {
      ...(this.filmNou as FilmDTO),
      id: 0,
      actorsIds: [],
      reviewsIds: [],
      reservation: null,
      whishlist: null,
    };

    this.filmDtoService.addFilm(newFilm).subscribe({
      next: (createdFilm: FilmDTO) => {
        console.log('Filmul a fost adăugat:', createdFilm);
        this.filme.push(createdFilm);
        this.resetForm();
      },
      error: (err: any) => {
        console.error('Eroare la adăugare film:', err);
      },
    });
  }

  resetForm() {
    this.filmNou = {
      name: '',
      actorsIds: [],
      reviewsIds: [],
      image: '',
      trailer: '',
      description: '',
      releaseDate: new Date(),
      ageRating: '',
      duration: 0,
      startRunningDate: new Date(),
      endRunningDate: new Date(),
    };
    this.formDeschis = false;
  }

editeazaFilm(film: FilmDTO) {
  this.filmEditatId = film.id;

  this.filmEditat = {
    id: film.id,
    name: film.name,
    actorsIds: [...(film.actorsIds || [])],
    reviewsIds: [...(film.reviewsIds || [])],
    image: film.image,
    trailer: film.trailer,
    description: film.description,
    releaseDate: film.releaseDate,
    ageRating: film.ageRating,
    duration: film.duration,
    startRunningDate: film.startRunningDate,
    endRunningDate: film.endRunningDate,
    reservation: film.reservation,
    whishlist: film.whishlist
  };
}

salveazaFilmEditat() {
  if (!this.filmEditatId) {
    console.error('Nu există film selectat pentru editare.');
    return;
  }

  const updatedFilm: FilmDTO = {
    ...this.filmEditat as FilmDTO
  };

  this.filmService.updateFilm(this.convertDtoToFilm(updatedFilm)).subscribe({
    next: () => {
      console.log(`Filmul a fost salvat.`);

      const index = this.filme.findIndex(f => f.id === updatedFilm.id);
      if (index !== -1) {
        this.filme[index] = { ...updatedFilm };
      } else {
        console.warn('Film editat nu a fost găsit în lista locală.');
      }

      // Pop-up de confirmare
      window.alert(`Filmul "${updatedFilm.name}" a fost salvat cu succes!`);

      // Închide formularul de editare
      this.filmEditatId = null;
      this.filmEditat = {};
    },
    error: (err) => {
      console.error('Eroare la salvare film:', err);
      window.alert('A apărut o eroare la salvarea filmului.');
    }
  });
}


  stergeFilm(id: number) {
    this.filmService.deleteFilm(id).subscribe({
      next: () => {
        console.log(`Filmul cu id ${id} a fost șters.`);
        this.filme = this.filme.filter((f) => f.id !== id);
      },
      error: (err: any) => {
        console.error('Eroare la ștergere film:', err);
      },
    });
  }

  convertDtoToFilm(filmDto: FilmDTO): Film {
    return {
      id: filmDto.id,
      name: filmDto.name,
      actors: [],
      reviews: [],
      image: filmDto.image,
      trailer: filmDto.trailer,
      description: filmDto.description,
      releaseDate: filmDto.releaseDate,
      ageRating: filmDto.ageRating,
      duration: filmDto.duration,
      startRunningDate: filmDto.startRunningDate,
      endRunningDate: filmDto.endRunningDate,
      reservation: filmDto.reservation,
      whishlist: filmDto.whishlist,
    };
  }

  convertFilmToDto(film: Film): FilmDTO {
    return {
      id: film.id,
      name: film.name,
      actorsIds: film.actors ? film.actors.map((actor) => actor.id) : [],
      reviewsIds: film.reviews ? film.reviews.map((review) => review.id) : [],

      image: film.image,
      trailer: film.trailer,
      description: film.description,
      releaseDate: film.releaseDate,
      ageRating: film.ageRating,
      duration: film.duration,
      startRunningDate: film.startRunningDate,
      endRunningDate: film.endRunningDate,
      reservation: film.reservation,
      whishlist: film.whishlist,
    };
  }
}
