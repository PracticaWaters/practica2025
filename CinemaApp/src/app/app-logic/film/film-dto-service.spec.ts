import { TestBed } from '@angular/core/testing';

import { FilmDtoService } from './film-dto-service';

describe('FilmDtoService', () => {
  let service: FilmDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
