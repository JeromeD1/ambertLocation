export interface Reservations {
    id: number;
    appartment_id: number;
    checkinDate: Date;
    checkoutDate: Date;
    nbAdult: number;
    nbChild: number;
    nbBaby: number;
    reservationPrice: number;
    accepted: boolean
}
