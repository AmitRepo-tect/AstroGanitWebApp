import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VivahMuhuratComponent } from './vivah-muhurat.component';

describe('VivahMuhuratComponent', () => {
  let component: VivahMuhuratComponent;
  let fixture: ComponentFixture<VivahMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VivahMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VivahMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
