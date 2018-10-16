import { TestBed, inject } from '@angular/core/testing';

import { TasktemplateserveService } from './tasktemplateserve.service';

describe('TasktemplateserveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasktemplateserveService]
    });
  });

  it('should be created', inject([TasktemplateserveService], (service: TasktemplateserveService) => {
    expect(service).toBeTruthy();
  }));
});
