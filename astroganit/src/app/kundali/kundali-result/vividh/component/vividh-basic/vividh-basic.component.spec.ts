import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VividhBasicComponent } from './vividh-basic.component';

describe('VividhBasicComponent', () => {
  let component: VividhBasicComponent;
  let fixture: ComponentFixture<VividhBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VividhBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VividhBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
