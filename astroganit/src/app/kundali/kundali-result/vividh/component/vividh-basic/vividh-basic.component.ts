import { Component } from '@angular/core';

@Component({
  selector: 'app-vividh-basic',
  templateUrl: './vividh-basic.component.html',
  styleUrl: './vividh-basic.component.scss'
})
export class VividhBasicComponent {
  tabType: number = 1
  changeHoroscopeType(tabType: number) {
    this.tabType = tabType
  }
}
