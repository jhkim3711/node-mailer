#!/bin/bash
 
rm -rf ./.amplify-hosting
 
mkdir -p ./.amplify-hosting/compute
mkdir -p ./.amplify-hosting/static
 
cp -r ./src ./.amplify-hosting/compute/default
cp package.json ./.amplify-hosting/compute/default/package.json
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules
 
cp -r public ./.amplify-hosting/static
 
cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json