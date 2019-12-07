import { Component, OnInit } from '@angular/core';
import { PontoTuristicoService } from '../ponto-turistico/ponto-turistico.service';
import { LoadingController, MenuController } from '@ionic/angular';
import { DataUser } from '../login/login.service';


@Component({
  selector: 'app-extract',
  templateUrl: './extract.page.html',
  styleUrls: ['./extract.page.scss'],
})
export class ExtractPage implements OnInit {

  userData: DataUser;
  constructor(private service: PontoTuristicoService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
    let dados={
      email: this.userData.objeto.email
    }
    this.service.getHistoricoTransacao(dados).subscribe(data=>{
      console.log(data)
    })
  }

}
