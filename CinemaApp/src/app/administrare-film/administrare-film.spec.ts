import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareFilm } from './administrare-film';

describe('AdministrareFilm', () => {
  let component: AdministrareFilm;
  let fixture: ComponentFixture<AdministrareFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrareFilm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrareFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
