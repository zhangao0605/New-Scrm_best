import { TestBed, inject } from '@angular/core/testing';

import { CustomermanagementService } from './customermanagement.service';

describe('CustomermanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomermanagementService]
    });
  });

  it('should be created', inject([CustomermanagementService], (service: CustomermanagementService) => {
    expect(service).toBeTruthy();
  }));
});
