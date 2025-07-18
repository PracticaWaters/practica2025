import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Promotii } from './promotii';

describe('Promotii', () => {
  let component: Promotii;
  let fixture: ComponentFixture<Promotii>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Promotii]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Promotii);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
