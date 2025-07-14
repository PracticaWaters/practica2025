import { TestBed } from '@angular/core/testing';

import { ScreeningRoomListMock } from './screening-room-list-mock';

describe('ScreeningRoomList', () => {
  let service: ScreeningRoomListMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreeningRoomListMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});