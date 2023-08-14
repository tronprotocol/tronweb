const tronWebBuilder = require('../helpers/tronWebBuilder.js');

export default async function (func: unknown, pk?: string, transaction?: any) {
    const tronWeb = tronWebBuilder.createInstance();
    if (!transaction) {
        transaction = await func;
    }
    const signedTransaction = await tronWeb.trx.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.trx.sendRawTransaction(signedTransaction),
    };
    return Promise.resolve(result);
}
