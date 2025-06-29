import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { DailyHoroscope } from '../../models/daily-horoscope.model';
import { HoroscopeService } from '../../services/horoscope/horoscope.service';
import { YearlyHoroscope } from '../../models/yearly-horoscope.model';

@Component({
  selector: 'app-horoscope-detail',
  templateUrl: './horoscope-detail.component.html',
  styleUrl: './horoscope-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class HoroscopeDetailComponent implements OnInit {
  horoscopeType: number = 1
  dailyHoroscope: DailyHoroscope[] = [];
  yearlyHoroscope: YearlyHoroscope[] = [];

  rahiName: string[] = ['मेष', 'वृष', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन']
  zodiacImgArr: string[] = ['assets/images/zodic__1.png', 'assets/images/zodic__2.png', 'assets/images/zodic__3.png', 'assets/images/zodic__4.png', 'assets/images/zodic__5.png', 'assets/images/zodic__6.png', 'assets/images/zodic__7.png', 'assets/images/zodic__8.png', 'assets/images/zodic__9.png', 'assets/images/zodic__10.png', 'assets/images/zodic__11.png', 'assets/images/zodic__12.png'];
  selectedRashi: number = 0
  constructor(private horoscopeService: HoroscopeService, private cdr: ChangeDetectorRef) { }

  onClick(rashi: number) {
    this.selectedRashi = rashi
  }
  changeHoroscopeType(horoscopeType: number) {
    this.horoscopeType = horoscopeType
  }
  ngOnInit(): void {
    this.fetchDailyHoroscopeData()
    this.fetchYearlyHoroscopeData()
    this.addObservers()
    // this.horoscopeService.getDailyHoroscope().subscribe(
    //   response => {
    //     this.dailyHoroscope = response;

    //   },
    //   error => {
    //     console.error('Error occurred:', error);
    //   }
    // );
    // this.horoscopeService.getYearlyHoroscope().subscribe(
    //   response => {
    //     this.yearlyHoroscope = response;
    //   },
    //   error => {
    //     console.error('Error occurred:', error);
    //   }
    // );
  }
  fetchDailyHoroscopeData() {
    console.log("fetchDailyHoroscopeData")
    this.horoscopeService.getDailyHoroscope().subscribe(
      response => {
        console.log("data" + response)
        this.horoscopeService.setDailyHoroscopeData(response)
      },
      error => {
        // console.error('Error occurred:', error);
        console.log("data" + error)
      }
    );
  }
  fetchYearlyHoroscopeData() {
    console.log("fetchDailyHoroscopeData")
    this.horoscopeService.getYearlyHoroscope().subscribe(
      response => {
        console.log("data" + response)
        this.horoscopeService.setYearlyHoroscopeData(response)
      },
      error => {
        // console.error('Error occurred:', error);
        console.log("data" + error)
      }
    );
  }
  addObservers() {
    this.horoscopeService.horoscopeData$.subscribe(data => {
      if (data != null) {
        this.dailyHoroscope = data;
        console.log("data" + data)
      }

    });
    this.horoscopeService.yearlyHoroscopeData$.subscribe(data => {
      if (data != null) {
        this.yearlyHoroscope = data;
        console.log("data" + data)
      }
    });
  }
}
