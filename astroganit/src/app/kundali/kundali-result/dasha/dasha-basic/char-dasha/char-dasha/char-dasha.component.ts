import { Component, OnInit } from '@angular/core';
import { KundaliService } from '../../../../../../services/kundali/kundali.service';
import { CharDashaServiceService } from '../../../../../../services/kundali/char-dasha-service/char-dasha-service.service';
import { CharDashaBean } from '../../../../../../models/chardasha.model';

@Component({
  selector: 'app-char-dasha',
  templateUrl: './char-dasha.component.html',
  styleUrl: './char-dasha.component.scss'
})
export class CharDashaComponent implements OnInit {
  charDashaArray: Array<CharDashaBean> = []
  isCharAnterDashaShow: boolean = false
  selectedPos: number = 0

  constructor(private kundliService: KundaliService, private charDashaServiceService: CharDashaServiceService) {

  }
  ngOnInit(): void {
    this.getCharDashaData()
  }
  getCharDashaData() {
    this.charDashaServiceService.setData()
    var dateTime = this.kundliService.getBirthDetail().getDateTime()
    let dob = dateTime.getDate() + "/" + ((dateTime.getMonth()) + 1) + "/" + dateTime.getYear()
    this.charDashaArray = this.charDashaServiceService.getCharDashaData(dob!)
  }
  onItemClick(pos: number) {
    this.selectedPos = pos
    this.isCharAnterDashaShow = true
  }
}
