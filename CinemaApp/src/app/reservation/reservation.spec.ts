import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservation } from './reservation';

describe('Reservation', () => {
  let component: Reservation;
  let fixture: ComponentFixture<Reservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reservation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
