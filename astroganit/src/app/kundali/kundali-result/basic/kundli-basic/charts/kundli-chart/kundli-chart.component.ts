import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';

@Component({
  selector: 'app-kundli-chart',
  templateUrl: './kundli-chart.component.html',
  styleUrl: './kundli-chart.component.scss'
})
export class KundliChartComponent implements OnInit {
  planets1: number[] | null = null;
  planets2: number[] | null = null;
  planets3: number[] | null = null;
  lagna1: number | null = null;
  lagna2: number | null = null;
  lagna3: number | null = null;

  constructor(private kundaliService: KundaliService) { }
  ngOnInit(): void {
    this.addObservers();
  }

  addObservers() {
    this.kundaliService.kundliData$.subscribe(data => {

      this.planets1 = this.getPlanetRashiArray(this.getIntArrayFromString(data?.lagna!));
      this.lagna1 = this.planets1[12]
      this.lagna2 = this.planets1[1]
      this.planets3 = this.getPlanetRashiArray(this.getIntArrayFromString(data?.navmansh!));
      this.lagna3 = this.planets3[12]
    });
  }
  getIntArrayFromString(str: String): number[] {
    return str.split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
  }
  getPlanetRashiArray(arr: number[]): number[] {
    let rashiArr: number[] = [...arr];
    const first = rashiArr.shift();
    if (first !== undefined) {
      rashiArr.push(first);
    }
    return rashiArr;
  }

}
