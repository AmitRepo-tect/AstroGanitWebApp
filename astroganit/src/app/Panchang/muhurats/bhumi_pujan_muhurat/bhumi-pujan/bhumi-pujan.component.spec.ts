import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhumiPujanComponent } from './bhumi-pujan.component';

describe('BhumiPujanComponent', () => {
  let component: BhumiPujanComponent;
  let fixture: ComponentFixture<BhumiPujanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BhumiPujanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BhumiPujanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
