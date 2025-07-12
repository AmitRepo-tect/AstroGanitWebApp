import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnprasanMuhuratComponent } from './annprasan-muhurat.component';

describe('AnnprasanMuhuratComponent', () => {
  let component: AnnprasanMuhuratComponent;
  let fixture: ComponentFixture<AnnprasanMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnprasanMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnprasanMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
