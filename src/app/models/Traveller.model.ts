export interface Traveller {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    checkinDate: Date | null;
    checkoutDate: Date | null;
    nbAdult: number;
    nbChild: number;
    nbBaby: number;
}