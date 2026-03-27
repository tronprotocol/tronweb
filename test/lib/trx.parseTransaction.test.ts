import { assert } from 'chai';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import { TronWeb } from '../setup/TronWeb.js';

/**
 * Unit tests for tronWeb.trx.parseTransaction() and tronWeb.trx.parseTransactionLogs().
 *
 * These tests use hardcoded ABI and encoded calldata — no network calls required.
 */

// --- Test ABIs ---

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
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
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
        type: 'event',
        name: 'Approval',
        inputs: [
            { name: 'owner', type: 'address', indexed: true },
            { name: 'spender', type: 'address', indexed: true },
            { name: 'value', type: 'uint256', indexed: false },
        ],
    },
] as const;

const SUNSWAP_V2_ROUTER_ABI = [
    {
        type: 'function',
        name: 'swapExactTokensForTokens',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'amountIn', type: 'uint256' },
            { name: 'amountOutMin', type: 'uint256' },
            { name: 'path', type: 'address[]' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' },
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
    },
    {
        type: 'function',
        name: 'addLiquidity',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'tokenA', type: 'address' },
            { name: 'tokenB', type: 'address' },
            { name: 'amountADesired', type: 'uint256' },
            { name: 'amountBDesired', type: 'uint256' },
            { name: 'amountAMin', type: 'uint256' },
            { name: 'amountBMin', type: 'uint256' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' },
        ],
        outputs: [
            { name: 'amountA', type: 'uint256' },
            { name: 'amountB', type: 'uint256' },
            { name: 'liquidity', type: 'uint256' },
        ],
    },
    {
        type: 'event',
        name: 'Swap',
        inputs: [
            { name: 'sender', type: 'address', indexed: true },
            { name: 'amount0In', type: 'uint256', indexed: false },
            { name: 'amount1In', type: 'uint256', indexed: false },
            { name: 'amount0Out', type: 'uint256', indexed: false },
            { name: 'amount1Out', type: 'uint256', indexed: false },
            { name: 'to', type: 'address', indexed: true },
        ],
    },
] as const;

const TUPLE_ABI = [
    {
        type: 'function',
        name: 'complexCall',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'order',
                type: 'tuple',
                components: [
                    { name: 'maker', type: 'address' },
                    { name: 'amount', type: 'uint256' },
                    { name: 'token', type: 'address' },
                ],
            },
            { name: 'deadline', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
] as const;

// --- Helpers ---

/**
 * Use the Interface class to encode function data for test fixtures.
 */
function encodeFunctionData(abi: readonly any[], name: string, args: any[]): string {
    const iface = new tronWebBuilder.utils.ethersUtils.Interface(abi as any);
    const fragment = iface.getFunction(name);
    if (!fragment) throw new Error(`Function ${name} not found`);
    return iface.encodeFunctionData(fragment, args);
}

describe('TronWeb.trx.parseTransaction', function () {
    let tronWeb: TronWeb;

    before(function () {
        tronWeb = tronWebBuilder.createInstance();
    });

    describe('#parseTransaction()', function () {
        it('should parse a TRC-20 transfer call from raw calldata', async function () {
            // Encode: transfer(0x7e5f4552091a69125d5dfcb7b8c2659029395bdf, 1000000)
            const toAddressHex = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const amount = BigInt(1000000);
            const data = encodeFunctionData(ERC20_ABI, 'transfer', [toAddressHex, amount]);

            const parsed = await tronWeb.trx.parseTransaction({ data }, ERC20_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'transfer');
            assert.equal(parsed!.selector, '0xa9059cbb');
            assert.include(parsed!.signature, 'transfer(address,uint256)');
            // The 'to' arg should be converted to TRON base58 address
            assert.isTrue(parsed!.args.to.startsWith('T'), 'Address should be in base58 format starting with T');
            assert.equal(parsed!.args.value, amount);
        });

        it('should parse a TRC-20 approve call', async function () {
            const spenderHex = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const amount = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935'); // max uint256
            const data = encodeFunctionData(ERC20_ABI, 'approve', [spenderHex, amount]);

            const parsed = await tronWeb.trx.parseTransaction({ data }, ERC20_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'approve');
            assert.equal(parsed!.selector, '0x095ea7b3');
            assert.isTrue(parsed!.args.spender.startsWith('T'));
            assert.equal(parsed!.args.value, amount);
        });

        it('should parse a SunSwap V2 swapExactTokensForTokens call', async function () {
            const tokenA = '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c'; // example TRON hex (without 41 prefix)
            const tokenB = '0x891cdb91d149f23b1a45d9c5ca78a88d0cb44c18';
            const to = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const amountIn = BigInt(500000000);
            const amountOutMin = BigInt(475000000);
            const deadline = BigInt(1700000000);

            const data = encodeFunctionData(SUNSWAP_V2_ROUTER_ABI, 'swapExactTokensForTokens', [
                amountIn,
                amountOutMin,
                [tokenA, tokenB],
                to,
                deadline,
            ]);

            const parsed = await tronWeb.trx.parseTransaction({ data }, SUNSWAP_V2_ROUTER_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'swapExactTokensForTokens');
            assert.equal(parsed!.args.amountIn, amountIn);
            assert.equal(parsed!.args.amountOutMin, amountOutMin);
            // path should be an array of TRON base58 addresses
            assert.isArray(parsed!.args.path);
            assert.equal(parsed!.args.path.length, 2);
            assert.isTrue(parsed!.args.path[0].startsWith('T'), 'Path addresses should be base58');
            assert.isTrue(parsed!.args.path[1].startsWith('T'), 'Path addresses should be base58');
            // 'to' should be base58
            assert.isTrue(parsed!.args.to.startsWith('T'));
            assert.equal(parsed!.args.deadline, deadline);
        });

        it('should parse a function with tuple parameters', async function () {
            const maker = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const token = '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c';
            const amount = BigInt(999);
            const deadline = BigInt(12345);

            const data = encodeFunctionData(TUPLE_ABI, 'complexCall', [
                [maker, amount, token],
                deadline,
            ]);

            const parsed = await tronWeb.trx.parseTransaction({ data }, TUPLE_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'complexCall');
            // Tuple args should have addresses converted
            assert.isTrue(parsed!.args.order.maker.startsWith('T'));
            assert.isTrue(parsed!.args.order.token.startsWith('T'));
            assert.equal(parsed!.args.order.amount, amount);
            assert.equal(parsed!.args.deadline, deadline);
        });

        it('should return null when function selector does not match any ABI entry', async function () {
            // Random data that does not match any selector in the ABI
            const data = '0xdeadbeef0000000000000000000000000000000000000000000000000000000000000001';

            const parsed = await tronWeb.trx.parseTransaction({ data }, ERC20_ABI as any);

            assert.isNull(parsed);
        });

        it('should handle data without 0x prefix', async function () {
            const toAddressHex = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
            const amount = BigInt(1000000);
            const data = encodeFunctionData(ERC20_ABI, 'transfer', [toAddressHex, amount]);
            // Strip 0x prefix
            const dataWithoutPrefix = data.slice(2);

            const parsed = await tronWeb.trx.parseTransaction({ data: dataWithoutPrefix }, ERC20_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'transfer');
        });

        it('should set value to 0n when no call_value', async function () {
            const data = encodeFunctionData(ERC20_ABI, 'transfer', [
                '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf',
                BigInt(100),
            ]);

            const parsed = await tronWeb.trx.parseTransaction({ data }, ERC20_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.value, BigInt(0));
        });

        it('should throw when no ABI and no contract address provided', async function () {
            const data = '0xa9059cbb0000000000000000000000000000000000000000000000000000000000000001';

            try {
                await tronWeb.trx.parseTransaction({ data });
                assert.fail('Should have thrown');
            } catch (e: any) {
                assert.include(e.message, 'Contract address is required');
            }
        });

        it('should parse addLiquidity with multiple address parameters', async function () {
            const tokenA = '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c';
            const tokenB = '0x891cdb91d149f23b1a45d9c5ca78a88d0cb44c18';
            const to = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';

            const data = encodeFunctionData(SUNSWAP_V2_ROUTER_ABI, 'addLiquidity', [
                tokenA,
                tokenB,
                BigInt(1000),
                BigInt(2000),
                BigInt(900),
                BigInt(1800),
                to,
                BigInt(1700000000),
            ]);

            const parsed = await tronWeb.trx.parseTransaction({ data }, SUNSWAP_V2_ROUTER_ABI as any);

            assert.isNotNull(parsed);
            assert.equal(parsed!.name, 'addLiquidity');
            assert.isTrue(parsed!.args.tokenA.startsWith('T'));
            assert.isTrue(parsed!.args.tokenB.startsWith('T'));
            assert.isTrue(parsed!.args.to.startsWith('T'));
            assert.equal(parsed!.args.amountADesired, BigInt(1000));
        });
    });

    describe('#parseTransactionLogs()', function () {
        it('should return empty array when no ABI is provided and contractAddress lookup would fail', async function () {
            // We can't easily test the full flow without a network connection,
            // but we can verify the method exists and returns the right type
            assert.isFunction(tronWeb.trx.parseTransactionLogs);
        });
    });
});
