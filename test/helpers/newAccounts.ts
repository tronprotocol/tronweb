import tronWebBuilder from './tronWebBuilder';

const amount = Number(process.argv[2]) || 10;

(async function () {
    await tronWebBuilder.newTestAccounts(amount);
})();
