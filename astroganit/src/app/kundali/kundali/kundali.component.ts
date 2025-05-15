import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { PlaceService } from '../../services/place/place.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Place } from '../../models/place.model';
import { KundaliService } from '../../services/kundali/kundali.service';
import { Router } from '@angular/router';
import { BirthDetail } from '../../models/birthdetail.model';
import { DateTime } from '../../models/date-time.model';

@Component({
  selector: 'app-kundali',
  templateUrl: './kundali.component.html',
  styleUrl: './kundali.component.scss'
})
export class KundaliComponent implements OnInit {

  days: number[] = [];
  months: { name: string, value: number }[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  years: number[] = [];
  selectedDay: number | undefined;
  selectedMonth: number | undefined;
  selectedYear: number | undefined;
  hours: number[] = [];
  minutes: number[] = [];
  seconds: number[] = [];
  selectedHour: number | undefined;
  selectedMinute: number | undefined;
  selectedSecond: number | undefined;

  birthDetail: BirthDetail = new BirthDetail();
  //for search place code start here-----------
  place = new FormControl();
  options: Place[] = [];
  filteredOptions: Observable<Place[]> = of([]);

  kundaliform: FormGroup;
  genders: string[] = ['Male', 'Female'];
  constructor(private placeService: PlaceService, private kundaliService: KundaliService, private fb: FormBuilder, private router: Router) {
    const now = new Date();
    this.kundaliform = this.fb.group({
      place: ['', Validators.required],
      second: [now.getSeconds(), Validators.required],
      minute: [now.getMinutes(), Validators.required],
      hour: [now.getHours(), Validators.required],
      day: [now.getDate(), Validators.required],
      month: [now.getMonth() + 1, Validators.required],
      year: [now.getFullYear(), Validators.required],
      gender: ['Male', Validators.required],
      name: ['', Validators.required],
    });

  }
  ngOnInit() {
    this.populateYears();
    this.selectedMonth = new Date().getMonth() + 1;
    this.selectedYear = new Date().getFullYear();
    const today = new Date();
    this.selectedDay = today.getDate();
    this.updateDays();
    this.populateTimeUnits();
    this.setCurrentTime();


    this.filteredOptions = this.place.valueChanges.pipe(
      debounceTime(300), // wait 300ms after typing
      distinctUntilChanged(), // only continue if the value changed
      filter((value: string) => value.length >= 3),
      switchMap((value: string) => this.placeService.getCityInfo(value)), // make the API call
      map(data => this.filterOptions(data, this.kundaliform.get('place')!.value))
    );
  }
  filterOptions(options: Place[], filterText: string): Place[] {
    return options.filter(option =>
      option.place.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  private _filter(value: string): Place[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.place.toLowerCase().includes(filterValue));
  }

  onOptionSelected(option: Place) {
    this.place.setValue(option);
    this.kundaliform.get('place')!.setValue(option);
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 100; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }
  displayFn(place: Place): string {
    return place ? `${place.place}, ${place.state}` : '';
  }
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  updateDays() {
    if (this.selectedMonth !== undefined && this.selectedYear !== undefined) {
      let daysInMonth;
      if (this.selectedMonth === 2) { // February
        daysInMonth = this.isLeapYear(this.selectedYear) ? 29 : 28;
      } else {
        daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      }
      this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
  }


  populateTimeUnits() {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i);
      this.seconds.push(i);
    }
  }

  setCurrentTime() {
    const now = new Date();
    this.selectedHour = now.getHours();
    this.selectedMinute = now.getMinutes();
    this.selectedSecond = now.getSeconds();
  }

  onSubmit() {

    const place: Place = this.kundaliform.get('place')!.value;

    let dateTime: DateTime = new DateTime();
    dateTime.setHr(this.kundaliform.get('hour')!.value);
    dateTime.setMin(this.kundaliform.get('minute')!.value);
    dateTime.setSec(this.kundaliform.get('second')!.value);
    dateTime.setDate(this.kundaliform.get('day')!.value);
    dateTime.setMonth(this.kundaliform.get('month')!.value);
    dateTime.setYear(this.kundaliform.get('year')!.value);

    this.birthDetail.setName(this.kundaliform.get('name')!.value);
    this.birthDetail.setSex(this.kundaliform.get('gender')!.value);
    this.birthDetail.setDst("0");
    this.birthDetail.setKphn("0");
    this.birthDetail.setAyanamsa("0");
    this.birthDetail.setLanguageCode("0");
    this.birthDetail.setDateTime(dateTime);
    this.birthDetail.setPlace(place);
    this.fetchKundliData();
    //this.generatePdf();
    //this.kundaliService.downloadPdf(this.birthDetail)
  }
  fetchKundliData() {
    this.kundaliService.getKundliData(this.birthDetail).subscribe(
      data => {
        this.kundaliService.setKundliData(data);
        this.router.navigate(['/kundali-result']);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  // generatePdf() {

  //   const body = {
  //     name: this.birthDetail.getName(),
  //     sex: this.birthDetail.getSex(),
  //     dateTimeBean: {
  //       day: this.birthDetail.getDateTime().getDate(),
  //       month: parseInt(this.birthDetail.getDateTime().getMonth()),
  //       year: this.birthDetail.getDateTime().getYear(),
  //       hrs: this.birthDetail.getDateTime().getHr(),
  //       min: this.birthDetail.getDateTime().getMin(),
  //       sec: this.birthDetail.getDateTime().getSec(),
  //     },
  //     placeDetail: {
  //       place: this.birthDetail.getPlace().place,
  //       latDeg: this.birthDetail.getPlace().latDeg,
  //       latMin: this.birthDetail.getPlace().latMin,
  //       latNS: this.birthDetail.getPlace().latNS,
  //       longDeg: this.birthDetail.getPlace().longDeg,
  //       longMin: this.birthDetail.getPlace().longMin,
  //       longEW: this.birthDetail.getPlace().longEW,
  //       state: this.birthDetail.getPlace().state,
  //       country: this.birthDetail.getPlace().country,
  //       timezone: this.birthDetail.getPlace().timezone,
  //       timezoneStr: this.birthDetail.getPlace().timezoneStr
  //     },
  //     dst: this.birthDetail.getDst(),
  //     ayanamsa: this.birthDetail.getAyanamsa(),
  //     charting: "1",
  //     kphn: "0",
  //     button1: "",
  //     languageCode: this.birthDetail.getLanguageCode(),
  //   };

  //   this.kundaliService.downloadPdf(body).subscribe(response => {
  //     const blob = new Blob([response.body!], { type: 'application/pdf' });

  //     // Create a download link
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;

  //     // Optional: extract filename from header if your backend sets it
  //     const contentDisposition = response.headers.get('Content-Disposition');
  //     let filename = 'drawing.pdf';
  //     if (contentDisposition) {
  //       const matches = /filename="([^"]*)"/.exec(contentDisposition);
  //       if (matches != null && matches[1]) filename = matches[1];
  //     }

  //     a.download = filename;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   }, error => {
  //     console.error('PDF download failed', error);
  //   });
  // }

}

