import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { OfferResolver } from './Offer.resolver';

describe('offerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => OfferResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
