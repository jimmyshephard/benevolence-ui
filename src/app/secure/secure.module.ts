import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecureRoutingModule } from './secure-routing.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { MemberContributionComponent } from './member-contribution/member-contribution.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';
import { MyPaymentProfilesComponent } from './my-payment-profiles/my-payment-profiles.component';
import { EditPaymentProfileComponent } from './edit-payment-profile/edit-payment-profile.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent, AccountSummaryComponent, MemberContributionComponent,
    MyContributionsComponent, MyPaymentProfilesComponent, EditPaymentProfileComponent],
  imports: [
    CommonModule,
    SecureRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [NavbarComponent]
})
export class SecureModule {
}
