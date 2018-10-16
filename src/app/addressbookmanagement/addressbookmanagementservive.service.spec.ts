import { TestBed, inject } from '@angular/core/testing';

import { AddressbookmanagementserviveService } from './addressbookmanagementservive.service';

describe('AddressbookmanagementserviveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressbookmanagementserviveService]
    });
  });

  it('should be created', inject([AddressbookmanagementserviveService], (service: AddressbookmanagementserviveService) => {
    expect(service).toBeTruthy();
  }));
});
