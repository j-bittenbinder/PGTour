import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalQuizPage } from './modal-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: ModalQuizPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalQuizPage],
  exports: [ModalQuizPage]
})

export class ModalQuizPageModule {}
