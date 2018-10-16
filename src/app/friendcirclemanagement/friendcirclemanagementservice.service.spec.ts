import { TestBed, inject } from '@angular/core/testing';

import { FriendcirclemanagementserviceService } from './friendcirclemanagementservice.service';

describe('FriendcirclemanagementserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendcirclemanagementserviceService]
    });
  });

  it('should be created', inject([FriendcirclemanagementserviceService], (service: FriendcirclemanagementserviceService) => {
    expect(service).toBeTruthy();
  }));
});
