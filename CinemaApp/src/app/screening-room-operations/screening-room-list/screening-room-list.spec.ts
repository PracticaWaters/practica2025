import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningRoomList } from './screening-room-list';

describe('ScreeningRoomList', () => {
  let component: ScreeningRoomList;
  let fixture: ComponentFixture<ScreeningRoomList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreeningRoomList],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreeningRoomList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
