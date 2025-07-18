import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiiAdd } from './promotii-add';

describe('PromotiiAdd', () => {
  let component: PromotiiAdd;
  let fixture: ComponentFixture<PromotiiAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotiiAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotiiAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
