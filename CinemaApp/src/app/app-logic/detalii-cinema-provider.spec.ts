import { TestBed } from '@angular/core/testing';

import { DetaliiCinemaProvider } from './detalii-cinema-provider';

describe('DetaliiCinemaProvider', () => {
  let service: DetaliiCinemaProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetaliiCinemaProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
