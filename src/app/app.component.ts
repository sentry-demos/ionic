import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import * as Sentry from "sentry-cordova";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  color = 'black';
  textValue = '';
  currentUser = '';

  changeColor() {
    var that = this;
    this.color = 'red';
    setTimeout(() => {
      that.color = 'black'
    }, 1500);
  }

  handleSubmit() {
    this.currentUser = this.textValue;
    Sentry.configureScope(scope => {
      scope.setUser({email: this.currentUser});
    });
  }

  malformed() {
    decodeURIComponent('%');
  }

  // ERRORS
  notAFunctionError() {
    var someArray = [
      {
        func: function () {}
      }
    ];
    someArray[1].func();
  }

  uriError() {
    decodeURIComponent('%');
  }

  syntaxError() {
    eval('foo bar');
  }

  rangeError() {
    throw new RangeError('Parameter must be between 1 and 100');
  }
}
