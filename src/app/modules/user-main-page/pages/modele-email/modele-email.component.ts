import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BookingDataService } from '../../../../shared/booking-data.service';
import { Traveller } from '../../../../models/Traveller.model';
import { Appartment } from '../../../../models/Appartment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppartmentsService } from '../../../../shared/appartments.service';
import { SomeFunctionsService } from '../../../../shared/some-functions.service';
import { Discount } from '../../../../models/Discount.model';
import { DiscountService } from '../../../../shared/discount.service';

@Component({
  selector: 'app-modele-email',
  templateUrl: './modele-email.component.html',
  styleUrl: './modele-email.component.scss'
})
export class ModeleEmailComponent implements OnInit, OnDestroy {

  traveller!: Traveller;
  appartment!: Appartment;
  bookingDataServiceSubscription!: Subscription;
  appartmentServiceSubscription!: Subscription;
  paramsSubscription!: Subscription;
  discountServiceSubscription!: Subscription;
  imageRetour = '../../../../../assets/icons/icons8-flèche-gauche-gris.png';
  arrivalDate: string | undefined;
  departureDate: string | undefined;
  discount!: Discount;
  

  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private bookingDataService: BookingDataService, 
    private appartmentService: AppartmentsService, 
    private someFunctionService: SomeFunctionsService,
    private discountService: DiscountService) {

  }

  ngOnInit(): void {
      this.getTraveller();
      this.getAppartment();
      this.getDiscount();
      this.arrivalDate = this.someFunctionService.formatDate(this.traveller.checkinDate, "arrive");
      this.departureDate = this.someFunctionService.formatDate(this.traveller.checkoutDate, "depart");
  }

  get numberNight(): number | null {
    return this.someFunctionService.getNumberOfDays(this.traveller);
  };

  get travelPrice(): number | null {
    if(this.traveller.nbAdult > 0 && this.traveller.checkinDate && this.traveller.checkoutDate) {

      return this.appartment.calculateReservationPrice(this.traveller.nbAdult, this.traveller.nbChild, this.traveller.checkinDate, this.traveller.checkoutDate, this.discount);
    } else {
      return null;
    }
  }

  getDiscount():void {
    this.discountServiceSubscription = this.discountService.getDiscounts().subscribe(discount => this.discount = discount);
  }

  getTraveller():void {
    this.bookingDataServiceSubscription = this.bookingDataService.getTraveller().subscribe(traveller => this.traveller = traveller);
  }

  getAppartment(): void {
    this.paramsSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
        const appartmentId: number = parseInt(params.get('appartmentId') as string);
        console.log("appartmentId", appartmentId);
        

        this.appartmentServiceSubscription = this.appartmentService.getAppartments().subscribe((appartments: Appartment[]) => {
          
          console.log("appartments", appartments);
          

          try {
            this.appartment = appartments.find(appartment => appartment.id === appartmentId) as Appartment;
            
          } catch (error) {
            throw new Error('Aucun appartement ne match avec le requete (ou le type)')
          }

          
        })


    })
  }



  ngOnDestroy(): void {
      this.appartmentServiceSubscription.unsubscribe();
      this.bookingDataServiceSubscription.unsubscribe();
      this.discountServiceSubscription.unsubscribe();
  }

}
