import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDialog } from './qr-dialog';

describe('QrDialog', () => {
  let component: QrDialog;
  let fixture: ComponentFixture<QrDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
