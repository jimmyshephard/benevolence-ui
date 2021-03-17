import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargeCardResponse } from '../../shared/models/ChargeCardResponse';
import { Contribution } from '../../shared/models/Contribution';
import { environment } from '../../../environments/environment';
import { TxDescription } from '../../shared/models/TxDescription';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) {
  }

  chargeCreditCard(payload): Observable<ChargeCardResponse> {
    return this.http.post<ChargeCardResponse>(`${this.apiRoot}/public/charge-credit-card`, payload);
  }

  chargeCustomerProfile(payload): Observable<ChargeCardResponse> {
    return this.http.post<ChargeCardResponse>(`${this.apiRoot}/secure/customer-profile/charge`, payload);
  }

  secureChargeCreditCard(payload): Observable<ChargeCardResponse> {
    return this.http.post<ChargeCardResponse>(`${this.apiRoot}/secure/charge-credit-card`, payload);
  }

  getCustomerProfile(): Observable<any> {
    return this.http.get(`${this.apiRoot}/secure/customer-profile`);
  }

  getYearOptions(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiRoot}/public/year-options`);
  }

  getContributions(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>(`${this.apiRoot}/secure/contributions`);

  }

  editCustomerProfile(payload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiRoot}/secure/customer-profile/update`, payload);

  }

  getTxDescriptions(): Observable<TxDescription[]> {
    return this.http.get<TxDescription[]>(`${this.apiRoot}/public/tx-descriptions`);
  }
}
