import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Reservations } from '../../../../../models/Reservations.model';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateFromPicker } from '../../../../../models/DateFromPicker.model';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit {

  @Input()
  initDateValue!: Date | null;

  @Input()
  importedCheckinDate : Date | null = null;

  @Input()
  importedCheckoutDate : Date | null = null;

  @Input()
  importedReservations: Reservations[] = [];

  @Input()
  dateType!: 'checkin' | 'checkout';

  @Input()
  whoIsWatching: "user" | "admin" = "user"

  @Output()
  dateEmitter = new EventEmitter<DateFromPicker>();

  // dateValue!: Date | null;
  // checkinDate?: Date;
  // checkoutDate?: Date;
  // minDate!: Date;
  // maxDate!: Date;

private _checkinDateValue: Date | null = null;
private _checkoutDateValue: Date | null = null;
private _minCheckinDate: Date = new Date();
private _maxCheckinDate: Date | null = null;
private _minCheckoutDate: Date | null = null;
private _maxCheckoutDate: Date | null = null;


ngOnInit(): void {
    if(this.initDateValue) {      
      if(this.dateType === 'checkin') {        
        this.checkinDateValue = this.initDateValue;
        this.setMaxCheckinDate();
      } else {        
        this.checkoutDateValue = this.initDateValue;
        this.setMinCheckoutDate();
        
      }
    }
    // this.dateValue = this.initDateValue;

    if(this.importedCheckinDate){
      this._checkinDateValue = this.importedCheckinDate;
    } 
    if(this.importedCheckoutDate) this._checkoutDateValue = this.importedCheckoutDate;

    
}




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

}


setMaxCheckinDate(): void {
  if(this.importedCheckoutDate) {
    this._maxCheckinDate = new Date(this.importedCheckoutDate);
    this._maxCheckinDate.setDate(this._maxCheckinDate.getDate() - 1);
  } else {
    this._maxCheckinDate = null;
  }
}


setMinCheckoutDate(): void {
  if(this.importedCheckinDate) {
    this._minCheckoutDate = new Date(this.importedCheckinDate); // On crée une nouvelle instance de Date pour éviter 
    //la mutation de l'objet original c'est pour que _minCheckinDate et minCheckoutDate ne fassent pas référence à la même 
    //instance de Date
    this._minCheckoutDate.setDate(this._minCheckoutDate.getDate() + 1);
  } else {
    this._minCheckoutDate = null;
  }
}


filterBookedDates = (date: Date | null): boolean => {
    
  const time = date?.getTime() || 0;

    for(let reservation of this.importedReservations) {
      
      if(time >= reservation.checkinDate.getTime() && time < reservation.checkoutDate.getTime()){
        return false;
      }
    }

  return true;
}




dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  if (view === 'month') {
    const time = cellDate.getTime();

    for(let reservation of this.importedReservations) {
        if(time >= reservation.checkinDate.getTime() && time < reservation.checkoutDate.getTime()){
            if(this.whoIsWatching === "user"){
              return 'highlight-date-accepted';
            }else {
              if(reservation.accepted){
                return 'highlight-date-accepted';
              } else {
                return 'highlight-date-not-accepted';
              }
            }
        }
    }
}

  return "";
}




emitNewDate(event : MatDatepickerInputEvent<Date>):void {
  const dateFromPicker: DateFromPicker = {
    date: event.value as Date,
    type: this.dateType
  }
  
  this.dateEmitter.emit(dateFromPicker);
  
}

deleteCheckinDateValue() {
  this._checkinDateValue = null;
}

deleteCheckoutDateValue() {
  this._checkoutDateValue = null;
}

}
