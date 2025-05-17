import { TestBed } from '@angular/core/testing';

import { DashaServiceService } from './dasha-service.service';

describe('DashaServiceService', () => {
  let service: DashaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
