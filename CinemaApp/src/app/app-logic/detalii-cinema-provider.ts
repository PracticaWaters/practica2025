import { Injectable } from '@angular/core';
import { DetaliiCinemaData } from './detalii-cinema-data';

@Injectable({
  providedIn: 'root'
})
export class DetaliiCinemaProvider {
  provideData=<DetaliiCinemaData>{
        name:'Liquid Cinema',
        aboutus:'Liquid Cinema este unul dintre cele mai moderne cinematografe din oraș, oferind o experiență cinematografică de înaltă calitate cu cele mai noi filme și tehnologii de proiecție.',
    email:'liquidcinema@waters.ro',
    address:' Str. Turnului, nr. 5, Brasov',
    programweek:'12:00-00:00',
    programweekend:'10:00-00:00',
    programsarbatori:'12:00-22:00',
    phone:'0712345678',
    website:'www.liquidcinema.ro',

}
  
  
  constructor() { 
  }
getData():DetaliiCinemaData{return this.provideData}

}