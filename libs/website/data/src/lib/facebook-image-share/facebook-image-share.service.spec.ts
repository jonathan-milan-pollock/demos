import { TestBed } from '@angular/core/testing';

import { FacebookImageShareService } from './facebook-image-share.service';

describe('FacebookImageShareService', () => {
  let service: FacebookImageShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookImageShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
