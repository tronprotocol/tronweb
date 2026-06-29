import type { TronWeb } from '../../tronweb.js';
import type { Contract } from './index.js';
import type { AbiParamsCommon, ContractAbiInterface, FunctionFragment, GetMethodsTypeFromAbi, GetOutputsType, GetParamsType, IsConstAbi } from '../../types/ABI.js';
import type { TransactionWrapper } from '../../types/Transaction.js';
import {
    buildFunctionSelector,
    decodeParamsV2ByABI,
    isReadOnlyFunctionFragment,
    overloadArities,
    resolveFunctionFragment,
} from '../../utils/abi.js';
import { IsNever, Prettify, UnionToIntersection } from '../../types/UtilsTypes.js';

// ─── Types ───────────────────────────────────────────────────────────────────

type IsReadOnlyFunction<Fragment> = Fragment extends FunctionFragment
    ? Fragment['stateMutability'] extends 'view' | 'pure'
        ? true
        : Fragment['constant'] extends true
          ? true
          : false
    : false;

type IsWriteFunction<Fragment> = Fragment extends FunctionFragment
    ? IsReadOnlyFunction<Fragment> extends true
        ? false
        : true
    : false;

type ReadContractFragments<Abi extends ContractAbiInterface> = Abi[number] extends infer Fragment
    ? Fragment extends FunctionFragment
        ? IsReadOnlyFunction<Fragment> extends true
            ? Fragment
            : never
        : never
    : never;

type WriteContractFragments<Abi extends ContractAbiInterface> = Abi[number] extends infer Fragment
    ? Fragment extends FunctionFragment
        ? IsWriteFunction<Fragment> extends true
            ? Fragment
            : never
        : never
    : never;

export type ReadContractFunctionName<Abi extends ContractAbiInterface> = ReadContractFragments<Abi>['name'];

export type WriteContractFunctionName<Abi extends ContractAbiInterface> = WriteContractFragments<Abi>['name'];

export type CollapseSingleItemTuple<Value> = Value extends readonly [infer Only] ? Only : Value;

type ChangeNeverToString<T> = IsNever<T> extends true ? string : T;

export type ReadContractParameters<
    AbiFrag extends FunctionFragment = FunctionFragment,
> = {
    readonly functionName: ChangeNeverToString<AbiFrag['name']>;
    readonly args?: GetParamsType<AbiFrag['inputs']>;
    /** Caller address for the constant call. */
    readonly from?: string;
    readonly value?: number | bigint;
};

export type ReadContractReturnType<
    AbiFrag extends FunctionFragment = FunctionFragment,
> = CollapseSingleItemTuple<GetOutputsType<AbiFrag['outputs']>>;

export type WriteContractParameters<
    AbiFrag extends FunctionFragment = FunctionFragment,
> = {
    readonly functionName: ChangeNeverToString<AbiFrag['name']>;
    readonly args?: GetParamsType<AbiFrag['inputs']>;
    /**
     * Signer: a private key whose derived address owns and signs the transaction,
     * allowing a non-default signer. When omitted, the instance default key signs.
     */
    readonly account?: string;
    readonly value?: number | bigint;
    readonly feeLimit?: number;
    readonly tokenId?: string;
    readonly tokenValue?: number;
    readonly permissionId?: number;
};

export type WriteContractReturnType = string;

export type ReadOptions<
    AbiFrag extends FunctionFragment
> = Prettify<Omit<ReadContractParameters<AbiFrag>, 'functionName' | 'args'>>;

export type WriteOptions<
    AbiFrag extends FunctionFragment
> = Prettify<Omit<WriteContractParameters<AbiFrag>, 'functionName' | 'args'>>;

type ContractCallInterface = (...args: any[]) => Promise<any>;

type ReadFragmentSignature<
    AbiFrag extends FunctionFragment,
    Parameters = NonNullable<ReadContractParameters<AbiFrag>['args']>,
    Options = ReadOptions<AbiFrag>
> = AbiFrag extends FunctionFragment ? (
    ...parameters: Parameters extends readonly [] ? [
        options?: Options
    ] : [
        args: Parameters,
        options?: Options
    ]
) => Promise<ReadContractReturnType<AbiFrag>> : never;

type ReadSignaturesForName<Abi extends ContractAbiInterface, Name extends ReadContractFunctionName<Abi>> =
    Extract<ReadContractFragments<Abi>, { name: Name }> extends infer F
        ? F extends FunctionFragment ? ReadFragmentSignature<F> : never
        : never;

// Type-level mirror of `canonicalizeIntType`: bare `uint`/`int` (and their array
// forms) canonicalize to `uint256`/`int256`; width-qualified types are untouched.
type CanonicalizeIntType<T extends string> =
    T extends `uint[${infer Rest}` ? `uint256[${Rest}`
        : T extends `int[${infer Rest}` ? `int256[${Rest}`
            : T extends 'uint' ? 'uint256'
                : T extends 'int' ? 'int256'
                    : T;

// Type-level mirror of `buildFullTypeDefinition`: the canonical Solidity type
// string for one ABI parameter, expanding tuples into their component list.
type ParamTypeSignature<Param extends AbiParamsCommon> =
    Param['type'] extends `tuple${infer Suffix}`
        ? Param extends { components: infer Components }
            ? Components extends ReadonlyArray<AbiParamsCommon>
                ? `(${JoinParamTypeSignatures<Components>})${Suffix}`
                : Param['type']
            : Param['type']
        : CanonicalizeIntType<Param['type']>;

// Comma-joined canonical types for a parameter list.
type JoinParamTypeSignatures<Params extends ReadonlyArray<AbiParamsCommon>> =
    Params extends readonly [infer Head, ...infer Rest]
        ? Head extends AbiParamsCommon
            ? Rest extends ReadonlyArray<AbiParamsCommon>
                ? Rest extends readonly []
                    ? ParamTypeSignature<Head>
                    : `${ParamTypeSignature<Head>},${JoinParamTypeSignatures<Rest>}`
                : ParamTypeSignature<Head>
            : ''
        : '';

// Type-level mirror of `buildFunctionSelector`: a fragment's full signature,
// e.g. `"transfer(address,uint256)"`.
type FunctionSelector<Fragment extends FunctionFragment> =
    `${Fragment['name']}(${JoinParamTypeSignatures<NonNullable<Fragment['inputs']>>})`;

// Names map to the merged overload signatures; full selectors map to their one
// fragment's signature so overloads stay addressable unambiguously — mirrors the
// dual keys (`read[name]` and `read[selector]`) registered at runtime.
type ExtractReadNamespace<Abi extends ContractAbiInterface> = {
    [K in ReadContractFragments<Abi> as K['name']]: UnionToIntersection<ReadSignaturesForName<Abi, K['name']>>;
} & {
    [K in ReadContractFragments<Abi> as FunctionSelector<K>]: ReadFragmentSignature<K>;
};

export type ContractReadNamespace<Abi extends ContractAbiInterface> = IsConstAbi<Abi> extends true
    ? 'read' extends ReadContractFunctionName<Abi> | WriteContractFunctionName<Abi>
        ? GetMethodsTypeFromAbi<Abi>['read']['onMethod'] & Prettify<ExtractReadNamespace<Abi>>
        : Prettify<ExtractReadNamespace<Abi>>
    : any;

type WriteFragmentSignature<
    AbiFrag extends FunctionFragment,
    Parameters = NonNullable<WriteContractParameters<AbiFrag>['args']>,
    Options = WriteOptions<AbiFrag>
> = AbiFrag extends FunctionFragment ? (
    ...parameters: Parameters extends readonly [] ? [
        options?: Options
    ] : [
        args: Parameters,
        options?: Options
    ]
) => Promise<WriteContractReturnType> : never;

type WriteSignaturesForName<Abi extends ContractAbiInterface, Name extends WriteContractFunctionName<Abi>> =
    Extract<WriteContractFragments<Abi>, { name: Name }> extends infer F
        ? F extends FunctionFragment ? WriteFragmentSignature<F> : never
        : never;

// Names map to the merged overload signatures; full selectors map to their one
// fragment's signature so overloads stay addressable unambiguously — mirrors the
// dual keys (`write[name]` and `write[selector]`) registered at runtime.
type ExtractWriteNamespace<Abi extends ContractAbiInterface> = {
    [K in WriteContractFragments<Abi> as K['name']]: UnionToIntersection<WriteSignaturesForName<Abi, K['name']>>;
} & {
    [K in WriteContractFragments<Abi> as FunctionSelector<K>]: WriteFragmentSignature<K>;
};

export type ContractWriteNamespace<Abi extends ContractAbiInterface> = IsConstAbi<Abi> extends true
    ? 'write' extends ReadContractFunctionName<Abi> | WriteContractFunctionName<Abi>
        ? GetMethodsTypeFromAbi<Abi>['write']['onMethod'] & Prettify<ExtractWriteNamespace<Abi>>
        : Prettify<ExtractWriteNamespace<Abi>>
    : any;

// ─── Runtime ─────────────────────────────────────────────────────────────────

// Runtime-level shapes of ReadOptions/WriteOptions, usable with any ABI.
interface AnyReadOptions {
    readonly from?: string;
    readonly value?: number | bigint;
}

interface AnyWriteOptions extends AnyReadOptions {
    readonly account?: string;
    readonly feeLimit?: number;
    readonly tokenId?: string;
    readonly tokenValue?: number;
    readonly permissionId?: number;
}

function getFunctionParameters(values: [argsOrOptions?: readonly unknown[] | object, options?: object]) {
    const hasArgs = values.length > 0 && Array.isArray(values[0]);
    const args = hasArgs ? (values[0] as readonly unknown[]) : [];
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return { args, options };
}

function resolveCallValue(value: number | bigint | undefined): number | undefined {
    if (value === undefined) return undefined;
    if (typeof value === 'bigint') {
        if (value < 0n) {
            throw new Error('call value cannot be negative');
        }
        // Number(bigint) silently loses precision above 2^53; reject rather than truncate.
        if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
            throw new Error('call value exceeds safe integer range');
        }
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new Error('call value must be a number or bigint');
    }
    if (value < 0) {
        throw new Error('call value cannot be negative');
    }
    if (!Number.isInteger(value)) {
        throw new Error('call value must be an integer');
    }
    if (value > Number.MAX_SAFE_INTEGER) {
        throw new Error('call value exceeds safe integer range');
    }
    return value;
}

// The `account` option is a private key; derive its address. A TRON private key is
// exactly 64 hex chars (32 bytes), optionally 0x-prefixed; anything else — including
// any address form — is rejected. The format gate is also a safety check: a 42-char
// hex address is all hex and would otherwise be silently zero-padded into a valid
// scalar by fromPrivateKey, yielding a bogus derived address instead of an error.
function privateKeyToAddress(tronWeb: TronWeb, account: string): string {
    const hex = account.replace(/^0x/, '');
    if (hex.length === 64 && /^[0-9a-fA-F]{64}$/.test(hex)) {
        const derived = tronWeb.address.fromPrivateKey(account);
        if (derived) return derived;
    }
    throw new Error('The "account" option must be a private key.');
}

// Caller (issuer) address for a constant call: the explicit `from` address, else the
// instance default. At least one must be present — reject rather than fall back to a
// null caller, so a constant call always issues from a real address.
function resolveCallerAddress(
    tronWeb: TronWeb,
    from: string | undefined,
    defaultAddress?: string
): string {
    if (typeof from === 'string' && from.length > 0) {
        if (!tronWeb.isAddress(from)) {
            throw new Error('The "from" option must be a valid address.');
        }
        return from;
    }
    if (typeof defaultAddress === 'string' && defaultAddress.length > 0) return defaultAddress;
    throw new Error('A caller address is required. Set the "from" option or a default address on the TronWeb instance.');
}

interface ResolvedSigner {
    signerAddress: string;
    // The private key to sign with; undefined falls back to the instance default key.
    privateKey?: string;
}

// The branches that sign with the instance default key need a usable default key,
// not merely a default address (setAddress can set an address without a key). Reject
// up front with the friendly diagnostic instead of letting trx.sign fail cryptically.
function requireDefaultSigner(tronWeb: TronWeb, functionName: string): string {
    const defaultAddress = tronWeb.defaultAddress.base58;
    if (!tronWeb.defaultPrivateKey || !defaultAddress) {
        throw new Error(
            `Method "${functionName}" modifies state and requires a signer. Set a private key or default address on the TronWeb instance.`
        );
    }
    return defaultAddress;
}

function resolveSigner(tronWeb: TronWeb, functionName: string, account: string | undefined): ResolvedSigner {
    if (typeof account === 'string' && account.length > 0) {
        // `account` is a private key — derive its address and sign with it, so a write
        // can be issued from an account other than the instance default (and even when
        // the instance has no default signer at all).
        return { signerAddress: privateKeyToAddress(tronWeb, account), privateKey: account };
    }

    return { signerAddress: requireDefaultSigner(tronWeb, functionName) };
}

function extractConstantResultData(tronWeb: TronWeb, transaction: TransactionWrapper): string | undefined {
    const rawConstantResult = (transaction as unknown as { constant_result?: string | string[] }).constant_result;
    const constantResult = Array.isArray(rawConstantResult) ? rawConstantResult[0] : rawConstantResult;

    if (constantResult === undefined || constantResult === null || constantResult === '') return undefined;
    if (typeof constantResult !== 'string') {
        throw new Error('Invalid constant call result');
    }

    const normalized = constantResult.replace(/^0x/, '');
    const len = normalized.length;

    if (len !== 0 && len % 64 === 8) {
        let message = 'The call has been reverted or has thrown an error.';
        const chunk = normalized.substring(8);

        if (chunk.length > 0) {
            let decoded = '';
            for (let index = 0; index < chunk.length; index += 64) {
                decoded += tronWeb.toUtf8(chunk.substring(index, index + 64));
            }
            message += ` Error message: ${decoded
                .replace(/(\u0000|\u000b|\f)+/g, ' ')
                .replace(/ +/g, ' ')
                .replace(/\s+$/g, '')}`;
        }

        throw new Error(message);
    }

    return `0x${normalized}`;
}

function getReadContractFragment(abi: ContractAbiInterface, functionName: string, args: readonly unknown[] | undefined): FunctionFragment {
    const fragment = resolveFunctionFragment(abi, functionName, args);

    if (!isReadOnlyFunctionFragment(fragment)) {
        throw new Error(`Function "${functionName}" is not read-only.`);
    }

    return fragment;
}

function getWriteContractFragment(abi: ContractAbiInterface, functionName: string, args: readonly unknown[] | undefined): FunctionFragment {
    const fragment = resolveFunctionFragment(abi, functionName, args);

    if (isReadOnlyFunctionFragment(fragment)) {
        throw new Error(`Function "${functionName}" is read-only.`);
    }

    return fragment;
}

function normalizeReadContractOutput(fragment: FunctionFragment, data: string | undefined) {
    if (!data) {
        if (fragment.outputs && fragment.outputs.length > 0) {
            throw new Error('Failed to execute');
        }
        return undefined;
    }

    const output = decodeParamsV2ByABI(fragment, data) as any[];
    if (output.length === 1) {
        return output[0];
    }

    return output;
}

function getBroadcastErrorMessage(tronWeb: TronWeb, broadcast: Record<string, unknown>): string {
    if (typeof broadcast.message === 'string' && broadcast.message.length > 0) {
        return tronWeb.toUtf8(broadcast.message);
    }

    if (typeof broadcast.code === 'string' && broadcast.code.length > 0) {
        return broadcast.code;
    }

    return 'Failed to broadcast transaction';
}

function assertBroadcastOk(tronWeb: TronWeb, broadcast: unknown): void {
    if (broadcast && typeof broadcast === 'object') {
        const result = broadcast as { code?: unknown; result?: unknown };
        // `.code` covers normal TRON broadcast failures; `result === false` also covers a
        // failure shaped `{ result: false }` that carries no code.
        if (result.code || result.result === false) {
            throw new Error(getBroadcastErrorMessage(tronWeb, broadcast as Record<string, unknown>));
        }
    }
}

function assertArgCount(abi: ContractAbiInterface, functionName: string, args: readonly unknown[] | undefined): void {
    // Overload-aware: accept the call if its arg count matches ANY overload's
    // arity (the correct overload is then selected from the args downstream).
    const arities = overloadArities(abi, functionName);
    if (arities.length === 0) return;
    const actual = Array.isArray(args) ? args.length : 0;
    if (!arities.includes(actual)) {
        const expected = arities.join(' or ');
        throw new Error(`Contract function "${functionName}" expects ${expected} argument(s) but received ${actual}.`);
    }
}

function assertContractAddress(contract: Contract<any>): string {
    if (!contract.address) {
        throw new Error('Smart contract is missing address');
    }
    return contract.address;
}

// async so every failure — including argument-count and signer validation —
// surfaces as a rejection rather than a synchronous throw.
async function invokeRead(
    contract: Contract<any>,
    functionName: string,
    args: readonly unknown[],
    options: AnyReadOptions
): Promise<any> {
    assertArgCount(contract.abi, functionName, args);

    const address = assertContractAddress(contract);
    const tronWeb = contract.tronWeb;
    const fragment = getReadContractFragment(contract.abi, functionName, args);
    const { from, value } = options;

    const transaction = await tronWeb.transactionBuilder.triggerConstantContract(
        address,
        buildFunctionSelector(fragment),
        {
            feeLimit: tronWeb.feeLimit,
            ...(value !== undefined ? { callValue: resolveCallValue(value) } : {}),
            funcABIV2: fragment,
            parametersV2: [...args],
        },
        [],
        resolveCallerAddress(tronWeb, from, tronWeb.defaultAddress.base58 || undefined)
    );

    return normalizeReadContractOutput(fragment, extractConstantResultData(tronWeb, transaction));
}

// async so every failure — including argument-count and signer validation —
// surfaces as a rejection rather than a synchronous throw.
async function invokeWrite(
    contract: Contract<any>,
    functionName: string,
    args: readonly unknown[],
    options: AnyWriteOptions
): Promise<WriteContractReturnType> {
    const { signerAddress, privateKey } = resolveSigner(contract.tronWeb, functionName, options.account);
    assertArgCount(contract.abi, functionName, args);

    const address = assertContractAddress(contract);
    const tronWeb = contract.tronWeb;
    const fragment = getWriteContractFragment(contract.abi, functionName, args);
    const { value, feeLimit, tokenId, tokenValue, permissionId } = options;
    const callValue = resolveCallValue(value);

    const txWrapper = await tronWeb.transactionBuilder.triggerSmartContract(
        address,
        buildFunctionSelector(fragment),
        {
            feeLimit: feeLimit ?? tronWeb.feeLimit,
            ...(callValue !== undefined ? { callValue } : {}),
            ...(tokenId !== undefined ? { tokenId } : {}),
            ...(tokenValue !== undefined ? { tokenValue } : {}),
            ...(permissionId !== undefined ? { permissionId } : {}),
            funcABIV2: fragment,
            parametersV2: [...args],
        },
        [],
        signerAddress
    );

    if (!txWrapper.result?.result) {
        throw new Error('Failed to build transaction: ' + (txWrapper.result?.message ?? JSON.stringify(txWrapper)));
    }

    if (!txWrapper.transaction || !txWrapper.transaction.txID) {
        throw new Error('triggerSmartContract did not return a valid transaction object');
    }

    // `privateKey` is set when `account` was a private key; otherwise undefined falls
    // back to the instance default key (trx.sign's default parameter).
    const signed = await tronWeb.trx.sign(txWrapper.transaction, privateKey);
    const broadcast = await tronWeb.trx.sendRawTransaction(signed);
    assertBroadcastOk(tronWeb, broadcast);

    return signed.txID;
}

/**
 * Build the `contract.read` namespace: every `view`/`pure` (or legacy
 * `constant`) ABI function exposed as
 * `read.fn([args], { from, value })`, executed through
 * `triggerConstantContract` and resolved to the decoded result
 * (single outputs are collapsed to the bare value).
 */
export function buildReadNamespace<Abi extends ContractAbiInterface>(contract: Contract<Abi>): ContractReadNamespace<Abi> {
    const read: Record<string, ContractCallInterface> = Object.create(null);

    // `resolveName` is the function reference forwarded to `invokeRead`: the bare
    // name (overload, if any, resolved from the call's args) for the name key, or
    // the full signature for the selector key (pinning that exact overload).
    const makeReadMethod = (resolveName: string): ContractCallInterface =>
        (argsOrOptions?: readonly unknown[] | object, options?: object) => {
            const parameters = getFunctionParameters([argsOrOptions, options]);
            return invokeRead(contract, resolveName, parameters.args, parameters.options as AnyReadOptions);
        };

    for (const fragment of contract.abi) {
        if (fragment.type !== 'function' || !('name' in fragment)) continue;
        const functionFragment = fragment as FunctionFragment;
        if (!isReadOnlyFunctionFragment(functionFragment)) continue;

        const name = functionFragment.name;
        const selector = buildFunctionSelector(functionFragment);
        read[name] = makeReadMethod(name);
        // Full selector (e.g. "balanceOf(address)") routes through
        // resolveFunctionFragment's explicit-signature branch, pinning this exact
        // fragment — so same-arity overloads are addressable unambiguously.
        read[selector] = makeReadMethod(selector);
    }

    return read as ContractReadNamespace<Abi>;
}

/**
 * Build the `contract.write` namespace: every state-changing ABI function
 * exposed as `write.fn([args], { account, value, feeLimit, tokenId, tokenValue, permissionId })`,
 * built with `triggerSmartContract`, signed with the private key given as `account`
 * (or the instance's default private key when none is given), broadcast, and
 * resolved to the transaction ID.
 */
export function buildWriteNamespace<Abi extends ContractAbiInterface>(contract: Contract<Abi>): ContractWriteNamespace<Abi> {
    const write: Record<string, ContractCallInterface> = Object.create(null);

    // `resolveName` is the function reference forwarded to `invokeWrite`: the bare
    // name (overload, if any, resolved from the call's args) for the name key, or
    // the full signature for the selector key (pinning that exact overload).
    const makeWriteMethod = (resolveName: string): ContractCallInterface =>
        (argsOrOptions?: readonly unknown[] | object, options?: object) => {
            const parameters = getFunctionParameters([argsOrOptions, options]);
            return invokeWrite(contract, resolveName, parameters.args, parameters.options as AnyWriteOptions);
        };

    for (const fragment of contract.abi) {
        if (fragment.type !== 'function' || !('name' in fragment)) continue;
        const functionFragment = fragment as FunctionFragment;
        if (isReadOnlyFunctionFragment(functionFragment)) continue;

        const name = functionFragment.name;
        const selector = buildFunctionSelector(functionFragment);
        write[name] = makeWriteMethod(name);
        // Full selector (e.g. "transfer(address,uint256)") routes through
        // resolveFunctionFragment's explicit-signature branch, pinning this exact
        // fragment — so same-arity overloads are addressable unambiguously.
        write[selector] = makeWriteMethod(selector);
    }

    return write as ContractWriteNamespace<Abi>;
}
