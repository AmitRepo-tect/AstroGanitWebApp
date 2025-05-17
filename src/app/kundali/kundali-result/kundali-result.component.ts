import { Component, OnInit } from '@angular/core';
import { KundaliService } from '../../services/kundali/kundali.service';
import { KundliModel } from '../../models/kundli.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-kundali-result',
  templateUrl: './kundali-result.component.html',
  styleUrl: './kundali-result.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class KundaliResultComponent implements OnInit {
  kundliData: KundliModel | null = null;
  tabType: number = 1
  currentComponent = 'component1';

  constructor(private kundaliService: KundaliService) { }
  changeHoroscopeType(tabType: number) {
    this.tabType = tabType
  }
  ngOnInit(): void {
    this.addObservers();
  }
  addObservers() {
    this.kundaliService.kundliData$.subscribe(data => {
      this.kundliData = data;
    });
  }
}
