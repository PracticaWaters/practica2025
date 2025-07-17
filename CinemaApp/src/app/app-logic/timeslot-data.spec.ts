import { TestBed } from '@angular/core/testing';

import { TimeslotData } from './timeslot-data';

describe('TimeslotData', () => {
  let service: TimeslotData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeslotData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
