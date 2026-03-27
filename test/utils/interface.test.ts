import { assert } from 'chai';
import { utils } from '../setup/TronWeb.js';

const { Interface, LogDescription, TransactionDescription, ErrorDescription } = utils.ethersUtils;

/**
 * Unit tests for the now-public Interface class (src/utils/interface.ts).
 *
 * These tests verify that parseTransaction(), parseLog(), and parseError()
 * work correctly with hardcoded ABI and encoded data.
 */

const ERC20_ABI = [
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            { name: 'from', type: 'address', indexed: true },
            { name: 'to', type: 'address', indexed: true },
            { name: 'value', type: 'uint256', indexed: false },
        ],
    },
    {
        type: 'error',
        name: 'InsufficientBalance',
        inputs: [
            { name: 'account', type: 'address' },
            { name: 'balance', type: 'uint256' },
            { name: 'required', type: 'uint256' },
        ],
    },
];

describe('TronWeb.utils.ethersUtils.Interface', function () {
    describe('class exports', function () {
        it('should export Interface class', function () {
            assert.isFunction(Interface);
        });

        it('should export LogDescription class', function () {
            assert.isFunction(LogDescription);
        });

        it('should export TransactionDescription class', function () {
            assert.isFunction(TransactionDescription);
        });

        it('should export ErrorDescription class', function () {
            assert.isFunction(ErrorDescription);
        });
    });

    describe('#parseTransaction()', function () {
        it('should parse a transfer function call', function () {
            const iface = new Interface(ERC20_ABI);
            const toAddress = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const amount = BigInt(1000000);

            // Encode using the same interface
            const fragment = iface.getFunction('transfer');
            assert.isNotNull(fragment);
            const encoded = iface.encodeFunctionData(fragment!, [toAddress, amount]);

            // Parse it back
            const parsed = iface.parseTransaction({ data: encoded, value: BigInt(0) });

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'transfer');
            assert.include(parsed!.signature, 'transfer(address,uint256)');
            assert.equal(parsed!.selector, '0xa9059cbb');
            assert.equal(parsed!.args[0].toLowerCase(), toAddress.toLowerCase());
            assert.equal(parsed!.args[1], amount);
            assert.equal(parsed!.value, BigInt(0));
        });

        it('should return null for unknown function selector', function () {
            const iface = new Interface(ERC20_ABI);
            const unknownData = '0xdeadbeef0000000000000000000000000000000000000000000000000000000000000001';

            const parsed = iface.parseTransaction({ data: unknownData });

            assert.isNull(parsed);
        });

        it('should roundtrip encode -> decode', function () {
            const iface = new Interface(ERC20_ABI);
            const toAddress = '0x1234567890abcdef1234567890abcdef12345678';
            const amount = BigInt('99999999999999999999');

            const encoded = iface.encodeFunctionData('transfer', [toAddress, amount]);
            const decoded = iface.parseTransaction({ data: encoded });

            assert.isNotNull(decoded);
            assert.equal(decoded!.name, 'transfer');
            assert.equal(decoded!.args[0].toLowerCase(), toAddress.toLowerCase());
            assert.equal(decoded!.args[1], amount);
        });
    });

    describe('#parseLog()', function () {
        it('should parse a Transfer event log', function () {
            const iface = new Interface(ERC20_ABI);
            const from = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const to = '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c';
            const value = BigInt(500000);

            // Encode the event
            const event = iface.getEvent('Transfer');
            assert.isNotNull(event);
            const encoded = iface.encodeEventLog(event!, [from, to, value]);

            // Parse it
            const parsed = iface.parseLog({ topics: encoded.topics as string[], data: encoded.data });

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'Transfer');
            assert.include(parsed!.signature, 'Transfer(address,address,uint256)');
            assert.equal(parsed!.args[0].toLowerCase(), from.toLowerCase());
            assert.equal(parsed!.args[1].toLowerCase(), to.toLowerCase());
            assert.equal(parsed!.args[2], value);
        });

        it('should return null for unknown event topic', function () {
            const iface = new Interface(ERC20_ABI);
            const unknownLog = {
                topics: ['0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'],
                data: '0x',
            };

            const parsed = iface.parseLog(unknownLog);

            assert.isNull(parsed);
        });
    });

    describe('#parseError()', function () {
        it('should parse a custom error', function () {
            const iface = new Interface(ERC20_ABI);
            const account = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const balance = BigInt(100);
            const required = BigInt(500);

            // Encode the error
            const encoded = iface.encodeErrorResult('InsufficientBalance', [account, balance, required]);

            // Parse it
            const parsed = iface.parseError(encoded);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'InsufficientBalance');
            assert.equal(parsed!.args[0].toLowerCase(), account.toLowerCase());
            assert.equal(parsed!.args[1], balance);
            assert.equal(parsed!.args[2], required);
        });

        it('should return null for unknown error selector', function () {
            const iface = new Interface(ERC20_ABI);
            const unknownError = '0xdeadbeef0000000000000000000000000000000000000000000000000000000000000001';

            const parsed = iface.parseError(unknownError);

            assert.isNull(parsed);
        });
    });

    describe('#getFunction() and #getEvent()', function () {
        it('should retrieve function fragment by name', function () {
            const iface = new Interface(ERC20_ABI);
            const fragment = iface.getFunction('transfer');

            assert.isNotNull(fragment);
            assert.equal(fragment!.name, 'transfer');
            assert.equal(fragment!.inputs.length, 2);
        });

        it('should retrieve event fragment by name', function () {
            const iface = new Interface(ERC20_ABI);
            const fragment = iface.getEvent('Transfer');

            assert.isNotNull(fragment);
            assert.equal(fragment!.name, 'Transfer');
            assert.equal(fragment!.inputs.length, 3);
        });

        it('should retrieve function by selector', function () {
            const iface = new Interface(ERC20_ABI);
            const fragment = iface.getFunction('0xa9059cbb');

            assert.isNotNull(fragment);
            assert.equal(fragment!.name, 'transfer');
        });
    });
});
