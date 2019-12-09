import { Component } from '@angular/core';

import { Platform, ModalController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataUser } from './login/login.service';
import { LogoutPage } from './logout/logout.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userData: DataUser;
  semfotobicho: '';

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'PG Store',
      url: '/store',
      icon: 'card'
    },
    {
      title: 'Configurações',
      url: '/config',
      icon: 'construct'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modal: ModalController,
    private events: Events
  ) {
    this.initializeApp();
    this.events.subscribe('user:changed', user => { // recebe evento para atualizar img e nome no app-component
      this.userData = user;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    try {
      if (localStorage.getItem('DadosUsuario')) {
        this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
      }
    } catch (error) {
      console.log('tinha no localstorage, mas n tá mais');
    }
  }

  async logout() {
    this.initializeApp();
    const modal = await this.modal.create({
      component: LogoutPage,
      cssClass: 'modal-logout',
    });
    modal.present();
  }
}
