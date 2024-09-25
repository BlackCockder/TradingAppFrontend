import { TestBed } from '@angular/core/testing';

import { DashboardHeaderService } from './DashboardHeader.service';

describe('DashboardHeaderService', () => {
  let service: DashboardHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
