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

module.exports = {
    createInstance,
    TronWeb
}

