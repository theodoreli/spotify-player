#!/usr/bin/env bash

cd $(dirname $0)
set -e

pushd ..
git checkout gh-pages
git branch | grep '* gh-pages' && git reset --hard master

npm run build
pushd build

# remove the front /
sed -i '' -e 's:/static/js/main:static/js/main:' index.html

cp -R * ../
pushd ..
git add .
git commit -m "Deploy script"
git branch | grep '* gh-pages' && git push --force

git checkout -

echo "Deployed"
