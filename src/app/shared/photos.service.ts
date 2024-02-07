
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/Photo.model';
// import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { 
    this.getAllPhotos();

  }

  private _allAppartmentPhotos: Photo[] = [];
  // private _allAppartmentPhotos = new BehaviorSubject<Photo[]>([]);

  private _ambert1Photos: Photo[] = [];
  private _ambert4Photos: Photo[] = [];
  private _ambert5Photos: Photo[] = [];
  private _illiersPhotos: Photo[] = [];




  getAllPhotos() :void {
    this.http.get<Photo []>('../../assets/json/appartmensPhotosURL.json').subscribe(
      (photos: Photo[]) => {
        this._allAppartmentPhotos = photos;
        // this._allAppartmentPhotos.next(photos);
        this._ambert1Photos = photos.filter(photo => photo.appartment === 'ambert1');
        this._ambert4Photos = photos.filter(photo => photo.appartment === 'ambert4');
        this._ambert5Photos = photos.filter(photo => photo.appartment === 'ambert5');
        this._illiersPhotos = photos.filter(photo => photo.appartment === 'illiers');
        console.log("allphotos in service", photos);
        
      }
    );
  }
 
  
  // getAllAppartmentPhotos(): Observable<Photo[]>{
  //   return this._allAppartmentPhotos.asObservable();
  // }
  getAllAppartmentPhotos(): Photo[]{
    return this._allAppartmentPhotos;
  }

  getAmbert1Photos(): Photo[]{
    return this._ambert1Photos;
  }

  getAmbert4Photos(): Photo[]{
    return this._ambert4Photos;
  }

  getAmbert5Photos(): Photo[]{
    return this._ambert5Photos;
  }

  getIlliersPhotos(): Photo[]{
    return this._illiersPhotos;
  }

}
