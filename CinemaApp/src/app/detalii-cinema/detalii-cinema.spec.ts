import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliiCinema } from './detalii-cinema';

describe('DetaliiCinema', () => {
  let component: DetaliiCinema;
  let fixture: ComponentFixture<DetaliiCinema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaliiCinema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaliiCinema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
