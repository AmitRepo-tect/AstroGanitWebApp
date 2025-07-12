import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MundanMuhuratComponent } from './mundan-muhurat.component';

describe('MundanMuhuratComponent', () => {
  let component: MundanMuhuratComponent;
  let fixture: ComponentFixture<MundanMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MundanMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MundanMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
