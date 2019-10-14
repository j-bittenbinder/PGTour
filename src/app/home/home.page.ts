import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Session } from '../sessions';
import { Storage } from "@ionic/storage";
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pontos: any;
  loading:any;
  usuario = {};
  apikey = 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw';

  constructor(private service: PontoTuristicoService, private http: HttpClient,
              public navCtrl: NavController, private router: Router, public session: Session, 
              public storage: Storage, public loadingController: LoadingController) {
   
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: "circles",
      message: 'Carregando..',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    return this.loading.present();
  }

  ngOnInit() {
    this.service.getListaPontos().subscribe( dados => {
      this.pontos = dados;
    });
    
    // this.session.get()
    //     .then(res => {
    //         this.usuario = res;
    //         if(this.usuario==null)
    //           this.router.navigate(['/login']);
              
    //         }
    //     });


}


visualizarPonto(id) {
  this.router.navigate(['/ponto-turistico'], {queryParams: id});
}





}
