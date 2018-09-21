const { execSync } = require('child_process');

const staged = execSync('git diff --staged --name-only').toString().split('\n');

if(!staged.includes('dist/TronWeb.js'))
    throw new Error('Please run yarn build -p');

try {
    execSync('npm run test:node');
} catch(ex) {
    if(ex.stdout)
        console.log(ex.stdout.toString());
    
    console.log('Tests have failed. Please verify tests are passing before pushing');
    process.exit(1);
}