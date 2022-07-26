const chai = require('chai');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const { loadTests } = require('../testcases/src/disk-utils');
const assert = chai.assert;

describe('TronWeb.utils.typedData', function () {
    describe('#EIP-712', function () {
        const TronWeb = tronWebBuilder.TronWeb;
        const tests = loadTests('eip712');
        tests.forEach((test) => {
            it(`encoding ${test.name}`, function () {
                const encoder = TronWeb.utils._TypedDataEncoder.from(test.types);
                assert.equal(
                    encoder.primaryType,
                    test.primaryType,
                    'instance.primaryType'
                );
                assert.equal(
                    encoder.encode(test.data),
                    test.encoded,
                    'instance.encode()'
                );
                assert.equal(
                    TronWeb.utils._TypedDataEncoder.getPrimaryType(test.types),
                    test.primaryType,
                    'getPrimaryType'
                );
                assert.equal(
                    TronWeb.utils._TypedDataEncoder.hash(
                        test.domain,
                        test.types,
                        test.data
                    ),
                    test.digest,
                    'digest'
                );
            });
        });
    });

    describe('#EIP-712 with trcToken', function () {
        // https://nile.tronscan.io/#/contract/TRHsc32MH4CLJf9VMhMjW6M9VgyvN85ku3/code
        const TronWeb = tronWebBuilder.TronWeb;

        const domain = {
            name: 'TrcToken Test',
            version: '1',
            chainId: '0xd698d4192c56cb6be724a558448e2684802de4d6cd8690dc',
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        };

        const types = {
            FromPerson: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
                { name: 'trcTokenId', type: 'trcToken' },
            ],
            ToPerson: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
                { name: 'trcTokenArr', type: 'trcToken[]' },
            ],
            Mail: [
                { name: 'from', type: 'FromPerson' },
                { name: 'to', type: 'ToPerson' },
                { name: 'contents', type: 'string' },
                { name: 'tAddr', type: 'address[]' },
                { name: 'trcTokenId', type: 'trcToken' },
                { name: 'trcTokenArr', type: 'trcToken[]' },
            ],
        };

        const value = {
            from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                trcTokenId: '1002000',
            },
            to: {
                name: 'Bob',
                wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                trcTokenArr: ['1002000', '1002000'],
            },
            contents: 'Hello, Bob!',
            tAddr: [
                '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            ],
            trcTokenId: '1002000',
            trcTokenArr: ['1002000', '1002000'],
        };

        it('should be the correct hash domain', function () {
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashDomain(domain),
                '0x23ce0ffcd4ff9a13936b4f1210884749acd9373a333dd7faa43f4045bb3aa1f7'
            );
        });

        it('should be the correct hash struct', function () {
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashStruct(
                    'FromPerson',
                    types,
                    value.from
                ),
                '0x73b79ecc2530586800050c46ee7361ed28c013dfa3d062ed216295cbd5e6a55d'
            );
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashStruct(
                    'ToPerson',
                    types,
                    value.to
                ),
                '0xf49c4819cbb0a7fbab3d7223830bbd2a2121cadb3139a59acd0c7fe2ac3a9ce9'
            );
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashStruct('Mail', types, value),
                '0xf2f2a76e94f3c517b1e4c263854df0ef926aa17919b880a15d0ccf3ea121573c'
            );
        });

        it('should be the correct hash', function () {
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hash(domain, types, value),
                '0x15a2ddfbd93ad048b6c1391659543b5e0dd5799cde747e219cbb07c2c3badd09'
            );
        });
    });
});
