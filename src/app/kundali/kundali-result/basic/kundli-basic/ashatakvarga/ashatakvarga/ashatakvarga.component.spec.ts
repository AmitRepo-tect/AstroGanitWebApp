import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshatakvargaComponent } from './ashatakvarga.component';

describe('AshatakvargaComponent', () => {
  let component: AshatakvargaComponent;
  let fixture: ComponentFixture<AshatakvargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AshatakvargaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AshatakvargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
