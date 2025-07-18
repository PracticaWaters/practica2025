import { TestBed } from '@angular/core/testing';

import { FormatDtoService } from './format-dto-service';

describe('FormatDtoService', () => {
  let service: FormatDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
