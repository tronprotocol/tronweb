import {bigNumberify} from './BNWrapper.js';

const constants = {
    AddressZero: '0x0000000000000000000000000000000000000000',
    HashZero: '0x0000000000000000000000000000000000000000000000000000000000000000',
    EtherSymbol: '\u039e',
    NegativeOne: bigNumberify(-1),
    Zero: bigNumberify(0),
    One: bigNumberify(1),
    Two: bigNumberify(2),
    WeiPerEther: bigNumberify('1000000000000000000'),
    MaxUint256: bigNumberify('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}

export default constants
