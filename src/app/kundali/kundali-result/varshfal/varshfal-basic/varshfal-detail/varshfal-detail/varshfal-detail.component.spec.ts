import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarshfalDetailComponent } from './varshfal-detail.component';

describe('VarshfalDetailComponent', () => {
  let component: VarshfalDetailComponent;
  let fixture: ComponentFixture<VarshfalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarshfalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarshfalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
