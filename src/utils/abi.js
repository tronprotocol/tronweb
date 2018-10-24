import * as Ethers from 'ethers';
import TronWeb from 'index';

const abiCoder = new Ethers.utils.AbiCoder();

export function decodeParams(names, types, output, ignoreMethodHash) {

    if (!output || typeof output === 'boolean') {
        ignoreMethodHash = output;
        output = types;
        types = names;
        names = [];
    }

    if (ignoreMethodHash && output.replace(/^0x/,'').length % 64 === 8)
        output = '0x' + output.replace(/^0x/,'').substring(8);

    if (output.replace(/^0x/,'').length % 64)
        throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');

    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
        if(types[index] == 'address')
            arg = '41' + arg.substr(2).toLowerCase();

        if(names.length)
            obj[names[index]] = arg;
        else obj.push(arg);

        return obj;
    }, names.length ? {} : []);
}

export function encodeParams(types, values) {

    for (let i =0;i<types.length;i++) {
        if (types[i] === 'address') {
            values[i] =  TronWeb.address.toHex(values[i]).replace(/^41/, '0x');
        }
    }

    return abiCoder.encode(types, values);
}
