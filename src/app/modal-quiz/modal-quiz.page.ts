import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams } from '@ionic/angular';
import { PontoTuristicoService, DadosPonto } from '../ponto-turistico/ponto-turistico.service';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.page.html',
  styleUrls: ['./modal-quiz.page.scss'],
})
export class ModalQuizPage implements OnInit {

  htmlToAdd: any;

  ponto: string;
  questao: any;
  pontuacao: any;
  respostas: any;
  loading: any;
  alternativa: string;
  user: any;
  point: DadosPonto;

  constructor(
      private modal: ModalController,
      private navParams: NavParams,
      private service: PontoTuristicoService,
      public loadingController: LoadingController
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

 async ngOnInit() {
     this.service.getPerguntas(this.navParams.get('id')).subscribe(async dados => {
      this.presentLoadingWithOptions();
      if (dados.length > 0) {
        this.questao = dados[Math.floor(Math.random() * dados.length)];
        // tslint:disable-next-line: no-shadowed-variable
        await this.service.getResposta(this.questao.id_perg).subscribe(async dados => {
          this.respostas = await this.embaralhar(dados);
          this.loading.dismiss();
        });
      }
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
    console.log(this.questao.id_perg,this.user.Usuario)
    this.service.responder(this.questao.id_perg,this.user.Usuario).subscribe(async dados =>{
      if (this.alternativa === this.questao.resposta) {
        this.service.atribuirPonto(this.user.Usuario,this.pontuacao).subscribe(dados =>{
          alert('Certa resposta !');
          this.htmlToAdd = '<div class="two">A C E R T O U</div>';
        });
       
      } else {
        alert('EROOOU');
        this.htmlToAdd = '<div class="two">E R R O U</div>';
      }
      console.log(dados)
   });
    
  }

}
