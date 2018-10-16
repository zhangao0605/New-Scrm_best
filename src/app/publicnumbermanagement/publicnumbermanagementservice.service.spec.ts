import { TestBed, inject } from '@angular/core/testing';

import { PublicnumbermanagementserviceService } from './publicnumbermanagementservice.service';

describe('PublicnumbermanagementserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicnumbermanagementserviceService]
    });
  });

  it('should be created', inject([PublicnumbermanagementserviceService], (service: PublicnumbermanagementserviceService) => {
    expect(service).toBeTruthy();
  }));
});
