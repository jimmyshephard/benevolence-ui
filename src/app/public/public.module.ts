import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { PublicRoutingModule } from './public-routing.module';
import { GuestDonationComponent } from './guest-donation/guest-donation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { SecureModule } from '../secure/secure.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [LandingComponent, GuestDonationComponent, LayoutComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SecureModule,
    SharedModule
  ]
})
export class PublicModule { }
