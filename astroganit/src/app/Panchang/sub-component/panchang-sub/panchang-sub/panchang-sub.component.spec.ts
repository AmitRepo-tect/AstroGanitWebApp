import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchangSubComponent } from './panchang-sub.component';

describe('PanchangSubComponent', () => {
  let component: PanchangSubComponent;
  let fixture: ComponentFixture<PanchangSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanchangSubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanchangSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
