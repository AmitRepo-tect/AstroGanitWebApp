import { Component } from '@angular/core';
import { PanchangInput } from '../../models/panchanginput.model';
import { Place } from '../../models/place.model';
import { PanchangService } from '../../services/panchang/panchang.service';
import { PlaceService } from '../../services/place/place.service';
import { DatePipe } from '@angular/common';
import { PanchangResponse } from '../../models/panchang.model';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrl: './hora.component.scss'
})
export class HoraComponent {

  isModalOpen: boolean = false;
  panchangInput: PanchangInput | null = null;
  panchangData: PanchangResponse | null = null;
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
  selectedDate: String = ''
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
        this.selectedDate = this.getFormattedDate(this.panchangInput.date)
      } else {
        this.setPanchangInput(new PanchangInput(new Place(29585, "New Delhi", "28", "38", "N", "28.644800", "77", "13", "E", "77.216721", "NCT", "India", "5.5", "Asia/Kolkata"), new Date()))
      }
    });
    this.panchangService.panchangData$.subscribe(data => {
      if (data != null) {
        this.panchangData = data;
      } else {
        this.fetchPanchangData();
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
    const formattedDate = this.datePipe.transform(date, 'EEEE, dd MMMM yyyy');  // Format the date
    return formattedDate!;
  }
  incrementDate() {
    this.panchangInput?.date?.setDate(this.panchangInput?.date.getDate() + 1);
    this.panchangService.setPanchangInput(this.panchangInput!);
    this.fetchPanchangData();
  }
  decrementDate() {
    this.panchangInput?.date?.setDate(this.panchangInput?.date.getDate() - 1);
    this.panchangService.setPanchangInput(this.panchangInput!);
    this.fetchPanchangData();
  }
  fetchPanchangData(): void {

    this.panchangService.getPanchangData(this.panchangInput?.place.Place!, this.panchangInput?.place.state!, this.panchangInput?.place.latitude!, this.panchangInput?.place.longitude!, this.panchangInput?.place.timezone!,
      this.panchangInput?.date.getDate()!, this.panchangInput?.date.getMonth()!, this.panchangInput?.date.getFullYear()!).subscribe(
        data => {
          this.panchangService.setPanchangData(data);
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
}
