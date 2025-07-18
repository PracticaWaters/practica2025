import { Injectable } from '@angular/core';
import { PromoData } from './promo-data';

@Injectable({
  providedIn: 'root'
})
export class PromoProvider {
  getPromos(): PromoData[] {
    return [
      {
        id: 1,
        title: 'LIQUIDARE DE STOC',
        description: 'Rezerva un bilet la filmul Despicable Me 4 si primesti o jucarie GRATIS cu personajul tau preferat',
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-31'),
        discountPercentage: 0,
        films: [],
        images: ['/assets/promotii/img1.jpg']
      },
      {
        id: 2,
        title: 'SUPERWEEKEND',
        description: 'Doar in weekend poti beneficia de o SUPER reducere de 25% la TOATE filmele disponibile in program',
        startDate: new Date('2025-07-1'),
        endDate: new Date('2025-07-31'),
        discountPercentage: 25,
        films: [],
        images: ['/assets/promotii/img2.jpg']
      },
      {
        id: 3,
        title: 'BENEFICIAZA ACUM',
        description: 'Ai 10% EXTRA reducere la filmul Dune: Part Two',
        startDate: new Date('2025-07-1'),
        endDate: new Date('2025-07-31'),
        discountPercentage: 10,
        films: [],
        images: ['/assets/promotii/img3.jpg']
      }
    ];
  }
}
