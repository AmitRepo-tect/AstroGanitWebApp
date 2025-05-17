import { Component, OnInit } from '@angular/core';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';

@Component({
  selector: 'app-ashatakvarga',
  templateUrl: './ashatakvarga.component.html',
  styleUrl: './ashatakvarga.component.scss'
})
export class AshatakvargaComponent implements OnInit {
  planetName = ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरू', 'शुक्र', 'शनि', 'योग']
  ashatakArr1: string[] = ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरू', 'शुक्र', 'शनि', 'योग']
  ashatakArr2: string[] | null = null
  ashatakArr3: string[] | null = null
  ashatakArr4: string[] | null = null
  ashatakArr5: string[] | null = null
  ashatakArr6: string[] | null = null
  ashatakArr7: string[] | null = null
  ashatakArr8: string[] | null = null
  ashatakArr9: string[] | null = null
  ashatakArr10: string[] | null = null
  ashatakArr11: string[] | null = null
  ashatakArr12: string[] | null = null
  totalArr: string[] = new Array(12)

  ashtakVargaArr: string[][] = new Array(8).fill(null).map(() => new Array(12).fill(''));
  constructor(private kundaliService: KundaliService) { }
  ngOnInit(): void {
    this.addObservers()
  }
  addObservers() {

    this.kundaliService.kundliData$.subscribe(data => {
      this.ashatakArr1 = this.getArrayFromString(data?.ashtakvargar1!, 0)
      this.ashatakArr2 = this.getArrayFromString(data?.ashtakvargar2!, 1)
      this.ashatakArr3 = this.getArrayFromString(data?.ashtakvargar3!, 2)
      this.ashatakArr4 = this.getArrayFromString(data?.ashtakvargar4!, 3)
      this.ashatakArr5 = this.getArrayFromString(data?.ashtakvargar5!, 4)
      this.ashatakArr6 = this.getArrayFromString(data?.ashtakvargar6!, 5)
      this.ashatakArr7 = this.getArrayFromString(data?.ashtakvargar7!, 6)
      this.ashatakArr8 = this.getArrayFromString(data?.ashtakvargar8!, 7)
      this.ashatakArr9 = this.getArrayFromString(data?.ashtakvargar9!, 8)
      this.ashatakArr10 = this.getArrayFromString(data?.ashtakvargar10!, 9)
      this.ashatakArr11 = this.getArrayFromString(data?.ashtakvargar11!, 10)
      this.ashatakArr12 = this.getArrayFromString(data?.ashtakvargar12!, 11)
      for (let i = 0; i < 8; i++) {
        if (i != 7) {
          this.ashtakVargaArr[i][0] = this.ashatakArr1[i]
          this.ashtakVargaArr[i][1] = this.ashatakArr2[i]
          this.ashtakVargaArr[i][2] = this.ashatakArr3[i]
          this.ashtakVargaArr[i][3] = this.ashatakArr4[i]
          this.ashtakVargaArr[i][4] = this.ashatakArr5[i]
          this.ashtakVargaArr[i][5] = this.ashatakArr6[i]
          this.ashtakVargaArr[i][6] = this.ashatakArr7[i]
          this.ashtakVargaArr[i][7] = this.ashatakArr8[i]
          this.ashtakVargaArr[i][8] = this.ashatakArr9[i]
          this.ashtakVargaArr[i][9] = this.ashatakArr10[i]
          this.ashtakVargaArr[i][10] = this.ashatakArr11[i]
          this.ashtakVargaArr[i][11] = this.ashatakArr12[i]
        } else {
          this.ashtakVargaArr[i] = this.totalArr
        }

      }
    });


  }
  getArrayFromString(str: string, index: number): string[] {
    let arr = str.split(',')
    let total: number = 0
    for (let i = 0; i < arr.length - 1; i++) {
      total += parseInt(arr[i])
    }

    this.totalArr[index] = total.toString()
    return arr
  }
}
