import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizareFilm } from './vizualizare-film';

describe('VizualizareFilm', () => {
  let component: VizualizareFilm;
  let fixture: ComponentFixture<VizualizareFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VizualizareFilm],
    }).compileComponents();

    fixture = TestBed.createComponent(VizualizareFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
