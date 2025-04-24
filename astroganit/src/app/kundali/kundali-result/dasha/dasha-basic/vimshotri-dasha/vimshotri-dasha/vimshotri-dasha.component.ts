import { Component, OnInit } from '@angular/core';
import { DasaBean } from '../../../../../../models/DasaBean.model';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';
import { DashaService } from '../../../../../../services/kundali/dasha-service/dasha-service.service';

@Component({
  selector: 'app-vimshotri-dasha',
  templateUrl: './vimshotri-dasha.component.html',
  styleUrl: './vimshotri-dasha.component.scss'
})
export class VimshotriDashaComponent implements OnInit {
  tabType: number = 1
  private selectedVimPlanet = 0
  private selectedAntPlanet = 0
  private selectedPraPlanet = 0
  private selectedSookPlanet = 0

  private arrVimDasa: Array<string> = ['केतु', 'शुक्र', 'सूर्य', 'चंद्र', 'मंगल', 'राहु', 'गुरु', 'शनि', 'बुध']
  private mahaDasaArr: Array<DasaBean> = []
  vimDasaArr: Array<DasaBean> = []
  clickedCount = 0
  private antaraDasaArr: Array<DasaBean> = []
  private pratyantraDasaArr: Array<DasaBean> = []
  private sookshamDasaArr: Array<DasaBean> = []
  private pranaDasaArr: Array<DasaBean> = []
  private titles: Array<String> = []
  constructor(private kundliService: KundaliService, private dashaService: DashaService) { }
  ngOnInit(): void {
    this.dashaService.getDashaDetail()
    this.vimDasaArr = this.getVimDasaFormmattedData()
  }
  changeHoroscopeType(tabType: number) {
    this.tabType = tabType
  }
  private getVimDasaFormmattedData(): Array<DasaBean> {
    const arrayList: DasaBean[] = [];
    var dateTime = this.kundliService.getBirthDetail().getDateTime()
    let lastEndDate =
      dateTime.getYear() + parseInt(dateTime.getMonth()) / 12.00 + dateTime.getDate() / 365.00

    this.mahaDasaArr = this.dashaService.getVimshttariMahaDasa(lastEndDate)
    for (let i = 0; i < this.mahaDasaArr.length; i++) {
      this.mahaDasaArr[i].planetName = (this.arrVimDasa[this.mahaDasaArr[i].planetNo])
      this.mahaDasaArr[i].dasaTimeStr = this.doubleToStringDateDDMMYY(this.mahaDasaArr[i].dasaTime, "/")
      arrayList[i] = this.mahaDasaArr[i]
    }
    return arrayList
  }
  doubleToStringDateDDMMYY(doubleDate: number, forwardSlash: string): string {
    let sb: string = "";
    let sMM: string
    let sDD: string
    let sYY: string
    let dd: number
    let yy: number = Math.floor(doubleDate);
    var mm: number = Math.floor(this.dashaService.fract(doubleDate) * 12) + 1
    dd = Math.floor(this.dashaService.fract(this.dashaService.fract(doubleDate) * 12) * 31)
    if (dd == 0) dd = 1
    if (dd > 28 && mm == 2) {
      mm += 1
      if (this.isLeapYear(yy)) { dd -= 29 } else { dd -= 28 }
    }
    sDD = dd.toString().replace(",", "")
    sMM = mm.toString()

    if (sDD.trim().length > 1) { sb += sDD } else { sb += ("0" + sDD) }
    sb += forwardSlash

    if (sMM.trim().length > 1) { sb += sMM } else { sb += ("0" + sMM) }
    sb += forwardSlash

    sYY = yy.toString()
    sb += sYY

    return sb.toString()
  }
  isLeapYear(year: number): Boolean {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0
  }
  onItemClick(pos: number) {
    switch (this.clickedCount) {
      case 0:
        this.selectedVimPlanet = pos;
        this.vimDasaArr = this.getAntaraDasaFormmattedData(pos);
        break;

      case 1:
        this.selectedAntPlanet = pos;
        this.vimDasaArr = this.getPratyantraDasaFormmattedData(pos);
        break;

      case 2:
        this.selectedPraPlanet = pos;
        this.vimDasaArr = this.getSookshmaDasaFormmattedData(pos);

        break;

      case 3:
        this.selectedSookPlanet = pos;
        this.vimDasaArr = this.getPranaDasaFormmattedData(pos);
        break;

      default:
        console.warn('Unexpected clickedCount:', this.clickedCount);
    }
    if (this.clickedCount < 4) {
      this.clickedCount++
    }
  }
  changeDasaOnBackPress() {
    this.clickedCount--
    switch (this.clickedCount) {
      case 0: {
        this.vimDasaArr = (this.getVimDasaFormmattedData())
        break;
      }
      case 1: {
        this.vimDasaArr = (this.getAntaraDasaFormmattedData(this.selectedAntPlanet))
        break;
      }
      case 2: {
        this.vimDasaArr = (this.getPratyantraDasaFormmattedData(this.selectedPraPlanet))
        break;
      }
      case 3: {
        this.vimDasaArr = (this.getSookshmaDasaFormmattedData(this.selectedSookPlanet))
        break;
      }
    }

  }
  private getAntaraDasaFormmattedData(pos: number): Array<DasaBean> {
    const arrayList: DasaBean[] = [];
    let plaNo = this.mahaDasaArr[this.selectedVimPlanet].planetNo
    this.antaraDasaArr = this.dashaService.getAntaraDasa(pos, this.mahaDasaArr)
    for (let i = 0; i < this.antaraDasaArr.length; i++) {
      this.antaraDasaArr[i].planetName = this.arrVimDasa[plaNo] + "/" + this.arrVimDasa[this.antaraDasaArr[i].planetNo]
      this.antaraDasaArr[i].dasaTimeStr = this.doubleToStringDateDDMMYY(this.antaraDasaArr[i].dasaTime, "/")
      arrayList[i] = this.antaraDasaArr[i]
    }
    return arrayList
  }
  private getPratyantraDasaFormmattedData(pos: number): Array<DasaBean> {
    const arrayList: DasaBean[] = [];
    let lastEndDate = this.mahaDasaArr[this.selectedVimPlanet].dasaTime
    this.pratyantraDasaArr = this.dashaService.getVimPratyantraDasa(pos, this.antaraDasaArr, lastEndDate)
    let plaNo = this.mahaDasaArr[this.selectedVimPlanet].planetNo
    let plaNo1 = this.antaraDasaArr[pos].planetNo
    for (let i = 0; i < this.pratyantraDasaArr.length; i++) {
      this.pratyantraDasaArr[i].planetName =
        this.arrVimDasa[plaNo] + "/" + this.arrVimDasa[plaNo1] + "/" + this.arrVimDasa[this.pratyantraDasaArr[i].planetNo]
      this.pratyantraDasaArr[i].dasaTimeStr = this.doubleToStringDateDDMMYY(this.pratyantraDasaArr[i].dasaTime, "/")
      arrayList[i] = this.pratyantraDasaArr[i]
    }
    return arrayList
  }
  private getSookshmaDasaFormmattedData(pos: number): Array<DasaBean> {
    const arrayList: DasaBean[] = [];
    let lastEndDate: number;
    if (pos == 0) {
      if (this.selectedVimPlanet > 0) {
        lastEndDate = this.antaraDasaArr[this.selectedVimPlanet - 1].dasaTime
      } else {
        lastEndDate = this.mahaDasaArr[this.selectedVimPlanet].dasaTime
      }
    } else {
      lastEndDate = this.pratyantraDasaArr[pos - 1].dasaTime
    }
    this.sookshamDasaArr = this.dashaService.getVimPratyantraDasa(pos, this.pratyantraDasaArr, lastEndDate)
    let plaNo = this.mahaDasaArr[this.selectedVimPlanet].planetNo
    let plaNo1 = this.antaraDasaArr[this.selectedAntPlanet].planetNo
    let plaNo2 = this.pratyantraDasaArr[pos].planetNo
    for (let i = 0; i < this.sookshamDasaArr.length; i++) {
      this.sookshamDasaArr[i].planetName =
        this.arrVimDasa[plaNo] + "/" + this.arrVimDasa[plaNo1] + "/" + this.arrVimDasa[plaNo2] + "/" + this.arrVimDasa[this.sookshamDasaArr[i].planetNo]
      this.sookshamDasaArr[i].dasaTimeStr = this.doubleToStringDateDDMMYY(this.sookshamDasaArr[i].dasaTime, "/")
      arrayList[i] = this.sookshamDasaArr[i]
    }
    return arrayList
  }

  private getPranaDasaFormmattedData(pos: number): Array<DasaBean> {
    const arrayList: DasaBean[] = [];
    let lastEndDate: number;
    if (pos == 0) {
      if (this.selectedPraPlanet > 0) {
        lastEndDate = this.pratyantraDasaArr[this.selectedPraPlanet - 1].dasaTime
      } else {
        if (this.selectedAntPlanet > 0) {
          lastEndDate = this.antaraDasaArr[this.selectedAntPlanet - 1].dasaTime
        } else {
          lastEndDate = this.mahaDasaArr[this.selectedVimPlanet].dasaTime
        }
      }
    } else {
      lastEndDate = this.sookshamDasaArr[pos - 1].dasaTime
    }
    this.pranaDasaArr = this.dashaService.getVimPratyantraDasa(pos, this.sookshamDasaArr, lastEndDate)
    let plaNo = this.mahaDasaArr[this.selectedVimPlanet].planetNo
    let plaNo1 = this.antaraDasaArr[this.selectedAntPlanet].planetNo
    let plaNo2 = this.pratyantraDasaArr[this.selectedPraPlanet].planetNo
    let plaNo3 = this.sookshamDasaArr[this.selectedSookPlanet].planetNo
    for (let i = 0; i < this.pranaDasaArr.length; i++) {
      this.pranaDasaArr[i].planetName =
        this.arrVimDasa[plaNo] + "/" + this.arrVimDasa[plaNo1] + "/" + this.arrVimDasa[plaNo2] + "/" + this.arrVimDasa[plaNo3] + "/" + this.arrVimDasa[this.pranaDasaArr[i].planetNo]
      this.pranaDasaArr[i].dasaTimeStr = this.doubleToStringDateDDMMYY(this.pranaDasaArr[i].dasaTime, "/")
      arrayList[i] = this.pranaDasaArr[i]
    }
    return arrayList
  }
}
