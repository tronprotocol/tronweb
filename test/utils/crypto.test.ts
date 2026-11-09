import { assert } from 'vitest';
import { utils } from '../setup/TronWeb.js';
import { txJsonToPb } from '../../src/utils/transaction.js';
import config from '../helpers/config.js';

const { crypto, code, bytes } = utils;
const { ADDRESS_HEX, ADDRESS_BASE58 } = config;

// Private key 0x...01 controls ADDRESS_HEX / ADDRESS_BASE58.
const PRIVATE_KEY = '0'.repeat(63) + '1';
// btoa-based reference encoders (not Node's Buffer) so this suite also runs in the browser.
const bytesToBase64 = (bytes: ArrayLike<number>) => btoa(String.fromCharCode(...Array.from(bytes)));
const hexToBase64 = (hex: string) => bytesToBase64(hex.match(/../g)!.map((b) => parseInt(b, 16)));
const PRIVATE_KEY_BASE64 = hexToBase64(PRIVATE_KEY);

describe('utils.crypto', function () {
    describe('#privateKeyToSigningHex()', function () {
        it('should normalise a valid key to 0x-prefixed hex', function () {
            assert.equal(crypto.privateKeyToSigningHex(PRIVATE_KEY), '0x' + PRIVATE_KEY);
            assert.equal(crypto.privateKeyToSigningHex('0x' + PRIVATE_KEY), '0x' + PRIVATE_KEY);
            assert.equal(crypto.privateKeyToSigningHex(new String(PRIVATE_KEY) as any), '0x' + PRIVATE_KEY);
        });

        it('should reject malformed keys', function () {
            assert.throws(() => crypto.privateKeyToSigningHex('1234'), 'Invalid private key provided');
            assert.throws(() => crypto.privateKeyToSigningHex(1 as any), 'Invalid private key provided');
        });
    });

    describe('#decodeBase58Address()', function () {
        it('should return false for non-string or too short input', function () {
            assert.isFalse(crypto.decodeBase58Address(1 as any));
            assert.isFalse(crypto.decodeBase58Address('abcd'));
            assert.isFalse(crypto.decodeBase58Address('zzzzz'));
        });

        it('should throw when the checksum does not match', function () {
            const bad = ADDRESS_BASE58.slice(0, -1) + (ADDRESS_BASE58.endsWith('C') ? 'D' : 'C');
            assert.throws(() => crypto.decodeBase58Address(bad), 'Invalid address provided');
        });
    });

    describe('#decode58Check()', function () {
        it('should decode a valid address and reject a bad checksum', function () {
            assert.equal(bytes.byteArray2hexStr(crypto.decode58Check(ADDRESS_BASE58) as number[]).toLowerCase(), ADDRESS_HEX);
            const bad = ADDRESS_BASE58.slice(0, -1) + (ADDRESS_BASE58.endsWith('C') ? 'D' : 'C');
            assert.isFalse(crypto.decode58Check(bad));
            assert.isFalse(crypto.decode58Check('111'));
        });
    });

    describe('#isAddressValid()', function () {
        it('should validate base58 addresses', function () {
            assert.isTrue(crypto.isAddressValid(ADDRESS_BASE58));
            assert.isFalse(crypto.isAddressValid(1 as any));
            assert.isFalse(crypto.isAddressValid('T123'));
            const bad = ADDRESS_BASE58.slice(0, -1) + (ADDRESS_BASE58.endsWith('C') ? 'D' : 'C');
            assert.isFalse(crypto.isAddressValid(bad));
        });
    });

    describe('#signTransaction()', function () {
        const txID = 'aa'.repeat(32);

        it('should not append a signature that is already present', function () {
            const first = crypto.signTransaction(PRIVATE_KEY, { txID });
            assert.lengthOf(first.signature, 1);
            const existing = '0x' + first.signature[0].toUpperCase();
            const tx = crypto.signTransaction(PRIVATE_KEY, { txID, signature: [existing] });
            assert.deepEqual(tx.signature, [existing]);
        });

        it('should append a new signature to an existing list', function () {
            const tx = crypto.signTransaction(PRIVATE_KEY, { txID, signature: ['00'] });
            assert.lengthOf(tx.signature, 2);
        });
    });

    describe('#signBytes() / #ecRecover()', function () {
        it('should recover the signer of signed bytes', function () {
            const contents = code.hexStr2byteArray('deadbeef');
            const signature = crypto.signBytes(PRIVATE_KEY, contents);
            const hash = bytes.byteArray2hexStr(crypto.SHA256(contents));
            assert.equal(crypto.ecRecover(hash, signature).toLowerCase(), ADDRESS_HEX);
            assert.equal(crypto.ecRecover('0x' + hash, '0x' + signature).toLowerCase(), ADDRESS_HEX);
        });
    });

    describe('#arrayToBase64String()', function () {
        it('should base64-encode a byte array', function () {
            assert.equal(crypto.arrayToBase64String([1, 2, 3, 255]), bytesToBase64([1, 2, 3, 255]));
        });
    });

    describe('#getRowBytesFromTransactionBase64()', function () {
        it('should return the serialized raw_data of a base64 transaction', function () {
            const pb = txJsonToPb({
                raw_data: {
                    contract: [
                        {
                            type: 'TransferContract',
                            parameter: {
                                value: { owner_address: ADDRESS_HEX, to_address: ADDRESS_HEX, amount: 1 },
                                type_url: 'type.googleapis.com/protocol.TransferContract',
                            },
                        },
                    ],
                    ref_block_bytes: 'abcd',
                    ref_block_hash: '0011223344556677',
                    expiration: 1_700_000_060_000,
                    timestamp: 1_700_000_000_000,
                },
            } as any);
            const base64 = bytesToBase64(pb.serializeBinary());
            const raw = crypto.getRowBytesFromTransactionBase64(base64);
            assert.deepEqual(Array.from(raw), Array.from(pb.getRawData().serializeBinary()));
        });
    });

    describe('base64 private key helpers', function () {
        it('should derive the address in base58, hex and base64 form', function () {
            assert.equal(crypto.getBase58CheckAddressFromPriKeyBase64String(PRIVATE_KEY_BASE64), ADDRESS_BASE58);
            assert.equal(crypto.getHexStrAddressFromPriKeyBase64String(PRIVATE_KEY_BASE64).toLowerCase(), ADDRESS_HEX);
            assert.equal(crypto.getAddressFromPriKeyBase64String(PRIVATE_KEY_BASE64), hexToBase64(ADDRESS_HEX));
            assert.equal(crypto.passwordToAddress(PRIVATE_KEY_BASE64), ADDRESS_BASE58);
        });
    });

    describe('#computeAddress()', function () {
        it('should accept public keys with or without the 0x04 prefix', function () {
            const pub = crypto.getPubKeyFromPriKey(code.hexStr2byteArray(PRIVATE_KEY));
            const expected = bytes.byteArray2hexStr(crypto.computeAddress(pub));
            assert.equal(bytes.byteArray2hexStr(crypto.computeAddress(pub.slice(1))), expected);
            assert.equal(expected.toLowerCase(), ADDRESS_HEX);
        });
    });

    describe('#sha3()', function () {
        it('should hash with and without the 0x prefix', function () {
            const hash = crypto.sha3('abc');
            assert.match(hash, /^0x[0-9a-f]{64}$/);
            assert.equal(crypto.sha3('abc', false), hash.slice(2));
        });
    });
});
