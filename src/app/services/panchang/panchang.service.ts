import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PanchangResponse } from '../../models/panchang.model';
import { Place } from '../../models/place.model';
import { PanchangInput } from '../../models/panchanginput.model';

@Injectable({
  providedIn: 'root'
})
export class PanchangService {
  private apiUrl = 'http://143.110.184.190:5000/api/panchang';

  private panchangDataSubject = new BehaviorSubject<PanchangResponse | null>(null);
  private PanchangInputSubject = new BehaviorSubject<PanchangInput | null>(null);

  private placeSubject = new BehaviorSubject<Place | null>(null);
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  panchangData$ = this.panchangDataSubject.asObservable();
  panchangInput$ = this.PanchangInputSubject.asObservable();
  place$ = this.placeSubject.asObservable();
  selectedDate$ = this.selectedDateSubject.asObservable();
  isPlaceInitilized: boolean = false

  constructor(private http: HttpClient) { }

  // Function to fetch Panchang data based on the parameters
  getPanchangData(city: string, state: string, latitude: string, longitude: string, timezone: string, day: number, month: number, year: number): Observable<PanchangResponse> {
    console.log(city + state)
    console.log(latitude + longitude)
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
}
