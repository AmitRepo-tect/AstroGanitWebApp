import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashaBasicComponent } from './dasha-basic.component';

describe('DashaBasicComponent', () => {
  let component: DashaBasicComponent;
  let fixture: ComponentFixture<DashaBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashaBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
