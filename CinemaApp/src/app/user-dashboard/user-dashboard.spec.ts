import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboard } from './user-dashboard';

describe('UserDashboard', () => {
  let component: UserDashboard;
  let fixture: ComponentFixture<UserDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
