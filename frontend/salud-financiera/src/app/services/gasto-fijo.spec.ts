import { TestBed } from '@angular/core/testing';

import { GastoFijo } from './gasto-fijo';

describe('GastoFijo', () => {
  let service: GastoFijo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastoFijo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
