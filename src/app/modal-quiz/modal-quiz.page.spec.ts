import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuizPage } from './modal-quiz.page';

describe('ModalQuizPage', () => {
  let component: ModalQuizPage;
  let fixture: ComponentFixture<ModalQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQuizPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
