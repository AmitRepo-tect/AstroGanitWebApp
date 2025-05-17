import { Component, OnInit } from '@angular/core';
import { DasaBean } from '../../../../models/DasaBean.model';
import { KundaliService } from '../../../../services/kundali/kundali.service';
import { DashaService } from '../../../../services/kundali/dasha-service/dasha-service.service';

@Component({
  selector: 'app-dasha-basic',
  templateUrl: './dasha-basic.component.html',
  styleUrl: './dasha-basic.component.scss'
})
export class DashaBasicComponent implements OnInit {
  tabType: number = 1
  private selectedVimPlanet = 0
  private selectedAntPlanet = 0
  private selectedPraPlanet = 0
  private selectedSookPlanet = 0
  private arrVimDasa: Array<string> = ['Ke', 'Ve', 'Su', 'Mo', 'Ma', 'Ra', 'Ju', 'Sa', 'Me']
  private mahaDasaArr: Array<DasaBean> = []
  private vimDasaArr: Array<DasaBean> = []
  private antaraDasaArr: Array<DasaBean> = []
  private pratyantraDasaArr: Array<DasaBean> = []
  private sookshamDasaArr: Array<DasaBean> = []
  private pranaDasaArr: Array<DasaBean> = []
  private titles: Array<String> = []
  constructor(private kundliService: KundaliService, private dashaService: DashaService) { }
  ngOnInit(): void {
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
    //_dDob = _year + _month / 12.00 + _day / 365.00;
    this.mahaDasaArr = this.dashaService.getVimshttariMahaDasa(lastEndDate)
    for (let i = 0; i < this.mahaDasaArr.length; i++) {
      this.mahaDasaArr[i].planetName = this.arrVimDasa[this.mahaDasaArr[i].planetNo]
      this.mahaDasaArr[i].dasaTimeStr = this.doubleToStringDateDDMMYY(this.mahaDasaArr[i].dasaTime, "/")
      arrayList[i] = this.mahaDasaArr[i]
    }
    return arrayList
  }
  doubleToStringDateDDMMYY(doubleDate: number, forwardSlash: string): string {
    let sb: string[] = [];
    let sMM: string
    let sDD: string
    let sYY: string
    let dd: number
    let yy: number = Math.floor(doubleDate);
    var mm: number = Math.floor(this.dashaService.fract(doubleDate) * 12) + 1
    dd =
      Math.floor(this.dashaService.fract(this.dashaService.fract(doubleDate) * 12) * 31)
    if (dd == 0) dd = 1

    if (dd > 28 && mm == 2) {
      mm += 1
      if (this.isLeapYear(yy)) { dd -= 29 } else { dd -= 28 }
    }

    // END
    sDD = dd.toString()
    sMM = mm.toString()
    // FOR DAY
    if (sDD.trim().length > 1) { sb.push(sDD) } else { sb.push("0$sDD") }

    // sb.append('/');// for day
    // sb.append(CUtils.getForwardSlash());// for day
    sb.push(forwardSlash) // for day

    // FOR MONTH
    if (sMM.trim().length > 1) { sb.push(sMM) } else { sb.push("0$sMM") }

    // sb.append('/');// for day
    // sb.append(CUtils.getForwardSlash());
    sb.push(forwardSlash)
    sYY = yy.toString()
    // FOR YEAR
    // sb.append('/');
    sb.push(sYY)

    // return (dd + '/' + mm + '/' + yy);
    return sb.toString()
  }
  isLeapYear(year: number): Boolean {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0
  }
}
