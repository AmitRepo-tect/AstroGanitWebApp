import { Component } from '@angular/core';
import { VarshfalService } from '../../../../../../services/kundali/varshfal-service/varshfal-service.service';
import { BasicKundliPlanetData } from '../../../../../../models/BasicKundliPlanetData.model';
import { KundliModel } from '../../../../../../models/kundli.model';

@Component({
  selector: 'app-varshfal-table',
  templateUrl: './varshfal-table.component.html',
  styleUrl: './varshfal-table.component.scss'
})
export class VarshfalTableComponent {
  planetDataList: BasicKundliPlanetData[] = new Array(13)
  constructor(private varshfalService: VarshfalService) { }
  ngOnInit(): void {
    this.addObservers()
  }
  addObservers() {

    this.varshfalService.kundliData$.subscribe(data => {
      const degreeSign = "°";
      const minuteSign = "'";
      const secondSign = '"';
      let plaDeg = this.getPlanetDegreeArray(data!)
      let combustArr = this.getCombustArray(data!)
      let retrograteArr = this.getRetrograteArray(data!)
      let planetName = ['लग्न', 'सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'राहु', 'केतु', 'यूरेनस', 'नेपच्यून ', 'प्लूटो', 'लग्न'];
      let rashiName = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'];
      let nakshName = ['Ashwi', 'Bharni', 'Kritt', 'Rohin', 'Mriga', 'Ardra', 'PunVa', 'Pushy', 'Ashle', 'Magha', 'PuPha', 'UtPha', 'Hasta', 'Chitr', 'Swati', 'Visha', 'Anura', 'Jyesh', 'Moola', 'PoSha', 'UtSha', 'Sravan', 'Danis', 'Shabh', 'PoBha', 'UtBha', 'Revat']
      let rashiLord = ['Ma', 'Ve', 'Me', 'Mo', 'Su', 'Me', 'Ve', 'Ma', 'Ju', 'Sa', 'Sa', 'Ju',]
      let nakshLord = ['Ke', 'Ve', 'Su', 'Mo', 'Ma', 'Ra', 'Ju', 'Sa', 'Me', 'Ke', 'Ve', 'Su', 'Mo', 'Ma', 'Ra', 'Ju', 'Sa', 'Me', 'Ke', 'Ve', 'Su', 'Mo', 'Ma', 'Ra', 'Ju', 'Sa', 'Me']
      for (let i = 0; i <= 12; i++) {
        let rasiNakSubSub = this.getRasiNakSubSub(plaDeg[i], rashiLord, nakshLord)
        let arr: string[] = rasiNakSubSub.split("-");
        let rashi = arr[0]
        let naks = arr[1]
        let sub = arr[2]
        let subsub = arr[3]
        let planetBhav = this.getBhavOfPlant(Math.floor(plaDeg[0] / 30), Math.floor(plaDeg[i] / 30))
        this.planetDataList[i] = new BasicKundliPlanetData(planetName[i], rashiName[Math.floor(plaDeg[i] / 30)], rashi, nakshName[Math.floor(plaDeg[i] * 0.075)], naks, this.formatDMSInStringWithSign(plaDeg[i] % 30, degreeSign, minuteSign, secondSign), planetBhav, combustArr[i], retrograteArr[i])
      }
    });
  }
  private getPlanetDegreeArray(data: KundliModel): number[] {
    let planetDegree: Array<string> = data.planetDegree.split(",")

    let degree: number[] = new Array(13).fill(0);
    for (let i = 0; i < planetDegree.length; i++) {
      degree[i] = parseFloat(planetDegree[i])
    }
    return degree
  }
  formatDMSInStringWithSign(
    _fDeg: number,
    DegSign: string,
    MinSign: string,
    SecSign: string
  ): string {
    let strFormattedDeg: string;
    let sDeg: string;
    let sMin: string;
    let sSec: string;
    let min: number;
    let sec: number;

    sDeg = Math.floor(_fDeg).toString();
    strFormattedDeg = sDeg.padStart(3, '0');
    strFormattedDeg += DegSign;

    let temp: number = _fDeg - Math.floor(_fDeg);
    min = Math.floor(temp * 60);
    sMin = min.toString().padStart(2, '0');
    strFormattedDeg += sMin;
    strFormattedDeg += MinSign;

    temp = temp * 60 - Math.floor(temp * 60);
    sec = Math.floor(temp * 60);
    sSec = sec.toString().padStart(2, '0');
    strFormattedDeg += sSec;
    strFormattedDeg += SecSign;

    return strFormattedDeg.trim();
  }
  private getRasiNakSubSub(
    deg: number, RasiLord: Array<String>,
    NakLord: Array<String>
  ): String {
    let y1: number[] = new Array(12)
    y1[0] = 7
    y1[1] = 20
    y1[2] = 6
    y1[3] = 10
    y1[4] = 7
    y1[5] = 18
    y1[6] = 16
    y1[7] = 19
    y1[8] = 17
    let d = deg
    let sb: string = ""
    let i = 0
    let f: number = Math.floor(d / 30.0)
    let a: number = Math.floor(d / 120.0)
    d -= a * 120.0
    a = Math.floor(d * 3.0 / 40.0)
    d -= a * 40.0 / 3.0
    d *= 9.0
    let b = 0
    while (b < 9) {
      i = a + b
      if (i >= 9) { i -= 9 }
      if (y1[i] <= d) {
        d -= y1[i]
      } else {
        break
      }
      b++
    }
    b = i
    d = d / y1[b] * (40.0 / 3.0)
    d *= 9.0
    let c = 0
    while (c < 9) {
      i = b + c
      if (i >= 9) i -= 9
      if (y1[i] <= d) { d -= y1[i] } else { break }
      c++
    }
    c = i
    sb = sb + RasiLord[f] + "-"
    sb = sb + NakLord[a] + "-"
    sb = sb + NakLord[b] + "-"
    sb = sb + NakLord[c]
    return sb.trim()
  }
  getBhavOfPlant(lagnaRashi: number, plntRashi: number): number {
    let bhavNumber: number = plntRashi - lagnaRashi;
    if (bhavNumber < 0) {
      bhavNumber += 12;
    }
    bhavNumber += 1;
    return bhavNumber;
  }
  getCombustArray(data: KundliModel): string[] {
    let combustArr = new Array<string>()
    let arr = data.combust.split(",")
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) {
        combustArr[i] = arr[12]
      } else {
        combustArr[i] = arr[i - 1]
      }
    }
    return combustArr
  }
  getRetrograteArray(data: KundliModel): string[] {
    let retrograteArr = new Array<string>()
    let arr = data.retrograte.split(",")
    for (let i = 0; i < arr.length; i++) {
      // if (i == 0) {
      //   retrograteArr[i] = arr[12]
      // } else {
      retrograteArr[i] = arr[i]
      //}
    }
    return retrograteArr
  }
}
