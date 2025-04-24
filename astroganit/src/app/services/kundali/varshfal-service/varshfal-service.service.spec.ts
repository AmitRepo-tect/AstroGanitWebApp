import { TestBed } from '@angular/core/testing';

import { VarshfalServiceService } from './varshfal-service.service';

describe('VarshfalServiceService', () => {
  let service: VarshfalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarshfalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
