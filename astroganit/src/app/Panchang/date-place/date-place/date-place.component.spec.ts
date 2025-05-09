import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePlaceComponent } from './date-place.component';

describe('DatePlaceComponent', () => {
  let component: DatePlaceComponent;
  let fixture: ComponentFixture<DatePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
