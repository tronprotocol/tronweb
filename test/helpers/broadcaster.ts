import { SignedTransaction, Transaction } from '../../src/types/Transaction.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';

export default async function <T extends Transaction>(func: Promise<T> | null | T, pk?: string, transaction?: T) {
    const tronWeb = tronWebBuilder.createInstance();
    if (!transaction) {
        transaction = (await func)!;
    }
    const signedTransaction = await tronWeb.trx.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.trx.sendRawTransaction(signedTransaction as SignedTransaction),
    };
    return Promise.resolve(result);
}
