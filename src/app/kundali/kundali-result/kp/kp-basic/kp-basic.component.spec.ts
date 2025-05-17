import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpBasicComponent } from './kp-basic.component';

describe('KpBasicComponent', () => {
  let component: KpBasicComponent;
  let fixture: ComponentFixture<KpBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
