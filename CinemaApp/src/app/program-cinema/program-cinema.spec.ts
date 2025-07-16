import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCinema } from './program-cinema';

describe('ProgramCinema', () => {
  let component: ProgramCinema;
  let fixture: ComponentFixture<ProgramCinema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramCinema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramCinema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
