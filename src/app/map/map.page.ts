import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, LoadingController, ModalController, NavParams } from '@ionic/angular';
import {
  Environment,
  GoogleMap,
  GoogleMaps,
  GoogleMapOptions,
  GoogleMapsEvent,
  // MyLocation,
  GoogleMapsAnimation,
  Marker,
  ILatLng
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
  private nome: string;
  private googleDirectionsService = new google.maps.DirectionsService();
  private now: any;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private modal: ModalController,
    private geolocation: Geolocation,
    private navParams: NavParams
  ) {
    this.now = new Date().getHours() + ':' + new Date().getMinutes();
    this.nome = this.navParams.get('nomePonto');
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
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyApraQZJsNRq75tOtJgC3R5nS_EsC73QZw'
    });

    // https://mapstyle.withgoogle.com/
    const styleNight = [
      {
        elementType: 'geometry',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#746855'
          }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#242f3e'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563'
          }
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#263c3f'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#6b9a76'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#38414e'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#212a37'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9ca5b3'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#746855'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#1f2835'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#f3d19c'
          }
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#2f3948'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#17263c'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#515c6d'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#17263c'
          }
        ]
      }
    ];

    const styleDay = [
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{
          visibility: 'off'
        }]
      },
      {
        featureType: 'poi',
        stylers: [{
          visibility: 'off'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      },
      {
        featureType: 'transit',
        stylers: [{
          visibility: 'off'
        }]
      }
    ];

    const mapOptions: GoogleMapOptions = {
      controls: {
        // botões de zoom no canto da page
        zoom: false
      },
      styles: styleDay
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

        this.originMarker = this.map.addMarkerSync({
          title: 'Você está aqui!',
          icon: '#5D4B9D',
          animation: GoogleMapsAnimation.DROP,
          position: dados
        });

        const point = {
          lat: this.navParams.get('lat'),
          lng: this.navParams.get('lng')
        };

        const markerDestination: Marker = this.map.addMarkerSync({
          title: this.nome,
          icon: '#5D4B9D',
          animation: GoogleMapsAnimation.DROP,
          position: point
        });

        this.googleDirectionsService.route({
          origin: this.originMarker.getPosition(),
          destination: point,
          travelMode: 'DRIVING'
        }, async results => {

          const routePoints = new Array<ILatLng>();
          const routes = results.routes[0].overview_path;

          for (let i = 0; i < routes.length; i++) {
            routePoints[i] = {
              lat: routes[i].lat(),
              lng: routes[i].lng()
            };
          }

          await this.map.addPolyline({
            points: routePoints,
            color: '#5D4B9D',
            width: 3
          });

          this.map.moveCamera({
            target: routePoints
          });
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
