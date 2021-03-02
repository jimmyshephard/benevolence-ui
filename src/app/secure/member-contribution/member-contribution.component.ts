import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerProfileService } from './customer-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { months } from '../../shared/models/months';
import { ResponseCodes } from '../../shared/models/ResponseCodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../shared/snackbar.config';
import { CustomerProfile } from './customerProfile';
import { AppUrls } from '../../shared/models/app-urls';


@Component({
  selector: 'app-member-donation',
  templateUrl: './member-contribution.component.html',
  styleUrls: ['./member-contribution.component.scss']
})
export class MemberContributionComponent implements OnInit {

  memberContributionForm: FormGroup;
  customerProfile: CustomerProfile;
  yearOptions: number[];
  busy: boolean;
  monthList = months;
  private defaultValidators = [
    Validators.required
  ];
  errorMessage: string;

  constructor(private customerProfileService: CustomerProfileService, private router: Router,
              private fb: FormBuilder, private route: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.yearOptions = this.route.snapshot.data.yearOptions;
    this.customerProfile = this.route.snapshot.data.customerProfile;
    this.buildForm();
    this.setValidators();
  }

  private buildForm(): void {
    this.memberContributionForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      zip: [''],
      cardnumber: [''],
      cardcode: [''],
      expiry_month: [''],
      expiry_year: [''],
      createprofile: [''],
      amount: ['', this.defaultValidators],
      description: [''],
      paymentprofile: ['']
    });
  }

  submit(): void {
    this.busy = true;

    if (this.customerProfile.paymentProfiles && this.customerProfile.paymentProfiles.length) {
      this
        .customerProfileService
        .chargeCustomerProfile({...this.memberContributionForm.value, customerProfileId: this.customerProfile.customerProfileId})
        .subscribe(resp => {
          this.snackBar
            .open(resp?.messages?.message[0]?.description, 'Done', snackBarConfig)
            .afterDismissed()
            .subscribe(() => {
              this.memberContributionForm.reset();
              this.router.navigate([AppUrls.MYCONTRIBUTIONS]);
            });
        });

    } else {
      const data = Object.assign({}, this.memberContributionForm.value);
      data.expirationdate = data.expiry_month + '/' + data.expiry_year;
      data.description = 'Benevolence';

      this.customerProfileService
        .secureChargeCreditCard(data)
        .subscribe((response) => {

          if (!this.memberContributionForm.value.createprofile && response.responseCode === ResponseCodes.APPROVED) {
            this.snackBar.open(response?.messages?.message[0]?.description || 'Transaction has been approved', 'Done', snackBarConfig)
              .afterDismissed()
              .subscribe(() => {
                this.memberContributionForm.reset();
                this.router.navigate([AppUrls.MYCONTRIBUTIONS]);
              });
          } else {
            // Response for create profile
            const message = response.customerProfileId ? `${response.message}, profile ${response.customerProfileId} created` :
              response.message;

            this.snackBar
              .open(message, '', snackBarConfig)
              .afterDismissed()
              .subscribe(() => {
                this.memberContributionForm.reset();
                this.router.navigate([AppUrls.MYCONTRIBUTIONS]);
              });
          }

          this.busy = false;
        }, error => {
          this.handleError(error);
        });
    }

  }

  private handleError(error): void {
    console.log(error);
    const message = error?.error?.message ? error.error.message : 'An error occurred';
    this.snackBar.open(message, '', snackBarConfig);
    this.busy = false;
  }

  setValidators(): void {
    if (this.customerProfile.paymentProfiles && this.customerProfile.paymentProfiles.length) {

      this
        .memberContributionForm
        .get('paymentprofile')
        .setValidators(this.defaultValidators);

    } else {

      this
        .memberContributionForm
        .get('expiry_month')
        .setValidators(this.defaultValidators);

      this
        .memberContributionForm
        .get('expiry_year')
        .setValidators(this.defaultValidators);

      this
        .memberContributionForm
        .get('firstname')
        .setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(255)]);

      this
        .memberContributionForm
        .get('lastname')
        .setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(255)]);

      this
        .memberContributionForm
        .get('zip')
        .setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(12)]);

      this
        .memberContributionForm
        .get('cardnumber')
        .setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(20)]);

      this
        .memberContributionForm
        .get('cardcode')
        .setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(5)]);

    }
  }


  cancel(): void {
    // TODO: figure
  }

}
