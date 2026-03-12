import { TestBed } from '@angular/core/testing';

import { Balance } from './balance';

describe('Balance', () => {
  let service: Balance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Balance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
