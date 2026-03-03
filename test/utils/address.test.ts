import { assert } from 'chai';
import { utils } from '../setup/TronWeb.js';
import diskUtils from '../testcases/src/disk-utils.js';
import assertThrow from '../helpers/assertThrow.js';

const { loadTests } = diskUtils;

describe('#TronWeb.utils.address', () => {
    describe('#getCreate2Address', () => {
        describe('#getCreate2Address - base58', () => {
            const tests = loadTests('create2');
            for (const { sender, creates } of tests) {
                for (const { name, salt, initCode, address } of creates) {
                    it(`computes the create2 address(base58): ${name}`, function () {
                        const computedAddress = utils.address.getCreate2Address({
                            from: sender.replace(/^0x/, '41'),
                            salt,
                            initCode,
                        });
                        assert.equal(computedAddress, address);
                    });
                }
            }
        });

        describe('#getCreate2Address - hex', () => {
            const tests = loadTests('create2');
            for (const { sender, creates } of tests) {
                for (const { name, salt, initCode, address } of creates) {
                    it(`computes the create2 address(hex): ${name}`, function () {
                        const computedAddress = utils.address.getCreate2Address({
                            from: sender.replace(/^0x/, '41'),
                            salt,
                            initCode,
                            addressFormat: 'hex',
                        });
                        assert.equal(computedAddress, utils.address.toHex(address));
                    });
                }
            }
        });

        it('should throw error if salt is not 32 length', async () => {
            const tests = loadTests('create2');
            const salt = '0x1234567890';
            const address = tests[0].sender;
            const initCode = tests[0].creates[0].initCode;

            await assertThrow((async () => {
                utils.address.getCreate2Address({
                    from: address.replace(/^0x/, '41'),
                    salt,
                    initCode,
                });
            })(), `salt(${salt}) must be 32 bytes`);
        });

        it('should throw error if from is not a valid TRON address', async () => {
            const tests = loadTests('create2');
            const salt = tests[0].creates[0].salt;
            const address = tests[0].sender;
            const initCode = tests[0].creates[0].initCode;

            await assertThrow((async () => {
                utils.address.getCreate2Address({
                    from: address,
                    salt,
                    initCode,
                });
            })(), `from(${address}) is not a valid address string`);
        })
    });
});
