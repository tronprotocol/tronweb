import { Transaction } from '../../src/types/Transaction.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';

export default async function (func: Promise<Transaction> | null, pk: string, transaction?: Transaction) {
    const tronWeb = tronWebBuilder.createInstance();
    if (!transaction) {
        transaction = (await func)!;
    }
    const signedTransaction = await tronWeb.trx.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.trx.sendRawTransaction(signedTransaction),
    };
    return Promise.resolve(result);
}
