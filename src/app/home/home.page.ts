import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pontos: any;
  usuario = 'Sidney';
  apikey = 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw';

  constructor(private service: PontoTuristicoService, private http: HttpClient,
              public navCtrl: NavController, private router: Router) {
    this.service.getListaPontos().subscribe( dados => {
      this.pontos = dados;
      console.log('lista:');
      console.log(this.pontos);
    });
  }

  visualizarPonto(id) {
    this.router.navigate(['/ponto-turistico'], {queryParams: id});
  }

}
