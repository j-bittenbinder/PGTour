import { AutoHideDirective } from './../auto-hide.directive';
import { MapPage } from './../map/map.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PontoTuristicoPage } from './ponto-turistico.page';
import { ModalQuizPage } from '../modal-quiz/modal-quiz.page';
import { ModalRatingPage } from '../modal-rating/modal-rating.page';

const routes: Routes = [
  {
    path: '',
    component: PontoTuristicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PontoTuristicoPage, MapPage, ModalQuizPage, ModalRatingPage, AutoHideDirective],
  entryComponents: [MapPage, ModalQuizPage, ModalRatingPage]
})
export class PontoTuristicoPageModule {}
export class PontoTuristicoImg {}
export class PontoTuristicoComentario {}
