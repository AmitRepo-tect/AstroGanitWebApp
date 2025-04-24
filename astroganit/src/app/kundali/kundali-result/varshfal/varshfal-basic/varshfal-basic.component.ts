import { Component, OnInit } from '@angular/core';
import { VarshfalService } from '../../../../services/kundali/varshfal-service/varshfal-service.service';
import { KundaliService } from '../../../../services/kundali/kundali.service';
import { BirthDetail } from '../../../../models/birthdetail.model';

@Component({
  selector: 'app-varshfal-basic',
  templateUrl: './varshfal-basic.component.html',
  styleUrl: './varshfal-basic.component.scss'
})
export class VarshfalBasicComponent {
  tabType: number = 1
  planetInRashi: number[] = []
  lagna: number | null = null;
  private selectedYear: number = new Date().getFullYear();
  constructor(private kundliService: KundaliService, private varshfalService: VarshfalService) { }

  changeHoroscopeType(tabType: number) {
    this.tabType = tabType
  }
  ngOnInit(): void {
    let now = new Date()
    console.log(this.kundliService.getBirthDetail().getDateTime().getHr() + ":" + this.kundliService.getBirthDetail().getDateTime().getMin() + ":" + this.kundliService.getBirthDetail().getDateTime().getSec())

    let yearCount = this.getCurrentYearNumber(this.kundliService.getBirthDetail(), now.getDate(), now.getMonth(), this.selectedYear)

    let birthDetail = this.varshfalService.getVarshfalBirthDetail(yearCount, this.kundliService.getBirthDetail(), this.selectedYear)

    this.fetchKundliData(birthDetail)
    this.addObservers()
  }
  fetchKundliData(birthDetail: BirthDetail) {
    this.varshfalService.getKundliData(birthDetail).subscribe(
      data => {
        this.varshfalService.setKundliData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  addObservers() {
    this.kundliService.kundliData$.subscribe(data => {
      this.planetInRashi = this.varshfalService.getLagnaKundliPlanetsRashiArray(this.getPlanetDegreeArray(data?.planetDegree!))
      this.lagna = this.planetInRashi[12]
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
  getCurrentYearNumber(
    birthDetail: BirthDetail,
    day: number,
    month: number,
    year: number
  ): number {
    var presentYearNumber: number
    presentYearNumber = year - birthDetail.getDateTime().getYear()
    try {
      if (parseInt(birthDetail.getDateTime().getMonth()) - month == 0) {
        if (birthDetail.getDateTime().getDate() - day > 0) presentYearNumber -= 1
      } else if (parseInt(birthDetail.getDateTime().getMonth()) - month > 0) {
        presentYearNumber -= 1
      }
    } catch (e) {
    }

    if (presentYearNumber < 0) {
      presentYearNumber = 0
    }
    return presentYearNumber
  }
}
