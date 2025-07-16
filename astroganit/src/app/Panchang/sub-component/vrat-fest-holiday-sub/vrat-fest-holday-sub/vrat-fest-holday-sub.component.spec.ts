import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VratFestHoldaySubComponent } from './vrat-fest-holday-sub.component';

describe('VratFestHoldaySubComponent', () => {
  let component: VratFestHoldaySubComponent;
  let fixture: ComponentFixture<VratFestHoldaySubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VratFestHoldaySubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VratFestHoldaySubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
