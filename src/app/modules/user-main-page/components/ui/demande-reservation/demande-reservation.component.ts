import { Component, Input,Output ,EventEmitter, OnInit } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { Appartment } from '../../../../../models/Appartment.model';
import { SomeFunctionsService } from '../../../../../shared/some-functions.service';
import { DateFromPicker } from '../../../../../models/DateFromPicker.model';
import { Discount } from '../../../../../models/Discount.model';

@Component({
  selector: 'app-demande-reservation',
  templateUrl: './demande-reservation.component.html',
  styleUrl: './demande-reservation.component.scss'
})
export class DemandeReservationComponent implements OnInit {

  constructor(private someFunctionService: SomeFunctionsService) {}

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

  arrivalDate: string | undefined;
  departureDate: string | undefined;
  showPickerarrival: boolean = false;
  showPickerDeparture: boolean = false;

  get numberNight(): number | null {
    return this.someFunctionService.getNumberOfDays(this.traveller);
  };


ngOnInit(): void {
    console.log("traveller", this.traveller);
    this.arrivalDate = this.formatDate(this.traveller.checkinDate, "arrive");
    this.departureDate = this.formatDate(this.traveller.checkoutDate, "depart");
}

formatDate = (date: Date | null, arriveOuDepart: "arrive" | "depart"):string => {
  if(date){
    let day: string = date.getDate().toString();  // Jour du mois
    let month: string = (date.getMonth() + 1).toString();  // Les mois sont indexés à partir de 0 en JavaScript
    let year: string = date.getFullYear().toString();
    console.log("month",month, "length", month.length);
    
    // Ajoute un zéro devant le jour et le mois si nécessaire
    if(day.length < 1) day = '0' + day;
    if(month.length < 2) month = '0' + month;
    
    return day + '/' + month + '/' + year;
  }

  return arriveOuDepart === "arrive" ? "Choisissez une date d'arrivée" : "Choisissez une date de départ";
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
    this.arrivalDate = this.formatDate(this.traveller.checkinDate, "arrive");
    this.changeShowPickerarrival();
  } else if(event.type === 'checkout') {
    this.traveller.checkoutDate = event.date;
    this.departureDate = this.formatDate(this.traveller.checkoutDate, "depart");
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


  onSubmit():void {

  }

}
