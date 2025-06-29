import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RahukaalComponent } from './rahukaal.component';

describe('RahukaalComponent', () => {
  let component: RahukaalComponent;
  let fixture: ComponentFixture<RahukaalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RahukaalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RahukaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
