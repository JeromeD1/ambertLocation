// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { environment } from '../../environment/environment';

// import { Appartment } from '../models/Appartment.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class AppartmentsService {

//   constructor(private http: HttpClient) { 
//   }

 

//   getAppartments():Observable<Appartment[]> {
//     return this.http.get<Appartment[]>(environment.BACKEND_BASE_URL + '/appartments')

//   }


// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environment/environment';

import { Appartment } from '../models/Appartment.model';
import { Reservations } from '../models/Reservations.model';


@Injectable({
  providedIn: 'root'
})
export class AppartmentsService {

  constructor(private http: HttpClient) { 
  }

 

  // getAppartments():Observable<Appartment[]> {
  //   return this.http.get<Appartment[]>(environment.BACKEND_BASE_URL + '/appartments').pipe(
  //     map((appartments) => appartments.map(appartment => {
  //       const reservations = appartment.reservations.map(reservation => new Reservations(
  //         reservation.id,
  //         reservation.appartment_id,
  //         new Date(reservation.checkinDate),
  //         new Date(reservation.checkoutDate),
  //         reservation.nbAdult,
  //         reservation.nbChild,
  //         reservation.nbBaby,
  //         reservation.reservationPrice
  //       ))

  //       return {...appartment, reservations}
  //     }))
  //   )

  // }

  getAppartments():Observable<Appartment[]> {
    return this.http.get<Appartment[]>(environment.BACKEND_BASE_URL + '/appartments').pipe(
      map((appartments) => appartments.map(appartment => {
        
        //conversion de checkinDate et checkoutDate de reservations qui arrivent en string en Date
        const reservations = appartment.reservations.map(resa =>(
          {...resa, checkinDate: new Date(resa.checkinDate), checkoutDate: new Date(resa.checkoutDate)}
        ));

        
        return new Appartment(
        appartment.id,
        appartment.name,
        appartment.description,
        appartment.address,
        appartment.zipcode,
        appartment.city,
        appartment.distanceCityCenter,
        appartment.distanceTrain,
        appartment.distanceTram,
        appartment.nightPrice,
        appartment.caution,
        appartment.googleMapUrl,
        appartment.infos,
        appartment.photos,
        reservations
      )}
      )
    )
    )

  }


}
