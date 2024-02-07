import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { TravellerNumbers } from '../../../models/TravellerNumbers.model';

//-------------------------------------------------
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// DateAdapter est une classe abstraite qui sert de pont entre Angular Material et les opérations de date spécifiques 
//à l’implémentation. Cela signifie qu’elle permet à Angular Material de travailler avec différentes implémentations de date.

// MAT_DATE_FORMATS est un jeton d’injection qui vous permet de définir les formats de date que vous souhaitez utiliser 
//dans votre application.

// MAT_DATE_LOCALE est un jeton d’injection qui vous permet de définir la locale que vous souhaitez utiliser 
//dans votre application.
//--------------------------------------------------

import { MY_DATE_FORMAT } from '../../../models/DateFormat.model';


@Component({
  selector: 'app-travelling-choices',
  templateUrl: './travelling-choices.component.html',
  styleUrl: './travelling-choices.component.scss',
  
  //-----------------------------------------
  providers: [
    {provide:MAT_DATE_LOCALE, useValue:'fr-FR'},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT}
    // dans les fournisseurs de votre composant, vous fournissez MY_DATE_FORMATS pour MAT_DATE_FORMATS et ‘fr-FR’ 
    //pour MAT_DATE_LOCALE. Cela signifie que partout où MAT_DATE_FORMATS et MAT_DATE_LOCALE sont utilisés dans votre 
    //composant, ils utiliseront les valeurs que vous avez fournies.
    //-------------------------------------------------
  ]
})
export class TravellingChoicesComponent {

  //--------------------------------------------------
  constructor(private adapter: DateAdapter<any>) {
    this.adapter.setLocale('fr');
  }
  // Dans le constructeur de votre composant, vous injectez DateAdapter et utilisez sa méthode setLocale pour définir 
  //la locale à ‘fr’ (pour le français). Cela signifie que toutes les opérations de date effectuées par 
  //DateAdapter utiliseront désormais le format de date français.
  //-----------------------------------------------


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
  nbBaby: 0
}

@Output()
travellerChange = new EventEmitter<Traveller>();

//on récupère la référence à l'input lié à checkinDate, ce qui va nous permettre de créer un évênement lié à l'input : ici (change) lorsque l'utilisateur choisit une date
// @ViewChild('checkinDate') checkinDate!: ElementRef;
// @ViewChild('checkoutDate') checkoutDate!: ElementRef;


showChooseVoyager: boolean = false;
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
}

set checkoutDateValue(date: Date) {
  this._checkoutDateValue = date;
  if(this._checkoutDateValue) {
    this._maxCheckinDate = new Date(date);
    this._maxCheckinDate.setDate(this._maxCheckinDate.getDate() - 1);
  } else {
    this._maxCheckinDate = null;
  }

  console.log("checkoutDate Value", this._checkoutDateValue, "type", typeof(this._checkoutDateValue));
  
}






onStartResearch():void {

  if(!this._checkinDateValue || !this._checkoutDateValue || this.travellerNumbers.numberAdult === 0) return;

  console.log("checkinDate",this.checkinDateValue,"checkoutDate",this.checkoutDateValue);

  const newTraveller: Traveller = {...this.traveller, 
    checkinDate: this.checkinDateValue, 
    checkoutDate: this.checkoutDateValue,
    nbAdult:this.travellerNumbers.numberAdult,
    nbChild: this.travellerNumbers.numberChild,
    nbBaby: this.travellerNumbers.numberBaby
  };

  console.log("newTraveller",newTraveller);
  
  this.travellerChange.emit(newTraveller);
  
}

changeChooseVoyager():void {
  this.showChooseVoyager = !this.showChooseVoyager;
  
}

updateTravellerNumbers(event: TravellerNumbers): void {
this.travellerNumbers = event;
console.log("new travellers",this.travellerNumbers);

const numberOfPayingTravellers: number = this.travellerNumbers.numberAdult + this.travellerNumbers.numberChild;
this.textTravellerNumber = numberOfPayingTravellers === 0 ? "Combien ?"
: numberOfPayingTravellers === 1 ? "1 voyageur" : numberOfPayingTravellers + " voyageurs";

}



// showCheckinInput: boolean = false;

// openCheckinInput() :void {
//   this.showCheckinInput = true;
//   // this.checkinDate.nativeElement.click();
//   setTimeout(() => {
//     this.checkinDate.nativeElement.click();
//     console.log("click déclenché");
//   });
//   console.log("checkin cliqué");
  
// }

// onCheckinChange(event: any){
//   const newTraveller: Traveller = {...this.traveller, checkinDate: event.target.value};
//   console.log(newTraveller);
  
//   this.travellerChange.emit(newTraveller);
// }


}
