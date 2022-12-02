const fs = require('fs');
const path = require('path');
const componentDir = 'src';
const cModuleNames = fs.readdirSync(path.resolve(componentDir));

function run() {
  let entryText = '';
  let dtsText = '';
  cModuleNames.forEach((name) => {
    if (name.charAt(0) !== '.' && fs.statSync(path.resolve(`${componentDir}/${name}`)).isDirectory()) {
      entryText += `export { default as ${name} } from './${name}';\n`;
      dtsText += `export { default as ${name} } from './src/${name}';\n`;
    }
  });
  fs.writeFileSync(path.resolve('src/index.ts'), entryText);
}

run();

console.log('================== entry is init! ===================');
