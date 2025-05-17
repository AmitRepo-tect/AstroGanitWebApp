import { Component, OnInit } from '@angular/core';
import { VarshfalService } from '../../../../../../services/kundali/varshfal-service/varshfal-service.service';
import { BirthDetail } from '../../../../../../models/birthdetail.model';

@Component({
  selector: 'app-varshfal-detail',
  templateUrl: './varshfal-detail.component.html',
  styleUrl: './varshfal-detail.component.scss'
})
export class VarshfalDetailComponent implements OnInit {
  personalDetailLabels: String[] = ['नाम', 'लिंग', 'जन्म तिथि', 'जन्म समय', 'जन्म स्थान', 'देश', 'अक्षांश ', 'रेखांश']
  monthNames: string[] = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']

  personalDetails: String[] = new Array(5);
  constructor(private varshfalService: VarshfalService) { }
  ngOnInit(): void {
    this.addObservers()
  }
  addObservers() {
    this.varshfalService.birthDetail$.subscribe(data => {
      this.getPersonalDetail(data!)
    });
  }
  getPersonalDetail(birthDetail: BirthDetail) {

    let arr: String[] = new Array(5);
    arr[0] = birthDetail?.getName()!;
    arr[1] = birthDetail?.getSex()!;
    arr[2] = birthDetail?.getDateTime().getDate() + " " + this.monthNames[parseInt(birthDetail?.getDateTime().getMonth())] + ", " + birthDetail?.getDateTime().getYear();
    arr[3] = birthDetail?.getDateTime().getHr() + ":" + birthDetail?.getDateTime().getMin() + ":" + birthDetail?.getDateTime().getSec();

    if (birthDetail?.getPlace().state != "") {
      arr[4] = birthDetail?.getPlace().place! + "," + birthDetail?.getPlace().state!;;
    } else {
      arr[4] = birthDetail?.getPlace().place!;
    }
    arr[5] = birthDetail?.getPlace().country!;
    arr[6] = birthDetail?.getPlace().latDeg! + ":" + birthDetail?.getPlace().latMin + ":" + birthDetail?.getPlace().latNS;
    arr[7] = birthDetail?.getPlace().longDeg! + ":" + birthDetail?.getPlace().longMin + ":" + birthDetail?.getPlace().longEW;
    this.personalDetails = arr;

  }
}
