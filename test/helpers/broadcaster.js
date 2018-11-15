const tronWebBuilder = require('../helpers/tronWebBuilder');

module.exports = async function (func, pk) {
    const tronWeb = tronWebBuilder.createInstance();
    const transaction = await func;
    const signedTransaction = await tronWeb.trx.sign(transaction, pk);
    return Promise.all([
        transaction,
        signedTransaction,
        await tronWeb.trx.sendRawTransaction(signedTransaction)
    ]);

}
