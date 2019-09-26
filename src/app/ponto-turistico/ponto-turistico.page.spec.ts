import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoTuristicoPage } from './ponto-turistico.page';

describe('PontoTuristicoPage', () => {
  let component: PontoTuristicoPage;
  let fixture: ComponentFixture<PontoTuristicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontoTuristicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoTuristicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
