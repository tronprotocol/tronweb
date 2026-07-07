import utils from './utils/index.js';
export { utils };

import { BigNumber } from 'bignumber.js';
export { BigNumber };

import { providers } from './lib/providers/index.js';
export { providers };

import { TransactionBuilder } from './lib/TransactionBuilder/TransactionBuilder.js';
export { TransactionBuilder };

import { Trx, BaseTrx, PreciseTrx } from './lib/trx/index.js';
export { Trx, BaseTrx, PreciseTrx };

import { Contract, Method } from './lib/contract/index.js';
export { Contract, Method };

import { Event } from './lib/event.js';
export { Event };

import { Plugin } from './lib/plugin.js';
export { Plugin };

import { TronWeb } from './tronweb.js';
export { TronWeb };

import * as Types from './types/index.js';
export { Types };

export default {
    utils,
    BigNumber,
    providers,
    TransactionBuilder,
    Trx,
    BaseTrx,
    PreciseTrx,
    Contract,
    Method,
    Event,
    Plugin,
    TronWeb,
    Types,
};
