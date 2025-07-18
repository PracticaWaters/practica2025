import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatList } from './format-list';

describe('FormatList', () => {
  let component: FormatList;
  let fixture: ComponentFixture<FormatList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormatList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
