import { Component, Input,Output ,EventEmitter, OnInit, ViewChild, inject } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { Appartment } from '../../../../../models/Appartment.model';
import { SomeFunctionsService } from '../../../../../shared/some-functions.service';
import { DateFromPicker } from '../../../../../models/DateFromPicker.model';
import { Discount } from '../../../../../models/Discount.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservations } from '../../../../../models/Reservations.model';
import { TravellerHasReservation } from '../../../../../models/travellerHasReservation.model';
import { BookingDataService } from '../../../../../shared/booking-data.service';

@Component({
  selector: 'app-demande-reservation',
  templateUrl: './demande-reservation.component.html',
  styleUrl: './demande-reservation.component.scss'
})
export class DemandeReservationComponent implements OnInit {

  router: Router = inject(Router);

  constructor(private someFunctionService: SomeFunctionsService, private bookingDataService: BookingDataService) {}

  @Input()
  traveller!: Traveller;

  @Input()
  appartments!: Appartment[];

  @Input()
  appartment!: Appartment;

  @Input()
  travelPrice! : number | null;

  @Input()
  discount!: Discount;

  @Output()
  showDemandeResa = new EventEmitter<Boolean>();

  @Output()
  travellerEmitter = new EventEmitter<Traveller>();

  @ViewChild('demandeResaForm', { static: false }) demandeResaForm!: NgForm;

  arrivalDate: string | undefined;
  departureDate: string | undefined;
  showPickerarrival: boolean = false;
  showPickerDeparture: boolean = false;
  showPopup: boolean = false;
  reservation: Reservations = {
    id:0,
    appartment_id: 0,
    checkinDate: new Date(),
    checkoutDate: new Date(),
    nbAdult:0,
    nbChild:0,
    nbBaby:0,
    reservationPrice:0,
    accepted: false
  };
  travellerHasReservation!: TravellerHasReservation;

  get numberNight(): number | null {
    return this.someFunctionService.getNumberOfDays(this.traveller);
  };


ngOnInit(): void {
    this.arrivalDate = this.someFunctionService.formatDate(this.traveller.checkinDate, "arrive");
    this.departureDate = this.someFunctionService.formatDate(this.traveller.checkoutDate, "depart");
}




handleChangeAppartment(appartmentName : String): void {
    this.appartment = this.appartments.find(appartment => appartment.name === appartmentName) as Appartment;
    if(this.traveller.checkinDate && this.traveller.checkoutDate && this.traveller.nbAdult > 0){
      // this.travelPrice = this.appartment.calculateReservationPrice(this.traveller.nbAdult, this.traveller.nbChild, this.traveller.checkinDate, this.traveller.checkoutDate,1)
      this.travelPrice = this.appartment.calculateReservationPrice(this.traveller.nbAdult, this.traveller.nbChild, this.traveller.checkinDate, this.traveller.checkoutDate, this.discount)

    }
}


changeShowPickerarrival():void {
    this.showPickerarrival = !this.showPickerarrival;
}

changeShowPickerDeparture():void {
  this.showPickerDeparture = !this.showPickerDeparture;
}

handleChangeCheckinOrCheckout(event: DateFromPicker): void {
  
  if(event.type === 'checkin') {
    this.traveller.checkinDate = event.date;
    this.arrivalDate = this.someFunctionService.formatDate(this.traveller.checkinDate, "arrive");
    this.changeShowPickerarrival();
  } else if(event.type === 'checkout') {
    this.traveller.checkoutDate = event.date;
    this.departureDate = this.someFunctionService.formatDate(this.traveller.checkoutDate, "depart");
    this.changeShowPickerDeparture();
  }

  if(this.traveller.checkinDate && this.traveller.checkoutDate){
    console.log("nbAdult",this.traveller.nbAdult);
    
    // this.travelPrice = this.appartment.calculateReservationPrice(this.traveller.nbAdult, this.traveller.nbChild, this.traveller.checkinDate, this.traveller.checkoutDate,1)
    this.travelPrice = this.appartment.calculateReservationPrice(this.traveller.nbAdult, this.traveller.nbChild, this.traveller.checkinDate, this.traveller.checkoutDate, this.discount)

  }

}

  closeDemandeResa():void {
    this.showDemandeResa.emit(false);
  }


  onSubmit(event: Event):void {
    console.log('submitted');
    
    const clickedButton = (event.target as Element).getAttribute('data-button-id');
    
    if(this.demandeResaForm.valid && this.traveller.checkinDate && this.traveller.checkoutDate && this.travelPrice){

      if(clickedButton === "button-modele"){
        this.router.navigate(['/modeleEmail', this.appartment.id])
        
      } else if(clickedButton === 'button-envoiMail'){
        this.reservation = {
          id:0,
          appartment_id: this.appartment.id,
          checkinDate: this.traveller.checkinDate,
          checkoutDate: this.traveller.checkoutDate,
          nbAdult:this.traveller.nbAdult,
          nbChild: this.traveller.nbChild,
          nbBaby: this.traveller.nbBaby,
          reservationPrice: this.travelPrice,
          accepted: false
        }


        this.travellerHasReservation = {
          traveller: this.traveller,
          reservation: this.reservation,
          appartmentDescription: this.appartment.description,
          numberNight: this.numberNight as number,
          accepted: false
        };

        
        this.bookingDataService.postTravellerReservation(this.travellerHasReservation);
        
        this.showPopup = true;
      }
    }
    
  }

}
