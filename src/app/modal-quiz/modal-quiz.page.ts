import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams } from '@ionic/angular';
import { PontoTuristicoService, DadosPonto } from '../ponto-turistico/ponto-turistico.service';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.page.html',
  styleUrls: ['./modal-quiz.page.scss'],
})
export class ModalQuizPage implements OnInit {

  ponto: string;
  questao: any;
  respostas: any;
  loading: any;
  alternativa: string;
  user: any;
  point: DadosPonto;

  constructor(private modal: ModalController, private navParams: NavParams, private service: PontoTuristicoService, public loadingController: LoadingController) {
    this.ponto = this.navParams.get('ponto');
    this.user = JSON.parse(localStorage.getItem('DadosUsuario'))
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

  ngOnInit() {
    this.service.getPerguntas(this.navParams.get('id')).subscribe(dados => {
      this.presentLoadingWithOptions();
      if(dados.length>0){
        this.questao = dados[Math.floor(Math.random() * dados.length)];

        this.service.getResposta(this.questao.id_perg).subscribe(dados =>{
          this.respostas = dados;
          this.loading.dismiss();
        })
      }
    });

  }

  close() {
    this.modal.dismiss();
  }

  async responder(){
    if(this.alternativa == this.questao.resposta){
      
      console.log(this.user.Usuario)
      alert("Certa resposta !");
      // this.service.responder(this.questao.id_perg,this.user.Usuario).subscribe(dados =>{
      //   console.log(dados)
      // })
      
    }else{
      alert("EROOOU");
    }
  }
}
