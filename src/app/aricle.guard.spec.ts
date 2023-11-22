import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { aricleGuard } from './aricle.guard';

describe('aricleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aricleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
