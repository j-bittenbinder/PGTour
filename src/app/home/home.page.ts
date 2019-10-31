import { DataUser } from './../login/login.service';
import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from '../sessions';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData: DataUser;
  usuario: any;
  pontos: any;
  loading: any;
  apikey = 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw';
  buscar: any;

  constructor(
    private service: PontoTuristicoService,
    public navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public session: Session,
    public storage: Storage,
    public loadingController: LoadingController
  ) {
    if (localStorage.getItem('DadosUsuario') === null) {
      console.log('n tá logado');
    } else {
      this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
    }
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Carregando pontos...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    return this.loading.present();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.service.getListaPontos().subscribe( dados => {
      this.pontos = dados;
    });

    // this.session.get().then(res => {
    //   this.usuario = res;
    //   if (this.usuario === null) {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  visualizarPonto(id) {
    this.router.navigate(['/ponto-turistico', id], { relativeTo: this.route });
  }

  buscarPonto() {
    const aux = '%' + this.buscar + '%';
    this.service.getPesquisa(aux).subscribe( data => {
      this.pontos = data;
    });
  }
}
