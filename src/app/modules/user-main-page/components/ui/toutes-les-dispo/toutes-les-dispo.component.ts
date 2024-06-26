import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Appartment } from '../../../../../models/Appartment.model';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-toutes-les-dispo',
  templateUrl: './toutes-les-dispo.component.html',
  styleUrl: './toutes-les-dispo.component.scss'
})
export class ToutesLesDispoComponent  {

  @Input()
  appartment!: Appartment;

  @Output()
  showToutesDispo: EventEmitter<boolean> = new EventEmitter();


  selectedDate: null = null;


  closeToutesDispo(): void {
    this.showToutesDispo.emit(false);
  }

  filterBookedDates = (date: Date | null): boolean => {
    
    const time = date?.getTime() || 0;

      for(let reservation of this.appartment.reservations) {
        
        if(time >= reservation.checkinDate.getTime() && time < reservation.checkoutDate.getTime()){
          return false;
        }
      }

    return true;
  }


 

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    if (view === 'month') {
      const time = cellDate.getTime();

      for(let reservation of this.appartment.reservations) {
          if(time >= reservation.checkinDate.getTime() && time < reservation.checkoutDate.getTime()){
              return 'highlight-date';
          }
      }
  }

    return "";
}



  

}
