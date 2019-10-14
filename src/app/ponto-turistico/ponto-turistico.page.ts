import { PontoTuristicoService, DadosPonto } from './ponto-turistico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PontoTuristicoImg, PontoTuristicoPageModule } from './ponto-turistico.module';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-ponto-turistico',
  templateUrl: './ponto-turistico.page.html',
  styleUrls: ['./ponto-turistico.page.scss'],
})
export class PontoTuristicoPage implements OnInit {
  loading: any;
  point: DadosPonto;
  ponto: PontoTuristicoPageModule[];
  urls: PontoTuristicoImg[];

  constructor(private service: PontoTuristicoService, private route: ActivatedRoute,
              private router: Router, private http: HttpClient, public loadingController: LoadingController) {
}

async presentLoadingWithOptions() {
  this.loading = await this.loadingController.create({
    spinner: "circles",
    message: 'Carregando..',
    translucent: true,
    cssClass: 'custom-class custom-loading'
  });
  return this.loading.present();
}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.presentLoadingWithOptions();
      
      this.service.getPonto(params[0]).subscribe(dados  => {
        this.ponto = dados;
        console.log('ponto:');
        console.log(this.ponto);
      });
      this.service.getFotos(params[0]).subscribe(datap => {
        this.urls = datap;
        console.log('fotos:');
        console.log(this.urls);
        
        this.loading.dismiss();
      });

      
    });
  }

}
