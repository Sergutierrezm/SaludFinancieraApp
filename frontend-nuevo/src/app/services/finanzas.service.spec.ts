import { TestBed } from '@angular/core/testing';

import { FinanzasService } from './finanzas.service';

describe('FinanzasService', () => {
  let service: FinanzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
