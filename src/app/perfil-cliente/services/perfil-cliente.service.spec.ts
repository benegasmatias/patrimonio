import { TestBed } from '@angular/core/testing';

import { PerfilClienteService } from './perfil-cliente.service';

describe('PerfilClienteService', () => {
  let service: PerfilClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
