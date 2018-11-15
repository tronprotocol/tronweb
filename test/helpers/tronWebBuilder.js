const TronWeb = require('../setup/TronWeb');

const {FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API, PRIVATE_KEY} = require('./config')

const createInstance = () => {
    return new TronWeb(
        FULL_NODE_API,
        SOLIDITY_NODE_API,
        EVENT_API,
        PRIVATE_KEY
    )
}


// requires Tron Quickstart >= 1.1.5

const newTestAccounts = async (amount) => {
    const tronWeb = createInstance();
    return await tronWeb.fullNode.request('/admin/temporary-accounts-generation?accounts=' + amount);
}

const getTestAccounts = async (block) => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const tronWeb = createInstance();
    const accountsJson = await tronWeb.fullNode.request('/admin/accounts-json');
    const index = typeof block === 'number'
        ? (block > -1 && block < accountsJson.more.length ? block : accountsJson.more.length - 1)
        : undefined
    accounts.pks = typeof block === 'number'
        ? accountsJson.more[index].privateKeys
        : accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = tronWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(tronWeb.address.toHex(addr));
    }
    return accounts;
}

module.exports = {
    createInstance,
    newTestAccounts,
    getTestAccounts,
    TronWeb
}

