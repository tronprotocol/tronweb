// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const _ = require('lodash');
const wait = require('./wait');
const tronWebBuilder = require('./tronWebBuilder');

module.exports = async function pollAccountFor(address, property, value = false, interval = 3, timeout = 10000) {
    const tronWeb = tronWebBuilder.createInstance();
    const now = Date.now();
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (Date.now() > now + timeout) {
            throw new Error('Timeout...');
        }
        wait(interval);
        const result = await tronWeb.trx.getAccount(address);
        if (typeof property === 'string') {
            const data = _.get(result, property);
            if (data) {
                if (value) {
                    if (data == value) return Promise.resolve(result);
                } else {
                    return Promise.resolve(result);
                }
            }
        } else if (typeof property === 'function') {
            if (property(result)) {
                return Promise.resolve(result);
            }
        }
    }
};
