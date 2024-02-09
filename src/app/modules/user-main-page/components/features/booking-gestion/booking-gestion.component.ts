import { Component, OnInit } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { BookingDataService } from '../../../../../shared/booking-data.service';
import { Photo } from '../../../../../models/Photo.model';
import { AppartmentsService } from '../../../../../shared/appartments.service';
import { Appartment } from '../../../../../models/Appartment.model';

@Component({
  selector: 'app-booking-gestion',
  templateUrl: './booking-gestion.component.html',
  styleUrl: './booking-gestion.component.scss'
})
export class BookingGestionComponent implements OnInit{

  constructor(private bookingDataService: BookingDataService, private appartmentService: AppartmentsService) {}

  traveller!: Traveller;
  appartments: Appartment[] = [];

  ngOnInit(): void {
     this.getTravellerData(); 
     this.getAppartment();
    //  this.photoService.getAllAppartmentPhotos().subscribe((photos:Photo[]) => this.allPhotos = photos);
     
  }

  getTravellerData() :void {
    this.bookingDataService.getTraveller().subscribe(traveller => this.traveller = traveller);
  }

  updateTravellerData(event: Traveller) :void {
    this.bookingDataService.setTraveller(event);
  }

  getAppartment():void {
    this.appartmentService.getAppartments().subscribe(appartments => this.appartments = appartments)
  }



  // showTraveller():void {
  //   console.log("traveller in booking-gestion",this.traveller);
    
  // }
}
