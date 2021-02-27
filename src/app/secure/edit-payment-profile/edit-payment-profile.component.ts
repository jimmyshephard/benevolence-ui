import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlatPaymentProfile } from '../member-contribution/customerProfile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { months } from '../../shared/models/months';
import { states } from '../../shared/models/states';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerProfileService } from '../member-contribution/customer-profile.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { snackBarConfig } from '../../shared/snackbar.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-payment-profile',
  templateUrl: './edit-payment-profile.component.html',
  styleUrls: ['./edit-payment-profile.component.scss']
})
export class EditPaymentProfileComponent implements OnInit {

  editPaymentProfileForm: FormGroup;
  user: any;
  monthList = months;
  yearOptions: string [];
  paymentProfile: FlatPaymentProfile;
  states = states;
  busy: boolean;
  error: string;

  constructor(
    public dialogRef: MatDialogRef<EditPaymentProfileComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerProfileService: CustomerProfileService,
    private router: Router,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.yearOptions = this.data.yearOptions;
    this.paymentProfile = this.data.paymentProfile;

    this.auth.user$.subscribe(usr => {
      this.user = usr;
      console.log(usr);
      this.editPaymentProfileForm.patchValue({
        firstname: usr.given_name,
        lastname: usr.family_name,
      });

    });
  }

  private buildForm(): void {
    // "cardnumber": "378734493671000",
    //   "firstname": "Derick",
    //   "lastname": "Bossman",
    //   "zip": "78653",
    //   "cardcode": "041",
    //   "expirationdate": "052023",
    //   "setDefault": true,
    //   "address": "2411 Metric Blvd",
    //   "city": "Austin",
    //   "state": "TX",
    //   "customerProfileId": "1929955907",
    //   "phonenumber": "5129874534",

    this.editPaymentProfileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.min(2)]],
      lastname: ['', Validators.required],
      zip: ['', [Validators.required, Validators.maxLength(10)]],
      cardnumber: ['', [Validators.required, Validators.maxLength(20)]],
      setDefault: [''],
      address: ['', [Validators.required]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      cardcode: ['', [Validators.required, Validators.maxLength(4)]],
      expiry_month: ['', Validators.required],
      expiry_year: ['', Validators.required],
    });
  }

  submit(): void {

    this.error = '';
    this.busy = true;

    const data = Object.assign({
      customerProfileId: this.paymentProfile.customerProfileId,
      customerPaymentProfileId: this.paymentProfile.customerPaymentProfileId
    }, this.editPaymentProfileForm.value);

    // console.log(String(5).padStart(2, '0'));

    data.expirationdate = String(data.expiry_month).padStart(2, '0') + data.expiry_year;

    this.customerProfileService
      .editCustomerProfile(data)
      .pipe(
        catchError(err => {
          console.error(err);
          this.busy = false;
          this.error = typeof err === 'string' ? err :
            err.error && err.error.message ? err.error.message : 'An error occurred, please try again';
          return EMPTY;
        })
      )
      .subscribe((resp) => {
        this.busy = false;
        this.snackBar.open(resp?.message || 'Customer profile has been updated', 'Done', snackBarConfig)
          .afterDismissed()
          .subscribe(() => {
            this.editPaymentProfileForm.reset();
            this.busy = false;
            this.dialogRef.close();
            this.router.navigate(['/secure/dashboard/my-payment-profiles']);
          });
      });
  }

}
