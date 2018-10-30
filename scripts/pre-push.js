const {execSync} = require('child_process');

const branch = execSync('git name-rev --name-only HEAD').toString().split('\n')[0];
let unpushed;

try {
    unpushed = execSync(`git log origin/${ branch }..${ branch } --name-status`).toString().split('\n');
} catch(ex) {
    // the branch hasn't ever been pushed
    unpushed = execSync(`git log HEAD...origin --name-status`).toString().split('\n');
}

const isSourceChanged = unpushed.some(logLine => logLine.includes('src/'));
const isDistTracked = isSourceChanged ? unpushed.some(logLine => logLine.includes('dist/TronWeb.js')) : true;

if(!isDistTracked) {
    console.log('Please run: yarn build');
    process.exit(1);
}

try {
    execSync('yarn test:node');
} catch(ex) {
    if(ex.stdout)
        console.log(ex.stdout.toString());

    console.log('Tests have failed. Please verify tests are passing before pushing');
    process.exit(1);
}

