import { TestBed } from '@angular/core/testing';

import { CrisisServiceService } from './crisis-service.service';

describe('CrisisServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrisisServiceService = TestBed.get(CrisisServiceService);
    expect(service).toBeTruthy();
  });
});
