import { Component } from '@angular/core';
import { PanchangInput } from '../../../models/panchanginput.model';
import { FestDetailResponse, Festival } from '../../../models/FestDetailResponse.model';
import { Place } from '../../../models/place.model';
import { PlaceService } from '../../../services/place/place.service';
import { PanchangService } from '../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vrat',
  templateUrl: './vrat.component.html',
  styleUrl: './vrat.component.scss'
})
export class VratComponent {
  vratType: number = 0
  isModalOpen: boolean = false;
  panchangInput: PanchangInput | null = null;
  festDetailResponse: FestDetailResponse | null = null;
  festivalsByMonth: Festival[] | undefined;
  festivals: Festival[][] | undefined;
  objectKeys = Object.keys;
  years: number[] = [];
  months: string[] = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
  selectedMonth: String = ''
  vrat: string = 'पूर्णिमा व्रत'
  constructor(private placeService: PlaceService, private panchangService: PanchangService, private datePipe: DatePipe) { }

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
        this.selectedMonth = this.getFormattedDate(this.panchangInput.date)
      } else {
        this.setPanchangInput(new PanchangInput(new Place(29585, "New Delhi", "28", "38", "N", "28.644800", "77", "13", "E", "77.216721", "NCT", "India", "5.5", "Asia/Kolkata"), new Date()))
      }
    });
    this.panchangService.vratData$.subscribe(data => {
      if (data != null) {
        //this.festDetailResponse = data;
        //console.log(data)
        this.festivals = data.festDetail;
        this.festivalsByMonth = this.festivals[0];
      } else {
        this.fetchVratData();
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


  submit() {
    this.setPanchangInput(this.panchangInput!)
    //this.closeDialog.emit();
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
            this.places = response;  // Store the API response in places
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
  getFormattedDate(date: Date): String {
    const formattedDate = this.datePipe.transform(date, 'MMMM yyyy');  // Format the date
    return formattedDate!;
  }
  changeVratType(vratType: number) {
    this.vratType = vratType
    if (vratType == 0) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[0];
        this.vrat = 'पूर्णिमा व्रत'
      }

    } else if (vratType == 1) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[1];
        this.vrat = 'अमावस्या व्रत'
      }
    } else if (vratType == 2) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[2];
        this.vrat = 'एकादशी व्रत'
      }
    } else if (vratType == 3) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[3];
        this.vrat = 'प्रदोष व्रत'
      }
    } else if (vratType == 4) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[4];
        this.vrat = 'मासिक शिवरात्रि'
      }
    } else if (vratType == 5) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[5];
        this.vrat = 'संकष्टी चतुर्थी'
      }
    } else if (vratType == 6) {
      if (this.festivals && this.festivals.length > 0) {
        this.festivalsByMonth = this.festivals[6];
        this.vrat = 'संक्रांति कैलेण्डर'
      }
    }
  }
  incrementDate() {
    var year =
      console.log(this.panchangInput?.date.getFullYear())
    this.panchangInput?.date?.setFullYear(this.panchangInput?.date.getFullYear() + 1);
    this.panchangService.setPanchangInput(this.panchangInput!);
    this.fetchVratData();
  }
  decrementDate() {
    this.panchangInput?.date?.setFullYear(this.panchangInput?.date.getFullYear() - 1);
    this.panchangService.setPanchangInput(this.panchangInput!);
    this.fetchVratData();
  }
  fetchVratData(): void {
    this.panchangService.getVratData(this.panchangInput?.place.Place!, this.panchangInput?.place.state!, this.panchangInput?.place.latitude!, this.panchangInput?.place.longitude!, this.panchangInput?.place.timezone!,
      this.panchangInput?.date.getDate()!, this.panchangInput?.date.getMonth()!, this.panchangInput?.date.getFullYear()!).subscribe(
        data => {
          this.panchangService.setVratData(data);
        },
        error => {
          console.error('Error fetching Panchang data:', error);
        }
      );
  }
  openDatePlaceDialog() {
    this.isModalOpen = true;
  }

  closeDatePlaceDialog() {
    this.isModalOpen = false;
  }
  getMonthName(intMonth: number): String {

    return this.months[intMonth]
  }
  getDayName(dayInt: number): String {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']
    return weekDays[dayInt]
  }
  convertJulianToDate(julian: number): string {
    const J1970 = 2440587.5; // Julian date for Unix epoch
    const millis = (julian - J1970) * 86400000; // Convert days to ms
    const date = new Date(millis);

    // Format: 23 July, 2025
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('hi-IN', options);

    //return date.toLocaleDateString('en-GB', options);
  }
  getHindiMonthName(monthNumber: number): string {
    const hindiMonths = [
      'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
      'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
    ];

    // monthNumber: 1 → जनवरी, 2 → फरवरी, etc.
    return hindiMonths[monthNumber] || '';
  }
}


