import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoginiDashaComponent } from './yogini-dasha.component';

describe('YoginiDashaComponent', () => {
  let component: YoginiDashaComponent;
  let fixture: ComponentFixture<YoginiDashaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YoginiDashaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoginiDashaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
