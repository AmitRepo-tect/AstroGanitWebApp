import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaamkaranMuhuratComponent } from './naamkaran-muhurat.component';

describe('NaamkaranMuhuratComponent', () => {
  let component: NaamkaranMuhuratComponent;
  let fixture: ComponentFixture<NaamkaranMuhuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaamkaranMuhuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaamkaranMuhuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
