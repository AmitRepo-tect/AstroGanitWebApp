import { Component, OnInit } from '@angular/core';
import { VividhService } from '../../../service/vividh-service.service';
import { PlanetRogNidanModel } from '../../../model/PlanetRogNidan.model';

@Component({
  selector: 'app-rogand-nidan',
  templateUrl: './rogand-nidan.component.html',
  styleUrl: './rogand-nidan.component.scss'
})
export class RogandNidanComponent implements OnInit {
  planetRogNidanList: PlanetRogNidanModel[] = []
  planetName = ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'राहु', 'केतु']
  constructor(private vividhService: VividhService) { }
  ngOnInit(): void {
    this.addObservers()
  }
  addObservers() {
    this.vividhService.getGrahNimitRojAndNidan("/assets/data/grah_nimit_rog_nidan.json").subscribe(data => {
      this.planetRogNidanList = data
      console.log("data", this.planetRogNidanList[0].wicked_pos)
      console.log("data", this.planetRogNidanList[0].ratan)
    });
  }

}
