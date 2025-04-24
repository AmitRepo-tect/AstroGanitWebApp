import { Component } from '@angular/core';
import { BasicDetailServiceService } from '../../../../../../services/kundali/basic-detail-service/basic-detail-service.service';

@Component({
  selector: 'app-basic-detail',
  templateUrl: './basic-detail.component.html',
  styleUrl: './basic-detail.component.scss'
})
export class BasicDetailComponent {
  personalDetailLabels: String[] = ['नाम', 'लिंग', 'जन्म तिथि', 'जन्म समय', 'जन्म स्थान', 'देश', 'अक्षांश ', 'रेखांश']
  personalDetails: String[] = new Array(5);
  panchangDetailLabels: String[] = ['तिथि', 'हिन्दू दिन', 'पक्ष', 'योग', 'करण', 'सूर्योदय', 'सूर्यास्त']
  panchangDetails: String[] = new Array(5);
  avkhadaDetailLabels: String[] = ['पाया', 'वर्ण', 'योनी', 'गण', 'वश्य', 'नाड़ी', 'दशा भोग्य', 'लग्न', 'लग्न स्वामी', 'राशि', 'राशि स्वामी', 'नक्षत्र-पद', 'नक्षत्र स्वामी', 'जुलियन दिन', 'सूर्य राशि (हिन्दू)', 'सूर्य राशि (पाश्‍चात्य)', 'अयनांश', 'अयनांश नाम', 'अक्ष से झुकाव', 'साम्पातिक काल']
  avkhadaDetails: String[] = new Array(20);
  constructor(private basicDetailServiceService: BasicDetailServiceService) { }

  ngOnInit(): void {
    this.basicDetailServiceService.getPersonalDetail();
    this.basicDetailServiceService.getAvakadaDetail();
    this.basicDetailServiceService.getPanchangDetail();
    this.addObservers();
  }

  addObservers() {
    this.basicDetailServiceService.personalDetailData$.subscribe(data => {
      this.personalDetails = data!;
    });
    this.basicDetailServiceService.avakhadaDetailData$.subscribe(data => {
      this.avkhadaDetails = data!;
    });
    this.basicDetailServiceService.panchangDetailData$.subscribe(data => {
      this.panchangDetails = data!;
    });
  }
}
