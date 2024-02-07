import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Traveller } from '../models/Traveller.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {

  constructor() { }

  // private _checkinDate: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  // private _checkoutDate: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  // private _nbAdult: BehaviorSubject<number> = new BehaviorSubject(0);
  // private _nbChild: BehaviorSubject<number> = new BehaviorSubject(0);
  // private _nbBaby: BehaviorSubject<number> = new BehaviorSubject(0);

  // setCheckinDate(checkinDate: Date) :void {
  //   this._checkinDate.next(checkinDate);
  // }

  // setCheckoutDate(checkoutDate: Date) :void {
  //   this._checkoutDate.next(checkoutDate);
  // }

  // setNbAdult(nbAdult: number) :void {
  //   this._nbAdult.next(nbAdult);
  // }

  // setNbChild(nbChild: number) :void {
  //   this._nbChild.next(nbChild);
  // }

  // setNbBaby(nbBaby: number) :void {
  //   this._nbBaby.next(nbBaby);
  // }
  

  // getCheckinDate() : Observable<Date> {
  //   return this._checkinDate.asObservable();
  // }

  // getCheckoutDate() : Observable<Date> {
  //   return this._checkoutDate.asObservable();
  // }

  // getNbAdult() : Observable<number> {
  //   return this._nbAdult.asObservable();
  // }

  // getNbChild() : Observable<number> {
  //   return this._nbChild.asObservable();
  // }

  // getNbBaby() : Observable<number> {
  //   return this._nbBaby.asObservable();
  // }

  private _traveller: BehaviorSubject<Traveller> = new BehaviorSubject<Traveller>(
    {firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      zipcode: '',
      city: '',
      country: '',
      checkinDate: null,
      checkoutDate: null,
      nbAdult: 0,
      nbChild: 0,
      nbBaby: 0
    }
  )

  getTraveller() :Observable<Traveller> {
    return this._traveller.asObservable();
  }

  setTraveller(traveller: Traveller) :void {
    this._traveller.next(traveller);
  }

}
