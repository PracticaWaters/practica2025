import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningRoom } from './screening-room';

describe('ScreeningRoom', () => {
  let component: ScreeningRoom;
  let fixture: ComponentFixture<ScreeningRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreeningRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
