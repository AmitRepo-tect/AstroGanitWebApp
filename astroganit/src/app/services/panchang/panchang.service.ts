import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PanchangResponse } from '../../models/panchang.model';
import { Place } from '../../models/place.model';
import { PanchangInput } from '../../models/panchanginput.model';
import { BhadraResponse } from '../../models/BhadraResponse.model';
import { PanchakResponse } from '../../models/PanchakResponse.model';
import { MuhuratResponse } from '../../models/muhurats.model';
import { FestDetailResponse } from '../../models/FestDetailResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PanchangService {
  //private apiUrl = 'http://143.110.184.190:5000/api/panchang';
  private apiUrl = 'http://localhost:5000/api/panchang';
  private bhadraApiUrl = 'http://localhost:5000/api/bhadra'
  private panchakApiUrl = 'http://localhost:5000/api/panchak'
  private muhuratApiUrl = 'http://localhost:5000/api/muhurat/'
  private festApiUrl = 'http://localhost:5000/api/festivals'

  private panchangDataSubject = new BehaviorSubject<PanchangResponse | null>(null);
  private PanchangInputSubject = new BehaviorSubject<PanchangInput | null>(null);
  private bhadraDataSubject = new BehaviorSubject<BhadraResponse | null>(null);
  private panchakDataSubject = new BehaviorSubject<PanchakResponse | null>(null);
  private vivahMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private vahanMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private grahPraveshMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private naamkaranMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private mundanMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private annaprasanMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private bhumiPujanMuhuratDataSubject = new BehaviorSubject<MuhuratResponse | null>(null);
  private festDataSubject = new BehaviorSubject<FestDetailResponse | null>(null);

  private placeSubject = new BehaviorSubject<Place | null>(null);
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  panchangData$ = this.panchangDataSubject.asObservable();
  panchangInput$ = this.PanchangInputSubject.asObservable();
  bhadraData$ = this.bhadraDataSubject.asObservable();
  panchakData$ = this.panchakDataSubject.asObservable();
  vivahMuhuratData$ = this.vivahMuhuratDataSubject.asObservable();
  vahanMuhuratData$ = this.vahanMuhuratDataSubject.asObservable();
  grahPraveshMuhuratData$ = this.grahPraveshMuhuratDataSubject.asObservable();
  naamkaranMuhuratData$ = this.naamkaranMuhuratDataSubject.asObservable();
  mundanMuhuratData$ = this.mundanMuhuratDataSubject.asObservable();
  annprashanMuhuratData$ = this.annaprasanMuhuratDataSubject.asObservable();
  bhumiPujanMuhuratData$ = this.bhumiPujanMuhuratDataSubject.asObservable();
  festData$ = this.festDataSubject.asObservable();
  place$ = this.placeSubject.asObservable();
  selectedDate$ = this.selectedDateSubject.asObservable();
  isPlaceInitilized: boolean = false

  constructor(private http: HttpClient) { }

  // Function to fetch Panchang data based on the parameters
  getPanchangData(city: string, state: string, latitude: string, longitude: string, timezone: string, day: number, month: number, year: number): Observable<PanchangResponse> {
    //console.log(city + state)
    //console.log(latitude + longitude)
    const body = {
      "langCode": 2,
      "panchangInputModel": {

        "place": {
          "city": city,
          "state": state,
          "latitude": latitude,
          "longitude": longitude,
          "timezone": timezone
        },
        "dateTimeInfo": {
          "day": day,
          "month": month,
          "year": year
        }
      }
    }
    return this.http.post<PanchangResponse>(this.apiUrl, body);
  }
  getBhadraData(city: string, state: string, latitude: string, longitude: string, timezone: string, day: number, month: number, year: number): Observable<BhadraResponse> {
    //console.log(city + state)
    //console.log(latitude + longitude)
    const body = {
      "langCode": 2,
      "panchangInputModel": {

        "place": {
          "city": city,
          "state": state,
          "latitude": latitude,
          "longitude": longitude,
          "timezone": timezone
        },
        "dateTimeInfo": {
          "day": day,
          "month": month,
          "year": year
        }
      }
    }
    console.log(body)
    return this.http.post<BhadraResponse>(this.bhadraApiUrl, body);
  }
  getPanchakData(city: string, state: string, latitude: string, longitude: string, timezone: string, day: number, month: number, year: number): Observable<PanchakResponse> {
    //console.log(city + state)
    //console.log(latitude + longitude)
    const body = {
      "langCode": 2,
      "panchangInputModel": {

        "place": {
          "city": city,
          "state": state,
          "latitude": latitude,
          "longitude": longitude,
          "timezone": timezone
        },
        "dateTimeInfo": {
          "day": day,
          "month": month,
          "year": year
        }
      }
    }
    console.log(body)
    return this.http.post<PanchakResponse>(this.panchakApiUrl, body);
  }
  getMuhuratData(id: number): Observable<MuhuratResponse> {
    var apiUrl = this.muhuratApiUrl + id
    return this.http.get<MuhuratResponse>(apiUrl);
  }
  getFestData(): Observable<FestDetailResponse> {
    return this.http.get<FestDetailResponse>(this.festApiUrl);
  }
  setPanchangData(panchangResponse: PanchangResponse) {
    this.panchangDataSubject.next(panchangResponse);
  }
  setPanchangInput(panchanginput: PanchangInput) {
    this.PanchangInputSubject.next(panchanginput);
  }
  setPlace(data: Place) {
    this.placeSubject.next(data);
    this.isPlaceInitilized = true;
  }
  setSelectedDate(date: Date) {
    this.selectedDateSubject.next(date);
  }
  setBhadraData(bhadraResponse: BhadraResponse) {
    this.bhadraDataSubject.next(bhadraResponse);
  }
  setPanchakData(panchakResponse: PanchakResponse) {
    this.panchakDataSubject.next(panchakResponse);
  }
  setVivahMuhuratData(muhuratResponse: MuhuratResponse) {
    this.vivahMuhuratDataSubject.next(muhuratResponse);
  }
  setVahanMuhuratData(muhuratResponse: MuhuratResponse) {
    this.vahanMuhuratDataSubject.next(muhuratResponse);
  }
  setGrahPraveshMuhuratData(muhuratResponse: MuhuratResponse) {
    this.grahPraveshMuhuratDataSubject.next(muhuratResponse);
  }
  setNaamkaranMuhuratData(muhuratResponse: MuhuratResponse) {
    this.naamkaranMuhuratDataSubject.next(muhuratResponse);
  }
  setMundanMuhuratData(muhuratResponse: MuhuratResponse) {
    this.mundanMuhuratDataSubject.next(muhuratResponse);
  }
  setAnnprashanMuhuratData(muhuratResponse: MuhuratResponse) {
    this.annaprasanMuhuratDataSubject.next(muhuratResponse);
  }
  setBhumiPujanMuhuratData(muhuratResponse: MuhuratResponse) {
    this.bhumiPujanMuhuratDataSubject.next(muhuratResponse);
  }
  setFestData(festDetailResponse: FestDetailResponse) {
    this.festDataSubject.next(festDetailResponse);
  }
}
