import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPanchangComponent } from './daily-panchang.component';

describe('DailyPanchangComponent', () => {
  let component: DailyPanchangComponent;
  let fixture: ComponentFixture<DailyPanchangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyPanchangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyPanchangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
