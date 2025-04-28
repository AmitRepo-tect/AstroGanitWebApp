import { Injectable } from '@angular/core';
import { KarakModel } from '../model/Karak.model';
import { AvasthaModel } from '../model/avastha.model';
import { NavtaraModel } from '../model/Navtara.model';
import { KundaliService } from '../../../../services/kundali/kundali.service';
import { Observable } from 'rxjs';
import { PlanetRogNidanModel } from '../model/PlanetRogNidan.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VividhService {
  plaDeg: number[] = []

  constructor(private kundaliService: KundaliService, private http: HttpClient) { }
  setData() {
    this.kundaliService.kundliData$.subscribe(data => {
      this.plaDeg = this.getPlanetDegreeArray(data?.planetDegree!)
    });
  }
  getKarakData(): Array<KarakModel> {
    let arrayList = Array<KarakModel>()
    let charKarakArray = this.charKarakArray(this.plaDeg)
    let karakModel: KarakModel
    for (let i = 0; i <= 6; i++) {
      karakModel = new KarakModel(i, i, charKarakArray[i])
      arrayList.push(karakModel)
    }
    return arrayList
  }
  getAvasthaData(): Array<AvasthaModel> {
    let arrayList = Array<AvasthaModel>()
    let jagritAvasthaArr = this.getJagritAvastha(this.plaDeg)
    let baladiAvasthaArr = this.getBaladiAvastha(this.plaDeg)
    let avasthaModel: AvasthaModel
    for (let i = 0; i <= 6; i++) {
      avasthaModel =
        new AvasthaModel(i, jagritAvasthaArr[i], baladiAvasthaArr[i], jagritAvasthaArr[i])
      arrayList.push(avasthaModel)
    }
    return arrayList
  }
  getNavtara(): Array<NavtaraModel> {
    let arrayList = Array<NavtaraModel>()
    var naksh = this.getNakshatra(this.plaDeg[2])
    var naksLord = this.getNakshatraLord(this.plaDeg[2])
    var navtaraModel: NavtaraModel
    for (let i = 0; i <= 8; i++) {
      navtaraModel =
        new NavtaraModel(i, naksh % 27, (naksh + 9) % 27, (naksh + 18) % 27, naksLord % 9)
      arrayList.push(navtaraModel)
      naksh++
      naksLord++
    }
    return arrayList
  }
  getNakshatra(plaDeg: number): number {
    return Math.floor(plaDeg * 0.075)
  }

  getNakshatraLord(plaDeg: number): number {
    console.log((Math.round(plaDeg * 0.075 * 100.0)))
    console.log((Math.round(plaDeg * 0.075 * 100.0) / 100))
    return (Math.floor(Math.round(plaDeg * 0.075 * 100.0) / 100)) % 9
  }
  private getJagritAvastha(planetArr: number[]): number[] {
    let array: number[] = new Array(7).fill(0);
    let plaArr: number[] = new Array(7).fill(0.0);
    for (let i = 0; i <= 6; i++) {
      plaArr[i] = planetArr[i + 1]
    }
    for (let j = 0; j < plaArr.length; j++) {
      let plaRashi = this.getPlanetRasi(plaArr[j])
      let plDeg = this.getDegMinSec(plaArr[j])[0]
      if (plaRashi % 2 == 0) {
        if (plDeg >= 0 && plDeg <= 10) {
          array[j] = 2;
        } else if (plDeg > 10 && plDeg <= 20) {
          array[j] = 1;
        } else {
          array[j] = 0;
        }
      } else {
        if (plDeg >= 0 && plDeg <= 10) {
          array[j] = 0;
        } else if (plDeg > 10 && plDeg <= 20) {
          array[j] = 1;
        } else {
          array[j] = 2;
        }
      }
    }
    return array
  }

  private getBaladiAvastha(planetArr: number[]): number[] {

    let array: number[] = new Array(7).fill(0);
    let plaArr: number[] = new Array(7).fill(0.0);
    for (let i = 0; i <= 6; i++) {
      plaArr[i] = planetArr[i + 1]
    }
    for (let j = 0; j < plaArr.length; j++) {
      let plaRashi = this.getPlanetRasi(plaArr[j])
      let plDeg = this.getDegMinSec(plaArr[j])[0]
      if (plaRashi % 2 == 0) {
        if (plDeg >= 0 && plDeg <= 6) {
          array[j] = 0;
        } else if (plDeg > 6 && plDeg <= 12) {
          array[j] = 1;
        } else if (plDeg > 12 && plDeg <= 18) {
          array[j] = 2;
        } else if (plDeg > 18 && plDeg <= 24) {
          array[j] = 3;
        } else {
          array[j] = 4;
        }

      } else {
        if (plDeg >= 24 && plDeg <= 30) {
          array[j] = 0;
        } else if (plDeg >= 18 && plDeg < 24) {
          array[j] = 1;
        } else if (plDeg >= 12 && plDeg < 18) {
          array[j] = 2;
        } else if (plDeg >= 6 && plDeg < 12) {
          array[j] = 3;
        } else {
          array[j] = 4;
        }

      }
    }
    return array
  }
  getDiptadiAvastha(planetArr: number[]): number[] {
    let array: number[] = new Array(7).fill(0);
    let plaArr: number[] = new Array(7).fill(0.0);
    for (let i = 0; i <= 6; i++) {
      plaArr[i] = planetArr[i + 1]
    }
    for (let j = 0; j < plaArr.length; j++) {
      let plaRashi = this.getPlanetRasi(plaArr[j])
      if (this.isExalted(j + 1, plaRashi + 1)) {
        array[j] = 0
      } else if (this.isInOwnSign(j + 1, plaRashi + 1)) {
        array[j] = 1
      } else if (this.isInCloseFriendSign(j + 1, plaRashi + 1)) {
        array[j] = 2
      }
    }
    return array
  }

  private getPlanetRasi(deg: number): number {
    return Math.floor(deg / 30.0)
  }

  private getPlanetDegreeArray(plaDegStr: string): number[] {
    let planetDegree: Array<string> = plaDegStr.split(",")
    let degree: number[] = Array(13).fill(0);
    for (let i = 0; i < planetDegree.length; i++) {
      degree[i] = parseFloat(planetDegree[i]);
    }
    return degree
  }

  private charKarakArray(planetArr: number[]): number[] {
    let plaArr: number[] = new Array(7).fill(0.0);
    for (let i = 0; i <= 6; i++) {
      plaArr[i] = planetArr[i + 1]
    }
    let array = [0, 1, 2, 3, 4, 5, 6]
    for (let i = 0; i <= 6; i++) {
      let largestDegree = this.getDegMinSec(plaArr[i])
      let index: number = i

      for (let j = i + 1; j <= 6; j++) {
        let degArr = this.getDegMinSec(plaArr[j])

        if (degArr[0] > largestDegree[0]) {
          largestDegree = degArr
          index = j
        } else if (degArr[0] == largestDegree[0]) {
          if (degArr[1] > largestDegree[1]) {
            largestDegree = degArr
            index = j
          } else if (degArr[1] == largestDegree[1]) {
            if (degArr[2] > largestDegree[2]) {
              largestDegree = degArr
              index = j
            }
          }
        }
      }
      let temp = plaArr[i]
      plaArr[i] = plaArr[index]
      plaArr[index] = temp
      let temp1 = array[i]
      array[i] = array[index]
      array[index] = temp1
    }
    return array
  }
  private getDegMinSec(plaDeg: number): number[] {
    let arr: number[] = new Array(3).fill(0);
    let deg = plaDeg % 30
    let d = Math.floor(deg)
    let temp: number = deg - Math.floor(deg)
    let m = Math.floor(temp * 60)
    temp *= 60
    temp -= Math.floor(temp)
    let s = Math.floor(temp * 60)
    arr[0] = d
    arr[1] = m
    arr[2] = s

    return arr
  }
  isExalted(planetNumber: number, sign: number): boolean {
    let var2 = false;
    if (planetNumber === 1 && sign === 1) {
      var2 = true;
    } else if (planetNumber === 2 && sign === 2) {
      var2 = true;
    } else if (planetNumber === 3 && sign === 10) {
      var2 = true;
    } else if (planetNumber === 4 && sign === 6) {
      var2 = true;
    } else if (planetNumber === 5 && sign === 4) {
      var2 = true;
    } else if (planetNumber === 6 && sign === 12) {
      var2 = true;
    } else if (planetNumber === 7 && sign === 7) {
      var2 = true;
    }
    return var2
  }
  isDeblited(planetNumber: number, sign: number): boolean {
    var var2 = false
    if (planetNumber === 1 && sign === 7) {
      var2 = true;
    } else if (planetNumber === 2 && sign === 8) {
      var2 = true;
    } else if (planetNumber === 3 && sign === 4) {
      var2 = true;
    } else if (planetNumber === 4 && sign === 12) {
      var2 = true;
    } else if (planetNumber === 5 && sign === 10) {
      var2 = true;
    } else if (planetNumber === 6 && sign === 6) {
      var2 = true;
    } else if (planetNumber === 7 && sign === 1) {
      var2 = true;
    }
    return var2
  }
  isInOwnSign(planetNumber: number, sign: number): Boolean {

    let var2 = false;

    switch (planetNumber) {
      case 1:
        if (sign !== 5) {
          return var2;
        }
        break;

      case 2:
        if (sign !== 4) {
          return var2;
        }
        break;

      case 3:
        if (sign === 1 || sign === 8) {
          var2 = true;
        }
        return var2;

      case 4:
        if (sign !== 3) {
          return var2;
        }
        break;

      case 5:
        if (sign === 9 || sign === 12) {
          var2 = true;
        }
        return var2;

      case 6:
        if (sign === 2 || sign === 7) {
          var2 = true;
        }
        return var2;

      case 7:
        if (sign !== 10 && sign !== 11) {
          return var2;
        }
        break;

      default:
        return var2;
    }

    var2 = true
    return var2
  }
  isInCloseFriendSign(planetNumber: number, sign: number): boolean {
    var var2 = false
    switch (planetNumber) {
      case 1: if (sign == 4 || sign == 1 || sign == 8 || sign == 9 || sign == 12) {
        var2 = true
      } break;

      case 2: if (sign == 3 || sign == 6 || sign == 5) {
        var2 = true
      } break;

      case 3: if (sign == 5 || sign == 4 || sign == 9 || sign == 12) {
        var2 = true
      } break;

      case 4: if (sign == 2 || sign == 4 || sign == 7) {
        return var2
      } break;

      case 5: if (sign == 5 || sign == 4 || sign == 1 || sign == 8) {
        var2 = true
      } break;


      case 6: if (sign == 3 || sign == 6 || sign == 10 || sign == 11) {
        var2 = true
      } break;

      case 7: if (sign == 2 || sign == 3 || sign == 6 || sign == 7) {
        var2 = true
      } break;

      default: return var2
    }

    return var2
  }
  isInFriendSign(planetNumber: number, sign: number): boolean {
    var var2 = false
    switch (planetNumber) {

      case 1: if (sign == 4 || sign == 1 || sign == 8 || sign == 9 || sign == 12) {
        var2 = true
      } break;

      case 2: if (sign == 3 || sign == 6 || sign == 5) {
        var2 = true
      } break;

      case 3: if (sign == 5 || sign == 4 || sign == 9 || sign == 12) {
        var2 = true
      } break;

      case 4: if (sign == 2 || sign == 4 || sign == 7) {
        return var2
      } break;

      case 5: if (sign == 5 || sign == 4 || sign == 1 || sign == 8) {
        var2 = true
      } break;


      case 6: if (sign == 3 || sign == 6 || sign == 10 || sign == 11) {
        var2 = true
      } break;

      case 7: if (sign == 2 || sign == 3 || sign == 6 || sign == 7) {
        var2 = true
      } break;

      default: return var2
    }

    return var2
  }
  getGrahNimitRojAndNidan(url: string): Observable<PlanetRogNidanModel[]> {
    return this.http.get<PlanetRogNidanModel[]>(url);
  }
}
