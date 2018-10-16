import { TestBed, inject } from '@angular/core/testing';

import { NavbarServiceService } from './navbar-service.service';

describe('NavbarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarServiceService]
    });
  });

  it('should be created', inject([NavbarServiceService], (service: NavbarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
