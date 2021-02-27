import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { GuestDonationComponent } from './guest-donation/guest-donation.component';
import { YearOptionsResolver } from '../shared/year-options.resolver';
import { LayoutComponent } from './layout/layout.component';


const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
      },
      {
        path: 'landing',
        component: LandingComponent
      },
      {
        path: 'guest',
        resolve: {yearOptions: YearOptionsResolver},
        component: GuestDonationComponent
      }
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
