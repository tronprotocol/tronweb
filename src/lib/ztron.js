/*
** for shield transaction
*/
import TronWeb from 'index';
import injectpromise from 'injectpromise';
import Validator from 'paramValidator';

export default class ZTron {
    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
        this.injectPromise = injectpromise(this);
        this.validator = new Validator(tronWeb);
    }
}