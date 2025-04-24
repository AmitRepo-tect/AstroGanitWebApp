import { Injectable } from '@angular/core';
import { KundaliService } from '../kundali.service';
import { KundliModel } from '../../../models/kundli.model';
import { CharDashaBean } from '../../../models/chardasha.model';
import { DatePipe } from '@angular/common';
import { CharAntaraDashaBean } from '../../../models/CharAnterDasha.model';

@Injectable({
  providedIn: 'root'
})
export class CharDashaServiceService {
  private planetDeg: number[] = []
  charDasaSeqMap: Map<number, number[]> = new Map();
  planetRashiArray: number[] = [];
  rashiLordMap: Map<number, string> = new Map();
  planetRashiMap: Map<string, number> = new Map();
  orderOfCalculationMap: Map<number, number> = new Map();
  lagnaRashi!: number;
  private planetNameArray = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"]
  private horoscopeName = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
  private charDasaSeqForAries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  private charDasaSeqForTaurus = [2, 1, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]
  private charDasaSeqForGemini = [3, 2, 1, 12, 11, 10, 9, 8, 7, 6, 5, 4]
  private charDasaSeqForCancer = [4, 3, 2, 1, 12, 11, 10, 9, 8, 7, 6, 5]
  private charDasaSeqForLeo = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6]
  private charDasaSeqForVirgo = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5]
  private charDasaSeqForLibra = [6, 7, 8, 9, 11, 12, 1, 2, 3, 4, 5, 6]
  private charDasaSeqForScorpio = [8, 7, 6, 5, 4, 3, 2, 1, 12, 11, 10, 9]
  private charDasaSeqForSagittarius = [9, 8, 7, 6, 5, 4, 3, 2, 1, 12, 11, 10]
  private charDasaSeqForCapricorn = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 12, 11]
  private charDasaSeqForAquarius = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  private charDasaSeqForPisces = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  constructor(private kundaliService: KundaliService, private datePipe: DatePipe) { }

  private setCharDasaSeqMap() {
    this.charDasaSeqMap.set(1, this.charDasaSeqForAries)
    this.charDasaSeqMap.set(2, this.charDasaSeqForTaurus)
    this.charDasaSeqMap.set(3, this.charDasaSeqForGemini)
    this.charDasaSeqMap.set(4, this.charDasaSeqForCancer)
    this.charDasaSeqMap.set(5, this.charDasaSeqForLeo)
    this.charDasaSeqMap.set(6, this.charDasaSeqForVirgo)
    this.charDasaSeqMap.set(7, this.charDasaSeqForLibra)
    this.charDasaSeqMap.set(8, this.charDasaSeqForScorpio)
    this.charDasaSeqMap.set(9, this.charDasaSeqForSagittarius)
    this.charDasaSeqMap.set(10, this.charDasaSeqForCapricorn)
    this.charDasaSeqMap.set(11, this.charDasaSeqForAquarius)
    this.charDasaSeqMap.set(12, this.charDasaSeqForPisces)

  }

  private getPlanetDegreeArray(plaDegStr: string): number[] {
    let planetDegree: Array<string> = plaDegStr.split(",")
    let degree: number[] = Array(13).fill(0);
    for (let i = 0; i < planetDegree.length; i++) {
      degree[i] = parseFloat(planetDegree[i]);
    }
    return degree
  }
  private setRashiLord() {
    this.rashiLordMap = new Map();
    this.rashiLordMap.set(1, "Mars")
    this.rashiLordMap.set(2, "Venus")
    this.rashiLordMap.set(3, "Mercury")
    this.rashiLordMap.set(4, "Moon")
    this.rashiLordMap.set(5, "Sun")
    this.rashiLordMap.set(6, "Mercury")
    this.rashiLordMap.set(7, "Venus")
    this.rashiLordMap.set(8, "Ketu")//Mars
    this.rashiLordMap.set(9, "Jupiter")
    this.rashiLordMap.set(10, "Saturn")
    this.rashiLordMap.set(11, "Saturn")
    this.rashiLordMap.set(12, "Jupiter")
  }
  private setOrderOfCalculation() {
    this.orderOfCalculationMap = new Map();
    this.orderOfCalculationMap.set(1, 0)
    this.orderOfCalculationMap.set(2, 0)
    this.orderOfCalculationMap.set(3, 0)
    this.orderOfCalculationMap.set(4, 1)
    this.orderOfCalculationMap.set(5, 1)
    this.orderOfCalculationMap.set(6, 1)
    this.orderOfCalculationMap.set(7, 0)
    this.orderOfCalculationMap.set(8, 0)
    this.orderOfCalculationMap.set(9, 0)
    this.orderOfCalculationMap.set(10, 1)
    this.orderOfCalculationMap.set(11, 1)
    this.orderOfCalculationMap.set(12, 1)
  }
  setData() {
    this.setRashiLord()
    this.setOrderOfCalculation()
    this.setCharDasaSeqMap()
    this.kundaliService.kundliData$.subscribe(data => {
      this.planetDeg = this.getPlanetDegreeArray(data?.planetDegree!)
      this.calculatePlanetRashi(data?.lagna!)
    });
  }


  getCharDashaData(dob: string): Array<CharDashaBean> {
    //this.calculatePlanetRashi("")
    return this.calculateCharDashaDuration(dob)
  }
  private calculatePlanetRashi(lagnaStr: string) {

    let rashiInpla = lagnaStr.split(",")
    this.lagnaRashi = parseInt(rashiInpla[0])
    for (let i = 0; i < this.planetNameArray.length; i++) {
      this.planetRashiMap.set(this.planetNameArray[i], parseInt(rashiInpla[i + 1]))
      this.planetRashiArray[i] = parseInt(rashiInpla[i + 1])
    }
  }
  private calculateCharDashaDuration(dob: string): Array<CharDashaBean> {
    var startDate = dob
    var endDate: string
    let arrayList: CharDashaBean[] = [];
    let charDasaSeqArray = this.charDasaSeqMap.get(this.lagnaRashi)
    if (charDasaSeqArray) {
      for (let i = 0; i <= 11; i++) {
        let rashi = charDasaSeqArray[i]
        let calcOrder = this.orderOfCalculationMap.get(rashi)
        let rashiLord = this.rashiLordMap.get(rashi)
        var rashiOfLord = this.planetRashiMap.get(rashiLord!)
        if (rashi == 8) {
          rashiOfLord = this.calculateRashiForScorpioLord()
        } else if (rashi == 11) {
          rashiOfLord = this.calculateRashiForAquariusLord()
        }
        var duration = 0

        if (rashi == rashiOfLord) {
          duration = 12
        } else if (calcOrder == 0) {
          if (rashiOfLord != null) {
            duration = this.clockwiseMove(rashi, rashiOfLord)
          }
        } else {
          if (rashiOfLord != null) {
            duration = this.antiClockwiseMove(rashi, rashiOfLord)
          }
        }

        endDate = this.getEndDate(startDate, duration)
        let planet = charDasaSeqArray[i]
        let planetName = this.horoscopeName[planet!! - 1]
        let charAntaraDashaList = this.getCharAntaraDasha(charDasaSeqArray[i], startDate, duration)
        arrayList[i] = new CharDashaBean(planetName, duration, startDate, endDate, charAntaraDashaList)
        startDate = endDate
      }
    }
    return arrayList
  }
  private calculateRashiForScorpioLord(): number {
    var lordRashi = -1
    let rashiLord1 = "Ketu"
    let rashiLord2 = "Mars"
    let rashiOfLord1 = this.planetRashiMap.get(rashiLord1)
    let rashiOfLord2 = this.planetRashiMap.get(rashiLord2)
    if (rashiOfLord1 == 8 && rashiOfLord2 == 8) {
      lordRashi = rashiOfLord1
    } else if (rashiOfLord1 == 8) {
      if (rashiOfLord2 != null) {
        lordRashi = rashiOfLord2
      }
    } else if (rashiOfLord2 == 8) {
      if (rashiOfLord1 != null) {
        lordRashi = rashiOfLord1
      }
    } else {
      var noOfPlanetInKetuRahi = 0
      var noOfPlanetInMarsRahi = 0
      for (let i = 0; i < this.planetRashiArray.length; i++) {
        if (this.planetRashiArray[i] == rashiOfLord1) {
          noOfPlanetInKetuRahi++
        } else if (this.planetRashiArray[i] == rashiOfLord2) {
          noOfPlanetInMarsRahi++
        }
      }
      if (noOfPlanetInKetuRahi > noOfPlanetInMarsRahi) {
        if (rashiOfLord1 != null) {
          lordRashi = rashiOfLord1
        }
      } else if (noOfPlanetInKetuRahi < noOfPlanetInMarsRahi) {
        if (rashiOfLord2 != null) {
          lordRashi = rashiOfLord2
        }
      } else {
        if (this.planetDeg[2] > this.planetDeg[8]) {
          if (rashiOfLord2 != null) {
            lordRashi = rashiOfLord2
          }
        } else {
          if (rashiOfLord1 != null) {
            lordRashi = rashiOfLord1
          }
        }
      }

    }

    return lordRashi
  }
  private calculateRashiForAquariusLord(): number {
    var lordRashi = -1
    let rashiLord1 = "Rahu"
    let rashiLord2 = "Saturn"
    let rashiOfLord1 = this.planetRashiMap.get(rashiLord1)
    let rashiOfLord2 = this.planetRashiMap.get(rashiLord2)
    if (rashiOfLord1 == 11 && rashiOfLord2 == 11) {
      lordRashi = rashiOfLord1
    } else if (rashiOfLord1 == 11) {
      if (rashiOfLord2 != null) {
        lordRashi = rashiOfLord2
      }
    } else if (rashiOfLord2 == 11) {
      if (rashiOfLord1 != null) {
        lordRashi = rashiOfLord1
      }
    } else {
      var noOfPlanetInRahuRashi = 0
      var noOfPlanetInSaturnRashi = 0
      for (let i = 0; i < this.planetRashiArray.length; i++) {
        if (this.planetRashiArray[i] == rashiOfLord1) {
          noOfPlanetInRahuRashi++
        } else if (this.planetRashiArray[i] == rashiOfLord2) {
          noOfPlanetInSaturnRashi++
        }
      }
      if (noOfPlanetInRahuRashi > noOfPlanetInSaturnRashi) {
        if (rashiOfLord1 != null) {
          lordRashi = rashiOfLord1
        }
      } else if (noOfPlanetInRahuRashi < noOfPlanetInSaturnRashi) {
        if (rashiOfLord2 != null) {
          lordRashi = rashiOfLord2
        }
      } else {
        if (this.planetDeg[6] > this.planetDeg[7]) {
          if (rashiOfLord2 != null) {
            lordRashi = rashiOfLord2
          }
        } else {
          if (rashiOfLord1 != null) {
            lordRashi = rashiOfLord1
          }
        }
      }

    }
    return lordRashi
  }
  private clockwiseMove(rashi: number, lordRashi: number): number {
    var count = 0
    var boolVal = true
    var rashiIndex = rashi
    while (boolVal) {
      if (rashiIndex == 12) {
        rashiIndex = 1
      } else {
        rashiIndex++
      }
      if (lordRashi == rashiIndex) {
        boolVal = false
      }
      count++
    }
    return count
  }
  private antiClockwiseMove(rashi: number, lordRashi: number): number {
    var count = 0
    var boolVal = true
    var rashiIndex = rashi
    while (boolVal) {
      if (rashiIndex == 1) {
        rashiIndex = 12
      } else {
        rashiIndex--
      }
      if (lordRashi == rashiIndex) {
        boolVal = false
      }
      count++
    }
    return count
  }
  getEndDate(startDate: string, duration: number): string {
    const parts = startDate.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    date.setFullYear(date.getFullYear() + duration);
    // Format back to dd/MM/yyyy
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedYear = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }

  getCharAntaraDasha(
    pla: number,
    sDate: string,
    duration: number
  ): CharAntaraDashaBean[] {
    const arrayList: CharAntaraDashaBean[] = [];
    const charDasaSeqArray = this.charDasaSeqMap.get(pla);
    let startDate = sDate;
    let endDate = '';

    if (charDasaSeqArray) {
      for (let i = 1; i < charDasaSeqArray.length; i++) {
        const planet = charDasaSeqArray[i];
        const planetName = this.horoscopeName[planet - 1];
        endDate = this.getEndDateForCharAntaraDasha(startDate, duration);
        arrayList.push({
          planetName,
          startDate,
          endDate,
        });
        startDate = endDate;
      }
    }

    const planet = charDasaSeqArray?.[0];
    const planetName = this.horoscopeName[(planet ?? 1) - 1];
    endDate = this.getEndDateForCharAntaraDasha(startDate, duration);

    arrayList.push({
      planetName,
      startDate,
      endDate,
    });
    return arrayList;
  }

  getEndDateForCharAntaraDasha(startDate: string, duration: number): string {
    const [day, month, year] = startDate.split('/').map(Number);

    const date = new Date(year, month - 1, day);
    date.setMonth(date.getMonth() + duration);

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

}
