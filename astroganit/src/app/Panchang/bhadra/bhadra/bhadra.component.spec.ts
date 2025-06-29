import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhadraComponent } from './bhadra.component';

describe('BhadraComponent', () => {
  let component: BhadraComponent;
  let fixture: ComponentFixture<BhadraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BhadraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BhadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
