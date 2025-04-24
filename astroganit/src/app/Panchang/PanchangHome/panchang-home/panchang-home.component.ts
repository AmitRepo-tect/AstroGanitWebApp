import { Component, OnInit } from '@angular/core';
import { PanchangResponse } from '../../../models/panchang.model';
import { PanchangService } from '../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';
import { Place } from '../../../models/place.model';
import { PanchangInput } from '../../../models/panchanginput.model';

@Component({
  selector: 'app-panchang-home',
  templateUrl: './panchang-home.component.html',
  styleUrl: './panchang-home.component.scss'
})
export class PanchangHomeComponent implements OnInit {
  panchangData: PanchangResponse | null = null;
  panchangInput: PanchangInput | null = null;
  currentDate: String = "";

  constructor(private panchangService: PanchangService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.addObservers();
  }
  addObservers() {
    this.panchangService.panchangInput$.subscribe(data => {
      if (data != null) {
        this.panchangInput = data;
        this.currentDate = this.getFormattedDate(this.panchangInput.date);
        this.fetchPanchangData();
      } else {
        this.setPanchangInput(new PanchangInput(new Place(29585, "New Delhi", "28", "38", "N", "77", "13", "E", "NCT", "India", "5.5", "Asia/Kolkata"), new Date()))
      }
    });
    this.panchangService.panchangData$.subscribe(data => {
      this.panchangData = data;
    });
  }

  fetchPanchangData(): void {
    // You can modify the parameters as needed
    this.panchangService.getPanchangData('New York', 'USA', 15, 10, 2024).subscribe(
      data => {
        this.panchangService.setPanchangData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  getFormattedDate(date: Date): String {
    const formattedDate = this.datePipe.transform(date, 'EEEE, dd MMMM yyyy');  // Format the date
    return formattedDate!;  // Return the formatted date
  }
  initDefaultPlace() {
    this.panchangService.setPlace(new Place(29585, "New Delhi", "28", "38", "N", "77", "13", "E", "NCT", "India", "5.5", "Asia/Kolkata"));
  }
  initSelectedDate() {
    this.panchangService.setSelectedDate(new Date());
  }
  setPanchangInput(panchangInput: PanchangInput) {
    this.panchangService.setPanchangInput(panchangInput);
  }
}
