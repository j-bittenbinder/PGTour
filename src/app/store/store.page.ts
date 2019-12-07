import { Component, OnInit } from '@angular/core';
import { DataUser } from '../login/login.service';
import { Router } from '@angular/router';
import { ModalController, Events } from '@ionic/angular';
import { ModalDischargePage } from '../modal-discharge/modal-discharge.page';
import { PontoTuristicoService } from '../ponto-turistico/ponto-turistico.service';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  userData: DataUser;
  premios: any;
  loading: any;
  infoPremio: any;

  constructor(private router: Router, private modal: ModalController,private service: PontoTuristicoService,
    public loadingController: LoadingController, private events:Events
    ) {
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

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return this.loading.present();

  }

  async modalDischarge(premio) {
    this.infoPremio = premio;
    const modal = await this.modal.create({
      component: ModalDischargePage,
      cssClass: 'modal-wh',
      componentProps: {
        id_prod: this.infoPremio.id_prod,
        nome: this.infoPremio.nome,
        parceiro_id_parc: this.infoPremio.parceiro_id_parc,
        valor: this.infoPremio.valor
      }
    });
    modal.present();
  }

  async ngOnInit() {
    await this.presentLoadingWithOptions();
    this.events.subscribe('user:changed', user => { // recebe evento para atualizar img e nome no app-component
      this.userData = user;
    });
    this.service.getProdutos().subscribe(data =>{
      this.premios = data;
      console.log(this.premios)
      this.loading.dismiss();
    })
  }

}
