import { Component, OnInit } from '@angular/core';
import { PanchangResponse } from '../../models/panchang.model';
import { PanchangService } from '../../services/panchang/panchang.service';
import { Place } from '../../models/place.model';
import { DatePipe } from '@angular/common';
import { PanchangInput } from '../../models/panchanginput.model';

@Component({
  selector: 'app-daily-panchang',
  templateUrl: './daily-panchang.component.html',
  styleUrl: './daily-panchang.component.scss'
})
export class DailyPanchangComponent implements OnInit {
  isModalOpen: boolean = false;
  panchangData: PanchangResponse | null = null;
  panchangInput: PanchangInput | null = null;
  selectedDate: String = ''
  selectedPlace: String = ''
  constructor(private panchangService: PanchangService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.addObservers()
  }
  addObservers() {
    this.panchangService.panchangInput$.subscribe(data => {
      if (data != null) {
        this.panchangInput = data
        this.selectedDate = this.getFormattedDate(this.panchangInput.date)
        this.selectedPlace = this.panchangInput.place.place
        this.fetchPanchangData();
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
  itemClicked(): void {
  }
  openDatePlaceDialog() {
    this.isModalOpen = true;
  }

  closeDatePlaceDialog() {
    this.isModalOpen = false;
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

}
