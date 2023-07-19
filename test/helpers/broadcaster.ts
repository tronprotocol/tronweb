const tronWebBuilder = require('../helpers/tronWebBuilder');

export default async function (func: Function, pk: string, transaction?: any) {
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
