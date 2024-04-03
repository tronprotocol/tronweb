import { Address } from '../../../src/types/Trx';
import { assert } from 'chai';
import wait from '../../helpers/wait.js';
import broadcaster from '../../helpers/broadcaster.js';
import tronWebBuilder from '../../helpers/tronWebBuilder.js';
import { TronWeb } from '../../setup/TronWeb.js';
import contracts from '../../fixtures/contracts';
import { Contract } from '../../../src/lib/contract';

const testCustomError = contracts.testCustomError;

describe('#contract.index', function () {
    let accounts: {
        hex: Address[];
        b58: Address[];
        pks: string[];
    };
    let tronWeb: TronWeb;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
    });

    describe('#customError', function () {
        let customError: Contract;

        before(async function () {
            const tx = await broadcaster(
                tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: testCustomError.abi,
                        bytecode: testCustomError.bytecode,
                    },
                    accounts.b58[0]
                ),
                accounts.pks[0]
            );
            customError = tronWeb.contract(testCustomError.abi, tx.transaction.contract_address);
        });

        it('should revert with custom error', async () => {
            const txid = await customError.test(111).send();
            await wait(10);
            const data = await tronWeb.trx.getTransactionInfo(txid);
            const errorData = data.contractResult;
            const expectedErrorData =
                TronWeb.sha3('CustomError(uint256,uint256)', false).slice(0, 8) +
                '000000000000000000000000000000000000000000000000000000000000006f' + // 111
                '0000000000000000000000000000000000000000000000000000000000000001'; // 1
            assert.equal(errorData.join(''), expectedErrorData);
        });
    });
});
