import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function saveTests(tag: string, data: any) {
    let filename = path.resolve(__dirname, '../', tag + '.json.gz');

    fs.writeFileSync(filename, zlib.gzipSync(JSON.stringify(data, undefined, ' ') + '\n'));

    console.log('Save testcase: ' + filename);
}

function loadTests(tag: string) {
    let filename = path.resolve(__dirname, '../', tag + '.json.gz');
    return JSON.parse(zlib.gunzipSync(fs.readFileSync(filename)).toString());
}

function loadTestsJSON(tag: string) {
    let filename = path.resolve(__dirname, '../', tag + '.json');
    return JSON.parse(fs.readFileSync(filename).toString());
}

function loadData(filename: string) {
    return fs.readFileSync(path.resolve(__dirname, filename));
}

function saveJson(tag: string, data: any) {
    let filename = path.resolve(__dirname, '../', tag + '.json');

    fs.writeFileSync(filename, JSON.stringify(data, undefined, ' '));

    console.log('Save testcase: ' + filename);
}

export default {
    saveTests,
    loadTests,
    loadData,
    saveJson,
    loadTestsJSON,
};
