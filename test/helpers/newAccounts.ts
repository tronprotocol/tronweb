import tronWebBuilder from './tronWebBuilder.js';

const amount = Number(process.argv[2]) || 10;

(async function () {
    await tronWebBuilder.newTestAccounts(amount);
})();
