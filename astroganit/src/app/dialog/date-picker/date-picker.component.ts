import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlaceService } from '../../services/place/place.service';
import { Place } from '../../models/place.model';
import { PanchangService } from '../../services/panchang/panchang.service';
import { PanchangInput } from '../../models/panchanginput.model';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('30000ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('30000ms', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class DatePickerComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  panchangInput: PanchangInput | null = null;
  years: number[] = [];
  months: string[] = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  days: number[] = [];
  isLoading = true;
  selectedItem: string = '';
  startYear: number = 1950;
  places: Place[] = [];
  filteredItems: Place[] = [];
  inputText: string = '';
  day!: number;
  month!: string;
  year!: number;
  constructor(private placeService: PlaceService, private panchangService: PanchangService) { }

  ngOnInit(): void {
    this.addObservers()
    for (let i = 1; i < 100; i++) {
      this.years[i - 1] = this.startYear;
      this.startYear++;
    }
    this.initDayArray();
  }
  addObservers() {
    this.panchangService.panchangInput$.subscribe(data => {
      if (data != null) {
        this.panchangInput = data;
        this.day = this.panchangInput.date.getDate();
        this.month = this.months[this.panchangInput.date.getMonth()];
        this.year = this.panchangInput.date.getFullYear();
        this.selectedItem = this.panchangInput.place.place
      } else {
        this.setPanchangInput(new PanchangInput(new Place(29585, "New Delhi", "28", "38", "N", "28.644800", "77", "13", "E", "77.216721", "NCT", "India", "5.5", "Asia/Kolkata"), new Date()))
      }
    });
  }
  selectDate(date: number): void {
    this.panchangInput?.date.setDate(date);
  }
  selectMonth(month: string): void {
    this.panchangInput?.date.setMonth(this.months.indexOf(month));
    this.initDayArray();
  }
  selectYear(year: number): void {
    this.panchangInput?.date.setFullYear(year);
    this.initDayArray();
  }
  selectPlace(place: Place): void {
    this.panchangInput!.place = place
    this.selectedItem = this.panchangInput!.place.place
    this.filteredItems = [];
  }

  close() {
    // this.closeDialog.emit({
    //   dateTime: this.dateTime,
    //   messageTest: this.message,
    // });
    this.closeDialog.emit();
  }
  submit() {
    this.setPanchangInput(this.panchangInput!)
    this.closeDialog.emit();
  }
  initDayArray(): void {
    this.days = [];

    if (["January", "March", "May", "July", "August", "October", "December"].includes(this.months[this.panchangInput!.date.getMonth()])) {
      for (let i = 1; i < 32; i++) {
        this.days[i - 1] = i;
      }
    } else if (this.months[this.panchangInput!.date.getMonth()] == "Febuary") {
      if (this.panchangInput!.date.getFullYear() % 4 == 0) {
        for (let i = 1; i < 30; i++) {
          this.days[i - 1] = i;
        }
      } else {
        for (let i = 1; i < 29; i++) {
          this.days[i - 1] = i;
        }
      }
    } else {
      for (let i = 1; i < 31; i++) {
        this.days[i - 1] = i;
      }
    }

  }
  filterItem() {
    // Check if the inputText length is 3 or more characters
    if (this.selectedItem.length >= 3) {
      this.places = []
      // If we haven't fetched data yet, call the API
      if (!this.places || this.places.length === 0) {
        this.placeService.getCityInfo(this.selectedItem)
          .subscribe(response => {
            console.log(response)
            //this.places = response;  // Store the API response in places
            this.places = response.map(p => Place.fromJson(p));
            console.log("latDeg" + response[0].latDeg)
            console.log("latitude" + response[0].latitude)
            this.filterData();  // Now filter the data
          }, error => {
            console.error('Error fetching city info', error);
          });
      } else {
        // If places is already populated, just filter the data
        this.filterData();
      }
    } else {
      // If inputText length is less than 3, reset filteredItems
      this.filteredItems = [];
    }
  }

  filterData() {
    this.filteredItems = this.places.filter(item =>
      item.place.toLowerCase().includes(this.selectedItem.toLowerCase())
    );
  }
  setPanchangInput(panchangInput: PanchangInput) {
    this.panchangService.setPanchangInput(panchangInput);
  }
}


