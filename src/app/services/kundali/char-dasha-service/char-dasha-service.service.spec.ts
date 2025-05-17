import { TestBed } from '@angular/core/testing';

import { CharDashaServiceService } from './char-dasha-service.service';

describe('CharDashaServiceService', () => {
  let service: CharDashaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharDashaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
