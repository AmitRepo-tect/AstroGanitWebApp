import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvasthaComponent } from './avastha.component';

describe('AvasthaComponent', () => {
  let component: AvasthaComponent;
  let fixture: ComponentFixture<AvasthaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvasthaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvasthaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
