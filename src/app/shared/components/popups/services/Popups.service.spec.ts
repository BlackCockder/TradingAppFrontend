import { TestBed } from '@angular/core/testing';

import { PopupsService } from './Popups.service';

describe('PopupsService', () => {
  let service: PopupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
