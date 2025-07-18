import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-administrare-film',
  templateUrl: './administrare-film.html',
  styleUrls: ['./administrare-film.css'],
})
export class AdministrareFilm {
  formDeschis = false;

  filme = [
    { id: 1, titlu: 'Dune 2', descriere: 'E dune 2', durata: '3h', imagine: '/assets/dune2.jpg' },
    { id: 2, titlu: 'Oppenheimer', descriere: 'Despre bomba atomică', durata: '2h 30m', imagine: '/assets/oppenheimer.jpg' },
  ];

  filmNou = { titlu: '', descriere: '', durata: '', imagine: '' };

  toggleForm() {
    this.formDeschis = !this.formDeschis;
  }

  adaugaFilm() {
    const newId = this.filme.length + 1;
    this.filme.push({ id: newId, ...this.filmNou });
    this.filmNou = { titlu: '', descriere: '', durata: '', imagine: '' };
    this.formDeschis = false; // opțional: închide formularul după adăugare
  }

  editeazaFilm(film: any) {
    alert(`Funcționalitatea de editare pentru "${film.titlu}" urmează să fie implementată.`);
  }

  stergeFilm(id: number) {
    this.filme = this.filme.filter(f => f.id !== id);
  }
}
