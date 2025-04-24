import { Injectable } from '@angular/core';
import { KundaliService } from '../kundali.service';
import { BehaviorSubject } from 'rxjs';
import { DasaBean } from '../../../models/DasaBean.model';

@Injectable({
  providedIn: 'root'
})
export class DashaService {
  private dashaDetailSubject = new BehaviorSubject<String[] | null>(null);
  dashaDetailData$ = this.dashaDetailSubject.asObservable();
  private planetDeg: number[] = []
  private yearOfVimPlanets: number[] = [7, 20, 6, 10, 7, 18, 16, 19, 17];
  constructor(private kundaliService: KundaliService) { }
  getDashaDetail() {
    this.kundaliService.kundliData$.subscribe(data => {
      this.planetDeg = this.getPlanetDegreeArray(data?.planetDegree!)
    });
  }
  private getPlanetDegreeArray(plaDegStr: string): number[] {
    let planetDegree: Array<string> = plaDegStr.split(",")
    let degree: number[] = Array(13).fill(0);
    for (let i = 0; i < planetDegree.length; i++) {
      degree[i] = parseFloat(planetDegree[i]);
    }
    return degree
  }
  getVimshttariMahaDasa(lastEndDate: number): Array<DasaBean> {
    let vimshttariMahaDasa: DasaBean[] = new Array(9).fill(null).map(() => new DasaBean());
    try {
      vimshttariMahaDasa = this.getMahaDasa(lastEndDate, this.planetDeg[2])

    } catch (e) {

    }
    return vimshttariMahaDasa
  }
  private getNakshatra(moon: number): number {
    var nak = Math.floor(moon * 0.075)
    if (nak >= 18) nak -= 18
    if (nak >= 9) nak -= 9
    return nak
  }
  private getMahaDasa(lastEndDate: number, moonDeg: number): Array<DasaBean> {
    let dasaFirstLevel = new Array(9).fill(null).map(() => new DasaBean());
    let index = 0
    let plaNo = this.getNakshatra(moonDeg)
    let balance = this.calculateBalance(moonDeg)
    var endDate = lastEndDate + balance
    do {
      dasaFirstLevel[index] = new DasaBean()
      dasaFirstLevel[index].planetNo = plaNo
      dasaFirstLevel[index].dasaTime = endDate
      plaNo++
      if (plaNo >= 9) plaNo -= 9
      index++
      endDate += this.yearOfVimPlanets[plaNo]
    } while (index < 9)
    return dasaFirstLevel
  }
  private calculateBalance(moon: number) {
    let n0: number
    let balance: number //double
    let q: number
    let d0: number = moon
    d0 = 9.0 * this.fract(d0 / 120)
    n0 = this.fract(d0)
    q = Math.floor(d0)
    balance = (1 - n0) * this.yearOfVimPlanets[q]
    return balance
  }
  fract(doubleValue: number): number {
    return doubleValue - Math.floor(doubleValue);
  }
  getAntaraDasa(pos: number, preDasaArray: Array<DasaBean>): Array<DasaBean> {
    let index = 0
    let antaraDasaArray = new Array(9).fill(null).map(() => new DasaBean());
    let periodSpan: number
    let lastEndDate: number
    if (pos == 0) {
      periodSpan = this.yearOfVimPlanets[preDasaArray[0].planetNo]
      lastEndDate = preDasaArray[0].dasaTime - this.yearOfVimPlanets[preDasaArray[0].planetNo]
    } else {
      periodSpan = preDasaArray[pos].dasaTime - preDasaArray[pos - 1].dasaTime
      lastEndDate = preDasaArray[pos - 1].dasaTime
    }
    let plaNo = preDasaArray[pos].planetNo
    let total = 120 * this.yearOfVimPlanets[plaNo] / 120
    if (periodSpan < 0) {
      periodSpan += total
      lastEndDate -= total
    }
    do {
      lastEndDate += periodSpan * this.yearOfVimPlanets[plaNo] / 120
      antaraDasaArray[index] = new DasaBean()
      antaraDasaArray[index].planetNo = plaNo
      antaraDasaArray[index].dasaTime = lastEndDate
      plaNo++
      if (plaNo >= 9) plaNo -= 9
      index++
    } while (index < 9)
    return antaraDasaArray
  }

  getVimPratyantraDasa(pos: number, objArrPrDasa: Array<DasaBean>, lastdashatime: number): Array<DasaBean> {
    let index = 0
    let plaNo: number
    let pratyantraDasaArray = new Array(9).fill(null).map(() => new DasaBean());
    let tempArrPrDasa: Array<DasaBean>
    var periodSpan: number
    var lastEndDate: number
    try {
      tempArrPrDasa = objArrPrDasa
      if (pos == 0) {
        periodSpan = tempArrPrDasa[0].dasaTime - lastdashatime
        lastEndDate = lastdashatime
      } else {
        periodSpan = tempArrPrDasa[pos].dasaTime - tempArrPrDasa[pos - 1].dasaTime
        lastEndDate = tempArrPrDasa[pos - 1].dasaTime
      }
      plaNo = tempArrPrDasa[pos].planetNo
      let total = 120 * this.yearOfVimPlanets[plaNo] / 120
      if (periodSpan < 0) {
        periodSpan += total
        lastEndDate -= total
      }
      do {
        lastEndDate += periodSpan * this.yearOfVimPlanets[plaNo] / 120
        pratyantraDasaArray[index] = new DasaBean()
        pratyantraDasaArray[index].planetNo = plaNo
        pratyantraDasaArray[index].dasaTime = lastEndDate
        plaNo++
        if (plaNo >= 9) plaNo -= 9
        index++
      } while (index < 9)
    } catch (e) {
      throw e
    }
    return pratyantraDasaArray
  }
}
