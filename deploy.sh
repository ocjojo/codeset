#!/usr/bin/env sh

# abort on errors
set -e

cp dist/codeset.umd.js docs

# navigate into the build output directory
cd docs

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ocjojo/codeset.git master:gh-pages

cd -
