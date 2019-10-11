import { TestBed } from '@angular/core/testing';

import { PontoTuristicoService } from './ponto-turistico.service';

describe('PontoTuristicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PontoTuristicoService = TestBed.get(PontoTuristicoService);
    expect(service).toBeTruthy();
  });
});
