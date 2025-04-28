import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarakComponent } from './karak.component';

describe('KarakComponent', () => {
  let component: KarakComponent;
  let fixture: ComponentFixture<KarakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KarakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KarakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
