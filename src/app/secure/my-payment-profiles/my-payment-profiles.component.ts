import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerProfile, FlatPaymentProfile, PaymentProfile } from '../member-contribution/customerProfile';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditPaymentProfileComponent } from '../edit-payment-profile/edit-payment-profile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValueUnavailableKind } from '@angular/compiler-cli/src/ngtsc/reflection';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CustomerProfileService } from '../member-contribution/customer-profile.service';

@Component({
  selector: 'app-my-payment-profiles',
  templateUrl: './my-payment-profiles.component.html',
  styleUrls: ['./my-payment-profiles.component.scss']
})
export class MyPaymentProfilesComponent implements OnInit {

  customerProfile: CustomerProfile;
  paymentProfiles: FlatPaymentProfile[];
  displayedColumns: string[] = ['cardNumber', 'expirationDate', 'cardType', 'customerPaymentProfileId', 'actions'];
  dataSource: MatTableDataSource<FlatPaymentProfile>;
  yearOptions: number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.customerProfile = this.route.snapshot.data.customerProfile;
    this.prepPaymentProfiles();
    this.dataSource = new MatTableDataSource(this.paymentProfiles);
    this.dataSource.paginator = this.paginator;
    this.yearOptions = this.route.snapshot.data.yearOptions;
  }

  prepPaymentProfiles(): void {
    if (!this.customerProfile.paymentProfiles.length) {
      return;
    }
    this.paymentProfiles = this.customerProfile.paymentProfiles.map(profile => {
      return {
        cardNumber: profile.payment.creditCard.cardNumber,
        expirationDate: profile.payment.creditCard.expirationDate,
        cardType: profile.payment.creditCard.cardType,
        customerProfileId: this.customerProfile.customerProfileId,
        customerPaymentProfileId: profile.customerPaymentProfileId
      };
    });
  }

  edit(paymentProfile: PaymentProfile): void {
    const dialogRef = this.dialog.open(EditPaymentProfileComponent, {
      width: '800px',
      height: '800px',
      disableClose: true,
      data: {paymentProfile, yearOptions: this.yearOptions}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
