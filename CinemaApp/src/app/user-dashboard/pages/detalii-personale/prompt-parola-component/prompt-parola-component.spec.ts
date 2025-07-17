import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptParolaComponent } from './prompt-parola-component';

describe('PromptParolaComponent', () => {
  let component: PromptParolaComponent;
  let fixture: ComponentFixture<PromptParolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptParolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptParolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
