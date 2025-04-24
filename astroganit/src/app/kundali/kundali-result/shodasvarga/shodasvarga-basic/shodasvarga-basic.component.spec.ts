import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShodasvargaBasicComponent } from './shodasvarga-basic.component';

describe('ShodasvargaBasicComponent', () => {
  let component: ShodasvargaBasicComponent;
  let fixture: ComponentFixture<ShodasvargaBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShodasvargaBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShodasvargaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
