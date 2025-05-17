import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharAnterDashaComponent } from './char-anter-dasha.component';

describe('CharAnterDashaComponent', () => {
  let component: CharAnterDashaComponent;
  let fixture: ComponentFixture<CharAnterDashaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharAnterDashaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharAnterDashaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
