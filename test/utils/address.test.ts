import { assert } from 'chai';
import { utils } from '../setup/TronWeb.js';
import diskUtils from '../testcases/src/disk-utils.js';

const { loadTests } = diskUtils;

describe('#TronWeb.utils.address', () => {
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
});
