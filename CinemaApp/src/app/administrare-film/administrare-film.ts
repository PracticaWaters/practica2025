import { Component, OnInit } from '@angular/core';
import { FilmDTO } from '../app-logic/film/film-dto';  
import { FilmDtoService } from '../app-logic/film/film-dto-service'; 


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
    next: (data: FilmDTO[]) => {
      this.filme = data;
    },
    error: (err: any) => {
      console.error('Eroare la preluarea filmelor:', err);
    }
  });
}

  filme: FilmDTO[] = [];

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

constructor(private filmService: FilmDtoService) {}


  toggleForm() {
    this.formDeschis = !this.formDeschis;
  }

 adaugaFilm() {
  const newFilm: FilmDTO = {
    ...this.filmNou as FilmDTO,
    id: 0, 
    actorsIds: [],
    reviewsIds: [],
    reservation: null,
    whishlist: null
  };

  this.filmService.addFilm(newFilm).subscribe({
  next: (createdFilm: FilmDTO) => {
    console.log('Filmul a fost adăugat:', createdFilm);
    this.filme.push(createdFilm);
    this.resetForm();
  },
  error: (err: any) => {
    console.error('Eroare la adăugare film:', err);
  }
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
