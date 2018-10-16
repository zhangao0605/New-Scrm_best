import { TestBed, inject } from '@angular/core/testing';

import { HomeserviveService } from './homeservive.service';

describe('HomeserviveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeserviveService]
    });
  });

  it('should be created', inject([HomeserviveService], (service: HomeserviveService) => {
    expect(service).toBeTruthy();
  }));
});
