import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerProfileService } from '../secure/member-contribution/customer-profile.service';
import { TxDescription } from './models/TxDescription';

@Injectable({
  providedIn: 'root'
})
export class TxDescriptionResolver implements Resolve<TxDescription[]> {

  constructor(private customerProfileService: CustomerProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TxDescription[]> {
    return this.customerProfileService.getTxDescriptions();
  }
}
