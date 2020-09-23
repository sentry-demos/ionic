# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=testorg-az
SENTRY_PROJECT=ionic-webinar
VERSION=`sentry-cli releases propose-version`
SOURCEMAP_LOCATION?=www

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix "app:///" --rewrite --validate $(SOURCEMAP_LOCATION)

create_env:
	@echo "version=${VERSION}" > .env && npm run config

# Deploy targets
deploy_web: create_env
	ionic build --prod --source-map && \
		make upload_sourcemaps && \
		serve www

deploy_android: create_env
	ionic cordova run android --prod --source-map && \
		SOURCEMAP_LOCATION=./platforms/android/app/src/main/assets/www make upload_sourcemaps

deploy_ios: create_env
	ionic cordova run ios --prod --source-map && \
		SOURCEMAP_LOCATION=./platforms/ios/www make upload_sourcemaps

