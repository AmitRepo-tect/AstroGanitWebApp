import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChogdiaComponent } from './chogdia.component';

describe('ChogdiaComponent', () => {
  let component: ChogdiaComponent;
  let fixture: ComponentFixture<ChogdiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChogdiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChogdiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
