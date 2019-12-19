import BigNumber from 'bignumber.js';

const constants = {
    AddressZero: '0x0000000000000000000000000000000000000000',
    HashZero: '0x0000000000000000000000000000000000000000000000000000000000000000',
    EtherSymbol: '\u039e',
    NegativeOne: new BigNumber(-1),
    Zero: new BigNumber(0),
    One: new BigNumber(1),
    Two: new BigNumber(2),
    WeiPerEther: new BigNumber('1000000000000000000'),
    MaxUint256: new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}

export default constants
