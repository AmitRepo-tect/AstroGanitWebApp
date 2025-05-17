import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundliPlanetPositionComponent } from './kundli-planet-position.component';

describe('KundliPlanetPositionComponent', () => {
  let component: KundliPlanetPositionComponent;
  let fixture: ComponentFixture<KundliPlanetPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundliPlanetPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundliPlanetPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
