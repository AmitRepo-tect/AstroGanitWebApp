import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarshfalTableComponent } from './varshfal-table.component';

describe('VarshfalTableComponent', () => {
  let component: VarshfalTableComponent;
  let fixture: ComponentFixture<VarshfalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarshfalTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarshfalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
