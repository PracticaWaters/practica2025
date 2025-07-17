import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliiPersonale } from './detalii-personale';

describe('DetaliiPersonale', () => {
  let component: DetaliiPersonale;
  let fixture: ComponentFixture<DetaliiPersonale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaliiPersonale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaliiPersonale);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
