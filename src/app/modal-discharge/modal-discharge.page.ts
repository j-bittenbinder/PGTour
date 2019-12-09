import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Events, ToastController } from '@ionic/angular';
import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { DataUser } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-discharge',
  templateUrl: './modal-discharge.page.html',
  styleUrls: ['./modal-discharge.page.scss'],
})
export class ModalDischargePage implements OnInit {

  toast: any;
  id_prod: any;
  nome: any;
  parceiro_id_parc: any;
  valor: any;
  response: boolean =  false;
  userData: DataUser;
  pontuacaoAtual: any;

  constructor(
    private modal: ModalController,
    private navParams: NavParams,
    private service: PontoTuristicoService,
    private events: Events,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  close() {
    this.modal.dismiss();
  }

  ngOnInit() {
    this.id_prod = this.navParams.get('id_prod');
    this.nome = this.navParams.get('nome');
    this.parceiro_id_parc = this.navParams.get('parceiro_id_parc');
    this.valor = this.navParams.get('valor');
    this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
  }

  async presentToastWithOptions() {
    this.toast = await this.toastCtrl.create({
      header: 'Atenção!',
      message: 'Você não possui pontuação suficiente :(',
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

  trocar() {
    let dados = {
      email: this.userData.objeto.email,
      ponto_prod: this.valor,
      id: this.id_prod
    };
    this.pontuacaoAtual = this.userData.objeto.pontos;
    if (parseInt(this.userData.objeto.pontos) >= parseInt(this.valor)) {
      this.service.trocaPonto(dados).subscribe(data=>{
        console.log(data)
        this.response = true;
        this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
        this.userData.objeto.pontos = (this.pontuacaoAtual - this.valor).toString();
        localStorage.setItem('DadosUsuario', JSON.stringify(this.userData));
        this.events.publish('user:changed', this.userData);
      });
    } else {
      this.modal.dismiss();
      this.presentToastWithOptions();
    }
  }

  home() {
    this.router.navigate(['/home']);
  }
}
