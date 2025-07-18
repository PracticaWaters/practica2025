import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMovie } from './select-movie';

describe('SelectMovie', () => {
  let component: SelectMovie;
  let fixture: ComponentFixture<SelectMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
