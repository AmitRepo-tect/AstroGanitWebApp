import { Component } from '@angular/core';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';
import { VarshfalService } from '../../../../../../services/kundali/varshfal-service/varshfal-service.service';
import { BirthDetail } from '../../../../../../models/birthdetail.model';

@Component({
  selector: 'app-varshfal-chart',
  templateUrl: './varshfal-chart.component.html',
  styleUrl: './varshfal-chart.component.scss'
})
export class VarshfalChartComponent {
  planetInRashi: number[] = []
  lagna: number | null = null;
  constructor(private kundliService: KundaliService, private varshfalService: VarshfalService) { }
  ngOnInit(): void {
    console.log("VarshfalChartComponent")
    this.addObservers()
  }

  addObservers() {
    this.varshfalService.kundliData$.subscribe(data => {
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

}
