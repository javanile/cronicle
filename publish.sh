#!/bin/bash
set -e

git add . > /dev/null
git commit -am "$*"
git push

cd packages/cronicle-task
npm publish
