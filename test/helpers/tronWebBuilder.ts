import chalk from 'chalk';
import { TronWeb, utils } from '../setup/TronWeb.js';
import jlog from './jlog.js';

import config from './config.js';
const { FULL_NODE_API, PRIVATE_KEY } = config;

const createInstance = (extraOptions = {}) => {
    const options = Object.assign(
        {
            fullHost: FULL_NODE_API,
            privateKey: PRIVATE_KEY,
        },
        extraOptions
    );
    return new TronWeb(options);
};

let instance: TronWeb;

const getInstance = () => {
    if (!instance) {
        instance = createInstance();
    }
    return instance;
};

const newTestAccounts = async (amount: number) => {
    const tronWeb = createInstance();

    console.log(chalk.blue(`Generating ${amount} new accounts...`));
    await tronWeb.fullNode.request('/admin/temporary-accounts-generation?accounts=' + amount);
    const lastCreated = await getTestAccounts(-1);
    jlog(lastCreated.b58);
};

const getTestAccounts = async (block: number) => {
    const accounts = {
        b58: [] as string[],
        hex: [] as string[],
        pks: [] as string[],
    };
    const tronWeb = createInstance();
    const accountsJson: any = await tronWeb.fullNode.request('/admin/accounts-json');
    const index =
        typeof block === 'number'
            ? block > -1 && block < accountsJson.more.length
                ? block
                : accountsJson.more.length - 1
            : undefined;
    accounts.pks = typeof block === 'number' ? accountsJson.more[index!].privateKeys : accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        const addr = TronWeb.address.fromPrivateKey(accounts.pks[i]) as string;
        accounts.b58.push(addr);
        accounts.hex.push(TronWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);
};

export default {
    createInstance,
    getInstance,
    newTestAccounts,
    getTestAccounts,
    TronWeb,
    utils,
};
