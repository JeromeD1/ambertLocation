export interface Reservations {
    id: number;
    appartment_id: number;
    checkinDate: Date;
    checkoutDate: Date;
    nbAdult: number;
    nbChild: number;
    nbBaby: number;
    reservationPrice: number;
}

// export class Reservations {

//     constructor(

//         public id: number,
//         public appartment_id: number,
//         public checkinDate: Date,
//         public checkoutDate: Date,
//         public nbAdult: number,
//         public nbChild: number,
//         public nbBaby: number,
//         public reservationPrice: number
//     ) {}

//     calculateReservationPrice(nightPrice: number, discount: number) : number {

//         const numberOfDays: number = this.checkoutDate.getDate() - this.checkinDate.getDate();
//         const numberOfTravellers = this.nbAdult + this.nbChild;
//         let updateNightPrice = nightPrice;

//         if(numberOfTravellers > 2) {
//             updateNightPrice = nightPrice + 15 * (numberOfTravellers - 2);
//         }

//         if(numberOfDays < 3) {
//             this.reservationPrice = updateNightPrice * numberOfDays * discount + 30;
//         } else {
//             this.reservationPrice = updateNightPrice * numberOfDays * discount + 50;
//         }

//         return this.reservationPrice;
//     }

// }