const { execSync } = require('child_process');

const staged = execSync('git diff --staged --name-only').toString().split('\n');
const branch = execSync('git name-rev --name-only HEAD').toString().split('\n')[0];
const unpushed = execSync(`git log origin/${ branch }..${ branch } --name-status`).toString().split('\n');

const isSourceChanged = unpushed.some(logLine => logLine.includes('src/'));
const isDistTracked = isSourceChanged ? unpushed.some(logLine => logLine.includes('dist/TronWeb.js')) : true;

if(!staged.includes('dist/TronWeb.js') && !isDistTracked) {
    console.log('Please run yarn build -p');
    process.exit(1);
}

try {
    execSync('npm run test:node');
} catch(ex) {
    if(ex.stdout)
        console.log(ex.stdout.toString());
    
    console.log('Tests have failed. Please verify tests are passing before pushing');
    process.exit(1);
}