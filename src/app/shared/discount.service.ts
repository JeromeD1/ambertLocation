import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount } from '../models/Discount.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  getDiscounts():Observable<Discount> {
    return this.http.get<Discount>(environment.BACKEND_BASE_URL + '/discount')
  }
}
