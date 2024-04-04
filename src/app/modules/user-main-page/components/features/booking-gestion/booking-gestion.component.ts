import { Component, OnInit, OnDestroy } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { BookingDataService } from '../../../../../shared/booking-data.service';
import { Photo } from '../../../../../models/Photo.model';
import { AppartmentsService } from '../../../../../shared/appartments.service';
import { Appartment } from '../../../../../models/Appartment.model';
import { Subscription } from 'rxjs';
import { DiscountService } from '../../../../../shared/discount.service';
import { Discount } from '../../../../../models/Discount.model';

@Component({
  selector: 'app-booking-gestion',
  templateUrl: './booking-gestion.component.html',
  styleUrl: './booking-gestion.component.scss'
})
export class BookingGestionComponent implements OnInit, OnDestroy{

  constructor(private bookingDataService: BookingDataService, private appartmentService: AppartmentsService, private discountService: DiscountService) {}

  traveller!: Traveller;
  appartments: Appartment[] = [];
  filteredAppartments: Appartment[] = [];
  discount!: Discount;

  appartmentServiceSubscription!: Subscription;
  bookingDataServiceSubscription!:Subscription;
  discountServiceSubscription!: Subscription;

  ngOnInit(): void {
     this.getTravellerData(); 
     this.getAppartment();
     this.getDiscount();
    //  this.photoService.getAllAppartmentPhotos().subscribe((photos:Photo[]) => this.allPhotos = photos);
     
  }

  getTravellerData() :void {
    this.bookingDataServiceSubscription = this.bookingDataService.getTraveller().subscribe(traveller => this.traveller = traveller);
  }

  getDiscount(): void {
    this.discountServiceSubscription = this.discountService.getDiscounts().subscribe(discount => this.discount = discount)
  }

  updateTravellerData(event: Traveller) :void {
    this.bookingDataService.setTraveller(event);

    const travellerCheckinDate = event.checkinDate?.getTime();
    const travellerCheckoutDate = event.checkoutDate?.getTime();
    // console.log("event",event);

    
    this.filteredAppartments = this.appartments.filter(appartment =>{
      const oneDay = 24 * 60 * 60 * 1000;

      if(travellerCheckinDate && travellerCheckoutDate) {
        for(let reservation of appartment.reservations) {
          if(travellerCheckinDate >= reservation.checkinDate.getTime() && travellerCheckinDate < reservation.checkoutDate.getTime()) {
            return false;
          }
        }

        let nextBusyDate: Date | null = null;
        for(let reservation of appartment.reservations) {
          if(reservation.checkinDate.getTime() > travellerCheckinDate) {
            nextBusyDate = reservation.checkinDate;

            if(travellerCheckoutDate >= nextBusyDate.getTime()){
              return false;
            }
            break;
          }
        }

      }
      
      return true;
    })
    
  }

  getAppartment():void {
    this.appartmentServiceSubscription = this.appartmentService.getActiveAppartments().subscribe(appartments => {
      this.appartments = appartments;
      this.filteredAppartments = appartments;
      console.log("appartments",appartments);
      
    })
  }


ngOnDestroy(): void {
    this.appartmentServiceSubscription.unsubscribe();
    this.bookingDataServiceSubscription.unsubscribe();
    this.discountServiceSubscription.unsubscribe();
}

  // showTraveller():void {
  //   console.log("traveller in booking-gestion",this.traveller);
    
  // }
}
