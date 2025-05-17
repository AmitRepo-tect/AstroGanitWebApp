import { Component, OnInit } from '@angular/core';
import { VividhService } from '../../../service/vividh-service.service';
import { NavtaraModel } from '../../../model/Navtara.model';

@Component({
  selector: 'app-navtara',
  templateUrl: './navtara.component.html',
  styleUrl: './navtara.component.scss'
})
export class NavtaraComponent implements OnInit {
  navtaraList: Array<NavtaraModel> = []
  planetName = ['जन्म', 'समाप्ति', 'विपत्त', 'क्षेम', 'प्रत्यारी', 'साधक', 'वध', 'मित्र', 'अति मित्र'];
  nakshName = ['अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तर फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूला', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद', 'उत्तर भाद्रपद', 'रेवती'];
  planet = ["केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु", "बृहस्पति", "शनि", "बुध"]

  constructor(private vividhService: VividhService) {

  }
  ngOnInit(): void {
    this.vividhService.setData()
    this.getNavtaraData()
  }

  getNavtaraData() {
    this.navtaraList = this.vividhService.getNavtara()
  }

}