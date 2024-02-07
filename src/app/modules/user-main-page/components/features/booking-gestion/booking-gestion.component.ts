import { Component, OnInit } from '@angular/core';
import { Traveller } from '../../../../../models/Traveller.model';
import { BookingDataService } from '../../../../../shared/booking-data.service';
import { PhotosService } from '../../../../../shared/photos.service';
import { Photo } from '../../../../../models/Photo.model';

@Component({
  selector: 'app-booking-gestion',
  templateUrl: './booking-gestion.component.html',
  styleUrl: './booking-gestion.component.scss'
})
export class BookingGestionComponent implements OnInit{

  constructor(private bookingDataService: BookingDataService, private photoService: PhotosService) {}

  traveller!: Traveller;
  allPhotos: Photo[] = []; 

  ngOnInit(): void {
     this.getTravellerData(); 
    //  this.photoService.getAllAppartmentPhotos().subscribe((photos:Photo[]) => this.allPhotos = photos);
    this.allPhotos = this.photoService.getAmbert1Photos();
     console.log("allPhotos",this.allPhotos);
     
  }

  getTravellerData() :void {
    this.bookingDataService.getTraveller().subscribe(traveller => this.traveller = traveller);
  }

  updateTravellerData(event: Traveller) :void {
    this.bookingDataService.setTraveller(event);
  }



  // showTraveller():void {
  //   console.log("traveller in booking-gestion",this.traveller);
    
  // }
}
