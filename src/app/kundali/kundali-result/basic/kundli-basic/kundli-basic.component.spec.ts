import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundliBasicComponent } from './kundli-basic.component';

describe('KundliBasicComponent', () => {
  let component: KundliBasicComponent;
  let fixture: ComponentFixture<KundliBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundliBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundliBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
