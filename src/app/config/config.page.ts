import { Component, OnInit } from '@angular/core';
import { DataUser } from '../login/login.service';
import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { Events, ToastController } from '@ionic/angular';
// import * as cordovaGallery from 'cordova-gallery-access';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
// const uploadImagem = require('./uploadImage/uploadImage')

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})

export class ConfigPage implements OnInit {

  toast: any;
  userData: DataUser;
  distancia: any;
  nome: any;
  rg: any;
  cpf: any;
  telefone: any;
  senha: any;

  constructor(private service: PontoTuristicoService, private events: Events, private toastCtrl: ToastController) {
    try {
      if (localStorage.getItem('DadosUsuario') === null) {
        console.log('n tá logado');
      } else {
        this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
        this.nome = this.userData.objeto.nome;
        this.rg = this.userData.objeto.rg;
        this.cpf = this.userData.objeto.cpf;
        this.telefone = this.userData.objeto.telefone;
      }
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  ngOnInit() {
    if (localStorage.getItem('distancia') !== null){
      this.distancia = localStorage.getItem('distancia');
    }
  }

  uploadFoto() {
    // console.log('foi');
    // const options: CameraOptions = {
    //   quality: 70,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   saveToPhotoAlbum:false
    // }
    // console.log(options)
    // this.camera.getPicture(options).then((imageData) => {
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   uploadImagem(base64Image)
    //  }, (err) => {
    //   console.log(err)
    //  });
    // cordovaGallery.load({count:1}).then(items => {
    //     let html = '';
    //     items.forEach(item => {
    //         html += `<img src="file://${item.thumbnail}"></img>`;
    //         console.log(html)
    //     });
    //     document.getElementById("imagem").innerHTML = html;
    // }).catch(e => console.error(e));
    // }
  }

  alterarDistancia(){
    console.log(this.distancia);
    localStorage.setItem('distancia', this.distancia);
  }

  alterarDados(){
    let dados = {
      nome: this.nome,
      rg: this.rg,
      cpf: this.cpf,
      telefone: this.telefone,
      email: this.userData.objeto.email
    };

    console.log(dados)
    this.service.alterarUsuario(dados).subscribe(dados => {
      // console.log('ANTES', this.userData);
      this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
      this.userData.objeto.nome = this.nome;
      this.userData.objeto.rg = this.rg;
      this.userData.objeto.cpf = this.cpf;
      this.userData.objeto.telefone = this.telefone;
      // console.log('alterado', this.userData);
      localStorage.setItem('DadosUsuario', JSON.stringify(this.userData));
      this.events.publish('user:changed', this.userData);
      this.presentToastWithOptions();
    });
  }

  async presentToastWithOptions() {
    this.toast = await this.toastCtrl.create({
      header: 'Sucesso!',
      message: 'Seus dados foram atualizados.',
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
}
