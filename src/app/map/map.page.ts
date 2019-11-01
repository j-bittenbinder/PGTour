import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, LoadingController, ModalController, NavParams } from '@ionic/angular';
import {
  Environment,
  GoogleMap,
  GoogleMaps,
  GoogleMapOptions,
  GoogleMapsEvent,
  MyLocation,
  GoogleMapsAnimation,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;

  private loading: any;
  private map: GoogleMap;
  private originMarker: Marker;
  private destination: any;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private modal: ModalController,
    private geolocation: Geolocation,
    private navParams: NavParams
  ) {
    const point = {
      lat: this.navParams.get('lat'),
      lng: this.navParams.get('lng')
    };
    // console.log('ponto: ', this.point);
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  async loadMap() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Localizando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this.loading.present();

    // setando chave para usar no browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw'
    });

    const mapOptions: GoogleMapOptions = {
      controls: {
        // botões de zoom no canto da page
        zoom: false
      }
    };

    this.map = GoogleMaps.create(this.mapElement, mapOptions);
    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.addOriginMarker();
    } catch (error) {
      console.log(error);
    }
  }

  async addOriginMarker() {
    try {
      this.geolocation.getCurrentPosition().then(async (resp) => {
        const dados = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        // console.log('meu local:', dados);

        await this.map.moveCamera({
          target: dados,
          zoom: 18
        });

        this.originMarker = this.map.addMarkerSync({
          title: 'Você está aqui!',
          icon: '#5D4B9D',
          animation: GoogleMapsAnimation.DROP,
          position: dados
        });

        console.log('origin:', this.originMarker.getPosition());
        const point = {
          lat: this.navParams.get('lat'),
          lng: this.navParams.get('lng')
        };

        const markerDestination: Marker = this.map.addMarkerSync({
          title: 'nome-ponto',
          icon: '#5D4B9D',
          animation: GoogleMapsAnimation.DROP,
          position: point
        });

        console.log('dest:', markerDestination.getPosition());

        this.map.addPolyline({
          points: [this.originMarker.getPosition(), markerDestination.getPosition()],
          color: '#5D4B9D',
          width: 3
        });
      }).catch((error) => {
        console.log('Ocorreu um erro ao localizar o dispositivo.', error);
      });

      // const myLocation: MyLocation = await this.map.getMyLocation();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  close() {
    this.modal.dismiss();
  }
}
