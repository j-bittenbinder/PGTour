import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StorePage } from './store.page';
import { ModalDischargePage } from '../modal-discharge/modal-discharge.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StorePage, ModalDischargePage],
  entryComponents: [ModalDischargePage]
})
export class StorePageModule {}
