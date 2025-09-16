#!/bin/bash

# Build script with Sentry source map upload
# Usage: ./build-with-sentry.sh [version]

VERSION=${1:-$(date +%Y%m%d-%H%M%S)}
RELEASE_NAME="ionic-conference-app@$VERSION"

echo "Building with Sentry source maps..."
echo "Release: $RELEASE_NAME"

# Build the Angular app in production mode
echo "Building Angular app..."
ng build --configuration=production

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# Create a Sentry release
echo "Creating Sentry release: $RELEASE_NAME"
npx sentry-cli releases new "$RELEASE_NAME"

# Upload source maps
echo "Uploading source maps..."
npx sentry-cli releases files "$RELEASE_NAME" upload-sourcemaps www \
    --dist-tags=production \
    --strip-prefix=www

# Finalize the release
echo "Finalizing release..."
npx sentry-cli releases finalize "$RELEASE_NAME"

echo "Build completed successfully!"
echo "Release: $RELEASE_NAME"
echo "Source maps uploaded to Sentry"
