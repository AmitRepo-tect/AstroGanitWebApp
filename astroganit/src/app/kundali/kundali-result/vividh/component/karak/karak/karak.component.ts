import { Component, OnInit } from '@angular/core';
import { KarakModel } from '../../../model/Karak.model';
import { VividhService } from '../../../service/vividh-service.service';

@Component({
  selector: 'app-karak',
  templateUrl: './karak.component.html',
  styleUrl: './karak.component.scss'
})
export class KarakComponent implements OnInit {
  karakList: Array<KarakModel> = []
  karakName = ["आत्म", "आमात्य", "भ्रातृ", "मातृ", "पितृ", "ज्ञाति", "दारा"]
  sthirKarak = ["सूर्य", "बुध", "मंगल", "चंद्र", "गुरु", "शनि", "शुक्र"];
  chalKarak = ["सूर्य", "चंद्र", "मंगल", "बुध", "गुरु", "शुक्र", "शनि",]
  constructor(private vividhService: VividhService) {

  }
  ngOnInit(): void {
    this.vividhService.setData()
    this.getKarakData()
  }

  getKarakData() {
    this.karakList = this.vividhService.getKarakData()
  }

}
