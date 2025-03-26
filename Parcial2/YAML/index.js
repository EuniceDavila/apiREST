const fs = require('fs');
const yaml = require('yaml');
const path = require('path');

let objetoYaml = fs.readFileSync(path.join(__dirname, 'objetoyaml.yaml'), 'utf8');
let objetoJson = yaml.parse(objetoYaml);

console.log(objetoYaml);
console.log(typeof objetoYaml);
console.log(objetoJson);
console.log(typeof objetoJson);