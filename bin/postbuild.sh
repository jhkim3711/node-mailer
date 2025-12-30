#!/bin/bash
# bin/postbuild.sh

rm -rf .amplify-hosting
mkdir -p .amplify-hosting/compute/default
mkdir -p .amplify-hosting/static

cp -r out/* .amplify-hosting/static/ 2>/dev/null || cp -r .next/static .amplify-hosting/static/

# 3. Express 백엔드 코드 및 라이브러리 복사
cp src/index.js .amplify-hosting/compute/default/index.js
cp -r node_modules .amplify-hosting/compute/default/node_modules
cp package.json .amplify-hosting/compute/default/package.json

# 4. 가장 중요: 매니페스트 파일을 루트로 복사
cp deploy-manifest.json .amplify-hosting/deploy-manifest.json