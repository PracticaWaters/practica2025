import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeslot } from './add-timeslot';

describe('AddTimeslot', () => {
  let component: AddTimeslot;
  let fixture: ComponentFixture<AddTimeslot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTimeslot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimeslot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
