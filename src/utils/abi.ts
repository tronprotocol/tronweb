import { AbiCoder } from '@ethersproject/abi';
import TronWeb from '../index.js';
import { ADDRESS_PREFIX, ADDRESS_PREFIX_REGEX } from './address.js';

const abiCoder = new AbiCoder();

function _isArray(_array: any) {
    return Array.isArray(_array);
}

function _addressToHex(value: string) {
    return TronWeb.address.toHex(value).replace(ADDRESS_PREFIX_REGEX, '0x');
}

function deepCopy(target: any) {
    if (
        Object.prototype.toString.call(target) !== '[object Object]' &&
        Object.prototype.toString.call(target) !== '[object Array]'
    ) {
        return target;
    }
    const newTarget = _isArray(target) ? [] : {};

    Object.keys(target).forEach(
        (key) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            (newTarget[key] = target[key] instanceof Object && !target[key]._isBigNumber ? deepCopy(target[key]) : target[key])
    );

    return newTarget;
}

export function decodeParams(names: string[], types: string[], output: string, ignoreMethodHash: boolean = false) {
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
        names.length ? {} : []
    );
}

export function encodeParams(types: string[], values: any[]) {
    for (let i = 0; i < types.length; i++) {
        if (types[i] === 'address') {
            values[i] = TronWeb.address.toHex(values[i]).replace(ADDRESS_PREFIX_REGEX, '0x');
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

export interface ABI {
    entrys?: ABIType[];
}

export type ParamType = {
    readonly name: string;
    readonly type: string;
    readonly baseType: string;
    readonly internalType?: string;
    readonly indexed: null | boolean;
    readonly components: null | ReadonlyArray<ParamType>;
};

export type ABIType = {
    readonly name?: string;
    readonly inputs?: ReadonlyArray<ParamType>;
    readonly outputs?: ReadonlyArray<ParamType>;
    readonly stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
    readonly type: 'function' | 'constructor' | 'fallback' | 'function' | 'event' | 'error';
};

export function encodeParamsV2ByABI(funABI: ABIType, args: any[]) {
    const types: string[] = [];

    const buildFullTypeDefinition = (typeDef: ParamType): string => {
        if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
            const innerTypes = typeDef.components.map((innerType: ParamType) => {
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

    const mapTuple = (components: ReadonlyArray<ParamType>, args: any[], dimension: number) => {
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

    const encodeArgs = (inputs: ReadonlyArray<ParamType> = [], args: any[]) => {
        if (inputs.length)
            inputs.forEach((input: ParamType, i: number) => {
                const type = input.type;

                if (args[i])
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

export function decodeParamsV2ByABI(funABI: ABIType, data: string | Uint8Array) {
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
            return TronWeb.address.toHex(addrArr);
        }
    };

    const mapTuple = (components: ReadonlyArray<ParamType>, args: string[] | string[][], dimension: number) => {
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

    const buildFullTypeNameDefinition = (typeDef: ParamType): string => {
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

    const decodeResult = (outputs: ReadonlyArray<ParamType>, result: any[]) => {
        if (outputs.length)
            outputs.forEach((output, i) => {
                const { type, name } = output;

                if (result[i])
                    if (type === 'address') {
                        result[i] = TronWeb.address.toHex(result[i]);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        if (name) result[name] = TronWeb.address.toHex(result[name]);
                    } else if (type.match(/^([^\x5b]*)(\x5b|$)/)![0] === 'address[') {
                        convertAddresses(result[i]);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        if (name) convertAddresses(result[name]);
                    } else if (type.indexOf('tuple') === 0) {
                        if (extractSize(type)) {
                            const dimension = extractArrayDim(type);
                            mapTuple(output.components!, result[i], dimension);
                        } else decodeResult(output.components!, result[i]);

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        if (name) result[name] = result[i];
                    }
            });
    };

    // Only decode if there supposed to be fields
    if (funABI.outputs && funABI.outputs.length > 0) {
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
        const decodeResCopy = deepCopy(decodeRes);
        decodeResult(funABI.outputs, decodeResCopy);

        return decodeResCopy;
    }
    return [];
}
