# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=testorg-az
SENTRY_PROJECT=ionic-webinar
VERSION=`sentry-cli releases propose-version`
SOURCEMAP_LOCATION?=www

setup_release: create_release associate_commits upload_sourcemaps

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix "app:///" --rewrite --validate $(SOURCEMAP_LOCATION)

# reference_release:
# 	sed -i -e "s/release: .*/\release: \"${VERSION}\"/g" src/app/app.module.ts


deploy_web:
	ionic build --prod --source-map && \
		make upload_sourcemaps && \
		serve www

deploy_android:
	ionic cordova run android --prod --source-map && \
		SOURCEMAP_LOCATION=./platforms/android/app/src/main/assets/www make upload_sourcemaps

deploy_ios:
	ionic cordova run ios --prod --source-map && \
		SOURCEMAP_LOCATION=./platforms/ios/www make upload_sourcemaps

