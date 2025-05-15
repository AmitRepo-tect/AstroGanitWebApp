import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KundliModel } from '../../models/kundli.model';
import { BirthDetail } from '../../models/birthdetail.model';
import { DateTime } from '../../models/date-time.model';
import { Place } from '../../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class KundaliService {
  private apiUrl = 'http://143.110.184.190:5000/api/kundli';
  private downloadUrl = 'http://143.110.184.190:5000/api/kundli';
  private kundliDataSubject = new BehaviorSubject<KundliModel | null>(null);
  //private birthDatailSubject = new BehaviorSubject<BirthDetail | null>(null);
  kundliData$ = this.kundliDataSubject.asObservable();
  //birthDetail$ = this.birthDatailSubject.asObservable();

  constructor(private http: HttpClient) { }

  setBirthDetail(data: BirthDetail) {
    //this.birthDetail = data;
    localStorage.setItem('BirthDetail', JSON.stringify(data));
  }

  getBirthDetail() {
    let birthDetail: BirthDetail = new BirthDetail()
    const stored = localStorage.getItem('BirthDetail');
    if (stored) {
      const obj = JSON.parse(stored);
      obj.dateTime = Object.assign(new DateTime(), obj.dateTime);
      obj.place = Object.assign(new Place(), obj.place);
      birthDetail = Object.assign(new BirthDetail(), obj);
    }
    return birthDetail;
  }

  getKundliData(birthDetail: BirthDetail): Observable<KundliModel> {
    this.setBirthDetail(birthDetail)

    // const body = {
    //   place: {
    //     city: birthDetail.getPlace().place,
    //     state: birthDetail.getPlace().state
    //   },
    //   dateTimeInfo: {
    //     day: birthDetail.getDateTime().getDate(),
    //     month: birthDetail.getDateTime().getMonth(),
    //     year: birthDetail.getDateTime().getYear()
    //   }
    // };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      name: birthDetail.getName(),
      sex: birthDetail.getSex(),
      dateTimeBean: {
        day: birthDetail.getDateTime().getDate(),
        month: parseInt(birthDetail.getDateTime().getMonth()),
        year: birthDetail.getDateTime().getYear(),
        hrs: birthDetail.getDateTime().getHr(),
        min: birthDetail.getDateTime().getMin(),
        sec: birthDetail.getDateTime().getSec(),
      },
      placeDetail: {
        place: birthDetail.getPlace().place,
        latDeg: birthDetail.getPlace().latDeg,
        latMin: birthDetail.getPlace().latMin,
        latNS: birthDetail.getPlace().latNS,
        longDeg: birthDetail.getPlace().longDeg,
        longMin: birthDetail.getPlace().longMin,
        longEW: birthDetail.getPlace().longEW,
        state: birthDetail.getPlace().state,
        country: birthDetail.getPlace().country,
        timezone: birthDetail.getPlace().timezone,
        timezoneStr: birthDetail.getPlace().timezoneStr
      },
      dst: birthDetail.getDst(),
      ayanamsa: birthDetail.getAyanamsa(),
      charting: "1",
      kphn: "0",
      button1: "",
      languageCode: birthDetail.getLanguageCode(),
    };
    console.log(body)
    return this.http.post<KundliModel>(this.apiUrl, body, { headers });
  }
  // downloadPdf(birthDetail: any) {
  //   return this.http.post(this.downloadUrl, birthDetail, {
  //     responseType: 'blob'
  //   });
  // }
  downloadPdf(birthDetail: any) {
    // return this.http.post(this.apiUrl, birthDetail, {
    //   responseType: 'blob', // ensures we get binary PDF
    //   observe: 'response'   // needed to access headers if needed
    // });
    const params = {
      name: 'John',
      sex: 'M',
      day: '01',
      month: '01',
      year: '1990',
      hrs: '10',
      min: '30',
      sec: '00',
      place: 'New York',
      latDeg: '40',
      latMin: '43',
      latNS: 'N',
      longDeg: '74',
      longMin: '00',
      longEW: 'W',
      state: 'NY',
      country: 'USA',
      timezone: '5.5',
      timezoneStr: '5.5',
      dst: '0',
      ayanamsa: '0',
      charting: '1',
      kphn: '0',
      button1: 'submit',
      languageCode: '0'
    };

    this.http.get('http://localhost:8080/generatepdf', {
      params,
      responseType: 'blob'
    }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'drawing.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error', error);
    });
  }

  setKundliData(kundliModel: KundliModel) {
    this.kundliDataSubject.next(kundliModel);
  }
}
