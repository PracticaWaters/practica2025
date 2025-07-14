import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreeningRoom } from './add-screening-room';

describe('AddScreeningRoom', () => {
  let component: AddScreeningRoom;
  let fixture: ComponentFixture<AddScreeningRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddScreeningRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScreeningRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
