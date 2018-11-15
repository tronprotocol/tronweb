const { keccak256 } = require('js-sha3');

module.exports = {

    PRIVATE_KEY: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
    CONSUME_USER_RESOURCE_PERCENT: 30,
    FEE_LIMIT: 100000000,
    FULL_NODE_API: "http://127.0.0.1:8090",
    SOLIDITY_NODE_API: "http://127.0.0.1:8091",
    EVENT_API: "http://127.0.0.1:8092",
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
        const rnd = keccak256(Math.random().toString()).substring(0, 4)
        return {
            name: `Token${rnd}`,
            abbreviation: `T${rnd.substring(2).toUpperCase()}`,
            description: 'Useless utility token',
            url: `https://example-${rnd}.com/`,
            totalSupply: 1000,
            saleEnd: Date.now() + 1000 * 60, // 1 minute
            frozenAmount: 5,
            frozenDuration: 1,
            trxRatio: 30,
            tokenRatio: 4,
            saleStart: Date.now() + 500,
            freeBandwidth: 100,
            freeBandwidthLimit: 1000
        }
    }
}
