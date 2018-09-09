import { byteArray2hexStr } from './bytes';
import { base64EncodeToString } from './code';
import { getBase58CheckAddress, genPriKey, getAddressFromPriKey } from './crypto';

export function generateAccount() {
    let priKeyBytes = genPriKey();
    let addressBytes = getAddressFromPriKey(priKeyBytes);
    let address = getBase58CheckAddress(addressBytes);
    let password = base64EncodeToString(priKeyBytes);
    let privateKey = byteArray2hexStr(priKeyBytes);

    return {
        privateKey,
        address
    }
}