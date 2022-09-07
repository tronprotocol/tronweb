import {byteArray2hexStr} from './bytes';
import {
    getBase58CheckAddress,
    genPriKey,
    getAddressFromPriKey,
    getPubKeyFromPriKey,
    pkToAddress,
} from './crypto';
import {ethersWallet} from './ethersUtils'
import {ADDRESS_PREFIX, TRON_BIP39_PATH_INDEX_0} from './address'

export function generateAccount() {
    const priKeyBytes = genPriKey();
    const pubKeyBytes = getPubKeyFromPriKey(priKeyBytes);
    const addressBytes = getAddressFromPriKey(priKeyBytes);

    const privateKey = byteArray2hexStr(priKeyBytes);
    const publicKey = byteArray2hexStr(pubKeyBytes);

    return {
        privateKey,
        publicKey,
        address: {
            base58: getBase58CheckAddress(addressBytes),
            hex: byteArray2hexStr(addressBytes)
        }
    }
}

export function generateRandom(options = {}) {
    if(!options.path) {
        options.path = TRON_BIP39_PATH_INDEX_0;
    }
    console.log(options, 'options')
    const account = ethersWallet.createRandom(options);

    console.log(account, 'account')

    const result = {
        mnemonic: account.mnemonic,
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        address: {
            hex: account.address,
            base58: false
        }
    }
    
    if(options.path.match('^m\/44\'\/195\'')) {
        result.address.hex = account.address.replace(/^0x/, ADDRESS_PREFIX);
        result.address.base58 = pkToAddress(account.privateKey.replace(/^0x/, ''));
    }

    return result;
}

export function generateAccountWithMnemonic(mnemonic, path = TRON_BIP39_PATH_INDEX_0, wordlist = 'en') {
    if(!path) {
        path = TRON_BIP39_PATH_INDEX_0;
    }
    const account =  ethersWallet.fromMnemonic(mnemonic, path, wordlist);

    const result = {
        mnemonic: account.mnemonic,
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        address: {
            hex: account.address,
            base58: false
        }
    }

    if(options.path.match('^m\/44\'\/195\'')) {
        result.address.hex = account.address.replace(/^0x/, ADDRESS_PREFIX);
        result.address.base58 = pkToAddress(account.privateKey.replace(/^0x/, ''));
    }

    return result;
}