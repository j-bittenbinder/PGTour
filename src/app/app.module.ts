import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Session } from './sessions';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicRatingModule } from 'ionic4-rating';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LogoutPage } from './logout/logout.page';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent, LogoutPage],
  entryComponents: [LogoutPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicRatingModule
  ],
  providers: [
    HTTP,
    StatusBar,
    Session,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GoogleMaps,
    Geolocation
    // Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
