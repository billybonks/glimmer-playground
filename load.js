const { BytecodeLoader } = require('@glimmer/application');
const fs = require('fs');
const data = require('./dist/data');
let gbxStream = fs.readFileSync('./dist/template.gbx');
// console.log(gbxStream);
// console.log(data);
let loader = new BytecodeLoader({data, bytecode: gbxStream})
loader.getTemplateIterator().then(function(iter) {
  console.log(iter.next())
  console.log(iter.next())
})
