import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargeCardResponse } from '../../shared/models/ChargeCardResponse';
import { Contribution } from '../../shared/models/Contribution';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  constructor(private http: HttpClient) {
  }

  chargeCreditCard(payload): Observable<ChargeCardResponse> {
    return this.http.post<ChargeCardResponse>('api/public/charge-credit-card', payload);
  }

  chargeCustomerProfile(payload): Observable<ChargeCardResponse> {
    return this.http.post<ChargeCardResponse>('api/secure/customer-profile/charge', payload);
  }

  secureChargeCreditCard(payload): Observable<ChargeCardResponse> {
    return this.http.post<ChargeCardResponse>('api/secure/charge-credit-card', payload);
  }

  getCustomerProfile(): Observable<any> {
    return this.http.get('api/secure/customer-profile');
  }

  getYearOptions(): Observable<number[]> {
    return this.http.get<number[]>('api/public/year-options');
  }

  getContributions(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>('api/secure/contributions');

  }

  editCustomerProfile(payload): Observable<{message: string}> {
    return this.http.post<{message: string}>('api/secure/customer-profile/update', payload);

  }
}
