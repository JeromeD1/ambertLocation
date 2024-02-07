import { Photo } from "./Photo.model";
import { ReservationDate } from "./ReservationDate.model";

export interface Appartment {
    name: string;
    description: string;
    address: string;
    zipCode: string;
    city: string;
    distanceCityCenter: string;
    distanceTrain: string;
    distanceTram: string;
    nightPrice: number;
    caution: number;
    photos: Photo[];
    reservations: ReservationDate[];
    googleMapUrl: string;
    info1: string;
    info2: string;
    info3: string;
    info4: string;
    info5: string;

}