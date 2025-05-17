import { Component } from '@angular/core';

@Component({
  selector: 'app-kundli-basic',
  templateUrl: './kundli-basic.component.html',
  styleUrl: './kundli-basic.component.scss'
})
export class KundliBasicComponent {
  tabType: number = 1
  currentComponent = 'component1';
  onAnimationEvent(event: AnimationEvent) {
  }
  changeHoroscopeType(tabType: number) {
    this.tabType = tabType
  }
}
