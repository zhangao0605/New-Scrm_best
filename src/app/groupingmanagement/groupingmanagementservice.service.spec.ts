import { TestBed, inject } from '@angular/core/testing';

import { GroupingmanagementserviceService } from './groupingmanagementservice.service';

describe('GroupingmanagementserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupingmanagementserviceService]
    });
  });

  it('should be created', inject([GroupingmanagementserviceService], (service: GroupingmanagementserviceService) => {
    expect(service).toBeTruthy();
  }));
});
