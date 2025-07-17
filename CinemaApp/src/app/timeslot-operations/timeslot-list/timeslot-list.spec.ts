import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotList } from './timeslot-list';

describe('TimeslotList', () => {
  let component: TimeslotList;
  let fixture: ComponentFixture<TimeslotList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeslotList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeslotList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
