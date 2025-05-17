import { Injectable } from '@angular/core';
import { KundaliService } from '../kundali.service';
import { YoginiDashaBean } from '../../../models/YoginiDashaBean.model';
import { CharAntaraDashaBean } from '../../../models/CharAnterDasha.model';
import { add, parse } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class YoginiDashaService {
  duration = [1, 2, 3, 4, 5, 6, 7, 8]
  dashaNameArr = ["मंगला", "पिंगला", "धनिया", "भ्रमरी", "भद्रिका", "उल्का", "सिद्धा", "संकटा"]
  dashaStart: string[] = Array(24).fill('');
  dashaEnd: string[] = Array(24).fill('');
  monthNames: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  private planetDeg: number[] = []
  naksh!: number;
  constructor(private kundaliService: KundaliService) { }
  setData() {
    this.kundaliService.kundliData$.subscribe(data => {
      this.planetDeg = this.getPlanetDegreeArray(data?.planetDegree!)
      this.naksh = this.getNakshatra(this.planetDeg[2])

    });
  }
  getNakshatra(moonDeg: number): number {
    return Math.floor(moonDeg * 0.075)
  }
  private getPlanetDegreeArray(plaDegStr: string): number[] {
    let planetDegree: Array<string> = plaDegStr.split(",")
    let degree: number[] = Array(13).fill(0);
    for (let i = 0; i < planetDegree.length; i++) {
      degree[i] = parseFloat(planetDegree[i]);
    }
    return degree
  }
  private getYoginiDasha(): number {
    //let naksh = desktopHoroNew.getNakshatra()
    return (this.naksh + 3) % 8
  }
  getYoginiDashaData(): Array<YoginiDashaBean> {

    let arrayList: Array<YoginiDashaBean> = []
    var currentDasha = this.getYoginiDasha()
    this.initStartAndEndDate(currentDasha)
    const date = new Date();
    const calendar = new Date(date.getTime());

    let dateTime = this.kundaliService.getBirthDetail().getDateTime()
    calendar.setDate(dateTime.getDate());
    calendar.setMonth(parseInt(dateTime.getMonth()) - 1)
    calendar.setFullYear(dateTime.getYear())
    let balance = this.getBalanceOfDasha(this.planetDeg[2])
    //calendar.add(Calendar.DATE, balance[2])
    calendar.setDate(calendar.getDate() + balance[2]);
    //calendar.add(Calendar.MONTH, balance[1])
    calendar.setMonth(calendar.getMonth() + balance[1]);
    calendar.setFullYear(calendar.getFullYear() + balance[0]);
    //calendar.add(Calendar.YEAR, -duration[currentDasha])
    calendar.setFullYear(calendar.getFullYear() - this.duration[currentDasha]);

    var dashaName: string

    for (let i = 0; i <= 11; i++) {
      if (currentDasha > 7) {
        currentDasha = 0
      }
      let anterDashaArr = this.getAnterDasha(currentDasha, calendar)
      dashaName = this.dashaNameArr[currentDasha]
      anterDashaArr[0].startDate = this.dashaStart[i]
      anterDashaArr[anterDashaArr.length - 1].endDate = this.dashaEnd[i]

      arrayList.push(
        new YoginiDashaBean(
          dashaName,
          this.duration[currentDasha],
          this.dashaStart[i],
          this.dashaEnd[i],
          anterDashaArr
        )
      )
      currentDasha++
    }

    return arrayList
  }
  private initStartAndEndDate(dasha: number) {
    var dasa = dasha
    //val calendar = Calendar.getInstance().clone() as Calendar
    const now = new Date();
    const calendar = new Date(now.getTime());
    let dateTime = this.kundaliService.getBirthDetail().getDateTime()

    calendar.setDate(dateTime.getDate());
    calendar.setMonth(parseInt(dateTime.getMonth()) - 1)
    calendar.setFullYear(dateTime.getYear())

    let balance = this.getBalanceOfDasha(this.planetDeg[2])

    calendar.setDate(calendar.getDate() + balance[2]);
    calendar.setMonth(calendar.getMonth() + balance[1]);
    calendar.setFullYear(calendar.getFullYear() + balance[0]);
    calendar.setFullYear(calendar.getFullYear() - this.duration[dasa]);

    var startDate: string
    var endDate: string
    for (let i = 0; i <= 23; i++) {
      startDate =
        calendar.getDate().toString() + " " + this.monthNames[(calendar.getMonth()) % 12] + ", " + calendar.getFullYear()
      //calendar.setFullYear(this.duration[dasa % 8])
      calendar.setFullYear(calendar.getFullYear() + this.duration[dasa % 8]);
      endDate =
        calendar.getDate().toString() + " " + this.monthNames[(calendar.getMonth()) % 12] + ", " + calendar.getFullYear()
      this.dashaStart[i] = startDate
      this.dashaEnd[i] = endDate
      dasa++
    }
  }
  private getBalanceOfDasha(moonDeg: number): number[] {
    let dateArr: number[] = []
    var var1 = Math.floor(moonDeg / 13.3333)
    ++var1
    let var2: number = var1 * 13.3333 - moonDeg
    let var3 = var2 * this.duration[this.getYoginiDasha()] / 13.333
    dateArr[0] = Math.floor(var3)
    let var4: number = this.fract(var3) * 12.0
    dateArr[1] = Math.floor(var4)
    dateArr[2] = Math.floor((this.fract(var4) * 31.0))
    return dateArr
  }
  fract(x: number): number {
    let i: number = Math.trunc(x);
    let y: number = x - i
    return y
  }
  cal: Date | null = null;
  getAnterDasha(dasha: number, startDate: Date,): CharAntaraDashaBean[] {
    const arrayList: CharAntaraDashaBean[] = [];
    if (this.cal == null) {
      this.cal = new Date(startDate.getTime()); // clone date
    }

    let anterDasha = dasha;
    let startDateStr = `${this.cal.getDate()}/${this.cal.getMonth()}/${this.cal.getFullYear()}`;
    let endDateStr = '';

    const var11 = this.duration[anterDasha] / 36.0;


    for (let i = 0; i <= 7; i++) {
      if (anterDasha > 7) {
        anterDasha = 0;
      }

      const dashaName = this.dashaNameArr[anterDasha];
      const var13 = var11 * this.duration[anterDasha];

      const var6 = Math.floor(var13); // years
      const var17 = this.fract(var13) * 12.0;
      const var8 = Math.floor(var17); // months
      const var9 = Math.floor(this.fract(var17) * 31.0); // days


      // Add time to cloned date
      this.cal.setFullYear(this.cal.getFullYear() + var6);
      this.cal.setMonth(this.cal.getMonth() + var8);
      this.cal.setDate(this.cal.getDate() + var9);


      endDateStr = `${this.cal.getDate()} ${this.monthNames[this.cal.getMonth()]}, ${this.cal.getFullYear()}`;

      arrayList.push({
        planetName: dashaName,
        startDate: startDateStr,
        endDate: endDateStr
      });

      startDateStr = endDateStr;
      anterDasha++;
    }

    return arrayList;
  }
}
