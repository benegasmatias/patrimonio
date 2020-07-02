import { TestBed } from '@angular/core/testing';

import { SuscripcioneService } from './suscripcione.service';

describe('SuscripcioneService', () => {
  let service: SuscripcioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscripcioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
