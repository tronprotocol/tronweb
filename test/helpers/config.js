const fullHost = "http://127.0.0.1:" + (process.env.HOST_PORT || 9090)

module.exports = {

    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONSUME_USER_RESOURCE_PERCENT: 30,
    FEE_LIMIT: 100000000,
    FULL_NODE_API: fullHost,
    SOLIDITY_NODE_API: fullHost,
    EVENT_API: fullHost,
    NETWORK_ID: "*",
    ADDRESS_HEX: '41928c9af0651632157ef27a2cf17ca72c575a4d21',
    ADDRESS_BASE58: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
    UPDATED_TEST_TOKEN_OPTIONS: {
        description: 'Very useless utility token',
        url: 'https://none.example.com',
        freeBandwidth: 10,
        freeBandwidthLimit: 100
    },
    getTokenOptions: () => {
        const rnd = Math.random().toString(36).substr(2);
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
            saleStart: Date.now() + 500,
            freeBandwidth: 100,
            freeBandwidthLimit: 1000
        }
    },
    isProposalApproved: async (tronWeb, proposal) => {
        let chainParameters = await tronWeb.trx.getChainParameters()
        for(let param of chainParameters) {
            if(param.key === proposal) {
                return param.value
            }
        }
        return false
    },
    SUN_NETWORK: process.env.SUN_NETWORK,
    SIDE_CHAIN: {
        fullNode: 'https://testhttpapi.tronex.io',
        solidityNode: 'https://testhttpapi.tronex.io',
        eventServer: 'https://testhttpapi.tronex.io',
        sideOptions: {
            fullNode: 'https://suntest.tronex.io',
            solidityNode: 'https://suntest.tronex.io',
            eventServer: 'https://suntest.tronex.io',
            mainGatewayAddress: 'TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU',
            sideGatewayAddress: 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX',
            sideChainId: '413AF23F37DA0D48234FDD43D89931E98E1144481B'
        }
    },
    TOKEN_ID: 1000003,
    DEPOSIT_FEE: 0,
    MAPPING_FEE: 1000000000,
    WITHDRAW_FEE: 0,
    RETRY_MAPPING_FEE: 1000000000,
    RETRY_DEPOSIT_FEE: 0,
    RETRY_WITHDRAW_FEE: 0,
    NONCE: 35,

    HASH20: 'cd48770186c7f3563cdc630fb4623f9700392f742a51d27877c592ff3c9125af',
    CONTRACT_ADDRESS20: 'TQq3EYEiaYr95r6ePRQwycukCEAE4qWkE7',
    CONTRACT_ADDRESS20_HEX: '41a2fe67ceadf6e147c440fe556a0a15bd210ec412',

    ADDRESS20_MAPPING: 'TQnwLGKPg7jRCr2QPLaPV349qAkQPgY1kp',
    ADDRESS20_MAPPING_HEX: '41a298a5bdf9963ded01e0ba751c9e4d39141bbcdc',

    HASH721: '95c05e26f6afc92972d5ffeb1c24a8c27baaa5556dd5c50a7f297b9017711135',
    CONTRACT_ADDRESS721: 'TX8qeDzWJ3ePxwajj18PGbcc7FwV1dhqt3',
    CONTRACT_ADDRESS721_HEX: '41e82cf8a78a02e1ba25b9bf4c2ebce0bb7c7189ba',

    ADDRESS721_MAPPING: 'TWU8w6qrqb42x9gt5NRGdzXD6xjgzEvnK1',
    ADDRESS721_MAPPING_HEX: '41e0db2ebd7619fc7d4af7d4cd04515c4f77840d45',
    TRC721_ID: 1
}
