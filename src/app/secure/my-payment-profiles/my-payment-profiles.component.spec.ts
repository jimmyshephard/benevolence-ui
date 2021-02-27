import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaymentProfilesComponent } from './my-payment-profiles.component';

describe('MyPaymentProfilesComponent', () => {
  let component: MyPaymentProfilesComponent;
  let fixture: ComponentFixture<MyPaymentProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPaymentProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPaymentProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
