import { Component } from '@angular/core';
import { MuhuratResponse } from '../../../../models/muhurats.model';
import { PlaceService } from '../../../../services/place/place.service';
import { PanchangService } from '../../../../services/panchang/panchang.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-naamkaran-muhurat',
  templateUrl: './naamkaran-muhurat.component.html',
  styleUrl: './naamkaran-muhurat.component.scss'
})
export class NaamkaranMuhuratComponent {
  muhuratResponse: MuhuratResponse | null = null;
  constructor(private placeService: PlaceService, private panchangService: PanchangService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.addObservers()

  }
  fetchMuhuratData(): void {
    this.panchangService.getMuhuratData(3).subscribe(
      data => {
        this.panchangService.setNaamkaranMuhuratData(data);
      },
      error => {
        console.error('Error fetching Panchang data:', error);
      }
    );
  }
  addObservers() {
    this.fetchMuhuratData();
    this.panchangService.naamkaranMuhuratData$.subscribe(data => {
      if (data != null) {
        this.muhuratResponse = data;
      } else {
        this.fetchMuhuratData();
      }
    });
  }
}


