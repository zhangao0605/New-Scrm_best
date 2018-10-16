import { TestBed, inject } from '@angular/core/testing';

import { SocialnumberservicemanagementService } from './socialnumberservicemanagement.service';

describe('SocialnumberservicemanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialnumberservicemanagementService]
    });
  });

  it('should be created', inject([SocialnumberservicemanagementService], (service: SocialnumberservicemanagementService) => {
    expect(service).toBeTruthy();
  }));
});
