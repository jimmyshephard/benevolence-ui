import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { MemberContributionComponent } from './member-contribution/member-contribution.component';
import { YearOptionsResolver } from '../shared/year-options.resolver';
import { CustomerProfileResolver } from '../shared/customer-proflile.resolver';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';
import { MyPaymentProfilesComponent } from './my-payment-profiles/my-payment-profiles.component';
import { TxDescriptionResolver } from '../shared/tx-description.resolver';


const routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'make-contribution',
        component: MemberContributionComponent,
        resolve: {yearOptions: YearOptionsResolver, customerProfile: CustomerProfileResolver, txDescriptions: TxDescriptionResolver },
      },
      {
        path: 'my-contributions',
        component: MyContributionsComponent
      },
      {
        path: 'my-payment-profiles',
        component: MyPaymentProfilesComponent,
        resolve: {yearOptions: YearOptionsResolver, customerProfile: CustomerProfileResolver, txDescriptions: TxDescriptionResolver}
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
export class SecureRoutingModule {
}
