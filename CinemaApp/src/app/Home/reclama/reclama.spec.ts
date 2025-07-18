import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reclama } from './reclama';

describe('Reclama', () => {
  let component: Reclama;
  let fixture: ComponentFixture<Reclama>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reclama]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reclama);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
