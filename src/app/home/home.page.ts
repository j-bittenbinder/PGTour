import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NavController } from '@ionic/angular';
import { PontoTuristicoPage } from 'src/app/ponto-turistico/ponto-turistico.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pontos: any;

  constructor(private http: HTTP, public navCtrl: NavController) {
    
    this.http.get('https://apipgtour.herokuapp.com/index.php/getPontoTuristico', {}, {})
    .then(data => {
      this.pontos = JSON.parse(data.data);
      console.log(this.pontos);
      
    })
    .catch(error => {
      console.log(error.status);
      console.log(error); // error message as string
      console.log(error.headers);

    });

    
  }

  apikey = "AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw";
  usuario = "Sidney";
  
  visualizarPonto(id){

  }
}
