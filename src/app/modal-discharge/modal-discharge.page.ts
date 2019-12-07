import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Events } from '@ionic/angular';
import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { DataUser } from '../login/login.service';

@Component({
  selector: 'app-modal-discharge',
  templateUrl: './modal-discharge.page.html',
  styleUrls: ['./modal-discharge.page.scss'],
})
export class ModalDischargePage implements OnInit {

  id_prod: any;
  nome: any;
  parceiro_id_parc: any;
  valor: any;
  response :boolean =  false;
  userData: DataUser;
  pontuacaoAtual: any;

  constructor(private modal: ModalController, private navParams: NavParams, private service: PontoTuristicoService, private events: Events) { }

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

  trocar(){
    let dados = {
      email: this.userData.objeto.email,
      ponto_prod: this.valor,
      id: this.id_prod
    }
    this.pontuacaoAtual = this.userData.objeto.pontos;
    if(parseInt(this.userData.objeto.pontos)>=parseInt(this.valor)){
      this.service.trocaPonto(dados).subscribe(data=>{
        console.log(data)
        this.response = true;
        this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
        this.userData.objeto.pontos = (this.pontuacaoAtual - this.valor).toString();
        localStorage.setItem('DadosUsuario', JSON.stringify(this.userData));
        this.events.publish('user:changed', this.userData);
      })
    }else{
      alert("Você não possui pontuação suficiente :(")
    }
  }

}
