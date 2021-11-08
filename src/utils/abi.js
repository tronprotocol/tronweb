import {AbiCoder} from './ethersUtils';
import TronWeb from 'index';
import {ADDRESS_PREFIX, ADDRESS_PREFIX_REGEX} from 'utils/address';

const abiCoder = new AbiCoder();

function _isArray(_array) {
    return Array.isArray(_array);
}

function _isString(_string) {
    return (
        typeof _string === "string" ||
        (_string &&
            _string.constructor &&
            _string.constructor.name === "String")
    );
}

function _addressToHex(value) {
    return TronWeb.address.toHex(value).replace(ADDRESS_PREFIX_REGEX, '0x');
}


function deepCopy(target) {
    if (
        Object.prototype.toString.call(target) !== '[object Object]' &&
        Object.prototype.toString.call(target) !== '[object Array]'
    ) {
        return target;
    }
    const newTarget = _isArray(target) ? [] : {};

    Object.keys(target).forEach(key =>
        newTarget[key] = target[key] instanceof Object ? deepCopy(target[key]) : target[key]
    );

    return newTarget;
}

export function decodeParams(names, types, output, ignoreMethodHash) {
    if (!output || typeof output === 'boolean') {
        ignoreMethodHash = output;
        output = types;
        types = names;
        names = [];
    }

    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
        output = '0x' + output.replace(/^0x/, '').substring(8);

    if (output.replace(/^0x/, '').length % 64)
        throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');

    // workaround for unsupported trcToken type
    types = types.map(type => {
        if (/trcToken/.test(type)) {
            type = type.replace(/trcToken/, 'uint256')
        }
        return type
    })

    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
        if (types[index] == 'address')
            arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();

        if (names.length)
            obj[names[index]] = arg;
        else obj.push(arg);

        return obj;
    }, names.length ? {} : []);
}

export function encodeParams(types, values) {

    for (let i = 0; i < types.length; i++) {
        if (types[i] === 'address') {
            values[i] = TronWeb.address.toHex(values[i]).replace(ADDRESS_PREFIX_REGEX, '0x');
        }
    }

    return abiCoder.encode(types, values);
}

export function encodeParamsV2(parameters) {
    const formatParams = (_params) => {
        const types = [];
        const values = [];
        const getBaseType = (type) => {
            if (!type || !_isString(type) || !type.length)
                throw new Error("Invalid parameter type provided: " + type);

            return type.match(/^([^\x5b]*)(\x5b|$)/)[0];
        }

        const getTypes = (_obj) => {
            if (_isArray(_obj)) {
                return _obj.map(function (_) {
                  return getTypes(_);
                });
            }

            let { type, value } = _obj;
            const baseType = getBaseType(type);
            switch (baseType) {
                case "trcToken":
                case "trcToken[":
                    type = type.replace(/trcToken/, "uint256");
                    break;
                case "tuple":
                    type = `tuple(${getTypes(value).join(",")})`;
                    break;
                case "tuple[":
                    type = `tuple(${getTypes(value[0]).join(
                        ","
                    )})${type.replace(/tuple/, "")}`;
                    break;
                default:
                    break;
            }

            return type;
        }

        const getValues = (_obj) => {
            if (_isArray(_obj)) {
                return _obj.map(function (_) {
                    return getValues(_);
                });
            }

            const getHexAddress = (_addr) => {
                if (_isArray(_addr)) {
                    return _addr.map((_) => {
                        return getHexAddress(_);
                    });
                }

                return TronWeb.address.toHex(_addr).replace(ADDRESS_PREFIX_REGEX, "0x");
            }

            const getTupleValue = (_value) => {
                if (_isArray(_value)) {
                    return _value.map((_) => {
                        return getTupleValue(_);
                    });
                }

                return getValues(_value);
            }

            let { type, value } = _obj;

            const baseType = getBaseType(type);
            switch (baseType) {
                case "address":
                case "address[":
                    value = getHexAddress(value);
                    break;
                case "tuple":
                case "tuple[":
                    value = getTupleValue(value);
                    break;
                default:
                    break;
            }

            return value;
        }

        _params.forEach((_) => {
            types.push(getTypes(_));
            values.push(getValues(_));
        });

        return { types, values };
    }

    const { types, values } = formatParams(parameters);
    console.log(JSON.stringify(types), JSON.stringify(values), abiCoder.encode(types, values).replace(/^(0x)/, ""),'result')
    return abiCoder.encode(types, values).replace(/^(0x)/, "");
}

export function extractSize (type) {
  const size = type.match(/([a-zA-Z0-9])(\[.*\])/);
  return size ? size[2] : '';
}

export function encodeParamsV2ByABI(funABI, args) {
    const types = [];

    const buildFullTypeDefinition = (typeDef) => {
      if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
        const innerTypes = typeDef.components.map((innerType) => { return buildFullTypeDefinition(innerType) });
        return `tuple(${innerTypes.join(',')})${extractSize(typeDef.type)}`;
      }

      if (/trcToken/.test(typeDef.type))
        return typeDef.type.replace(/trcToken/, 'uint256');

      return typeDef.type;
    }

    const convertTypes = (types) => {
      for (let i = 0; i < types.length; i++) {
        const type = types[i];
        if (/trcToken/.test(type))
          types[i] = type.replace(/trcToken/, 'uint256');
      }
    }

    const encodeArgs = (inputs = [], args) => {
      if (inputs.length)
        inputs.forEach((input, i) => {
          const type = input.type;

          if (args[i])
            if (type === 'address') args[i] = _addressToHex(args[i]);
            else if (type.match(/^([^\x5b]*)(\x5b|$)/)[0] === 'address[')
              args[i] = args[i].map(v => _addressToHex(v));
            else if (type.indexOf('tuple') === 0)
              if (extractSize(type)) {
                if (args[i].length)
                  args[i].forEach(arg => {
                    encodeArgs(input.components, arg);
                  });
              } else encodeArgs(input.components, args[i]);
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


export function decodeParamsV2ByABI(funABI, data) {
  const convertTypeNames = (types) => {
    for (let i = 0; i < types.length; i++) {
      const type = types[i]
      if (/^trcToken/.test(type))
        types[i] = type.replace(/^trcToken/, 'uint256')
    }
  }

  const buildFullTypeNameDefinition = (typeDef) => {
    if (typeDef && typeDef.type.indexOf('tuple') === 0 && typeDef.components) {
      const innerTypes = typeDef.components.map((innerType) => { return buildFullTypeNameDefinition(innerType) });
      return `tuple(${innerTypes.join(',')})${extractSize(typeDef.type)}`;
    }
    const name = typeDef.name ? ` ${typeDef.name}` : '';
    if (/trcToken/.test(typeDef.type))
      return typeDef.type.replace(/trcToken/, 'uint256') + name;

    return typeDef.type + name;
  }

  const decodeResult = (outputs = [], result) => {
    if (outputs.length)
      outputs.forEach((output, i) => {
        const {type, name} = output;

        if (result[i])
          if (type === 'address') {
            result[i] = TronWeb.address.toHex(result[i]);
            if(name) result[name] = TronWeb.address.toHex(result[name]);
          }
          else if (type.match(/^([^\x5b]*)(\x5b|$)/)[0] === 'address[') {
            result[i] = result[i].map(v => TronWeb.address.toHex(v));
            if(name) result[name] = result[name].map(v => TronWeb.address.toHex(v));
          }
          else if (type.indexOf('tuple') === 0)
            if (extractSize(type)) {
              if (result[i].length)
                result[i].forEach(res => {
                  decodeResult(output.components, res);
                });
            } else decodeResult(output.components, result[i]);
      });
  };

  // Only decode if there supposed to be fields
  if (funABI.outputs && funABI.outputs.length > 0) {

      let outputTypes = [];
      for (let i = 0; i < funABI.outputs.length; i++) {
        const type = funABI.outputs[i].type;
        const name = funABI.outputs[i].name ? ` ${funABI.outputs[i].name}` : '';
        outputTypes.push(type.indexOf('tuple') === 0 ? buildFullTypeNameDefinition(funABI.outputs[i]) : type+name);
      }
      convertTypeNames(outputTypes);

      if (!data || !data.length) data = new Uint8Array(32 * funABI.outputs.length); // ensuring the data is at least filled by 0 cause `AbiCoder` throws if there's not engouh data
      // decode data
      const decodeRes = abiCoder.decode(outputTypes, data);
      const decodeResCopy = deepCopy(decodeRes);
      decodeResult(funABI.outputs, decodeResCopy);

      return decodeResCopy
  }
  return [];
}