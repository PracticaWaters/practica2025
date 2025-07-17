import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bilete } from './bilete';

describe('Bilete', () => {
  let component: Bilete;
  let fixture: ComponentFixture<Bilete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bilete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bilete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
