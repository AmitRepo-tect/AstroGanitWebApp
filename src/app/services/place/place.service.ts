import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Place } from '../../models/place.model';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }
  private placeUrl = 'http://143.110.184.190:5000/api/place/city/';
  private placeUrl1 = 'http://143.110.184.190:5000/api/place/city/jai';
  private placeUrl2 = "/api/place/city/"
  //private placeUrl1 = 'https://cors-anywhere.herokuapp.com/http://64.227.152.37:5000/api/place/city/jai';

  getCityInfo1(): Observable<Place[]> {
    return this.http.get<Place[]>(this.placeUrl2);  // Return the observable of custom object
  }
  getCityInfo(cityName: string): Observable<Place[]> {
    const url = `${this.placeUrl2}${cityName}`;
    return this.http.get<Place[]>(url);
  }
}
