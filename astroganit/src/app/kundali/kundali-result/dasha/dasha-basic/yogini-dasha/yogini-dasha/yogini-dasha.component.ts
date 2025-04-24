import { Component, OnInit } from '@angular/core';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';
import { YoginiDashaService } from '../../../../../../services/kundali/yogini-dasha-service/yogini-dasha-service.service';
import { YoginiDashaBean } from '../../../../../../models/YoginiDashaBean.model';

@Component({
  selector: 'app-yogini-dasha',
  templateUrl: './yogini-dasha.component.html',
  styleUrl: './yogini-dasha.component.scss'
})
export class YoginiDashaComponent implements OnInit {
  yoginiDashaList: Array<YoginiDashaBean> = []
  isCharAnterDashaShow: boolean = false
  selectedPos: number = 0
  constructor(private kundliService: KundaliService, private yoginiDashaService: YoginiDashaService) { }
  ngOnInit(): void {
    this.yoginiDashaService.setData()
    this.yoginiDashaList = this.yoginiDashaService.getYoginiDashaData()
  }
  onItemClick(pos: number) {
    this.selectedPos = pos
    this.isCharAnterDashaShow = true

  }
}

