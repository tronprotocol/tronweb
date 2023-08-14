import { Transaction } from '../../src/types/Transaction.js';

export default function (transaction: Transaction) {
    return transaction.raw_data.contract[0].parameter;
}
