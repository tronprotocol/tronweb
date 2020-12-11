const accWebBuilder = require('./accWebBuilder');
const accWeb = accWebBuilder.createInstance();

const amount = process.argv[2] || 10;

(async function () {
    await accWebBuilder.newTestAccounts(amount)
})()

