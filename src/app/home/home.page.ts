import { DataUser } from './../login/login.service';
import { PontoTuristicoService } from './../ponto-turistico/ponto-turistico.service';
import { Component } from '@angular/core';
import { NavController, Events, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from '../sessions';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, MenuController } from '@ionic/angular';
// import 'rxjs/add/operator/map';

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
  toast: any;
  apikey = 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw';
  buscar: any;
  distancia = false;

  constructor(
    private service: PontoTuristicoService,
    public navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public session: Session,
    public storage: Storage,
    public loadingController: LoadingController,
    private menu: MenuController,
    private events: Events,
    private geolocation: Geolocation,
    private toastController: ToastController
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
    this.events.subscribe('user:changed', user => { // recebe evento para atualizar img e nome no app-component
      this.userData = user;
    });

    this.service.getListaPontos().subscribe(dados => {
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
    this.service.addvisita(id).subscribe(dados =>{
    });
    this.router.navigate(['/ponto-turistico', id], { relativeTo: this.route });
  }

  buscarPonto() {
    const aux = '%' + this.buscar + '%';
    this.service.getPesquisa(aux).subscribe(data => {
      this.pontos = data;
    });
  }

  getPontos(){
    this.distancia = false;
    this.presentLoadingWithOptions();
    this.service.getListaPontos().subscribe(dados => {
      this.pontos = dados;
      this.loading.dismiss();
    });
  }

  getPontosRank(){
    this.distancia = false;
    this.presentLoadingWithOptions();
    this.service.getRankPontos().subscribe(dados => {
      this.pontos = dados;
      this.loading.dismiss();
    });
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2-lat1) * p) / 2 + c(lat1 * p) *c((lat2) * p) * (1 - c(((long2- long1) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  async presentToastWithOptions() {
    this.toast = await this.toastController.create({
      header: 'Atenção!',
      message: 'Defina um raio mínimo de busca no menu Configurações.',
      duration: 5000,
      position: 'top',
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return this.toast.present();
  }

  async getPontosProximos(){
    await this.presentLoadingWithOptions();
    if(localStorage.getItem('distancia') !== null) {
      // Atribui a variavel "range" a distancia salva pelo usuário
      let range = parseInt(localStorage.getItem('distancia'));

      // Busca localização atual do usuario com "getCurrentPosition()"
      this.geolocation.getCurrentPosition().then((resp) => {
        // Variavel auxiliar
        let dataByDistance: any = [];

        // Calcula a distancia entre a latitude/longitude de todos os pontos e a latitude/longitude do usuario
        for(let pontoTuristico of this.pontos) {
          let distanciaPonto = this.calculateDistance(pontoTuristico.latitude, resp.coords.latitude,
            pontoTuristico.longitude, resp.coords.longitude);
          // Caso a distancia seja menor que a "range" definida pelo usuário, salva na variavel auxiliar
          if (distanciaPonto <= range) {
            pontoTuristico.distancia = parseFloat((distanciaPonto).toString());
            dataByDistance.push(pontoTuristico);
          }
        }
        // Organiza pela distância
        if (dataByDistance.length > 0) {
          this.distancia = true;
        }
        dataByDistance.sort((a, b) => parseFloat(a.distancia) - parseFloat(b.distancia));

        // Atribui o array auxiliar para o array de pontos turisticos
        this.pontos = dataByDistance;
        console.log('p ver',this.pontos)
        this.loading.dismiss();
       }).catch((error) => {
          this.loading.dismiss();
          alert("Falha ao buscar localização atual");
          console.log('Error getting location', error);
       });
    } else {
      this.loading.dismiss();
      this.presentToastWithOptions();
    }
  }
}
