import { TestBed, inject } from '@angular/core/testing';

import { TaskchedulerserviceService } from './taskchedulerservice.service';

describe('TaskchedulerserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskchedulerserviceService]
    });
  });

  it('should be created', inject([TaskchedulerserviceService], (service: TaskchedulerserviceService) => {
    expect(service).toBeTruthy();
  }));
});
