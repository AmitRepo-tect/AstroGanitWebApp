import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RogandNidanComponent } from './rogand-nidan.component';

describe('RogandNidanComponent', () => {
  let component: RogandNidanComponent;
  let fixture: ComponentFixture<RogandNidanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RogandNidanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RogandNidanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
