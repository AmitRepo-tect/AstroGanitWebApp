import { Injectable } from '@angular/core';
import { BirthDetail } from '../../../models/birthdetail.model';
import { DateTime } from '../../../models/date-time.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { KundliModel } from '../../../models/kundli.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VarshfalDasha } from '../../../models/VarshfalDasha.model';

@Injectable({
  providedIn: 'root'
})
export class VarshfalService {
  private kundliDataSubject = new BehaviorSubject<KundliModel | null>(null);
  kundliData$ = this.kundliDataSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api/kundli';
  private planetArrayForDasha = [8, 5, 0, 1, 2, 7, 4, 6, 3]
  private startYear: string = ""
  private startMonth: string = ""
  private startDay: string = ""
  private lang = "0"
  private birthDetailSubject = new BehaviorSubject<BirthDetail | null>(null);
  birthDetail$ = this.birthDetailSubject.asObservable();
  //private yearNumSubject = new BehaviorSubject<number | null>(null);
  //yearNum$ = this.yearNumSubject.asObservable();
  yearNum: number = -1
  varshfalYear: number = 2025
  arrayList: string[][] = [];
  constructor(private http: HttpClient) { }


  getKundliData(birthDetail: BirthDetail): Observable<KundliModel> {
    this.birthDetailSubject.next(birthDetail)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      name: birthDetail.getName(),
      sex: birthDetail.getSex(),
      dateTimeBean: {
        day: birthDetail.getDateTime().getDate(),
        month: parseInt(birthDetail.getDateTime().getMonth()) + 1,
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


    return this.http.post<KundliModel>(this.apiUrl, body, { headers });
  }
  setKundliData(kundliModel: KundliModel) {
    this.kundliDataSubject.next(kundliModel);
  }
  getLagnaKundliPlanetsRashiArray(planetDegree: number[]): number[] {
    let planetRashi: number[] = []
    for (let i = 0; i < planetDegree.length - 1; i++) {
      planetRashi[i] = Math.floor(planetDegree[i + 1] / 30.00) + 1
    }
    planetRashi[12] = Math.floor(planetDegree[0] / 30.00) + 1
    return planetRashi
  }
  getVarshfalBirthDetail(
    yearNO: number,
    birthDetail: BirthDetail,
    varshfalYear: number
  ): BirthDetail {
    this.yearNum = yearNO
    this.varshfalYear = varshfalYear
    if (yearNO == 0) { return birthDetail }
    let intJD = parseInt(this.calculateJdForVarshphal(birthDetail, varshfalYear).toString())
    let arrVarshPhal = this.getVarshphal(birthDetail, varshfalYear, intJD)

    let dateTime = new DateTime(
      arrVarshPhal[2],
      (arrVarshPhal[1] - 1).toString(),
      arrVarshPhal[0],
      arrVarshPhal[3],
      arrVarshPhal[4],
      arrVarshPhal[5]
    )
    return new BirthDetail(
      birthDetail.getName(),
      birthDetail.getSex(),
      birthDetail.getDst(),
      birthDetail.getKphn(),
      "0",
      "1",
      dateTime,
      birthDetail.getPlace(),
    )
  }
  calculateJdForVarshphal(birthDetailBean: BirthDetail, varshfalYear: number): number {
    let dateTime = birthDetailBean.getDateTime()
    let var1: number = parseInt(dateTime.getMonth())
    let var2: number = Number(dateTime.getYear()) + Number(Math.abs(varshfalYear - dateTime.getYear()));
    if (var1 < 3) {
      var1 += 12
      --var2
    }
    let var3 = Math.floor(var2 / 100)
    var1 = Math.floor(30.6 * (var1 + 1))
    return (var2 * 365 + Math.floor(var2 / 4) + var1 + 2 - var3 + Math.floor(var3 / 4) + Math.floor(dateTime.getDate()))
  }
  getVarshphal(
    birthDetail: BirthDetail,
    varYear: number,
    varjd: number
  ): number[] {
    let dateTime = birthDetail.getDateTime()
    var j = this.julianDate(dateTime.getDate(), parseInt(dateTime.getMonth()), dateTime.getYear())

    j = (j + 4) % 7
    var vj = varjd
    //StringBuffer()
    var var4: number = this.getConstantForYears(Math.abs(varYear - dateTime.getYear()))
    this.getDHMS(var4)
    let var6 = this.makeDHMStoDouble(j, dateTime.getHr(), dateTime.getMin(), dateTime.getSec())

    let var12: number[] = [];
    var12 = this.getDHMS(var4 + var6);
    if (var12[3] >= 60) {
      var12[2]++
      var12[3] %= 60
    }
    if (var12[2] >= 60) {
      var12[1]++
      var12[2] %= 60
    }
    if (var12[1] >= 24) {
      var12[0]++
      var12[1] %= 24
    }
    if (var12[0] >= 7) {
      var12[0] %= 7
    }
    vj = (vj + 4) % 7
    if (var12[0] >= 7) {
      var12[0] %= 7
    }
    var var10: number;
    if (var12[0] < vj) {
      var10 = (var12[0] + 7) - vj
    } else {
      var10 = var12[0] - vj
    }
    if (var10 > 3) {
      var10 -= 7
    }
    let day = Math.floor(Number(dateTime.getDate()) + var10)
    let hr = var12[1]
    let min = var12[2]
    let sec = var12[3]
    let year = Number(dateTime.getYear()) + Number(Math.abs(varYear - dateTime.getYear()))
    let month = Number(dateTime.getMonth())
    return [year, month, day, hr, min, sec]
  }
  private julianDate(day: number, month: number, year: number): number {
    let m = month
    let y = year
    if (m < 3) {
      m += 12
      --y
    }
    let var4 = Math.floor(y / 100)

    m = Math.floor(30.6 * (m + 1))

    return y * 365 + Math.floor(y / 4) + m + 2 - var4 + Math.floor(var4 / 4) + Number(day)
  }
  getDHMS(x: number): number[] {
    let var2: number[] = []
    let var3 = Math.floor(x)
    var2[0] = var3
    if (var2[0] > 6) {
      var2[0] %= 7
    }
    var var6: number = x - var3
    var x1 = Math.floor(var6 * 24.0)
    var2[1] = x1
    var6 = var6 * 24.0 - x1
    x1 = Math.floor(var6 * 60.0)
    var2[2] = x1
    var6 = var6 * 60.0 - x1
    x1 = Math.floor(var6 * 60.0)
    var2[3] = x1
    return var2
  }
  private getConstantForYears(varYear: number): number {
    return varYear * 1.256365740740741
  }
  makeDHMStoDouble(day: number, hour: number, min: number, sec: number): number {
    return day + hour / 24.0 + min / 1440.0 + sec / 86400.0
  }

  getMunthaPrediction(): Observable<{ desc: string }[]> {
    return this.http.get<{ desc: string }[]>('/assets/data/varshfal_muntha_bhav_desc.json');
  }
  getMuddaDasha(planetDegArray: number[], birthDetail: BirthDetail, varshfalYear: number, yearNo: number = -1, planetRashiArray: number[]): Array<VarshfalDasha> {

    let planetBhavArray = this.getRashiBhavArray(planetRashiArray[12])
    let arrayList = Array<VarshfalDasha>()
    let birthMahaDasha = this.getMahaDasaAtTimeOfBirth(planetDegArray)

    let calendar = this.getCalendarFromBirthDetail(birthDetail.getDateTime(), varshfalYear)
    var muddaDashaPlanet = (yearNo + birthMahaDasha) % 9

    let dateArray =
      this.calculateMuddaDashDate(birthDetail, varshfalYear, (yearNo + birthMahaDasha - 1) % 9)
    for (let i = 0; i <= 8; i++) {

      let startTime: string
      if (i == 0) {
        //calendar[Calendar.DATE].toString() + "/" + (calendar[Calendar.MONTH] + 1) + "/" + calendar[Calendar.YEAR]
        startTime = this.startDay + "/" + this.startMonth + "/" + this.startYear
      } else {
        startTime = dateArray[i - 1]
      }
      let endTime = dateArray[i]
      let planetRashi = planetRashiArray[this.planetArrayForDasha[muddaDashaPlanet]]
      let planetRashiBhav = planetBhavArray.indexOf(planetRashi) + 1
      // let dashaArray = if (Utility.getSelectedLanguage() == "en") {
      //   getEngDashaResultArray()
      // } else {
      //   getDashaResultArray()
      // }
      let dashaArray = this.arrayList
      // arrayList.push(
      //   new VarshfalDasha(
      //     muddaDashaPlanet,
      //     planetRashiBhav,
      //     startTime!,
      //     endTime!!,
      //     dashaArray[muddaDashaPlanet][planetRashiBhav - 1]
      //   )
      // )
      arrayList.push(
        new VarshfalDasha(
          muddaDashaPlanet,
          planetRashiBhav,
          startTime!,
          endTime!!,
          ""
        )
      )
      muddaDashaPlanet++
      if (muddaDashaPlanet >= 9) muddaDashaPlanet -= 9
    }

    return arrayList
  }
  private getRashiBhavArray(lagna: number): number[] {
    const array: number[] = new Array(12).fill(0);
    var lagna1 = lagna
    for (let i = 0; i <= 11; i++) {
      if (lagna1 > 12) {
        lagna1 = 1
      }
      array[i] = lagna1
      lagna1++
    }
    return array
  }
  private getMahaDasaAtTimeOfBirth(planetDegArray: number[]): number {
    return this.getNakshatra(planetDegArray[2])
  }
  private getNakshatra(moon: number): number {
    var nak = Math.floor(moon * 0.075)
    if (nak >= 18) nak -= 18
    if (nak >= 9) nak -= 9
    return nak
  }
  getCalendarFromBirthDetail(dateTime: DateTime, varshfalYear: number): Date {
    const year = varshfalYear;
    const month = +dateTime.getMonth(); // use + to ensure numeric
    const day = +dateTime.getDate();
    // Month is 0-based in JavaScript, so subtract 1 if your data is 1-based
    return new Date(year, month, day);
  }

  private calculateMuddaDashDate(
    birthDetail: BirthDetail,
    varshfalYear: number,
    getMahaDasaAtTimeOfBirth: number
  ): Array<string> {
    let intJD = this.calculateJdForVarshphal(birthDetail, varshfalYear)
    let arrVarshPhal = this.getVarshphal(birthDetail, varshfalYear, intJD)
    this.startYear = arrVarshPhal[0].toString()
    this.startMonth = arrVarshPhal[1].toString()
    this.startDay = arrVarshPhal[2].toString()
    var mahaDasaAtTimeOfBirth = getMahaDasaAtTimeOfBirth
    if (mahaDasaAtTimeOfBirth < 0) {
      mahaDasaAtTimeOfBirth = 0
    }
    return this.calculateIstLevelMuddaVimshottari(mahaDasaAtTimeOfBirth, arrVarshPhal)
  }
  private calculateIstLevelMuddaVimshottari(getMahaDasaAtTimeOfBirth: number, arrVarshPhal: number[]): Array<string> {
    let g = [1461, 438, 730, 511, 1314, 1168, 1387, 1241, 511]
    const date = new Date();
    date.setFullYear(arrVarshPhal[0]);
    date.setMonth(arrVarshPhal[1] - 1); // MONTH is 0-based in JS
    date.setDate(arrVarshPhal[2]);
    date.setHours(arrVarshPhal[3]);
    date.setMinutes(arrVarshPhal[4]);

    // If you want to match this part:
    const var2: (string)[] = new Array(9).fill(null);
    var var3 = 0
    var var1: number
    var var4: number
    var var5: number
    var var6: number
    var var7: string
    var4 = getMahaDasaAtTimeOfBirth
    while (var4 <= 8) {
      var1 = g[var4]
      date.setHours(date.getHours() + var1);
      var1 = date.getFullYear();
      var5 = date.getMonth() + 1
      var6 = date.getDate();
      var7 =
        this.makelength(var6.toString(), 2) + this.getSlashString(this.lang) + this.makelength(
          var5.toString(),
          2
        ) + this.getSlashString(this.lang) + var1
      var2[var3] = var7
      ++var3
      ++var4
    }
    if (getMahaDasaAtTimeOfBirth != 0) {
      var4 = 0
      while (var4 < getMahaDasaAtTimeOfBirth) {
        var1 = g[var4]

        date.setHours(date.getHours() + var1);
        var1 = date.getFullYear()
        var5 = date.getMonth() + 1
        var6 = date.getDate();
        var7 = this.makelength(
          var6.toString(),
          2
        ) + this.getSlashString(this.lang) + this.makelength(
          var5.toString(),
          2
        ) + this.getSlashString(this.lang) + var1
        var2[var3] = var7
        ++var3
        ++var4
      }
    }
    return var2
  }
  makelength(x: string, y: number): string {
    var x = x
    var y = y
    y -= x.length
    for (let var2 = 0; var2 < y; var2++) {
      x = '0' + x;
    }
    return x
  }
  getSlashString(lang: string): string {
    let var1 = '';
    if (lang.toLowerCase() === '0') {
      var1 = '/';
    } else if (lang.toLowerCase() === '1') {
      var1 = '@';
    }
    return var1;
  }
  getDashaResultArray(url: string): Observable<{ prediction: string }[]> {
    return this.http.get<{ prediction: string }[]>(url);
  }
}
