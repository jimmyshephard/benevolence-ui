import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerProfileService } from '../secure/member-contribution/customer-profile.service';

@Injectable({
  providedIn: 'root'
})
export class YearOptionsResolver implements Resolve<number[]> {

  constructor(private customerProfileService: CustomerProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number[]> {
    return this.customerProfileService.getYearOptions();
  }
}
