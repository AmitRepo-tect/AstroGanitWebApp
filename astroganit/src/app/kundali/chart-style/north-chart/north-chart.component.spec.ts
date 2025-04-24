import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthChartComponent } from './north-chart.component';

describe('NorthChartComponent', () => {
  let component: NorthChartComponent;
  let fixture: ComponentFixture<NorthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NorthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NorthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
