import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { TravellerNumbers } from '../../../models/TravellerNumbers.model';

@Component({
  selector: 'app-travelling-choice-small-screen',
  templateUrl: './travelling-choice-small-screen.component.html',
  styleUrl: './travelling-choice-small-screen.component.scss'
})
export class TravellingChoiceSmallScreenComponent {

  @Input()
  traveller: Traveller = {firstname: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  zipcode: '',
  city: '',
  country: '',
  checkinDate: new Date(),
  checkoutDate: new Date(),
  nbAdult: 0,
  nbChild: 0,
  nbBaby: 0,
  message: ''
}

  @Output()
  showComponentEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output()
  travellerChangeEmitter = new EventEmitter<Traveller>();

  initialNumberOfPayingTravellers: number = 0;

  travellerNumbers: TravellerNumbers = {
    numberAdult: this.traveller.nbAdult,
    numberChild: this.traveller.nbChild,
    numberBaby: this.traveller.nbBaby
  }
  textTravellerNumber: string = "Combien ?";


  private _checkinDateValue: Date | null = null;
private _checkoutDateValue: Date | null = null;
private _minCheckinDate: Date = new Date();
private _maxCheckinDate: Date | null = null;
private _minCheckoutDate: Date | null = null;
private _maxCheckoutDate: Date | null = null;

get checkinDateValue(): Date | null {
  return this._checkinDateValue;
}

get checkoutDateValue(): Date | null {
  return this._checkoutDateValue;
}

get minCheckinDate(): Date {
  return this._minCheckinDate;
}

get maxCheckinDate(): Date | null {
  return this._maxCheckinDate;
}

get minCheckoutDate(): Date | null {
  return this._minCheckoutDate;
}

get maxCheckoutDate(): Date | null {
  return this._maxCheckoutDate;
}

set checkinDateValue(date: Date) {
  this._checkinDateValue = date;
  if(this._checkinDateValue) {
    this._minCheckoutDate = new Date(date); // On crée une nouvelle instance de Date pour éviter 
    //la mutation de l'objet original c'est pour que _minCheckinDate et minCheckoutDate ne fassent pas référence à la même 
    //instance de Date
    this._minCheckoutDate.setDate(this._minCheckoutDate.getDate() + 1);
  } else {
    this._minCheckoutDate = null;
  }

  if(this.checkoutDateValue && this.travellerNumbers.numberAdult > 0) {
  }
}

set checkoutDateValue(date: Date) {
  this._checkoutDateValue = date;
  if(this._checkoutDateValue) {
    this._maxCheckinDate = new Date(date);
    this._maxCheckinDate.setDate(this._maxCheckinDate.getDate() - 1);
  } else {
    this._maxCheckinDate = null;
  }

  if(this._checkinDateValue && this.travellerNumbers.numberAdult > 0) {
  }
}

updateTravellerNumbers(event: TravellerNumbers): void {
  this.travellerNumbers = event;
  
  const numberOfPayingTravellers: number = this.travellerNumbers.numberAdult + this.travellerNumbers.numberChild;
  this.textTravellerNumber = numberOfPayingTravellers === 0 ? "Combien ?"
  : numberOfPayingTravellers === 1 ? "1 voyageur" : numberOfPayingTravellers + " voyageurs";
  
    if(numberOfPayingTravellers !== this.initialNumberOfPayingTravellers) {
    this.initialNumberOfPayingTravellers = numberOfPayingTravellers;
    if(this.checkinDateValue && this.checkoutDateValue && this.travellerNumbers.numberAdult > 0){
    } 
  }
  
  if(this.travellerNumbers.numberAdult === 0) {
  }
  
  }
  

  close(): void {
    this.showComponentEmitter.emit(false)
  }

  onStartResearch():void {

    if(!this._checkinDateValue || !this._checkoutDateValue || this.travellerNumbers.numberAdult === 0) return;
  
  
  
    const newTraveller: Traveller = {...this.traveller, 
      checkinDate: this.checkinDateValue, 
      checkoutDate: this.checkoutDateValue,
      nbAdult:this.travellerNumbers.numberAdult,
      nbChild: this.travellerNumbers.numberChild,
      nbBaby: this.travellerNumbers.numberBaby
    };
  
    
    this.travellerChangeEmitter.emit(newTraveller);
    this.close();

  }
}
