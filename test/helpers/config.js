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
    SIGNED_HEX_TRANSACTION: '0a85010a02380a220830202d4c1473d46640d8edabfea72f5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a1541fbbb1a37f9fbc18a3e2b8fd8c0823251cd3b8ee8121541af4852489314e72ffae825238c52d0e1ffff1ead18c0843d70f182cffca72f1241fa301a789dc51714be33b0f298e3f990650bec285ab628ab8ea5f18aeb3466643ca89b604d9df74fa19a11235e0d7ab974322f0097eefe0b7efb38ea9ce4cf6601',
    TEST_TRON_GRID_API: 'http://47.252.84.138:29086',
    TEST_TRON_HEADER_API_KEY: 'be815f09-e30f-4b98-b84d-0bb41f0708fd',
    TEST_TRON_HEADER_API_JWT_KEY: '95057b57-a2bd-4bd5-9337-5b52cb2b3bc2',
    TEST_TRON_HEADER_JWT_ID: '2b3b8c99254f48ef90be2dee387fe7b6',
    TEST_TRON_HEADER_JWT_PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAuU+RD27l1tYdSnjiySnqUjTkuHguJq21+nS+oYIqiwHXLQot
AC9vriP5sOXJ9w1SmWvj5JOmO2qYFxyO+zluW2vfPphXB2jPD0Fv2Cl/Cdef/SCg
UR+KtGjMDudR/xgJcm9nZQ7pXcSi5rBXxQ9oIcLDxyU2wwXkGR9hJyIwqLkaP7nK
Ce5zoE3C26uVikVC2szjjF1I70tXtlHtdhkM8DaZeNhcKc8zV7Ge5hr/9tQIjH4t
RYKa1ldANlcEyzwQPGrsHM5KuurWQSjjLIl6JrPy9mYPbrU51KUcIwuOWPz+UcCX
KZZMFXJNlYiZelYlAIFHRXpgvV7HFqDuLkc30wIDAQABAoIBAQCjAzZVQDXZZiMA
JxVA5qllRXhKOhZHGhpyRw6G3w1zmNvjmAb8Gb6Bjs4QaiPfOw4FPl6L7cKWk+9U
rV+t6diFfYA1/SbZsr4q6mJr4h0J2G+56WB93GRUzbdsCNsdrtRooU1wHcz2Gos+
qbOb+zCcOkukvLzOlDkSTINXPIFXeXPp3ccvz6a58dwUCpvS5fw50Jl6FBhCaGcv
t4k9dmKa/EUeMVgfZ6lwzMHm7tlp+KubHAvESr+KT+jvk2g/eTosUM+jvp1prFct
TQgEyVeC6beXPgzvRb3Ao7C0w+N9VYwst4LoH9rHrtsROTpKsKvpUA+T2fhN6RaB
GVYQuVEJAoGBAPNWxFDBRvaUO7j0ipQDzEhn1J7jHhq/zofCAv6YqWbFZUiM3Z+4
WZJIUy6JyKPhg7UPSwlJtwIygO8EzlDIr8cKGh8vxy2cP4KUI/zOZfx8Y19x/vz/
eEF+0kMz0qIf2JiWnG94nC/JzqQ6IIjHaPYXimz2DfkiTBCiBPoDoh+FAoGBAMLz
4AISOSFlkiJRNbDCTOogbQaX0voYlt3aRBXIGeOgcodI8adjLOGDFDMFUL8Kdxke
l3zhkmBlbHw9+q7a5GDd03i+n5CSZQDMuljAb8lUm36MnV6sGMnlCX2mGQjHdwLI
Kql9NwoK5fNcvwjqQogbTnXLkaIecaUES8eTHp13AoGATEHyv8PyMy/9D1dDXmNa
T46KaUiPlJ5rYMwCGDtLSzOtK/FJOtaQ63DS8JCpWgJAPiuOvlhli8C7+yusZFCg
FWYrDX7xkm+Wz5sRNBaSi2+HzM9ys2J0E0JlLj49UiVcwWThnWVUvP0nTvwQWgzz
7bsu3Dq34k1HPScpHBirY+kCgYEAoSRqJewgMv289AbCZW/FmcThuZBnQHhww8J1
greaxq9J248syBpO77ykRqP/IVoqJaZGu1/M2Ucci/nDKyMdoP/am7SdOif3uth+
s3ulKvp3aPwb3DRObRuXY7eWe848Dh2cPeqVQwTNHAKumVThV5WSngV9RE77ytWp
ObbemHMCgYEAmlnWvwed2VkRiHpPV7VcFP7NCz6c+WCgRH9gca//fFLPzxB6dwsz
vvQ4W6Hmeyh9ef/dGQRPKwBp2oiJELouIVybtc2S2wT3DYm2AgYv4RFcH3CB2cIW
Djyb5403LJztsxdExbyQkm++Gg631CZus4xA77wMafGw37IhCE6sTBo=
-----END RSA PRIVATE KEY-----`,

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
