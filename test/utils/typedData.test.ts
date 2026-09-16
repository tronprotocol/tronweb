import { assert } from 'vitest';
import { runInNewContext } from 'node:vm';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import diskUtils from '../testcases/src/disk-utils.js';
const { loadTests } = diskUtils;
const { utils } = tronWebBuilder;

describe('TronWeb.utils.typedData', function () {
    describe('#EIP-712', function () {
        const tests = loadTests('eip712');
        tests.forEach((test: any) => {
            it(`encoding ${test.name}`, function () {
                const encoder = utils._TypedDataEncoder.from(test.types);
                assert.equal(encoder.primaryType, test.primaryType, 'instance.primaryType');
                assert.equal(encoder.encode(test.data), test.encoded, 'instance.encode()');
                assert.equal(utils._TypedDataEncoder.getPrimaryType(test.types), test.primaryType, 'getPrimaryType');
                assert.equal(utils._TypedDataEncoder.hash(test.domain, test.types, test.data), test.digest, 'digest');
            });
        });
    });

    describe('#EIP-712 with trcToken', function () {
        // https://nile.tronscan.io/#/contract/TRHsc32MH4CLJf9VMhMjW6M9VgyvN85ku3/code

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
            tAddr: ['0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'],
            trcTokenId: '1002000',
            trcTokenArr: ['1002000', '1002000'],
        };

        it('should be the correct hash domain', function () {
            assert.equal(
                utils._TypedDataEncoder.hashDomain(domain),
                '0x23ce0ffcd4ff9a13936b4f1210884749acd9373a333dd7faa43f4045bb3aa1f7'
            );
        });

        it('should be the correct hash struct', function () {
            assert.equal(
                utils._TypedDataEncoder.hashStruct('FromPerson', types, value.from),
                '0x73b79ecc2530586800050c46ee7361ed28c013dfa3d062ed216295cbd5e6a55d'
            );
            assert.equal(
                utils._TypedDataEncoder.hashStruct('ToPerson', types, value.to),
                '0xf49c4819cbb0a7fbab3d7223830bbd2a2121cadb3139a59acd0c7fe2ac3a9ce9'
            );
            assert.equal(
                utils._TypedDataEncoder.hashStruct('Mail', types, value),
                '0xf2f2a76e94f3c517b1e4c263854df0ef926aa17919b880a15d0ccf3ea121573c'
            );
        });

        it('should be the correct hash', function () {
            assert.equal(
                utils._TypedDataEncoder.hash(domain, types, value),
                '0x15a2ddfbd93ad048b6c1391659543b5e0dd5799cde747e219cbb07c2c3badd09'
            );
        });
    });

    describe('#signTypedData', function () {
        const privateKey = '0x' + '01'.repeat(32);

        const domain = {
            name: 'Snapshot Test',
            version: '1',
            chainId: 1,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        };

        const types = {
            Mail: [{ name: 'contents', type: 'string' }],
        };

        const value = { contents: 'Hello, Bob!' };

        const sign = (d: Record<string, any>, t: Record<string, any>, v: Record<string, any>) =>
            utils.typedData.signTypedData(d, t, v, privateKey);

        // A shallow copy of `target` whose `key` is an accessor answering `first` on the first read
        // and `later` on every read after that.
        function withSwappingGetter<T extends object>(target: T, key: keyof T, first: unknown, later: unknown): T {
            let reads = 0;
            const trapped = { ...target };
            Object.defineProperty(trapped, key, {
                enumerable: true,
                configurable: true,
                get: () => (reads++ === 0 ? first : later),
            });
            return trapped;
        }

        it('signs the domain it read first when a domain getter changes its answer between reads', function () {
            const trapped = withSwappingGetter(domain, 'chainId', 1, 2);

            const signature = sign(trapped, types, value);

            assert.equal(signature, sign({ ...domain, chainId: 1 }, types, value));
        });

        it('signs the types it read first when a types getter changes its answer between reads', function () {
            const honest = [{ name: 'contents', type: 'string' }];
            const swapped = [
                { name: 'contents', type: 'string' },
                { name: 'extra', type: 'string' },
            ];
            const trapped = withSwappingGetter(types, 'Mail', honest, swapped);

            const signature = sign(domain, trapped, value);

            assert.equal(signature, sign(domain, { Mail: honest }, value));
        });

        it('signs the value it read first when a value getter changes its answer between reads', function () {
            const trapped = withSwappingGetter(value, 'contents', 'Hello, Bob!', 'Goodbye, Bob!');

            const signature = sign(domain, types, trapped);

            assert.equal(signature, sign(domain, types, { contents: 'Hello, Bob!' }));
        });

        it('does not touch the caller objects', function () {
            const d = { ...domain };
            const t = { Mail: [{ name: 'contents', type: 'string' }] };
            const v = { ...value };

            sign(d, t, v);

            assert.deepEqual(d, domain);
            assert.deepEqual(t, types);
            assert.deepEqual(v, value);
        });

        it('accepts Uint8Array bytes values and bigint numbers, like the hex and string forms', function () {
            const bytesTypes = {
                Msg: [
                    { name: 'payload', type: 'bytes' },
                    { name: 'hash', type: 'bytes32' },
                    { name: 'amount', type: 'uint256' },
                ],
            };
            const hash = new Uint8Array(32).fill(7);
            const payload = new Uint8Array([1, 2, 3]);
            const salt = new Uint8Array(32).fill(9);
            const hex = (bytes: Uint8Array) => '0x' + Buffer.from(bytes).toString('hex');

            const signature = sign({ ...domain, salt }, bytesTypes, { payload, hash, amount: 2n ** 64n });

            assert.equal(
                signature,
                sign({ ...domain, salt: hex(salt) }, bytesTypes, {
                    payload: hex(payload),
                    hash: hex(hash),
                    amount: (2n ** 64n).toString(),
                })
            );
        });

        it('signs the actual value of a field named __proto__', function () {
            const protoTypes = { Msg: [{ name: '__proto__', type: 'bool' }] };
            // JSON.parse creates a real own property; an object literal's `__proto__:` would not.
            const valueFalse = JSON.parse('{"__proto__": false}');
            const valueTrue = JSON.parse('{"__proto__": true}');

            // The snapshot keeps the field as an own property with its value...
            const copy = utils._TypedDataEncoder.from(protoTypes).visit(valueFalse, (_type: string, leaf: unknown) => leaf);
            assert.isTrue(Object.prototype.hasOwnProperty.call(copy, '__proto__'));
            assert.equal(copy['__proto__'], false);

            // ...so false and true no longer collapse into the same signature.
            assert.notEqual(sign(domain, protoTypes, valueFalse), sign(domain, protoTypes, valueTrue));
        });

        it('signs a struct type named __proto__ like 6.5.0 did, as the primary type and as a child type', function () {
            // JSON.parse creates a real own property; an object literal's `__proto__:` would not.
            const primaryTypes = JSON.parse('{"__proto__": [{"name": "contents", "type": "string"}]}');
            const childTypes = JSON.parse(
                '{"Mail": [{"name": "from", "type": "__proto__"}], "__proto__": [{"name": "name", "type": "string"}]}'
            );

            // Signatures 6.5.0 produced over the same inputs.
            assert.equal(
                sign(domain, primaryTypes, value),
                '0x50fda93510f3b2061a5b068e8cd34cc45d7c1eee09a9da526a585ba53e3a16380dd4869722599007ef30546b438552b3e322c9f7d5c7dd2f9dd4e3fd2d8a24ec1b'
            );
            assert.equal(
                sign(domain, childTypes, { from: { name: 'Alice' } }),
                '0x00113dd43af8bfb244a6d9c31c6ff81d82be145a6d2a7d8db9464f2fc349674268e4351d44f6771fbde6e4fe4483d99deb6fa88b22c2fd7e44f9ca76fd9c474f1b'
            );
        });

        it('accepts Uint8Array bytes values from another realm, in the value like in the domain', function () {
            const bytesTypes = {
                Msg: [{ name: 'payload', type: 'bytes' }],
            };
            const payload = runInNewContext('new Uint8Array([1, 2, 3])') as Uint8Array;
            const salt = runInNewContext('new Uint8Array(32).fill(9)') as Uint8Array;

            const signature = sign({ ...domain, salt }, bytesTypes, { payload });

            assert.equal(signature, sign({ ...domain, salt: new Uint8Array(32).fill(9) }, bytesTypes, { payload: new Uint8Array([1, 2, 3]) }));
        });

        it('keeps ignoring value fields outside the types', function () {
            const signature = sign(domain, types, { contents: 'Hello, Bob!', deadline: new Date(), self: value });

            assert.equal(signature, sign(domain, types, value));
        });

        it('rejects a domain or types that are not plain typed data, naming the path', function () {
            assert.throws(
                () => sign({ ...domain, chainId: () => 1 }, types, value),
                'Invalid typed data: unsupported function at domain.chainId'
            );

            const circular: Record<string, any> = { Mail: [{ name: 'contents', type: 'string' }] };
            circular.Mail.push(circular);
            assert.throws(() => sign(domain, circular, value), 'Invalid typed data: circular reference at types.Mail[1]');
        });
    });

    describe('#verifyTypedData', function () {
        const privateKey = '0x' + '01'.repeat(32);

        const domain = {
            name: 'Snapshot Test',
            version: '1',
            chainId: 1,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        };

        const types = {
            Mail: [{ name: 'contents', type: 'string' }],
        };

        const value = { contents: 'Hello, Bob!' };

        const signature = utils.typedData.signTypedData(domain, types, value, privateKey);
        const signer = utils.typedData.verifyTypedData(domain, types, value, signature);

        it('hashes the domain it read first when a domain getter changes its answer between reads', function () {
            let reads = 0;
            const trapped = { ...domain };
            Object.defineProperty(trapped, 'chainId', {
                enumerable: true,
                configurable: true,
                get: () => (reads++ === 0 ? 1 : 2),
            });

            assert.equal(utils.typedData.verifyTypedData(trapped, types, value, signature), signer);
        });

        it('recovers the signer of a signature over a field named __proto__', function () {
            const protoTypes = { Msg: [{ name: '__proto__', type: 'bool' }] };
            const valueFalse = JSON.parse('{"__proto__": false}');
            const valueTrue = JSON.parse('{"__proto__": true}');
            const protoSignature = utils.typedData.signTypedData(domain, protoTypes, valueFalse, privateKey);

            assert.equal(utils.typedData.verifyTypedData(domain, protoTypes, valueFalse, protoSignature), signer);
            assert.notEqual(utils.typedData.verifyTypedData(domain, protoTypes, valueTrue, protoSignature), signer);
        });

        it('recovers the signer of a 6.5.0 signature over a struct type named __proto__', function () {
            const protoTypes = JSON.parse('{"__proto__": [{"name": "contents", "type": "string"}]}');
            // Produced by 6.5.0 with `privateKey` over `domain`, `protoTypes` and `value`.
            const oldSignature =
                '0x50fda93510f3b2061a5b068e8cd34cc45d7c1eee09a9da526a585ba53e3a16380dd4869722599007ef30546b438552b3e322c9f7d5c7dd2f9dd4e3fd2d8a24ec1b';

            assert.equal(utils.typedData.verifyTypedData(domain, protoTypes, value, oldSignature), signer);
            assert.notEqual(
                utils.typedData.verifyTypedData(domain, protoTypes, { contents: 'Goodbye, Bob!' }, oldSignature),
                signer
            );
        });

        it('rejects a domain or types that are not plain typed data, naming the path', function () {
            assert.throws(
                () => utils.typedData.verifyTypedData({ ...domain, chainId: () => 1 } as any, types, value, signature),
                'Invalid typed data: unsupported function at domain.chainId'
            );
        });
    });
});
