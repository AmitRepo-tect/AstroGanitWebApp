import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchakComponent } from './panchak.component';

describe('PanchakComponent', () => {
  let component: PanchakComponent;
  let fixture: ComponentFixture<PanchakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanchakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanchakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
