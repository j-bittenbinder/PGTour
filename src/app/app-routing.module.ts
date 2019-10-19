import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
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
    path: 'modalone', loadChildren: './modalone/modalone.module#ModalonePageModule'
  },
  {
    path: 'map', loadChildren: './map/map.module#MapPageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
