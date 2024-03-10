import { Reservations } from "./Reservations.model";
import { Traveller } from "./Traveller.model";

export interface TravellerHasReservation {
    traveller: Traveller,
    reservation: Reservations
    appartmentDescription: string,
    numberNight: number,
    accepted: boolean
}