import { Component } from '@angular/core';
import { MuhuratResponse } from '../../../../models/muhurats.model';
import { PlaceService } from '../../../../services/place/place.service';
import { PanchangService } from '../../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-grah-pravesh-muhurat',
  templateUrl: './grah-pravesh-muhurat.component.html',
  styleUrl: './grah-pravesh-muhurat.component.scss'
})
export class GrahPraveshMuhuratComponent {
  muhuratResponse: MuhuratResponse | null = null;
  constructor(private placeService: PlaceService, private panchangService: PanchangService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.addObservers()

  }
  fetchMuhuratData(): void {
    this.panchangService.getMuhuratData(5).subscribe(
      data => {
        this.panchangService.setGrahPraveshMuhuratData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  addObservers() {
    this.fetchMuhuratData();
    this.panchangService.grahPraveshMuhuratData$.subscribe(data => {
      if (data != null) {
        this.muhuratResponse = data;
      } else {
        this.fetchMuhuratData();
      }
    });
  }
}
