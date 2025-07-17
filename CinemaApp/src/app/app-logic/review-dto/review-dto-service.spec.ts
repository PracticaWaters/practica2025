import { TestBed } from '@angular/core/testing';

import { ReviewDtoService } from './review-dto-service';

describe('ReviewDtoService', () => {
  let service: ReviewDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
