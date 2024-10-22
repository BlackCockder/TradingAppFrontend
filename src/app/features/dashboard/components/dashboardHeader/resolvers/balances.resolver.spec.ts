import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { balancesResolver } from './balances.resolver';

describe('balancesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => balancesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
