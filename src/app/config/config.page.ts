import { Component, OnInit } from '@angular/core';
import { DataUser } from '../login/login.service';
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

  userData: DataUser;
  distancia: any;

  constructor() {
    try {
      if (localStorage.getItem('DadosUsuario') === null) {
        console.log('n tá logado');
      } else {
        this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
        console.log(this.userData)
      }
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  ngOnInit() {
    if(localStorage.getItem('distancia') !== null){
      this.distancia = localStorage.getItem('distancia');
    }
  }

  uploadFoto() {
    console.log('foi');
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
    console.log(this.distancia)
    localStorage.setItem('distancia', this.distancia);
    alert("Salvo")
  }
}
