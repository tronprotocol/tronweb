const isTestNet = process.env.NET === 'testnet';

export const ADDRESS_SIZE = isTestNet ? 35 : 34;
export const ADDRESS_PREFIX = isTestNet ? "a0" : "41";
export const ADDRESS_PREFIX_BYTE = isTestNet ? 0xa0 : 0x41;
