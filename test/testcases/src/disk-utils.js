const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function saveTests(tag, data) {
   let filename = path.resolve(__dirname, '../', tag + '.json.gz');

   fs.writeFileSync(filename, zlib.gzipSync(JSON.stringify(data, undefined, ' ') + '\n'));

   console.log('Save testcase: ' + filename);
}

function loadTests(tag) {
   let filename = path.resolve(__dirname, '../', tag + '.json.gz');
   return JSON.parse(zlib.gunzipSync(fs.readFileSync(filename)).toString());
}

function loadTestsJSON(tag) {
  let filename = path.resolve(__dirname, '../', tag + '.json');
  return JSON.parse(fs.readFileSync(filename).toString());
}

function loadData(filename) {
   return fs.readFileSync(path.resolve(__dirname, filename));
}

function saveJson(tag, data) {
  let filename = path.resolve(__dirname, '../', tag + '.json');

  fs.writeFileSync(filename, JSON.stringify(data, undefined, ' '));

  console.log('Save testcase: ' + filename);
}

module.exports = {
  saveTests,
  loadTests,
  loadData,
  saveJson,
  loadTestsJSON
}