import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Sentry SDK import + setup
import * as Sentry from "@sentry/capacitor";
import * as SentryAngular from "@sentry/angular";

Sentry.init({
  dsn: "https://ea622332ea613bdff0bad1bf325e7886@o88872.ingest.us.sentry.io/4509997927956480",
  release: environment.release || 'development',
  environment: environment.production ? 'production' : 'development',
  tracesSampleRate: 1.0,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration(), SentryAngular.feedbackIntegration({
    // Additional SDK configuration goes in here, for example:
    colorScheme: "system",
  })],
  replaysSessionSampleRate: 1.0,
  },
  // Forward the init method from @sentry/angular
  SentryAngular.init
);

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
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
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
    useClass: SentryIonicErrorHandler // specify Sentry error handler
  }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
