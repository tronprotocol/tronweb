/**
 * TronWeb Transaction Decoder — Live Demo
 *
 * This script demonstrates the before/after difference:
 *   1. OLD WAY: Manual transaction decoding (~15 lines of boilerplate)
 *   2. NEW WAY: One-line parseTransaction() / parseTransactionLogs()
 *
 * Usage:
 *   node demo/demo.js                     # offline demos only
 *   node demo/demo.js <TX_ID>             # also parse a real transaction
 *
 * Example (Nile testnet):
 *   TRON_HOST=https://nile.trongrid.io node demo/demo.js <TX_ID>
 */

const { TronWeb } = require('../lib/commonjs/src/index');

// ============================================================
// CONFIG
// ============================================================
const FULL_HOST = process.env.TRON_HOST || 'https://nile.trongrid.io';
const PRIVATE_KEY = process.env.TRON_PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000001';

const tronWeb = new TronWeb({ fullHost: FULL_HOST, privateKey: PRIVATE_KEY });

// ============================================================
// DEMO ABIS
// ============================================================
const TRC20_ABI = [
    {
        type: 'function', name: 'transfer', stateMutability: 'nonpayable',
        inputs: [{ name: 'to', type: 'address' }, { name: 'value', type: 'uint256' }],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        type: 'function', name: 'approve', stateMutability: 'nonpayable',
        inputs: [{ name: 'spender', type: 'address' }, { name: 'value', type: 'uint256' }],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        type: 'event', name: 'Transfer',
        inputs: [
            { name: 'from', type: 'address', indexed: true },
            { name: 'to', type: 'address', indexed: true },
            { name: 'value', type: 'uint256', indexed: false },
        ],
    },
];

const SUNSWAP_V2_ABI = [
    {
        type: 'function', name: 'swapExactTokensForTokens', stateMutability: 'nonpayable',
        inputs: [
            { name: 'amountIn', type: 'uint256' },
            { name: 'amountOutMin', type: 'uint256' },
            { name: 'path', type: 'address[]' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' },
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
    },
];

// ============================================================
// HELPERS
// ============================================================
function separator(title) {
    console.log('\n' + '='.repeat(70));
    console.log(`  ${title}`);
    console.log('='.repeat(70) + '\n');
}

function encodeCalldata(abi, funcName, args) {
    const iface = new tronWeb.utils.ethersUtils.Interface(abi);
    const fragment = iface.getFunction(funcName);
    return iface.encodeFunctionData(fragment, args);
}

// ============================================================
// DEMO 1: TRC-20 Transfer — OLD WAY vs NEW WAY
// ============================================================
async function demoTransfer() {
    separator('DEMO 1: TRC-20 Transfer — OLD WAY vs NEW WAY');

    const toHex = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
    const amount = BigInt('50000000'); // 50 USDT
    const calldata = encodeCalldata(TRC20_ABI, 'transfer', [toHex, amount]);

    // ----- OLD WAY -----
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│  OLD WAY — Manual decoding                             │');
    console.log('└─────────────────────────────────────────────────────────┘\n');

    const rawData = calldata.startsWith('0x') ? calldata.slice(2) : calldata;
    const selector = rawData.slice(0, 8);

    console.log('  // Step 1: Extract the selector');
    console.log(`  const selector = "${selector}";`);
    console.log('');
    console.log('  // Step 2: Manually figure out which function this is');
    console.log('  // (you need the ABI, compute keccak256 of each function sig, match...)');
    console.log('');
    console.log('  // Step 3: Manually specify types and decode');

    const decoded = tronWeb.utils.abi.decodeParams(
        ['to', 'value'], ['address', 'uint256'], '0x' + rawData.slice(8)
    );

    console.log('  const decoded = tronWeb.utils.abi.decodeParams(');
    console.log("    ['to', 'value'],");
    console.log("    ['address', 'uint256'],");
    console.log("    '0x' + data.slice(8)");
    console.log('  );');
    console.log(`  // decoded.to = "${decoded.to}"`);
    console.log('  //                ^^^^ hex format — not human readable!');
    console.log('');
    console.log('  // Step 4: Convert address to base58');

    const base58Addr = tronWeb.address.fromHex(decoded.to);
    console.log(`  const to = tronWeb.address.fromHex(decoded.to);`);
    console.log(`  // to = "${base58Addr}"\n`);

    console.log('  Result (after 4 manual steps, ~15 lines of code):');
    console.log(`    Function: transfer`);
    console.log(`    to:       ${base58Addr}`);
    console.log(`    value:    ${decoded.value}`);

    // ----- NEW WAY -----
    console.log('\n');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│  NEW WAY — One line with parseTransaction()            │');
    console.log('└─────────────────────────────────────────────────────────┘\n');

    console.log('  const parsed = await tronWeb.trx.parseTransaction({ data }, abi);\n');

    const parsed = await tronWeb.trx.parseTransaction({ data: calldata }, TRC20_ABI);

    console.log('  Result:');
    console.log(`    name:      ${parsed.name}`);
    console.log(`    signature: ${parsed.signature}`);
    console.log(`    selector:  ${parsed.selector}`);
    console.log(`    args.to:   ${parsed.args.to}   ← already base58!`);
    console.log(`    args.value: ${parsed.args.value}`);
    console.log(`    value:     ${parsed.value} (TRX sent with call)`);
}

// ============================================================
// DEMO 2: SunSwap V2 Swap — Complex Multi-Param
// ============================================================
async function demoSwap() {
    separator('DEMO 2: SunSwap V2 Swap — Complex Multi-Param Decoding');

    const tokenA = '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c';
    const tokenB = '0x891cdb91d149f23b1a45d9c5ca78a88d0cb44c18';
    const to = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf';
    const amountIn = BigInt('1000000000');
    const amountOutMin = BigInt('950000000');
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 600);

    const calldata = encodeCalldata(SUNSWAP_V2_ABI, 'swapExactTokensForTokens', [
        amountIn, amountOutMin, [tokenA, tokenB], to, deadline,
    ]);

    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│  OLD WAY — What you would need to do manually          │');
    console.log('└─────────────────────────────────────────────────────────┘\n');
    console.log('  1. Know the SunSwap router ABI (or find it somewhere)');
    console.log('  2. Match selector "38ed1739" → swapExactTokensForTokens');
    console.log('  3. Specify all 5 parameter types: uint256, uint256, address[], address, uint256');
    console.log('  4. Call decodeParams with the correct types');
    console.log('  5. Loop through the path[] array, converting each address to base58');
    console.log('  6. Convert the "to" address to base58');
    console.log('  → ~25 lines of tedious, error-prone code');

    console.log('\n');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│  NEW WAY — One line                                    │');
    console.log('└─────────────────────────────────────────────────────────┘\n');

    const parsed = await tronWeb.trx.parseTransaction({ data: calldata }, SUNSWAP_V2_ABI);

    console.log('  const parsed = await tronWeb.trx.parseTransaction({ data }, abi);\n');
    console.log('  Result:');
    console.log(`    name:         ${parsed.name}`);
    console.log(`    signature:    ${parsed.signature}`);
    console.log(`    selector:     ${parsed.selector}`);
    console.log(`    amountIn:     ${parsed.args.amountIn}`);
    console.log(`    amountOutMin: ${parsed.args.amountOutMin}`);
    console.log(`    path:`);
    parsed.args.path.forEach((addr, i) => {
        console.log(`      [${i}]: ${addr}  ← base58!`);
    });
    console.log(`    to:           ${parsed.args.to}  ← base58!`);
    console.log(`    deadline:     ${parsed.args.deadline}`);
}

// ============================================================
// DEMO 3: Interface class — Low-level
// ============================================================
async function demoInterface() {
    separator('DEMO 3: Low-Level Interface Class (also now public!)');

    const { Interface } = tronWeb.utils.ethersUtils;
    const iface = new Interface(TRC20_ABI);

    console.log('  // The Interface class was hidden inside TronWeb.');
    console.log('  // Now it is exported and developers can use it directly.\n');

    // Encode
    const encoded = iface.encodeFunctionData('transfer', [
        '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf', BigInt(1000000),
    ]);
    console.log(`  Encode: iface.encodeFunctionData('transfer', [addr, amount])`);
    console.log(`  → ${encoded.slice(0, 42)}...\n`);

    // Decode
    const decoded = iface.parseTransaction({ data: encoded });
    console.log(`  Decode: iface.parseTransaction({ data })`);
    console.log(`  → name: ${decoded.name}, args: [${decoded.args[0]}, ${decoded.args[1]}]\n`);

    // Lookup by selector
    const fragment = iface.getFunction('0xa9059cbb');
    console.log(`  Lookup: iface.getFunction('0xa9059cbb')`);
    console.log(`  → "${fragment.name}"\n`);

    // Parse event
    const event = iface.getEvent('Transfer');
    const eventEncoded = iface.encodeEventLog(event, [
        '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf',
        '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c',
        BigInt(500000),
    ]);
    const decodedLog = iface.parseLog({ topics: eventEncoded.topics, data: eventEncoded.data });
    console.log(`  Event:  iface.parseLog({ topics, data })`);
    console.log(`  → ${decodedLog.name}(from=${decodedLog.args[0].slice(0, 10)}..., to=${decodedLog.args[1].slice(0, 10)}..., value=${decodedLog.args[2]})`);
}

// ============================================================
// DEMO 4: LIVE — Parse a real transaction (requires network)
// ============================================================
async function demoLive(txId) {
    separator(`DEMO 4: LIVE — Parsing real transaction`);
    console.log(`  TX ID: ${txId}\n`);

    try {
        console.log('  --- parseTransaction() ---\n');
        const parsed = await tronWeb.trx.parseTransaction(txId);

        if (parsed) {
            console.log(`    name:      ${parsed.name}`);
            console.log(`    signature: ${parsed.signature}`);
            console.log(`    selector:  ${parsed.selector}`);
            console.log(`    value:     ${parsed.value} SUN`);
            console.log(`    args:`);
            for (const [key, val] of Object.entries(parsed.args)) {
                const display = Array.isArray(val)
                    ? `[${val.join(', ')}]`
                    : typeof val === 'bigint' ? `${val}` : val;
                console.log(`      ${key}: ${display}`);
            }
        } else {
            console.log('    Function selector not found in contract ABI');
        }

        console.log('\n  --- parseTransactionLogs() ---\n');
        const logs = await tronWeb.trx.parseTransactionLogs(txId);

        if (logs.length === 0) {
            console.log('    No decodable event logs found');
        } else {
            logs.forEach((log, i) => {
                console.log(`    Log #${i + 1}: ${log.name}`);
                console.log(`      contract: ${log.address}`);
                console.log(`      signature: ${log.signature}`);
                for (const [key, val] of Object.entries(log.args)) {
                    const display = typeof val === 'bigint' ? `${val}` : val;
                    console.log(`      ${key}: ${display}`);
                }
                console.log();
            });
        }
    } catch (e) {
        console.log(`    Error: ${e.message}`);
        console.log('    (Make sure the tx exists on the configured network)');
    }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
    console.log('\n' + '█'.repeat(70));
    console.log('  TronWeb Transaction Decoder — Demo');
    console.log('  OLD WAY (manual ~15 lines) vs NEW WAY (one line)');
    console.log('█'.repeat(70));

    await demoTransfer();
    await demoSwap();
    await demoInterface();

    const txId = process.argv[2];
    if (txId) {
        // Small delay to avoid TronGrid rate limiting after the offline demos
        await new Promise(r => setTimeout(r, 1500));
        await demoLive(txId);
    } else {
        separator('DEMO 4: LIVE — Skipped (no tx ID provided)');
        console.log('  To parse a real transaction, run:\n');
        console.log('    node demo/demo.js <TX_ID>\n');
        console.log('  Example (Nile testnet):');
        console.log('    TRON_HOST=https://nile.trongrid.io node demo/demo.js abc123...\n');
    }

    console.log('█'.repeat(70));
    console.log('  Demo complete!');
    console.log('█'.repeat(70) + '\n');
}

main().catch(console.error);
