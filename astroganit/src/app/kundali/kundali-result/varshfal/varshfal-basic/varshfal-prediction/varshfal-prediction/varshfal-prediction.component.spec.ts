import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarshfalPredictionComponent } from './varshfal-prediction.component';

describe('VarshfalPredictionComponent', () => {
  let component: VarshfalPredictionComponent;
  let fixture: ComponentFixture<VarshfalPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarshfalPredictionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarshfalPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
