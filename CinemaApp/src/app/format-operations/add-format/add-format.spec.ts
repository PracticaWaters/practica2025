import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormat } from './add-format';

describe('AddFormat', () => {
  let component: AddFormat;
  let fixture: ComponentFixture<AddFormat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFormat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
