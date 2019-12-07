import { ModalImagePage } from './../modal-image/modal-image.page';
import { MapPage } from './../map/map.page';
import { ModalQuizPage } from './../modal-quiz/modal-quiz.page';
import { ModalRatingPage } from './../modal-rating/modal-rating.page';
import { PontoTuristicoService, DadosPonto } from './ponto-turistico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PontoTuristicoImg } from './ponto-turistico.module';
import { LoadingController, ModalController, Events } from '@ionic/angular';

@Component({
  selector: 'app-ponto-turistico',
  templateUrl: './ponto-turistico.page.html',
  styleUrls: ['./ponto-turistico.page.scss'],
})

export class PontoTuristicoPage implements OnInit {

  rateUser: number;
  rating: number;
  loading: any;
  point: DadosPonto;
  urls: PontoTuristicoImg[];
  avaliacoes: any;
  nota = 0;
  notaInt = 0;

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(
    private service: PontoTuristicoService,
    private route: ActivatedRoute,
    // private router: Router,
    private modal: ModalController,
    public loadingController: LoadingController,
    private events: Events
  ) {}

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    // return this.loading.present();
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
        
        // console.log('point: ', this.point);
      });

      // const photos = {
      //   url_img: '',
      //   ponto_turistico_id_ponto: ''
      // };

      // this.urls = photos;
      this.service.getFotos(id).subscribe(datap => {
        this.urls = datap;
        // console.log('fotos: ', this.urls);
      });

      this.service.getAvaliacoes(id).subscribe(dataCom => {
        this.avaliacoes = dataCom;
        // console.log('Comentarios', this.avaliacoes);
        if (this.avaliacoes.length > 0) {
          for (let item of this.avaliacoes) {
            this.nota = this.nota + parseInt(item.nota);
            // this.rateUser = item.nota;
            // console.log(this.rateUser);
          }
          this.nota = this.nota / this.avaliacoes.length;
          this.notaInt = parseInt(this.nota.toFixed(1));
        }
        this.loading.dismiss();
      });

      this.events.subscribe('rating:changed', data => { // recebe evento do modal-rating pra atualizar comentários
        this.nota = 0;
        this.service.getAvaliacoes(id).subscribe(dataCom => {
          this.avaliacoes = dataCom;
          if (this.avaliacoes.length > 0) {
            for (let item of this.avaliacoes) {
              this.nota = this.nota + parseInt(item.nota);
            }
            this.nota = this.nota / this.avaliacoes.length;
            this.nota = parseInt(this.nota.toFixed())
          }
          this.loading.dismiss();
        });
      });
    });
  }

  async showQuiz() {
    const modal = await this.modal.create({
      component: ModalQuizPage,
      cssClass: 'modal-wh',
      componentProps: {
        ponto: this.point.nome,
        id: this.point.id_ponto
      }
    });
    modal.present();
  }

  async showRating() {
    const modal = await this.modal.create({
      component: ModalRatingPage,
      cssClass: 'modal-wh',
      componentProps: {
        ponto: this.point.nome,
        id: this.point.id_ponto
      }
    });
    modal.present();
  }

  async showMap() {
    const modal = await this.modal.create({
      component: MapPage,
      componentProps: {
        lat: this.point.latitude,
        lng: this.point.longitude,
        nomePonto: this.point.nome
      }
    });
    modal.present();
  }

  async openPreview(url) {
    const modal = await this.modal.create({
      component: ModalImagePage,
      componentProps: {
        img: url
      }
    });
    modal.present();
  }

  // NOTA PONTO
  getColor(index: number) {
    enum COLORS {
      GREY = '#E0E0E0',
      GOLD = 'gold'
    }

    if (this.isAboveRatingPonto(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return COLORS.GOLD;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRatingPonto(index: number): boolean {
    this.rating = this.notaInt;
    return index > this.rating;
  }
}
