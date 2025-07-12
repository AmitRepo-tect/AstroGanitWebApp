import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrahPraveshMuhuratComponent } from './grah-pravesh-muhurat.component';

describe('GrahPraveshMuhuratComponent', () => {
  let component: GrahPraveshMuhuratComponent;
  let fixture: ComponentFixture<GrahPraveshMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrahPraveshMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrahPraveshMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
