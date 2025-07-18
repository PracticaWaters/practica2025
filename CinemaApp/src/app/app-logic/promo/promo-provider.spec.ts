import { TestBed } from '@angular/core/testing';

import { PromoProvider } from './promo-provider';

describe('PromoProvider', () => {
  let service: PromoProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
