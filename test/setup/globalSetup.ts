import tronWebBuilder from '../helpers/tronWebBuilder.js';

export default async function setup() {
    const amount = Number(process.env.TEST_ACCOUNTS) || 100;
    let lastErr;
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await tronWebBuilder.newTestAccounts(amount);
            return;
        } catch (err) {
            lastErr = err;
            console.warn(`globalSetup: account provisioning attempt ${attempt} failed: ${(err as Error)?.message ?? err}`);
        }
    }
    throw lastErr;
}
