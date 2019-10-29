import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalRatingPage } from './modal-rating.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRatingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalRatingPage],
  exports: [ModalRatingPage]
})

export class ModalRatingPageModule {}
