import { TestBed } from '@angular/core/testing';

import { SaveChangesGuard } from './save-changes.guard';

describe('SaveChangesGuard', () => {
  let guard: SaveChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaveChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
