import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchangHomeComponent } from './panchang-home.component';

describe('PanchangHomeComponent', () => {
  let component: PanchangHomeComponent;
  let fixture: ComponentFixture<PanchangHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanchangHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanchangHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
