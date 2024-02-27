import { Component, Input, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Appartment } from '../../../../../models/Appartment.model';
import { Traveller } from '../../../../../models/Traveller.model';

@Component({
  selector: 'app-appartment-card',
  templateUrl: './appartment-card.component.html',
  styleUrl: './appartment-card.component.scss'
})
export class AppartmentCardComponent implements AfterViewInit {

  @Input()
  appartment!: Appartment;

  @Input()
  traveller!: Traveller

  index: number = 0;

  showMoreDetails:boolean = false;



  changeShowMoreDetails() {
    this.showMoreDetails = !this.showMoreDetails;
  }

  nextPhoto():void {
    if(this.index < this.appartment.photos.length -1) {
      this.index++;
    }
  }

  previousPhoto():void {
    if(this.index > 0) {
      this.index--;
    }
  }

  getTravelPrice(): number | null {
    if(this.traveller.checkinDate && this.traveller.checkoutDate && this.traveller.nbAdult > 0) {

      return this.appartment.calculateReservationPrice(
        this.traveller.nbAdult,
        this.traveller.nbChild, 
        this.traveller.checkinDate,
        this.traveller.checkoutDate,
        1);
    } else {
      return null;
    }
  }

  getNightPrice(): number {

    const numberOfTraveller = this.traveller.nbAdult + this.traveller.nbChild;
    if(this.traveller.nbAdult > 0 && numberOfTraveller > 2) {
        const newNightPrice = this.appartment.nightPrice + 15 * (numberOfTraveller - 2);
        return newNightPrice;
      }
     else {
      return this.appartment.nightPrice;
    }
  }

  getNumberOfDays(): number | null {
    if(this.traveller.checkinDate && this.traveller.checkoutDate) {
      return (this.traveller.checkoutDate.getTime() - this.traveller.checkinDate.getTime()) / (1000 * 3600 * 24); //(checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
    } else {
      return null;
    }
  }


  //--------------------------------
  //---Pour dimensionner correctement mes images, même si elles sont à la verticale
@ViewChild('caroussel') caroussel: ElementRef | undefined; // on ajoute undefined pour que caroussel n'ait pas besoin d'être initialisé (sinon : erreur)
// obligé de mettre | undefined car caroussel est initialisé lors du chargement du template

@ViewChild('imgCaroussel') imgCaroussel: ElementRef | undefined;

@HostListener('window.resize', ['$event'])
onResize(event: any) {
  this.setWithAndHeight();
}

ngAfterViewInit(): void {
    this.setWithAndHeight();
}

setWithAndHeight() {
  if(this.caroussel && this.imgCaroussel){ // on rajoute cette condition car caroussel peut être undefined d'après sa déclaration
    const carousselWidth = this.caroussel.nativeElement.offsetWidth;
    const imgCarousselWidth = this.imgCaroussel.nativeElement.offsetWidth;
    const imgCarousselHeight = this.imgCaroussel.nativeElement.offsetHeight;
    const carousselHeight = (3/4) * carousselWidth;
    this.caroussel.nativeElement.style.height = carousselHeight + "px";

    if(imgCarousselWidth > imgCarousselHeight) {
      this.imgCaroussel.nativeElement.style.width = carousselWidth + "px";
      this.imgCaroussel.nativeElement.style.height = carousselHeight + "px";
    } else {
      this.imgCaroussel.nativeElement.style.width = carousselHeight + "px";
      this.imgCaroussel.nativeElement.style.height = "auto";
    }
  }
}


  //----------------------------------

}
