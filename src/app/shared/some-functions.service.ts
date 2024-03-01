import { Injectable } from '@angular/core';
import { Traveller } from "../models/Traveller.model";
import { Appartment } from "../models/Appartment.model";

@Injectable({
  providedIn: 'root'
})
export class SomeFunctionsService {

  constructor() { }



getTravelPrice = (user:Traveller, appart: Appartment): number | null => {
    if(user.checkinDate && user.checkoutDate && user.nbAdult > 0) {

      return appart.calculateReservationPrice(
        user.nbAdult,
        user.nbChild, 
        user.checkinDate,
        user.checkoutDate,
        1);
    } else {
      return null;
    }
  }

  getNightPrice(user: Traveller, appart: Appartment): number {

    const numberOfTraveller = user.nbAdult + user.nbChild;
    if(user.nbAdult > 0 && numberOfTraveller > 2) {
        const newNightPrice = appart.nightPrice + 10 * (numberOfTraveller - 2);
        return newNightPrice;
      }
     else {
      return appart.nightPrice;
    }
  }

  getNumberOfDays(user: Traveller): number | null {
    if(user.checkinDate && user.checkoutDate) {
      return (user.checkoutDate.getTime() - user.checkinDate.getTime()) / (1000 * 3600 * 24); //(checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
    } else {
      return null;
    }
  }

}
