import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

// Sentry start
import * as Sentry from "sentry-cordova";
Sentry.init({
  dsn: "https://135746da3e7942f2b5defc34a90c7837@o87286.ingest.sentry.io/5436400",
  release : "5e3bb804a373663ad9a84ba90d748e3b5ad75f89"
});

import {ErrorHandler} from "@angular/core";

export class SentryIonicErrorHandler extends ErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      Sentry.captureException(error.originalError || error);
    } catch (e) {
      console.error(e);
    }
  }
}
// Sentry end

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
providers : [
  InAppBrowser,
  SplashScreen,
  StatusBar,
  {
    provide: ErrorHandler,
    useClass: SentryIonicErrorHandler
  }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
