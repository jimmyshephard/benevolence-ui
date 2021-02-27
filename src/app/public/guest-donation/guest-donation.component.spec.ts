import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDonationComponent } from './guest-donation.component';

describe('GuestDonationComponent', () => {
  let component: GuestDonationComponent;
  let fixture: ComponentFixture<GuestDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
