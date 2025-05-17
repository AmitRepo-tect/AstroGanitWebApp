import { Component, OnInit } from '@angular/core';
import { AvasthaModel } from '../../../model/avastha.model';
import { VividhService } from '../../../service/vividh-service.service';

@Component({
  selector: 'app-avastha',
  templateUrl: './avastha.component.html',
  styleUrl: './avastha.component.scss'
})
export class AvasthaComponent implements OnInit {
  avasthaList: Array<AvasthaModel> = []
  planetName = ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
  avasthaName = ["सुसुप्त", "स्वप्न", "जाग्रत"]
  baladiAvasthaName = ["बाल", "कुमार", "युवा", "वृद्ध", "मृत"]
  constructor(private vividhService: VividhService) {

  }
  ngOnInit(): void {
    this.vividhService.setData()
    this.getAvasthaData()
  }

  getAvasthaData() {
    this.avasthaList = this.vividhService.getAvasthaData()
  }

}
