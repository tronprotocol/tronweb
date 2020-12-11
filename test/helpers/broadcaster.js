const accWebBuilder = require('../helpers/accWebBuilder');

module.exports = async function (func, pk, transaction) {
    const accWeb = accWebBuilder.createInstance();
    if( !transaction) {
        transaction = await func;
    }
    const signedTransaction = await accWeb.trx.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await accWeb.trx.sendRawTransaction(signedTransaction)
    };
    return Promise.resolve(result);
}
