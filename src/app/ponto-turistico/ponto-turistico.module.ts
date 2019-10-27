import { AutoHideDirective } from './../auto-hide.directive';
import { MapPage } from './../map/map.page';
import { ModalonePage } from './../modalone/modalone.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PontoTuristicoPage } from './ponto-turistico.page';

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
  declarations: [PontoTuristicoPage, ModalonePage, MapPage, AutoHideDirective],
  entryComponents: [ModalonePage, MapPage]
})
export class PontoTuristicoPageModule {}
export class PontoTuristicoImg {}
export class PontoTuristicoComentario {}
