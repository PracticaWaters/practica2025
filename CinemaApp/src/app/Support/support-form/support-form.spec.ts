import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportForm } from './support-form';

describe('SupportForm', () => {
  let component: SupportForm;
  let fixture: ComponentFixture<SupportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
