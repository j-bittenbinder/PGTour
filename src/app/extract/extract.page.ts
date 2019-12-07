import { Component, OnInit } from '@angular/core';
import { PontoTuristicoService } from '../ponto-turistico/ponto-turistico.service';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { DataUser } from '../login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-extract',
  templateUrl: './extract.page.html',
  styleUrls: ['./extract.page.scss'],
})
export class ExtractPage implements OnInit {

  userData: DataUser;

  constructor(private router: Router, private modal: ModalController, private service: PontoTuristicoService, 
              public loadingController: LoadingController) {
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
    this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
    
    let dados = {
      email: this.userData.objeto.email
    };

    this.service.getHistoricoTransacao(dados).subscribe(data => {
      console.log(data);
    });
  }

}
