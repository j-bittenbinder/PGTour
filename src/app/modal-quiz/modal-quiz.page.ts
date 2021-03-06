import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { PontoTuristicoService, DadosPonto } from '../ponto-turistico/ponto-turistico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.page.html',
  styleUrls: ['./modal-quiz.page.scss'],
})
export class ModalQuizPage implements OnInit {

  response = false;
  acertou = false;
  errou = false;

  resposta: any;
  toast: any;
  ponto: string;
  questao: any;
  pontuacao: any;
  respostas: any;
  motivo: any;
  loading: any;
  alternativa: string;
  user: any;
  point: DadosPonto;

  constructor(
      private modal: ModalController,
      private navParams: NavParams,
      private service: PontoTuristicoService,
      public loadingController: LoadingController,
      private toastCtrl: ToastController,
      private router: Router
    ) {
      this.ponto = this.navParams.get('ponto');
      this.user = JSON.parse(localStorage.getItem('DadosUsuario'));
      // id do ponto pra puxar questão relacionada
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

  async presentToastWithOptions() {
    this.toast = await this.toastCtrl.create({
      header: 'Atenção!',
      message: 'Você atingiu sua cota de perguntas para responder até o momento.',
      duration: 5000,
      position: 'top',
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return this.toast.present();
  }

 async ngOnInit() {
     this.service.getPerguntas(this.navParams.get('id'), this.user.objeto.email).subscribe(async dados => {
      await this.presentLoadingWithOptions();

      if (dados.length > 0) {
        // console.log(dados);
        this.questao = dados[Math.floor(Math.random() * dados.length)];
        this.resposta = this.questao.resposta;
        // tslint:disable-next-line: no-shadowed-variable
        await this.service.getResposta(this.questao.id_perg).subscribe(async dados => {
          this.respostas = await this.embaralhar(dados);
          this.loading.dismiss();
        });
      } else {
        this.presentToastWithOptions();
        this.modal.dismiss();
      }
      this.loading.dismiss();
    });
  }

  embaralhar(array) {
    let indice_atual = array.length;
    let valor_temporario;
    let indice_aleatorio;

    while (0 !== indice_atual) {
      indice_aleatorio = Math.floor(Math.random() * indice_atual);
      indice_atual -= 1;

      valor_temporario = array[indice_atual];
      array[indice_atual] = array[indice_aleatorio];
      array[indice_aleatorio] = valor_temporario;
    }
    return array;
}

  close() {
    this.modal.dismiss();
  }

  pgstore() {
    this.modal.dismiss();
    this.router.navigate(['/store']);
  }

  async responder() {
    switch(this.questao.tipo_pergunta){
      case 'dificil':
        this.pontuacao = 50;
        break;
      case 'facil':
        this.pontuacao = 10;
        break;
      case 'medio':
          this.pontuacao = 30;
        break;
      default:
          this.pontuacao = 0;
    }
    this.service.responder(this.questao.id_perg, this.user.Usuario).subscribe(async dados => {
      if (this.alternativa === this.questao.resposta) {
        this.service.atribuirPonto(this.user.Usuario, this.pontuacao).subscribe(dados => {
        });
        this.response = true;
        this.acertou = true;
      } else {
        this.response = true;
        this.errou = true;
      }
    });
  }

}
