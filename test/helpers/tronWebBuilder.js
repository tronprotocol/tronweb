const TronWeb = require('../setup/TronWeb');

const {FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API, PRIVATE_KEY } = require('./config').constants

const createInstance = () => {
    return new TronWeb(
        FULL_NODE_API,
        SOLIDITY_NODE_API,
        EVENT_API,
        PRIVATE_KEY
    )
}

const getTestAccounts = async () => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const tronWeb = createInstance();
    const accountsJson = await tronWeb.fullNode.request('/admin/accounts-json');
    accounts.pks = accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = tronWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(tronWeb.address.toHex(addr));
    }
    return accounts;
}

module.exports = {
    createInstance,
    getTestAccounts,
    TronWeb
}

