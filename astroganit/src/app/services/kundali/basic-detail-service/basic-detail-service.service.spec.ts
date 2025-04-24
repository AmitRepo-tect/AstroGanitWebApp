import { TestBed } from '@angular/core/testing';

import { BasicDetailServiceService } from './basic-detail-service.service';

describe('BasicDetailServiceService', () => {
  let service: BasicDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
