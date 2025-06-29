import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VratComponent } from './vrat.component';

describe('VratComponent', () => {
  let component: VratComponent;
  let fixture: ComponentFixture<VratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
