import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPage } from './support-page';

describe('SupportPage', () => {
  let component: SupportPage;
  let fixture: ComponentFixture<SupportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
