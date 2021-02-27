import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { months } from '../../shared/models/months';
import { ResponseCodes } from '../../shared/models/ResponseCodes';
import { CustomerProfileService } from '../../secure/member-contribution/customer-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../shared/snackbar.config';

@Component({
  selector: 'app-guest-donation',
  templateUrl: './guest-donation.component.html',
  styleUrls: ['./guest-donation.component.scss']
})
export class GuestDonationComponent implements OnInit {

  guestDonationForm: FormGroup;
  busy: boolean;
  monthList = months;
  yearOptions: number[];
  descriptions = ['Benevolence'];


  constructor(private fb: FormBuilder, private contributionService: CustomerProfileService, private snackBar: MatSnackBar,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.yearOptions = this.route.snapshot.data.yearOptions;
  }

  private buildForm(): void {
    this.guestDonationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      cardnumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(20)]],
      cardcode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      expiry_month: ['', Validators.required],
      expiry_year: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.max(255)]],
      createprofile: [''],
      amount: ['', [Validators.required]],
      description: [''],
    });
  }

  submit(): void {
    this.busy = true;
    const data = Object.assign({}, this.guestDonationForm.value);
    data.expirationdate = data.expiry_month + '/' + data.expiry_year;
    data.description = 'Benevolence';
    data.createprofile = false;
    console.log(data);
    this.contributionService.chargeCreditCard(data).subscribe((response) => {

      if (response.responseCode === ResponseCodes.APPROVED) {
        this.snackBar.open(response?.messages[0]?.description || 'Transaction has been approved', 'Done', snackBarConfig)
          .afterDismissed()
          .subscribe(() => {
            console.log('Reseting form');
            this.guestDonationForm.reset();
          });
      } else {
        this.snackBar.open(response?.messages[0]?.description, '', snackBarConfig);
      }

      this.busy = false;
    }, error => {
      this.handleError(error);
    });
  }

  private handleError(error): void {
    console.log(error);
    const message = error?.error?.message ? error.error.message : 'An error occurred';
    this.snackBar.open(message, '', snackBarConfig);
    this.busy = false;
  }

  cancel(): void {
    this.router.navigate(['/public']);
  }

}
