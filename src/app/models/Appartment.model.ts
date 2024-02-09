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

export class Appartment {

    constructor(

        public id: number,
        public name: string,
        public description: string,
        public address: string,
        public zipCode: string,
        public city: string,
        public distanceCityCenter: string,
        public distanceTrain: string,
        public distanceTram: string,
        public nightPrice: number,
        public caution: number,
        public googleMapUrl: string,
        public infos: Info[],
        public photos: Photo[],
        public reservations: Reservations[]
    ) {}

    calculateReservationPrice(nbAdult: number, nbChild:number, checkinDate: Date, checkoutDate: Date, discount: number) : number {
    
        const numberOfDays: number = checkoutDate.getDate() - checkinDate.getDate();
        const numberOfTravellers = nbAdult + nbChild;
        let updateNightPrice = this.nightPrice;
        let reservationPrice: number = 0;
        let cleaningPrice: number = 0;
    
        if(numberOfTravellers > 2) {
            updateNightPrice = this.nightPrice + 15 * (numberOfTravellers - 2);
        }
    
        if(numberOfDays < 3) {
            cleaningPrice = 30;
        } else {
            cleaningPrice = 50;
        }

        reservationPrice = updateNightPrice * numberOfDays * discount + cleaningPrice;
    
        return reservationPrice;
    }
}

