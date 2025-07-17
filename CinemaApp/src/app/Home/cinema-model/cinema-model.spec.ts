import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaModel } from './cinema-model';

describe('CinemaModel', () => {
  let component: CinemaModel;
  let fixture: ComponentFixture<CinemaModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CinemaModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
