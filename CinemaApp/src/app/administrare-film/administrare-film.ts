import { Component } from '@angular/core';
import { FilmDTO } from '../app-logic/film/film-dto';  // ajustează importul după structura ta reală

@Component({
  standalone: false,
  selector: 'app-administrare-film',
  templateUrl: './administrare-film.html',
  styleUrls: ['./administrare-film.css'],
})
export class AdministrareFilm {
  formDeschis = false;

  filme: FilmDTO[] = [
    {
      id: 1,
      name: 'Dune 2',
      actorsIds: [],
      reviewsIds: [],
      image: '/assets/dune2.jpg',
      trailer: 'https://www.youtube.com/watch?v=example1',
      description: 'E dune 2',
      releaseDate: new Date('2025-07-18'),
      ageRating: '12+',
      duration: 180,
      startRunningDate: new Date('2025-07-18'),
      endRunningDate: new Date('2025-08-18'),
      reservation: null,
      whishlist: null
    },
    {
      id: 2,
      name: 'Oppenheimer',
      actorsIds: [],
      reviewsIds: [],
      image: '/assets/oppenheimer.jpg',
      trailer: 'https://www.youtube.com/watch?v=example2',
      description: 'Despre bomba atomică',
      releaseDate: new Date('2025-07-20'),
      ageRating: '16+',
      duration: 150,
      startRunningDate: new Date('2025-07-20'),
      endRunningDate: new Date('2025-08-20'),
      reservation: null,
      whishlist: null
    }
  ];

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
    endRunningDate: new Date()
  };

  toggleForm() {
    this.formDeschis = !this.formDeschis;
  }

  adaugaFilm() {
  const newId = this.filme.length + 1;

  const filmToAdd: FilmDTO = {
    ...this.filmNou as FilmDTO,
    id: newId,
    actorsIds: [],
    reviewsIds: [],
    reservation: null,
    whishlist: null
  };

  this.filme.push(filmToAdd);


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
    endRunningDate: new Date()
  };

  this.formDeschis = false;
}

  editeazaFilm(film: FilmDTO) {
    alert(`Funcționalitatea de editare pentru "${film.name}" urmează să fie implementată.`);
  }

  stergeFilm(id: number) {
    this.filme = this.filme.filter(f => f.id !== id);
  }
}
