import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundliChartComponent } from './kundli-chart.component';

describe('KundliChartComponent', () => {
  let component: KundliChartComponent;
  let fixture: ComponentFixture<KundliChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundliChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundliChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
