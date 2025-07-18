import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiiList } from './promotii-list';

describe('PromotiiList', () => {
  let component: PromotiiList;
  let fixture: ComponentFixture<PromotiiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotiiList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotiiList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
