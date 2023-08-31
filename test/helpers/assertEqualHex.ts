import { assert } from 'chai';
import { TronWeb } from '../setup/TronWeb.js';

export default async function (result: any, string: any) {
    assert.equal(result, TronWeb.toHex(string).substring(2));
}
