import { TestBed, inject } from '@angular/core/testing';

import { LabelmanagementserviveService } from './labelmanagementservive.service';

describe('LabelmanagementserviveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabelmanagementserviveService]
    });
  });

  it('should be created', inject([LabelmanagementserviveService], (service: LabelmanagementserviveService) => {
    expect(service).toBeTruthy();
  }));
});
