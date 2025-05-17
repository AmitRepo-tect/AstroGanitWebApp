import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHoroscopeComponent } from './daily-horoscope.component';

describe('DailyHoroscopeComponent', () => {
  let component: DailyHoroscopeComponent;
  let fixture: ComponentFixture<DailyHoroscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyHoroscopeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyHoroscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
