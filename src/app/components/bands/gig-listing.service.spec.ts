import { TestBed } from '@angular/core/testing';

import { GigListingService } from './gig-listing.service';

describe('GigListingService', () => {
  let service: GigListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
