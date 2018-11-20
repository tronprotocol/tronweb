const tronWebBuilder = require('../helpers/tronWebBuilder');

module.exports = async function (func, pk) {
    const tronWeb = tronWebBuilder.createInstance();
    const transaction = await func;
    const signedTransaction = await tronWeb.trx.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.trx.sendRawTransaction(signedTransaction)
    };
    console.log(result.receipt)
    return Promise.resolve(result);
}
