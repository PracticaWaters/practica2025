import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Setari } from './setari';

describe('Setari', () => {
  let component: Setari;
  let fixture: ComponentFixture<Setari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Setari]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Setari);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
