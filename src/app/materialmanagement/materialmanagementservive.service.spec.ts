import { TestBed, inject } from '@angular/core/testing';

import { MaterialmanagementserviveService } from './materialmanagementservive.service';

describe('MaterialmanagementserviveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialmanagementserviveService]
    });
  });

  it('should be created', inject([MaterialmanagementserviveService], (service: MaterialmanagementserviveService) => {
    expect(service).toBeTruthy();
  }));
});
