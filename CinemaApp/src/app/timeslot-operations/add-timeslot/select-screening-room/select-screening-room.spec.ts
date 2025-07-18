import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScreeningRoom } from './select-screening-room';

describe('SelectScreeningRoom', () => {
  let component: SelectScreeningRoom;
  let fixture: ComponentFixture<SelectScreeningRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectScreeningRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectScreeningRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
