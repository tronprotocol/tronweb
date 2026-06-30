import tronWebBuilder from '../../helpers/tronWebBuilder.js';
const utils = tronWebBuilder.utils;

const tests = [
    // message is string
    {
        address: 'TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC',
        name: 'string("hello world")',
        message: 'hello world',
        messageHash: '0xcf02daeb2bea196ed5692322a66ed50080ce74ff8cb711199f1b04f3c13bc10d',
        privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
        signature:
            '0x0dc0b53d525e0103a6013061cf18e60cf158809149f2b8994a545af65a7004cb1eeaff560e801ab51b28df5d42549aa024c2aa7e9d34de1e01294b9afb5e6c7e1c',
    },
    // message starts with 0x, and wanted to be treated as bytes, use TronWeb.utils.ethersUtils.arrayify to deal with the message first
    {
        address: 'TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC',
        name: 'bytes(0x47173285...4cb01fad)',
        message: utils.ethersUtils.arrayify('0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'),
        messageHash: '0x66733cf31ee3f133db9561efdca3d65ba930bdf57fb1af3b6cc0ba4966ecc882',
        privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
        signature:
            '0x7e65909ea47c732a4734bf6c41959761b23a58f4ca34e265428fb4576ee1db402e1e007a9019131a999e9dbbe81cc1f8ba424135a529a1b56220fec02e7647fa1c',
    },
    {
        address: 'TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC',
        name: 'zero-prefixed signature',
        message: utils.ethersUtils.arrayify(utils.ethersUtils.id('0x7f23b5eed5bc7e89f267f339561b2697faab234a2')),
        messageHash: '0xc6bb689ca3663d132c07540d31f46e03b0e4291d990c77083c136a234f079455',
        privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
        signature:
            '0xbfa9f76ee93acd5b78f2b19e0385a2513a0b42a7c3e885677ef386322ea3fc3e474389c4f106282bd1cf5b53a977c3678076736212b7239672488698ce8990361b',
    },
];

export default {
    tests,
};
