import BN from 'bn.js';

const constants = {
    AddressZero: '0x0000000000000000000000000000000000000000',
    HashZero: '0x0000000000000000000000000000000000000000000000000000000000000000',
    EtherSymbol: '\u039e',
    NegativeOne: new BN(-1),
    Zero: new BN(0),
    One: new BN(1),
    Two: new BN(2),
    WeiPerEther: new BN('1000000000000000000'),
    MaxUint256: new BN('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}

export default constants
