import tronWebBuilder from '../helpers/tronWebBuilder.js';

export default async function setup() {
    const amount = Number(process.env.TEST_ACCOUNTS) || 100;
    await tronWebBuilder.newTestAccounts(amount);
}
