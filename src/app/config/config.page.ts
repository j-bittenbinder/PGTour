import { Component, OnInit } from '@angular/core';
import { DataUser } from '../login/login.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  userData: DataUser;

  constructor() {
    try {
      if (localStorage.getItem('DadosUsuario') === null) {
        console.log('n tá logado');
      } else {
        this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
      }
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  ngOnInit() {
  }

}
