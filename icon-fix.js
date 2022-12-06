const fs = require('fs');
const path = require('path');

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', function (err) {
      err ? reject(err) : resolve();
    });
  });
}

async function run() {
  try {
    const url = path.resolve(__dirname, './iconfont.js');
    const str = await readFile(url);
    const newStr = str.replace(/fill="\S+"/g, '');
    await writeFile(url, newStr);
  } catch (e) {
    console.error(e);
  }
}

run();
