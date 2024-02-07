import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appartment } from '../models/Appartment.model';
import { Photo } from '../models/Photo.model';
import { ReservationDate } from '../models/ReservationDate.model';
import { PhotosService } from './photos.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppartmentsService {

  constructor(private http: HttpClient, private photoService: PhotosService) { 
    this.allPhotos = photoService.getAllAppartmentPhotos();
    this.getAppartments();
  }

  allPhotos: Photo[] = [];
  appartments: Appartment[] = []

  getAppartments():void {
    this.http.get<Appartment[]>('../../assets/json/appartmentsDescription.json').pipe(
      map((myAppartment: Appartment[]) => {
        
        const newAppartments = myAppartment.map(element => {

          const photos: Photo[] = this.allPhotos.filter(photo => photo.appartment === element.name);
          element.photos = photos;
          element.reservations = [];

          return element;
        })

        return newAppartments;
      })
    ).subscribe((appartments: Appartment[]) => this.appartments = appartments)
  }


}
