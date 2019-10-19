import { MapPage } from './../map/map.page';
import { ModalonePage } from './../modalone/modalone.page';
import { PontoTuristicoService, DadosPonto } from './ponto-turistico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PontoTuristicoImg, PontoTuristicoPageModule } from './ponto-turistico.module';
import { LoadingController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-ponto-turistico',
  templateUrl: './ponto-turistico.page.html',
  styleUrls: ['./ponto-turistico.page.scss'],
})
export class PontoTuristicoPage implements OnInit {
  loading: any;
  point: DadosPonto;
  urls: PontoTuristicoImg[];

  constructor(
    private service: PontoTuristicoService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modal: ModalController,
    public loadingController: LoadingController) {
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return this.loading.present();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.presentLoadingWithOptions();
      const id = params.id;

      let dados ={
        nome: "",
        descricao: "",
        endereco: "",
        latitude: "",
        longitude: "",
        quantidade_visita: "",
        id_ponto: ""
      };

      this.point = dados;
      this.service.getPonto(id).subscribe(dados => {
        this.point = dados[0];
        console.log('point: ',this.point);
      });
      
      this.service.getFotos(id).subscribe(datap => {
        this.urls = datap;
        console.log('fotos:');
        console.log(this.urls);

        this.loading.dismiss();
      });
    });
  }

  async showQuiz() {
    const modal = await this.modal.create({
      component: ModalonePage
    });
    modal.present();
  }

  async maps() {
    const modal = await this.modal.create({
      component: MapPage
    });
    modal.present();
  }
}
