import { Component } from '@angular/core';
import { MuhuratResponse } from '../../../../models/muhurats.model';
import { PlaceService } from '../../../../services/place/place.service';
import { PanchangService } from '../../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vahan-muhurat',
  templateUrl: './vahan-muhurat.component.html',
  styleUrl: './vahan-muhurat.component.scss'
})
export class VahanMuhuratComponent {
  muhuratResponse: MuhuratResponse | null = null;
  constructor(private placeService: PlaceService, private panchangService: PanchangService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.addObservers()

  }
  fetchMuhuratData(): void {
    this.panchangService.getMuhuratData(2).subscribe(
      data => {
        this.panchangService.setVahanMuhuratData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  addObservers() {
    this.panchangService.vahanMuhuratData$.subscribe(data => {
      if (data != null) {
        this.muhuratResponse = data;
        console.log(data)
      } else {
        this.fetchMuhuratData();
      }
    });
  }
}


