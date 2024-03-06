import { Component, Input,Output ,EventEmitter, OnInit, ViewChild, inject } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { Appartment } from '../../../../../models/Appartment.model';
import { SomeFunctionsService } from '../../../../../shared/some-functions.service';
import { DateFromPicker } from '../../../../../models/DateFromPicker.model';
import { Discount } from '../../../../../models/Discount.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-reservation',
  templateUrl: './demande-reservation.component.html',
  styleUrl: './demande-reservation.component.scss'
})
export class DemandeReservationComponent implements OnInit {

  router: Router = inject(Router);

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

  @ViewChild('demandeResaForm', { static: false }) demandeResaForm!: NgForm;

  arrivalDate: string | undefined;
  departureDate: string | undefined;
  showPickerarrival: boolean = false;
  showPickerDeparture: boolean = false;

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
    
    if(this.demandeResaForm.valid){

      if(clickedButton === "button-modele"){
        this.router.navigate(['/modeleEmail', this.appartment.id])
        
      } else if(clickedButton === 'button-envoiMail'){
        console.log('button-envoiMail');
        
      }
    }
    
  }

}
