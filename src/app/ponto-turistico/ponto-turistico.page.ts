import { MapPage } from './../map/map.page';
import { ModalonePage } from './../modalone/modalone.page';
import { PontoTuristicoService, DadosPonto } from './ponto-turistico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PontoTuristicoImg, PontoTuristicoComentario } from './ponto-turistico.module';
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
  avaliacoes: any;
  nota = 0;

  constructor(
    private service: PontoTuristicoService,
    private route: ActivatedRoute,
    // private router: Router,
    private modal: ModalController,
    public loadingController: LoadingController) { }

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

      const dados = {
        nome: '',
        descricao: '',
        endereco: '',
        latitude: '',
        longitude: '',
        quantidade_visita: '',
        id_ponto: ''
      };

      this.point = dados;

      // tslint:disable-next-line: no-shadowed-variable
      this.service.getPonto(id).subscribe(dados => {
        this.point = dados[0];
        //console.log('point: ', this.point);
      });

      this.service.getFotos(id).subscribe(datap => {
        this.urls = datap;
        //console.log('fotos: ', this.urls);
      });

      this.service.getAvaliacoes(id).subscribe(dataCom => {
        this.avaliacoes = dataCom;
        //console.log('Comentarios', this.avaliacoes);
        if (this.avaliacoes.length > 0) {
          for (let item of this.avaliacoes) {
            this.nota = this.nota + parseInt(item.nota);
          }
          this.nota = this.nota / this.avaliacoes.length;
        }
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

  async showMap() {
    const modal = await this.modal.create({
      component: MapPage
    });
    modal.present();
  }
}
