import { Component } from '@angular/core';
import { MuhuratResponse } from '../../../../models/muhurats.model';
import { PlaceService } from '../../../../services/place/place.service';
import { PanchangService } from '../../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bhumi-pujan',
  templateUrl: './bhumi-pujan.component.html',
  styleUrl: './bhumi-pujan.component.scss'
})
export class BhumiPujanComponent {
  muhuratResponse: MuhuratResponse | null = null;
  constructor(private placeService: PlaceService, private panchangService: PanchangService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.addObservers()

  }
  fetchMuhuratData(): void {
    this.panchangService.getMuhuratData(7).subscribe(
      data => {
        this.panchangService.setBhumiPujanMuhuratData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  addObservers() {
    this.fetchMuhuratData();
    this.panchangService.bhumiPujanMuhuratData$.subscribe(data => {
      if (data != null) {
        this.muhuratResponse = data;
      } else {
        this.fetchMuhuratData();
      }
    });
  }
}
