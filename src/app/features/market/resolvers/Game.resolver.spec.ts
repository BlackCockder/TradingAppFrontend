import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { gameResolver } from './Game.resolver';

describe('gameResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => gameResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
