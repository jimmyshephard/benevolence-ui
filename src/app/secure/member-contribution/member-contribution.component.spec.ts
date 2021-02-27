import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContributionComponent } from './member-contribution.component';

describe('MemberDonationComponent', () => {
  let component: MemberContributionComponent;
  let fixture: ComponentFixture<MemberContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
