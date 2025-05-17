import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharDashaComponent } from './char-dasha.component';

describe('CharDashaComponent', () => {
  let component: CharDashaComponent;
  let fixture: ComponentFixture<CharDashaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharDashaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharDashaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
