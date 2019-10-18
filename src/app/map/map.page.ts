import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, LoadingController, ModalController } from '@ionic/angular';
import { Environment,
        GoogleMap,
        GoogleMaps,
        GoogleMapOptions,
        GoogleMapsEvent,
        MyLocation,
        GoogleMapsAnimation } from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;

  private loading: any;
  private map: GoogleMap;

  constructor(private platform: Platform, private loadingCtrl: LoadingController, private modal: ModalController) { }

  ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    this.loadMap();
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
      const myLocation: MyLocation = await this.map.getMyLocation();

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });
      this.map.addMarkerSync({
        title: 'Você está aqui!',
        icon: '#5D4B9D',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng
      });
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
