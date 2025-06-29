import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoGhatiComponent } from './do-ghati.component';

describe('DoGhatiComponent', () => {
  let component: DoGhatiComponent;
  let fixture: ComponentFixture<DoGhatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoGhatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoGhatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
