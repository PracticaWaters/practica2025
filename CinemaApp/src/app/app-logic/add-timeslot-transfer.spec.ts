import { TestBed } from '@angular/core/testing';

import { AddTimeslotTransfer } from './add-timeslot-transfer';

describe('AddTimeslotTransfer', () => {
  let service: AddTimeslotTransfer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTimeslotTransfer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
