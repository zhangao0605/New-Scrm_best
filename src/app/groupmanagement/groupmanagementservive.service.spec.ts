import { TestBed, inject } from '@angular/core/testing';

import { GroupmanagementserviveService } from './groupmanagementservive.service';

describe('GroupmanagementserviveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupmanagementserviveService]
    });
  });

  it('should be created', inject([GroupmanagementserviveService], (service: GroupmanagementserviveService) => {
    expect(service).toBeTruthy();
  }));
});
