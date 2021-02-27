import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentProfileComponent } from './edit-payment-profile.component';

describe('EditPaymentProfileComponent', () => {
  let component: EditPaymentProfileComponent;
  let fixture: ComponentFixture<EditPaymentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
