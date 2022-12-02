#! /bin/sh

pnpm install
if [ $? -eq 0 ]; then
  echo "packages install success!"
else
  echo "packages install failed!"
  exit 1
fi

rm -rf .mfsu
rm -rf src/umi*

npm run build
if [ $? -eq 0 ]; then
  echo "build success!"
else
  echo "build failed!"
  exit 1
fi

npm run deploy
if [ $? -eq 0 ]; then
  echo "deploy success!"
else
  echo "deploy failed!"
  exit 1
fi

nrm use npm
npm publish
if [ $? -eq 0 ]; then
  echo "publish success!"
else
  echo "publish failed!"
  exit 1
fi

git add .

git commit -m "新版本构建发布"

git pull

git push

exit 1
