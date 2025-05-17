import { Component, OnInit } from '@angular/core';
import { VarshfalService } from '../../../../../../services/kundali/varshfal-service/varshfal-service.service';
import { KundliModel } from '../../../../../../models/kundli.model';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';
import { concatMap, from, switchMap } from 'rxjs';
import { VarshfalDasha } from '../../../../../../models/VarshfalDasha.model';

@Component({
  selector: 'app-varshfal-prediction',
  templateUrl: './varshfal-prediction.component.html',
  styleUrl: './varshfal-prediction.component.scss'
})
export class VarshfalPredictionComponent implements OnInit {
  munthBhav: number = -1
  plaDeg: number[] = []
  desc: { desc: string }[] = []
  arrayList: Array<VarshfalDasha> = []
  planetNamesHindi: string[] = ['केतु', 'शुक्र', 'सूर्य', 'चंद्र', 'मंगल', 'राहु', 'गुरु', 'शनि', 'बुध'];
  plaPosDetail = ["केतु आपके # भाव में स्थित है ", "शुक्र आपके # भाव में स्थित है ", "सूर्य आपके # भाव में स्थित है ", "चंद्र आपके # भाव में स्थित है ",
    "मंगल आपके # भाव में स्थित है ", "राहु आपके # भाव में स्थित है ", "गुरु आपके # भाव में स्थित है ", "शनि आपके # भाव में स्थित है ",
    "बुध आपके # भाव में स्थित है",]
  private files = [
    '/assets/data/varshfal_prediction_ketu_new.json',
    '/assets/data/varshfal_prediction_venus_new.json',
    '/assets/data/varshfal_prediction_sun_new.json',
    '/assets/data/varshfal_prediction_moon_new.json',
    '/assets/data/varshfal_prediction_mars_new.json',
    '/assets/data/varshfal_prediction_rahu_new.json',
    '/assets/data/varshfal_prediction_jupiter_new.json',
    '/assets/data/varshfal_prediction_saturn_new.json',
    '/assets/data/varshfal_prediction_mercury_new.json'
  ];
  predictionList: string[][] = [];
  constructor(private varshfalService: VarshfalService, private kundaliService: KundaliService) { }
  ngOnInit(): void {
    this.addObservers()
  }

  addObservers() {
    from(this.files).pipe(
      concatMap(file =>
        this.varshfalService.getDashaResultArray(file).pipe(
          // map predictions to string[]
          // optional: filter or clean strings here
        )
      )
    ).subscribe(data => {
      const stringArray: string[] = data.map(item => item.prediction);
      this.predictionList.push(stringArray);
    });
    this.kundaliService.kundliData$
      .pipe(
        switchMap(kundliData => {
          console.log(kundliData?.planetDegree);
          this.plaDeg = this.getPlanetDegreeArray(kundliData?.planetDegree!)
          return this.varshfalService.kundliData$;
        })
      )
      .subscribe(varshfalData => {
        this.munthBhav = this.getMunthaBhav(varshfalData!)
        this.getMunthPrediction()
        let planetInRashi = this.varshfalService.getLagnaKundliPlanetsRashiArray(this.getPlanetDegreeArray(varshfalData?.planetDegree!))
        this.arrayList = this.varshfalService.getMuddaDasha(
          this.plaDeg,
          this.kundaliService.getBirthDetail(),
          this.varshfalService.varshfalYear,
          this.varshfalService.yearNum,
          planetInRashi)
        console.log("this.arrayList", this.arrayList)
      });

  }
  getMunthaBhav(data: KundliModel): number {
    let planetRashiArray = this.varshfalService.getLagnaKundliPlanetsRashiArray(this.getPlanetDegreeArray(data?.planetDegree!))
    // let planetDegArray = this.getPlanetDegreeArray(data?.planetDegree!)
    let lagnaRashi = this.getRasiNumber(this.plaDeg[0]) + 1
    console.log("Muntha-deg-" + this.plaDeg[0])
    var lagna = planetRashiArray[12]
    console.log("Muntha-lagna-" + lagnaRashi)
    var munthaRashi = (lagnaRashi + this.varshfalService.yearNum) % 12
    console.log("Muntha-yearNum-" + this.varshfalService.yearNum)
    console.log("Muntha-munthaRashi-" + (lagnaRashi + this.varshfalService.yearNum))
    if (munthaRashi == 0) {
      munthaRashi = 12
    }
    var munthaBhav = 1
    while (lagna != munthaRashi) {
      lagna++
      munthaBhav++
      if (lagna > 12) {
        lagna = 1
      }
    }
    return munthaBhav
  }
  private getPlanetDegreeArray(plaDegStr: string): number[] {
    let planetDegree: Array<string> = plaDegStr.split(",")
    let degree: number[] = Array(13).fill(0);
    for (let i = 0; i < planetDegree.length; i++) {
      degree[i] = parseFloat(planetDegree[i]);
    }
    return degree
  }
  getRasiNumber(_deg: number): number {
    return Math.floor(_deg / 30)
  }
  getMunthPrediction() {
    this.varshfalService.getMunthaPrediction().subscribe(data => {
      this.desc = data;
    });

  }
}
