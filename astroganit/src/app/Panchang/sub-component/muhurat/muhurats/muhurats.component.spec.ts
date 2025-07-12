import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuhuratsComponent } from './muhurats.component';

describe('MuhuratsComponent', () => {
  let component: MuhuratsComponent;
  let fixture: ComponentFixture<MuhuratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuhuratsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuhuratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
