import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreqQuestions } from './freq-questions';

describe('FreqQuestions', () => {
  let component: FreqQuestions;
  let fixture: ComponentFixture<FreqQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreqQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreqQuestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
