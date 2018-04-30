#!/usr/bin/env bash

cd $(dirname $0)
set -e

GIT_POINTER=${1:-master}

pushd ..
git checkout gh-pages
git branch | grep '* gh-pages' && git reset --hard $GIT_POINTER

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

echo "============================================================"
echo
echo "************************************************************"
echo "Deployed succesfully from ${GIT_POINTER} to branch gh-pages"
