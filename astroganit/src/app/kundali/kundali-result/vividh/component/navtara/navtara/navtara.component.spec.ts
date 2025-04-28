import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtaraComponent } from './navtara.component';

describe('NavtaraComponent', () => {
  let component: NavtaraComponent;
  let fixture: ComponentFixture<NavtaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavtaraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavtaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
