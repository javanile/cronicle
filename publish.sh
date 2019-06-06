#!/bin/bash
set -e

git add . > /dev/null
git commit -am "publish"
git push

cd packages/cronicle-task
npm publish
