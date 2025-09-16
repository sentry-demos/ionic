# Ionic + Sentry

## Installation

https://docs.sentry.io/platforms/javascript/guides/capacitor/ionic/

## Setup
`nvm use`
`npm install`
`npm install -g @sentry/cli`

## Running + Deploying (with Sentry integration)
`make deploy_web # for browser`
`make deploy_ios # for ios`
`make deploy_ios # for ios`

--------------------------------------------------
### Deploying app directly

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `npm run ionic:build --prod`
3. Push the `www` folder to your hosting service

### Android

1. Run `ionic build --prod`
2. Run `npm run sentry:sourcemaps`
3. Run `npx cap run android`

### iOS

1. Run `ionic cordova run ios --prod`
