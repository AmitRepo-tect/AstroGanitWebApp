import { Component, OnInit } from '@angular/core';
import { DateTime } from '../../models/date-time.model';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrl: './matchmaking.component.scss'
})
export class MatchmakingComponent implements OnInit {
  planets1 = [1, 3, 5, 2, 4, 6, 7, 8, 9, 10, 11, 12];  // Example data for first chart
  planets2 = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];  // Example data for second chart
  // To control modal visibility
  isModalOpen: boolean = false;
  message: string = 'Hello';
  dateTime: DateTime = new DateTime();
  constructor() { }
  ngOnInit(): void {
    this.dateTime.setMonth("May")
  }
  // Function to open modal and set message
  openCustomModal() {
    this.message = 'This is a custom modal with animation!';
    this.isModalOpen = true;
  }

  // Function to close modal
  // closeModal(event: { dateTime: DateTime, messageTest: string }) {
  //   this.dateTime = event.dateTime;
  //   this.message = event.messageTest;
  //   this.isModalOpen = false;
  // }
  closeModal() {

    this.isModalOpen = false;
  }
}
