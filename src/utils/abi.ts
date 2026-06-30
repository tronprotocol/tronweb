import { AbiCoder } from './ethersUtils.js';
import { FunctionFragment as EthersFunctionFragment } from './fragments.js';
import { ADDRESS_PREFIX, ADDRESS_PREFIX_REGEX } from './constants.js';
import { toHex } from './address.js';
import { FunctionFragment, AbiParamsCommon, GetOutputsType, ContractAbiInterface } from '../types/ABI.js';

const abiCoder = new AbiCoder();

function _addressToHex(value: string) {
    return toHex(value).replace(ADDRESS_PREFIX_REGEX, '0x');
}

export function decodeParams(names: string[], types: string[], output: string, ignoreMethodHash = false) {
    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8) output = '0x' + output.replace(/^0x/, '').substring(8);

    if (output.replace(/^0x/, '').length % 64) {
        throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');
    }

    // workaround for unsupported trcToken type
    types = types.map((type) => {
        if (/trcToken/.test(type)) {
            type = type.replace(/trcToken/, 'uint256');
        }
        return type;
    });

    return abiCoder.decode(types, output).reduce(
        (obj, arg, index) => {
            if (types[index] == 'address') {
                arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
            }

            if (names.length) {
                obj[names[index]] = arg;
            } else {
                obj.push(arg);
            }

            return obj;
        },
        names.length ? Object.create(null) : []
    );
}

export function encodeParams(types: string[], values: any[]) {
    for (let i = 0; i < types.length; i++) {
        if (types[i] === 'address') {
            values[i] = _addressToHex(values[i]);
        }
    }

    return abiCoder.encode(types, values);
}

function extractSize(type: string) {
    const size = type.match(/([a-zA-Z0-9])(\[.*\])/);
    return size ? size[2] : '';
}

function extractArrayDim(type: string) {
    const size = extractSize(type);
    return (size.match(/\]\[/g) || []).length + 1;
}

export function encodeParamsV2ByABI(funABI: FunctionFragment, args: any[]) {
    const types: string[] = [];

    const buildFullTypeDefinition = (typeDef: AbiParamsCommon): string => {
        if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
            const innerTypes = typeDef.components.map((innerType: AbiParamsCommon) => {
                return buildFullTypeDefinition(innerType);
            });
            return `tuple(${innerTypes.join(',')})${extractSize(typeDef.type)}`;
        }

        if (/trcToken/.test(typeDef.type)) return typeDef.type.replace(/trcToken/, 'uint256');

        return typeDef.type;
    };

    const convertTypes = (types: string[]) => {
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            if (/trcToken/.test(type)) types[i] = type.replace(/trcToken/, 'uint256');
        }
    };

    const convertAddresses = (addrArr: string | string[]) => {
        if (Array.isArray(addrArr)) {
            addrArr.forEach((addrs, i) => {
                addrArr[i] = convertAddresses(addrs) as string;
            });
            return addrArr;
        } else {
            return _addressToHex(addrArr);
        }
    };

    const mapTuple = (components: ReadonlyArray<FunctionFragment>, args: any[], dimension: number) => {
        if (dimension > 1) {
            if (args.length) {
                args.forEach((arg) => {
                    mapTuple(components, arg, dimension - 1);
                });
            }
        } else {
            if (args.length && dimension) {
                args.forEach((arg) => {
                    encodeArgs(components, arg);
                });
            }
        }
    };

    const encodeArgs = (inputs: ReadonlyArray<AbiParamsCommon> = [], args: any[]) => {
        if (inputs.length)
            inputs.forEach((input: AbiParamsCommon, i: number) => {
                const type = input.type;

                if (args[i] !== undefined && args[i] !== null)
                    if (type === 'address') args[i] = _addressToHex(args[i]);
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)![0] === 'address[') convertAddresses(args[i]);
                    else if (type.indexOf('tuple') === 0)
                        if (extractSize(type)) {
                            const dimension = extractArrayDim(type);
                            mapTuple(input.components!, args[i], dimension);
                        } else encodeArgs(input.components!, args[i]);
            });
    };

    if (funABI.inputs && funABI.inputs.length) {
        for (let i = 0; i < funABI.inputs.length; i++) {
            const type = funABI.inputs[i].type;
            // "false" will be converting to `false` and "true" will be working
            // fine as abiCoder assume anything in quotes as `true`
            if (type === 'bool' && args[i] === 'false') {
                args[i] = false;
            }
            types.push(type.indexOf('tuple') === 0 ? buildFullTypeDefinition(funABI.inputs[i]) : type);
            if (args.length < types.length) {
                args.push('');
            }
        }
    }

    encodeArgs(funABI.inputs, args);
    convertTypes(types);

    return abiCoder.encode(types, args);
}

export function decodeParamsV2ByABI<T extends FunctionFragment>(funABI: T, data: string | Uint8Array) {
    const convertTypeNames = (types: string[]) => {
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            if (/^trcToken/.test(type)) types[i] = type.replace(/^trcToken/, 'uint256');
        }
    };

    const convertAddresses = (addrArr: string | string[]) => {
        if (Array.isArray(addrArr)) {
            addrArr.forEach((addrs, i) => {
                addrArr[i] = convertAddresses(addrs) as string;
            });
            return addrArr;
        } else {
            return toHex(addrArr);
        }
    };

    const mapTuple = (components: ReadonlyArray<AbiParamsCommon>, args: string[] | string[][], dimension: number) => {
        if (dimension > 1) {
            if (args.length) {
                args.forEach((arg) => {
                    mapTuple(components, arg as string[], dimension - 1);
                });
            }
        } else {
            if (args.length && dimension) {
                args.forEach((arg) => {
                    decodeResult(components, arg as string[]);
                });
            }
        }
    };

    const buildFullTypeNameDefinition = (typeDef: AbiParamsCommon): string => {
        const name = typeDef.name ? ` ${typeDef.name}` : '';
        if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
            const innerTypes = typeDef.components.map((innerType) => {
                return buildFullTypeNameDefinition(innerType);
            });
            return `tuple(${innerTypes.join(',')})${extractSize(typeDef.type)}${name}`;
        }
        if (/trcToken/.test(typeDef.type)) return typeDef.type.replace(/trcToken/, 'uint256') + name;

        return typeDef.type + name;
    };

    const setResultProp = (result: any[], name?: string, value?: any) => {
        if (name && name !== 'length' && !(name in Object.prototype) && !(name in Array.prototype)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result[name] = value;
        }
    };

    const decodeResult = (outputs: ReadonlyArray<AbiParamsCommon>, result: any[]) => {
        if (outputs.length)
            outputs.forEach((output, i) => {
                const { type, name } = output;

                if (result[i]) {
                    if (type === 'address') {
                        result[i] = toHex(result[i]);
                        setResultProp(result, name, toHex(result[i]));
                    } else if (type.match(/^([^\x5b]*)(\x5b|$)/)![0] === 'address[') {
                        convertAddresses(result[i]);
                        setResultProp(result, name, convertAddresses(result[i]));
                    } else if (type.indexOf('tuple') === 0) {
                        if (extractSize(type)) {
                            const dimension = extractArrayDim(type);
                            mapTuple(output.components!, result[i], dimension);
                        } else decodeResult(output.components!, result[i]);

                        setResultProp(result, name, result[i]);
                    } else {
                        setResultProp(result, name, result[i]);
                    }
                } else {
                    setResultProp(result, name, result[i]);
                }
            });
    };

    // Only decode if there supposed to be fields
    if ('outputs' in funABI && funABI.outputs && funABI.outputs.length > 0) {
        const outputTypes: any[] = [];
        for (let i = 0; i < funABI.outputs.length; i++) {
            const type = funABI.outputs[i].type;
            const name = funABI.outputs[i].name ? ` ${funABI.outputs[i].name}` : '';
            outputTypes.push(type.indexOf('tuple') === 0 ? buildFullTypeNameDefinition(funABI.outputs[i]) : type + name);
        }
        convertTypeNames(outputTypes);

        if (!data || !data.length) data = new Uint8Array(32 * funABI.outputs.length); // ensuring the data is at least filled by 0 cause `AbiCoder` throws if there's not engouh data
        // decode data
        const decodeRes = abiCoder.decode(outputTypes, data);
        const decodeResCopy = decodeRes.toArray(true);
        decodeResult(funABI.outputs, decodeResCopy);

        return decodeResCopy as GetOutputsType<T['outputs']>;
    }
    return [] as GetOutputsType<T['outputs']>;
}

export function encodeFunctionData(funcABI: FunctionFragment, args: any[] = []): string {
    if (!funcABI || String(funcABI.type).toLowerCase() !== 'function' || !funcABI.name) {
        throw new Error('Invalid function ABI fragment provided: only "function" type fragments with a name are supported');
    }
    const inputsLength = funcABI.inputs ? funcABI.inputs.length : 0;
    if (args.length !== inputsLength) {
        throw new Error(`Invalid arguments provided: expected ${inputsLength} arguments, got ${args.length}`);
    }
    // The selector keeps trcToken in the signature (TVM convention), while parameter
    // encoding treats trcToken as uint256 and converts addresses inside args in place
    // (same behavior as encodeParamsV2ByABI)
    const selector = EthersFunctionFragment.from(funcABI).selector.replace(/^0x/, '');
    return selector + encodeParamsV2ByABI(funcABI, args).replace(/^0x/, '');
}

// Canonicalize the implicit-width integer aliases: bare `uint`/`int` mean
// `uint256`/`int256` (including their array forms, e.g. `uint[]` -> `uint256[]`).
// Width-qualified types (`uint8`, `int128`, …) are left untouched. This matches
// ethers' `format('sighash')` so the signature hashes to the same 4-byte selector.
function canonicalizeIntType(type: string): string {
    return type.replace(/^(u?int)(\[|$)/, '$1256$2');
}

export function buildFullTypeDefinition(typeDef: AbiParamsCommon): string {
    if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
        const innerTypes = typeDef.components.map((innerType: AbiParamsCommon) => {
            return buildFullTypeDefinition(innerType);
        });
        return `(${innerTypes.join(',')})${extractSize(typeDef.type)}`;
    }

    return canonicalizeIntType(typeDef.type);
}

export function buildFunctionSelector(fragment: FunctionFragment): string {
    const inputs = fragment.inputs ?? [];
    return `${fragment.name}(${inputs.map((input) => buildFullTypeDefinition(input)).join(',')})`;
}

/** All function fragments in `abi` that share `functionName`. */
function functionsNamed(abi: ContractAbiInterface, functionName: string): FunctionFragment[] {
    return abi.filter(
        (item): item is FunctionFragment => item.type === 'function' && 'name' in item && item.name === functionName
    );
}

/**
 * Lenient, TRON-aware runtime type check, used only to disambiguate overloads
 * that share the same arity. Errs towards acceptance (TRON addresses are
 * base58/hex strings, not 0x EVM addresses, and numeric args may arrive as a
 * number, bigint, or decimal string).
 */
function isArgOfType(arg: unknown, input: AbiParamsCommon): boolean {
    const type = input.type;
    if (type === 'bool') return typeof arg === 'boolean';
    if (type === 'string') return typeof arg === 'string';
    if (type === 'address') return typeof arg === 'string';
    if (/^(u?int\d*|trcToken)$/.test(type)) {
        return typeof arg === 'number' || typeof arg === 'bigint' || (typeof arg === 'string' && /^\d+$/.test(arg));
    }
    if (/^bytes\d*$/.test(type)) return typeof arg === 'string' || arg instanceof Uint8Array;

    // Arrays (value or tuple, possibly multi-dimensional): the outermost
    // (rightmost) dimension fixes the length for `T[N]` while `T[]` accepts any
    // length; every element is matched recursively against the element type.
    // This lets equal-arity array overloads be told apart by length, by the
    // dynamic/fixed distinction, and by element type.
    if (type.endsWith(']')) {
        if (!Array.isArray(arg)) return false;
        const match = type.match(/^(.*)\[(\d*)\]$/);
        if (!match) return true; // malformed suffix → stay lenient
        const [, elementType, fixedLength] = match;
        if (fixedLength !== '' && arg.length !== Number(fixedLength)) return false;
        const element: AbiParamsCommon = { ...input, type: elementType };
        return arg.every((item) => isArgOfType(item, element));
    }

    // Tuples (structs): match the component shape so that struct overloads of
    // equal arity can be told apart (different field count, or fields of
    // distinguishable types).
    if (type.indexOf('tuple') === 0) return isTupleArgOfShape(arg, input.components);

    return true; // unknown type → accept
}

/** Whether `arg` (object or positional array) matches a tuple's component shape. */
function isTupleArgOfShape(arg: unknown, components: ReadonlyArray<AbiParamsCommon> | undefined): boolean {
    if (typeof arg !== 'object' || arg === null) return false;
    // No component metadata → keep the lenient default (accept any object).
    if (!components || components.length === 0) return true;

    if (Array.isArray(arg)) {
        return arg.length === components.length && components.every((component, i) => isArgOfType(arg[i], component));
    }

    // Object form: every named component must be present and match.
    const record = arg as Record<string, unknown>;
    return components.every((component) => component.name in record && isArgOfType(record[component.name], component));
}

/** Distinct input-arities of the named overloads, ascending — for arg-count errors. */
export function overloadArities(abi: ContractAbiInterface, functionName: string): number[] {
    return [...new Set(functionsNamed(abi, functionName).map((f) => f.inputs?.length ?? 0))].sort((a, b) => a - b);
}

/**
 * Resolve the ABI fragment for a (possibly overloaded) function call, using the
 * supplied args (arity, then runtime types) to pick the correct overload.
 * A non-overloaded name resolves to its single fragment regardless of args; the
 * full signature (e.g. `"transfer(address,uint256)"`) may be passed as
 * `functionName` to select an overload explicitly.
 *
 * Used only by the contract read/write namespaces; the legacy Contract/Method
 * layer keeps its own selector/signature-keyed resolution.
 */
export function resolveFunctionFragment(
    abi: ContractAbiInterface,
    functionName: string,
    args: readonly unknown[] | undefined
): FunctionFragment {
    // Explicit disambiguation by full signature, e.g. "transfer(address,uint256)".
    if (functionName.indexOf('(') !== -1) {
        const allFunctions = abi.filter(
            (item): item is FunctionFragment => item.type === 'function' && 'name' in item
        );
        const bySignature = allFunctions.find((fragment) => buildFunctionSelector(fragment) === functionName);
        if (bySignature) return bySignature;
    }

    const candidates = functionsNamed(abi, functionName);
    if (candidates.length === 0) {
        throw new Error(`ABI fragment not found for function "${functionName}".`);
    }
    if (candidates.length === 1) return candidates[0];

    // Overloaded — pick by argument arity first.
    const argList = Array.isArray(args) ? args : [];
    const byArity = candidates.filter((fragment) => (fragment.inputs?.length ?? 0) === argList.length);
    if (byArity.length === 1) return byArity[0];
    if (byArity.length === 0) {
        const expected = overloadArities(abi, functionName).join(' or ');
        throw new Error(
            `Contract function "${functionName}" expects ${expected} argument(s) but received ${argList.length}.`
        );
    }

    // Same arity — disambiguate by runtime argument types.
    const byType = byArity.filter((fragment) =>
        (fragment.inputs ?? []).every((input, index) => isArgOfType(argList[index], input))
    );
    if (byType.length === 1) return byType[0];

    const signature = buildFunctionSelector(byArity[0]);
    throw new Error(
        `Ambiguous overloaded function "${functionName}" for the given arguments; ` +
            `pass the full signature (e.g. "${signature}") as functionName to disambiguate.`
    );
}

export function isReadOnlyFunctionFragment(fragment: FunctionFragment): boolean {
    const stateMutability = (fragment.stateMutability ?? '').toLowerCase();
    return stateMutability === 'view' || stateMutability === 'pure' || fragment.constant === true;
}
