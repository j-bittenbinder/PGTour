import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDischargePage } from './modal-discharge.page';

describe('ModalDischargePage', () => {
  let component: ModalDischargePage;
  let fixture: ComponentFixture<ModalDischargePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDischargePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDischargePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
