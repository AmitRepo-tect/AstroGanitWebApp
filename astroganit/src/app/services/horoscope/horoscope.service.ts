import { Injectable } from '@angular/core';
import { Person } from '../../models/person.model';
import { DailyHoroscope } from '../../models/daily-horoscope.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { YearlyHoroscope } from '../../models/yearly-horoscope.model';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  // private dailyHoroscope = '/api/dailyhoroscope/0/1';
  // private yearlyHoroscope = '/api/yearlyHoroscope/2025/1';
  //private dailyHoroscope = 'http://143.110.184.190:5000/api/dailyhoroscope/0/1';
  //private yearlyHoroscope = 'http://143.110.184.190:5000//api/yearlyHoroscope/2025/1';
  private dailyHoroscope = 'http://localhost:5000/api/dailyhoroscope/0/2';
  private yearlyHoroscope = 'http://localhost:5000/api/yearlyHoroscope/2025/1';
  private horoscopeDataSubject = new BehaviorSubject<DailyHoroscope[] | null>(null);
  horoscopeData$ = this.horoscopeDataSubject.asObservable();
  private yearlyHoroscopeDataSubject = new BehaviorSubject<YearlyHoroscope[] | null>(null);
  yearlyHoroscopeData$ = this.yearlyHoroscopeDataSubject.asObservable();
  constructor(private http: HttpClient) { }
  getDailyHoroscope(): Observable<DailyHoroscope[]> {
    return this.http.get<DailyHoroscope[]>(this.dailyHoroscope);
  }
  getYearlyHoroscope(): Observable<YearlyHoroscope[]> {
    return this.http.get<YearlyHoroscope[]>(this.yearlyHoroscope);  // Return the observable of custom object
  }
  setDailyHoroscopeData(dailyHoroscope: DailyHoroscope[]) {
    this.horoscopeDataSubject.next(dailyHoroscope);
  }
  setYearlyHoroscopeData(yearlyHoroscope: YearlyHoroscope[]) {
    this.yearlyHoroscopeDataSubject.next(yearlyHoroscope);
  }
}
