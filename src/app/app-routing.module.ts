import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'ponto-turistico/:id', loadChildren: './ponto-turistico/ponto-turistico.module#PontoTuristicoPageModule'
    // path: 'ponto-turistico', loadChildren: './ponto-turistico/ponto-turistico.module#PontoTuristicoPageModule'
  },
  {
    path: 'login', loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule'
  },
  {
    path: 'map', loadChildren: './map/map.module#MapPageModule'
  },
  {
    path: 'modal-quiz', loadChildren: './modal-quiz/modal-quiz.module#ModalQuizPageModule'
  },
  {
    path: 'modal-rating', loadChildren: './modal-rating/modal-rating.module#ModalRatingPageModule'
  },
  {
    path: 'store', loadChildren: './store/store.module#StorePageModule'
  },
  {
    path: 'config', loadChildren: './config/config.module#ConfigPageModule'
  },
  {
    path: 'modal-image', loadChildren: './modal-image/modal-image.module#ModalImagePageModule'
  },
  {
    path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule'
  },  { path: 'extract', loadChildren: './extract/extract.module#ExtractPageModule' },
  { path: 'modal-discharge', loadChildren: './modal-discharge/modal-discharge.module#ModalDischargePageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
