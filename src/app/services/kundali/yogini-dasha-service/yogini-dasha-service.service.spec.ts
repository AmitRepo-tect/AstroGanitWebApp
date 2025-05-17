import { TestBed } from '@angular/core/testing';

import { YoginiDashaServiceService } from './yogini-dasha-service.service';

describe('YoginiDashaServiceService', () => {
  let service: YoginiDashaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoginiDashaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
