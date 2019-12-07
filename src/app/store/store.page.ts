import { Component, OnInit } from '@angular/core';
import { DataUser } from '../login/login.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalDischargePage } from '../modal-discharge/modal-discharge.page';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

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

  extract() {
    this.router.navigate(['/extract']);
  }

  async modalDischarge() {
    const modal = await this.modal.create({
      component: ModalDischargePage,
      cssClass: 'modal-wh',
      componentProps: {
        // parametros
      }
    });
    modal.present();
  }

  ngOnInit() {
  }

}
