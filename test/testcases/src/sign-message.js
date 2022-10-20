const tronWebBuilder = require('../../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;

const tests = [
    // message is string
    {
        address: 'TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC',
        name: 'string("hello world")',
        message: 'hello world',
        messageHash: '0xcf02daeb2bea196ed5692322a66ed50080ce74ff8cb711199f1b04f3c13bc10d',
        privateKey: '01',
        signature: '0x0dc0b53d525e0103a6013061cf18e60cf158809149f2b8994a545af65a7004cb1eeaff560e801ab51b28df5d42549aa024c2aa7e9d34de1e01294b9afb5e6c7e1c'
    },
    // message starts with 0x, and wanted to be treated as bytes, use TronWeb.utils.ethersUtils.arrayify to deal with the message first
    {
        address: 'TVEZYjZyemfJoLUdGtzsM2ua1HAnbsNgAF',
        name: 'bytes(0x47173285...4cb01fad)',
        message: TronWeb.utils.ethersUtils.arrayify('0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'),
        messageHash: '0x66733cf31ee3f133db9561efdca3d65ba930bdf57fb1af3b6cc0ba4966ecc882',
        privateKey: '51d1d6047622bca92272d36b297799ecc152dc2ef91b229debf84fc41e8c73ee',
        signature: '0xdc3ffce3ffa792a3c76b9ea6909f715ffed0386bb9be0d1ece2d80bde37c368028eed4c9a6fd9608407b224050db7c648a8a7668a7582893efcb2c19d3327b811b'
    },
    {
        address: 'TBzEvowPVErmNWVegYMQcurDF3jgHU4VME',
        name: 'zero-prefixed signature',
        message: TronWeb.utils.ethersUtils.arrayify(TronWeb.utils.ethersUtils.id('0x7f23b5eed5bc7e89f267f339561b2697faab234a2')),
        messageHash: '0xc6bb689ca3663d132c07540d31f46e03b0e4291d990c77083c136a234f079455',
        privateKey: '59f40af46420081988724249fb743e7597c8ddc1cbbc0738b96ceb1dbb149373',
        signature: '0x4a32ec6cfd034304f6fb45767d98a2414a9ab439a829b60e756c79f7e3c0f4ed0d1f76d88839a4425146084a6ef3703a2a692fdacc76c80c269268f6ba6df38b1c'
    }
];

module.exports = {
  tests
}
