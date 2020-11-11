
async function makeAndSendTransaction(tronWeb, contractAddress, functionSelector, options = {}, parameters = [], issuerAddress) {
    const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        contractAddress,
        functionSelector,
        options,
        parameters,
        tronWeb.address.toHex(issuerAddress)
    );
    const signedTransaction = await tronWeb.trx.sign(transaction.transaction, tronWeb.defaultPrivateKey);
    return tronWeb.trx.sendRawTransaction(signedTransaction);
}

function makeShieldedMethodInstance(tronWeb, contractAddress) {
    const abiConfig = [{
        "inputs": [{"name": "trc20ContractAddress", "type": "address"}, {
            "name": "scalingFactorExponent",
            "type": "uint256"
        }], "stateMutability": "Nonpayable", "type": "Constructor"
    }, {
        "inputs": [{"name": "position", "type": "uint256"}, {"name": "cm", "type": "bytes32"}, {
            "name": "cv",
            "type": "bytes32"
        }, {"name": "epk", "type": "bytes32"}, {"name": "c", "type": "bytes32[21]"}],
        "name": "BurnNewLeaf",
        "type": "Event"
    }, {
        "inputs": [{"name": "position", "type": "uint256"}, {"name": "cm", "type": "bytes32"}, {
            "name": "cv",
            "type": "bytes32"
        }, {"name": "epk", "type": "bytes32"}, {"name": "c", "type": "bytes32[21]"}],
        "name": "MintNewLeaf",
        "type": "Event"
    }, {
        "inputs": [{"name": "nf", "type": "bytes32"}],
        "name": "NoteSpent",
        "type": "Event"
    }, {
        "inputs": [{"name": "to", "type": "address"}, {"name": "value", "type": "uint256"}, {
            "name": "ciphertext",
            "type": "bytes32[3]"
        }], "name": "TokenBurn", "type": "Event"
    }, {
        "inputs": [{"name": "from", "type": "address"}, {"name": "value", "type": "uint256"}],
        "name": "TokenMint",
        "type": "Event"
    }, {
        "inputs": [{"name": "position", "type": "uint256"}, {"name": "cm", "type": "bytes32"}, {
            "name": "cv",
            "type": "bytes32"
        }, {"name": "epk", "type": "bytes32"}, {"name": "c", "type": "bytes32[21]"}],
        "name": "TransferNewLeaf",
        "type": "Event"
    }, {
        "inputs": [{"name": "input", "type": "bytes32[10]"}, {
            "name": "spendAuthoritySignature",
            "type": "bytes32[2]"
        }, {"name": "rawValue", "type": "uint256"}, {
            "name": "bindingSignature",
            "type": "bytes32[2]"
        }, {"name": "payTo", "type": "address"}, {"name": "burnCipher", "type": "bytes32[3]"}, {
            "name": "output",
            "type": "bytes32[9][]"
        }, {"name": "c", "type": "bytes32[21][]"}],
        "name": "burn",
        "stateMutability": "Nonpayable",
        "type": "Function"
    }, {
        "outputs": [{"type": "bytes32"}, {"type": "bytes32[32]"}],
        "constant": true,
        "inputs": [{"name": "position", "type": "uint256"}],
        "name": "getPath",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "outputs": [{"type": "bytes32"}],
        "constant": true,
        "name": "latestRoot",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "outputs": [{"type": "uint256"}],
        "constant": true,
        "name": "leafCount",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "inputs": [{"name": "rawValue", "type": "uint256"}, {
            "name": "output",
            "type": "bytes32[9]"
        }, {"name": "bindingSignature", "type": "bytes32[2]"}, {"name": "c", "type": "bytes32[21]"}],
        "name": "mint",
        "stateMutability": "Nonpayable",
        "type": "Function"
    }, {
        "outputs": [{"type": "bytes32"}],
        "constant": true,
        "inputs": [{"type": "bytes32"}],
        "name": "noteCommitment",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "outputs": [{"type": "bytes32"}],
        "constant": true,
        "inputs": [{"type": "bytes32"}],
        "name": "nullifiers",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "outputs": [{"type": "bytes32"}],
        "constant": true,
        "inputs": [{"type": "bytes32"}],
        "name": "roots",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "outputs": [{"type": "uint256"}],
        "constant": true,
        "name": "scalingFactor",
        "stateMutability": "View",
        "type": "Function"
    }, {
        "inputs": [{"name": "input", "type": "bytes32[10][]"}, {
            "name": "spendAuthoritySignature",
            "type": "bytes32[2][]"
        }, {"name": "output", "type": "bytes32[9][]"}, {
            "name": "bindingSignature",
            "type": "bytes32[2]"
        }, {"name": "c", "type": "bytes32[21][]"}],
        "name": "transfer",
        "stateMutability": "Nonpayable",
        "type": "Function"
    }, {
        "outputs": [{"type": "bytes32"}],
        "constant": true,
        "inputs": [{"type": "uint256"}],
        "name": "tree",
        "stateMutability": "View",
        "type": "Function"
    }]

    return tronWeb.contract(abiConfig, contractAddress)
}

async function scanShieldedTRC20NotesByIvk(tronWeb, startBlockIndex, endBlockIndex, ivk, ak, nk, visible, shieldedTRC20ContractAddress, options = {}) {
    try{
        if (Object.prototype.toString.call(startBlockIndex).slice(8, -1) === 'Object') {
            options = endBlockIndex;
            endBlockIndex = startBlockIndex.end_block_index;
            ivk = startBlockIndex.ivk;
            ak = startBlockIndex.ak;
            nk = startBlockIndex.nk;
            visible = startBlockIndex.visible;
            shieldedTRC20ContractAddress = startBlockIndex.shielded_TRC20_contract_address;
            startBlockIndex = startBlockIndex.start_block_index;
        }
        const params = {
            ivk,
            nk,
            ak,
            visible: !!visible,
            start_block_index: startBlockIndex,
            end_block_index: endBlockIndex,
            shielded_TRC20_contract_address: options && options.visible ? shieldedTRC20ContractAddress : this.tronWeb.address.toHex(shieldedTRC20ContractAddress),
            ...options
        }
        return tronWeb.fullNode.request('wallet/scanshieldedtrc20notesbyivk', params, 'post')
    }catch (e){
        return e
    }
}

module.exports = {
    makeShieldedMethodInstance,
    makeAndSendTransaction,
    scanShieldedTRC20NotesByIvk
}
