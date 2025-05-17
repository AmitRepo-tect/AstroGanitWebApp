import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundaliResultComponent } from './kundali-result.component';

describe('KundaliResultComponent', () => {
  let component: KundaliResultComponent;
  let fixture: ComponentFixture<KundaliResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundaliResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundaliResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
