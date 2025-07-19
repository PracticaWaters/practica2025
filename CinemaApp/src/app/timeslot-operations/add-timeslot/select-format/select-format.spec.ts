import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormat } from './select-format';

describe('SelectFormat', () => {
  let component: SelectFormat;
  let fixture: ComponentFixture<SelectFormat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFormat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFormat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
