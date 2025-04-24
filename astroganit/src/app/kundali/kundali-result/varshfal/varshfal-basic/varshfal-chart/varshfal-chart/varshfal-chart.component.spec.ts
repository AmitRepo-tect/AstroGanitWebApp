import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarshfalChartComponent } from './varshfal-chart.component';

describe('VarshfalChartComponent', () => {
  let component: VarshfalChartComponent;
  let fixture: ComponentFixture<VarshfalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarshfalChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarshfalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
