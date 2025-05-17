import { TestBed } from '@angular/core/testing';

import { VividhServiceService } from './vividh-service.service';

describe('VividhServiceService', () => {
  let service: VividhServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VividhServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
