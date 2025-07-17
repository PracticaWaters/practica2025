import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniuPrincipal } from './meniu-principal';

describe('MeniuPrincipal', () => {
  let component: MeniuPrincipal;
  let fixture: ComponentFixture<MeniuPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeniuPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeniuPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
