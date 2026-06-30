import { TronWeb } from '../setup/node.js';

const fullHost = 'http://127.0.0.1:' + (process.env.HOST_PORT || 9090);
// const fullHost = 'https://nile.trongrid.io';

export default {
    PRIVATE_KEY: process.env.PRIVATE_KEY as string,
    FULL_NODE_API: fullHost,
    SOLIDITY_NODE_API: fullHost,
    EVENT_API: fullHost,
    ADDRESS_HEX: '417e5f4552091a69125d5dfcb7b8c2659029395bdf',
    ADDRESS_BASE58: 'TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC',
    UPDATED_TEST_TOKEN_OPTIONS: {
        description: 'Very useless utility token',
        url: 'https://none.example.com',
        freeBandwidth: 10,
        freeBandwidthLimit: 100,
    } as any,

    getTokenOptions: () => {
        const rnd = Math.random().toString(36).substring(2);
        return {
            name: `Token${rnd}`,
            abbreviation: `T${rnd.substring(2).toUpperCase()}`,
            description: 'Useless utility token',
            url: `https://example-${rnd}.com/`,
            totalSupply: 100000000,
            saleEnd: Date.now() + 60000, // 1 minute
            frozenAmount: 5,
            frozenDuration: 1,
            trxRatio: 10,
            tokenRatio: 2,
            saleStart: Date.now() + 100,
            freeBandwidth: 100,
            freeBandwidthLimit: 1000,
        } as any;
    },
    isProposalApproved: async (tronWeb: TronWeb, proposal: string | number) => {
        const chainParameters = await tronWeb.trx.getChainParameters();
        for (const param of chainParameters) {
            if (param.key === proposal) {
                return param.value;
            }
        }
        return false;
    },
};
