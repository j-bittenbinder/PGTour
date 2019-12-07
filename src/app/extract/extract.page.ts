import { Component, OnInit } from '@angular/core';
import { DataUser } from '../login/login.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.page.html',
  styleUrls: ['./extract.page.scss'],
})
export class ExtractPage implements OnInit {

  userData: DataUser;

  constructor(private router: Router, private modal: ModalController) {
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
