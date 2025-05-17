import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VimshotriDashaComponent } from './vimshotri-dasha.component';

describe('VimshotriDashaComponent', () => {
  let component: VimshotriDashaComponent;
  let fixture: ComponentFixture<VimshotriDashaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VimshotriDashaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VimshotriDashaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
