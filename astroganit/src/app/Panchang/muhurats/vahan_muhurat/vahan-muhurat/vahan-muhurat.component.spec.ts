import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VahanMuhuratComponent } from './vahan-muhurat.component';

describe('VahanMuhuratComponent', () => {
  let component: VahanMuhuratComponent;
  let fixture: ComponentFixture<VahanMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VahanMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VahanMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
