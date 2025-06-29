import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LagnaMuhuratComponent } from './lagna-muhurat.component';

describe('LagnaMuhuratComponent', () => {
  let component: LagnaMuhuratComponent;
  let fixture: ComponentFixture<LagnaMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LagnaMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LagnaMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
