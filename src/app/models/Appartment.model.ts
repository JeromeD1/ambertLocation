// import { Photo } from "./Photo.model";
// import { Reservations } from "./Reservations.model";
// import { Info } from "./Info.model";

// export interface Appartment {
//     id: number;
//     name: string;
//     description: string;
//     address: string;
//     zipCode: string;
//     city: string;
//     distanceCityCenter: string;
//     distanceTrain: string;
//     distanceTram: string;
//     nightPrice: number;
//     caution: number;
//     googleMapUrl: string;
//     infos: Info[]
//     photos: Photo[];
//     reservations: Reservations[];

// }


import { Photo } from "./Photo.model";
import { Reservations } from "./Reservations.model";
import { Info } from "./Info.model";
import { Discount } from "./Discount.model";


export class Appartment {


    constructor(
        public id: number,
        public name: string,
        public description: string,
        public address: string,
        public zipcode: string,
        public city: string,
        public distanceCityCenter: string,
        public distanceTrain: string,
        public distanceTram: string,
        public nightPrice: number,
        public caution: number,
        public googleMapUrl: string,
        public infos: Info[],
        public photos: Photo[],
        public reservations: Reservations[],
    ) {
    }


    calculateReservationPrice(nbAdult: number, nbChild:number, checkinDate: Date, checkoutDate: Date, discount: Discount) : number {
    
        const numberOfDays: number = Math.round((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24));        
        const numberOfTravellers = nbAdult + nbChild;
        let updateNightPrice = this.nightPrice;
        let reservationPrice: number = 0;
        let cleaningPrice: number = 0;
    
        if(numberOfTravellers > 2) {
            updateNightPrice = this.nightPrice + 10 * (numberOfTravellers - 2);
        }
    
        if(numberOfDays < 3) {
            cleaningPrice = 30;
        } else {
            cleaningPrice = 50;
        }

        if(numberOfDays >= 7 && numberOfDays < 30){
            if(discount.weekActivated){
                reservationPrice = updateNightPrice * numberOfDays * discount.week + cleaningPrice;
            } else {
                reservationPrice = updateNightPrice * numberOfDays + cleaningPrice;
            }
        } else if(numberOfDays >= 30) {
            if(discount.monthActivated){
                reservationPrice = updateNightPrice * numberOfDays * discount.month + cleaningPrice;
            } else {
                reservationPrice = updateNightPrice * numberOfDays + cleaningPrice;
            }
        } else {
            reservationPrice = updateNightPrice * numberOfDays + cleaningPrice;
        }
    
        return reservationPrice;
    }
}

