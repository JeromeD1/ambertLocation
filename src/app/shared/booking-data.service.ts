import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Traveller } from '../models/Traveller.model';
import { TravellerHasReservation } from '../models/travellerHasReservation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {

  constructor(private http: HttpClient) { }


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
      nbBaby: 0,
      message: ''
    }
  )

  getTraveller() :Observable<Traveller> {
    return this._traveller.asObservable();
  }

  setTraveller(traveller: Traveller) :void {
    this._traveller.next(traveller);
  }

  postTravellerReservation(travellerHasReservation: TravellerHasReservation): void {
    console.log('in posttravelreservation', travellerHasReservation);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    this.http.post(environment.BACKEND_BASE_URL + '/reservationWithTraveller',travellerHasReservation, httpOptions).subscribe(
      (response) => {
        console.log('Reponse du serveur : ', response);
        
      },
      (error) => {
        console.error('Erreur lors de la requete : ', error);
        
      }
    )
  }

}
