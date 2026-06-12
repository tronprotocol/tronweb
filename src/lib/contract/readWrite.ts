import type { TronWeb } from '../../tronweb.js';
import type { Contract } from './index.js';
import type { ContractAbiInterface, FunctionFragment, GetOutputsType, GetParamsType, IsConstAbi } from '../../types/ABI.js';
import type { TransactionWrapper } from '../../types/Transaction.js';
import {
    buildFunctionSelector,
    decodeParamsV2ByABI,
    isReadOnlyFunctionFragment,
    overloadArities,
    resolveFunctionFragment,
} from '../../utils/abi.js';
import { ADDRESS_PREFIX } from '../../utils/constants.js';

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

export type ReadContractFunctionName<Abi extends ContractAbiInterface> = Abi[number] extends infer Fragment
    ? Fragment extends FunctionFragment
        ? IsReadOnlyFunction<Fragment> extends true
            ? Fragment['name']
            : never
        : never
    : never;

export type WriteContractFunctionName<Abi extends ContractAbiInterface> = Abi[number] extends infer Fragment
    ? Fragment extends FunctionFragment
        ? IsWriteFunction<Fragment> extends true
            ? Fragment['name']
            : never
        : never
    : never;

type ReadContractFragment<
    Abi extends ContractAbiInterface,
    FunctionName extends ReadContractFunctionName<Abi>,
> = Extract<Abi[number], { type: 'function'; name: FunctionName }> extends infer Fragment
    ? Fragment extends FunctionFragment
        ? Fragment
        : never
    : never;

type ReadContractInputs<
    Abi extends ContractAbiInterface,
    FunctionName extends ReadContractFunctionName<Abi>,
> = ReadContractFragment<Abi, FunctionName> extends FunctionFragment
    ? ReadContractFragment<Abi, FunctionName>['inputs']
    : undefined;

type ReadContractOutputs<
    Abi extends ContractAbiInterface,
    FunctionName extends ReadContractFunctionName<Abi>,
> = ReadContractFragment<Abi, FunctionName> extends FunctionFragment
    ? ReadContractFragment<Abi, FunctionName>['outputs']
    : undefined;

type WriteContractFragment<
    Abi extends ContractAbiInterface,
    FunctionName extends WriteContractFunctionName<Abi>,
> = Extract<Abi[number], { type: 'function'; name: FunctionName }> extends infer Fragment
    ? Fragment extends FunctionFragment
        ? Fragment
        : never
    : never;

type WriteContractInputs<
    Abi extends ContractAbiInterface,
    FunctionName extends WriteContractFunctionName<Abi>,
> = WriteContractFragment<Abi, FunctionName> extends FunctionFragment
    ? WriteContractFragment<Abi, FunctionName>['inputs']
    : undefined;

export type CollapseSingleItemTuple<Value> = Value extends readonly [infer Only] ? Only : Value;

type IsNever<T> = [T] extends [never] ? true : false;

type ChangeNeverToString<T> = IsNever<T> extends true ? string : T;

export type ReadContractParameters<
    Abi extends ContractAbiInterface = ContractAbiInterface,
    FunctionName extends ReadContractFunctionName<Abi> = ReadContractFunctionName<Abi>,
> = {
    readonly functionName: ChangeNeverToString<FunctionName>;
    readonly args?: IsConstAbi<Abi> extends true ? GetParamsType<ReadContractInputs<Abi, FunctionName>> : any[];
    readonly account?: string;
    readonly value?: number | bigint;
};

export type ReadContractReturnType<
    Abi extends ContractAbiInterface = ContractAbiInterface,
    FunctionName extends ReadContractFunctionName<Abi> = ReadContractFunctionName<Abi>,
> = IsConstAbi<Abi> extends true ? CollapseSingleItemTuple<GetOutputsType<ReadContractOutputs<Abi, FunctionName>>> : any;

export type WriteContractParameters<
    Abi extends ContractAbiInterface = ContractAbiInterface,
    FunctionName extends WriteContractFunctionName<Abi> = WriteContractFunctionName<Abi>,
> = {
    readonly functionName: ChangeNeverToString<FunctionName>;
    readonly args?: IsConstAbi<Abi> extends true ? GetParamsType<WriteContractInputs<Abi, FunctionName>> : any[];
    readonly account?: string;
    readonly value?: number | bigint;
    readonly feeLimit?: number;
    readonly tokenId?: string;
    readonly tokenValue?: number;
    readonly permissionId?: number;
};

export type WriteContractReturnType = string;

export type ReadOptions<
    Abi extends ContractAbiInterface,
    FunctionName extends ReadContractFunctionName<Abi>,
> = Omit<ReadContractParameters<Abi, FunctionName>, 'functionName' | 'args'>;

export type WriteOptions<
    Abi extends ContractAbiInterface,
    FunctionName extends WriteContractFunctionName<Abi>,
> = Omit<WriteContractParameters<Abi, FunctionName>, 'functionName' | 'args'>;

type ContractCallInterface = (...args: any[]) => Promise<any>;

export type ContractReadNamespace<Abi extends ContractAbiInterface> = IsConstAbi<Abi> extends true
    ? {
        [K in ReadContractFunctionName<Abi>]: (
            argsOrOptions?: ReadContractParameters<Abi, K>['args'] | ReadOptions<Abi, K>,
            options?: ReadOptions<Abi, K>
        ) => Promise<ReadContractReturnType<Abi, K>>;
    }
    : Record<string, ContractCallInterface>;

export type ContractWriteNamespace<Abi extends ContractAbiInterface> = IsConstAbi<Abi> extends true
    ? {
        [K in WriteContractFunctionName<Abi>]: (
            argsOrOptions?: WriteContractParameters<Abi, K>['args'] | WriteOptions<Abi, K>,
            options?: WriteOptions<Abi, K>
        ) => Promise<WriteContractReturnType>;
    }
    : Record<string, ContractCallInterface>;

// ─── Runtime ─────────────────────────────────────────────────────────────────

// Runtime-level shapes of ReadOptions/WriteOptions, usable with any ABI.
interface AnyReadOptions {
    readonly account?: string;
    readonly value?: number | bigint;
}

interface AnyWriteOptions extends AnyReadOptions {
    readonly feeLimit?: number;
    readonly tokenId?: string;
    readonly tokenValue?: number;
    readonly permissionId?: number;
}

const NULL_CALLER_ADDRESS = `${ADDRESS_PREFIX}${'0'.repeat(40)}`;

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

function resolveCallerAddress(account: string | undefined, defaultAddress?: string): string {
    if (typeof account === 'string' && account.length > 0) return account;
    if (typeof defaultAddress === 'string' && defaultAddress.length > 0) return defaultAddress;
    return NULL_CALLER_ADDRESS;
}

function resolveSignerAddress(tronWeb: TronWeb, functionName: string, accountOverride: string | undefined): string {
    const defaultAddress = tronWeb.defaultAddress.base58;
    if (!defaultAddress) {
        throw new Error(
            `Method "${functionName}" modifies state and requires a signer. Set a private key or default address on the TronWeb instance.`
        );
    }
    if (accountOverride === undefined) return defaultAddress;
    if (tronWeb.address.toHex(accountOverride).toLowerCase() !== tronWeb.address.toHex(defaultAddress).toLowerCase()) {
        throw new Error('Write account override must match the TronWeb default address.');
    }
    return accountOverride;
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
    const { account, value } = options;

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
        resolveCallerAddress(account, tronWeb.defaultAddress.base58 || undefined)
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
    const signerAddress = resolveSignerAddress(contract.tronWeb, functionName, options.account);
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

    const signed = await tronWeb.trx.sign(txWrapper.transaction);
    const broadcast = await tronWeb.trx.sendRawTransaction(signed);
    assertBroadcastOk(tronWeb, broadcast);

    return signed.txID;
}

/**
 * Build the `contract.read` namespace: every `view`/`pure` (or legacy
 * `constant`) ABI function exposed as
 * `read.fn([args], { account, value })`, executed through
 * `triggerConstantContract` and resolved to the decoded result
 * (single outputs are collapsed to the bare value).
 */
export function buildReadNamespace<Abi extends ContractAbiInterface>(contract: Contract<Abi>): ContractReadNamespace<Abi> {
    const read: Record<string, ContractCallInterface> = Object.create(null);

    for (const fragment of contract.abi) {
        if (fragment.type !== 'function' || !('name' in fragment)) continue;
        const functionFragment = fragment as FunctionFragment;
        if (!isReadOnlyFunctionFragment(functionFragment)) continue;

        const name = functionFragment.name;
        read[name] = (argsOrOptions?: readonly unknown[] | object, options?: object) => {
            const parameters = getFunctionParameters([argsOrOptions, options]);
            return invokeRead(contract, name, parameters.args, parameters.options as AnyReadOptions);
        };
    }

    return read as ContractReadNamespace<Abi>;
}

/**
 * Build the `contract.write` namespace: every state-changing ABI function
 * exposed as `write.fn([args], { account, value, feeLimit, tokenId, tokenValue, permissionId })`,
 * built with `triggerSmartContract`, signed with the instance's default
 * private key, broadcast, and resolved to the transaction ID.
 */
export function buildWriteNamespace<Abi extends ContractAbiInterface>(contract: Contract<Abi>): ContractWriteNamespace<Abi> {
    const write: Record<string, ContractCallInterface> = Object.create(null);

    for (const fragment of contract.abi) {
        if (fragment.type !== 'function' || !('name' in fragment)) continue;
        const functionFragment = fragment as FunctionFragment;
        if (isReadOnlyFunctionFragment(functionFragment)) continue;

        const name = functionFragment.name;
        write[name] = (argsOrOptions?: readonly unknown[] | object, options?: object) => {
            const parameters = getFunctionParameters([argsOrOptions, options]);
            return invokeWrite(contract, name, parameters.args, parameters.options as AnyWriteOptions);
        };
    }

    return write as ContractWriteNamespace<Abi>;
}
