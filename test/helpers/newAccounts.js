const tronWebBuilder = require('./tronWebBuilder');
const tronWeb = tronWebBuilder.createInstance();

const amount = process.argv[2] || 10;

(async function () {
    await tronWebBuilder.newTestAccounts(amount)
})()

