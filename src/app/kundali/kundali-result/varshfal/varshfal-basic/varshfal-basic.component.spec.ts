import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarshfalBasicComponent } from './varshfal-basic.component';

describe('VarshfalBasicComponent', () => {
  let component: VarshfalBasicComponent;
  let fixture: ComponentFixture<VarshfalBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarshfalBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarshfalBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
