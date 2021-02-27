import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargeCardResponse } from './models/ChargeCardResponse';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getYearOptions(payload): Observable<ChargeCardResponse> {
    return this.http.get<ChargeCardResponse>('api/public/get-year-options');
  }
}
