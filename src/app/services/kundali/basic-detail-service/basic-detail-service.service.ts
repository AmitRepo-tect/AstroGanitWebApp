import { Injectable } from '@angular/core';
import { KundaliService } from '../kundali.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicDetailServiceService {
  monthNames: string[] = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
  private personalDetailSubject = new BehaviorSubject<String[] | null>(null);
  private avakhadaDetailSubject = new BehaviorSubject<String[] | null>(null);
  private panchangDetailSubject = new BehaviorSubject<String[] | null>(null);
  personalDetailData$ = this.personalDetailSubject.asObservable();
  avakhadaDetailData$ = this.avakhadaDetailSubject.asObservable();
  panchangDetailData$ = this.panchangDetailSubject.asObservable();
  constructor(private kundaliService: KundaliService) { }
  getPersonalDetail() {
    let birthDetail = this.kundaliService.getBirthDetail()
    let arr: String[] = new Array(5);
    arr[0] = birthDetail?.getName()!;
    arr[1] = birthDetail?.getSex()!;
    arr[2] = birthDetail?.getDateTime().getDate() + " " + this.monthNames[parseInt(birthDetail?.getDateTime().getMonth())] + ", " + birthDetail?.getDateTime().getYear();
    arr[3] = birthDetail?.getDateTime().getHr() + ":" + birthDetail?.getDateTime().getMin() + ":" + birthDetail?.getDateTime().getSec();

    if (birthDetail?.getPlace().state != "") {
      arr[4] = birthDetail?.getPlace().place! + "," + birthDetail?.getPlace().state!;;
    } else {
      arr[4] = birthDetail?.getPlace().place!;
    }
    arr[5] = birthDetail?.getPlace().country!;
    arr[6] = birthDetail?.getPlace().latDeg! + ":" + birthDetail?.getPlace().latMin + ":" + birthDetail?.getPlace().latNS;
    arr[7] = birthDetail?.getPlace().longDeg! + ":" + birthDetail?.getPlace().longMin + ":" + birthDetail?.getPlace().longEW;
    this.personalDetailSubject.next(arr);

  }
  getPanchangDetail() {
    this.kundaliService.kundliData$.subscribe(data => {
      if (data != null) {
        let arr: String[] = new Array(5);
        arr[0] = data?.tithi!;
        arr[1] = data?.hinduWeekDay!;
        arr[2] = data?.paksha!;
        arr[3] = data?.yoga!;
        arr[4] = data?.karan!;
        arr[5] = data?.sunRiseTime!;
        arr[6] = data?.sunSetTime!;

        this.panchangDetailSubject.next(arr);
      } else {
        this.fetchKundliData();
      }
    });
  }
  getAvakadaDetail() {
    this.kundaliService.kundliData$.subscribe(data => {
      let arr: String[] = new Array(20);
      arr[0] = data?.paya!;
      arr[1] = data?.varna!;
      arr[2] = data?.yoni!;
      arr[3] = data?.gana!;
      arr[4] = data?.vasya!;
      arr[5] = data?.nadi!;
      arr[6] = data?.balanceOfDasha!;
      arr[7] = data?.lagnaA!;
      arr[8] = data?.lagnaLord!;
      arr[9] = data?.rasi!;
      arr[10] = data?.rasiLord!;
      arr[11] = data?.nakshatraPada!;
      arr[12] = data?.nakshatraLord!;
      arr[13] = data?.julianDay!;
      arr[14] = data?.sunSignIndian!;
      arr[15] = data?.sunSignWestern!;
      arr[16] = data?.ayanamsaName!;
      arr[17] = data?.ayanamsa!;
      arr[18] = data?.obliquity!;
      arr[19] = data?.sideralTime!;
      this.avakhadaDetailSubject.next(arr);
    });
  }
  fetchKundliData() {
    this.kundaliService.getKundliData(this.kundaliService.getBirthDetail()).subscribe(
      data => {
        this.kundaliService.setKundliData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
}
