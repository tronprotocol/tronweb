import Ethers from 'ethers';
import TronWeb from 'index';

const abiCoder = new Ethers.utils.AbiCoder();

export function decodeParams(names, types, output) {

    if (!output) {
        output = types;
        types = names;
        names = [];
    }

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
