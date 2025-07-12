import { Component } from '@angular/core';
import { PlaceService } from '../../../../services/place/place.service';
import { PanchangService } from '../../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';
import { MuhuratResponse } from '../../../../models/muhurats.model';

@Component({
  selector: 'app-vivah-muhurat',
  templateUrl: './vivah-muhurat.component.html',
  styleUrl: './vivah-muhurat.component.scss'
})
export class VivahMuhuratComponent {
  muhuratResponse: MuhuratResponse | null = null;
  constructor(private placeService: PlaceService, private panchangService: PanchangService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.addObservers()

  }
  fetchMuhuratData(): void {
    this.panchangService.getMuhuratData().subscribe(
      data => {
        this.panchangService.setMuhuratData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  addObservers() {
    this.panchangService.muhuratData$.subscribe(data => {
      if (data != null) {
        this.muhuratResponse = data;
        console.log(data)
      } else {
        this.fetchMuhuratData();
      }
    });
  }
}
