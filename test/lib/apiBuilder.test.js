const chai = require('chai');
const assert = chai.assert;
const txPars = require('../helpers/txPars');
const jlog = require('../helpers/jlog');
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');
const broadcaster = require('../helpers/broadcaster');
const pollAccountFor = require('../helpers/pollAccountFor');
const _ = require('lodash');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const assertEqualHex = require('../helpers/assertEqualHex');
const testRevertContract = require('../fixtures/contracts').testRevert;
const testConstantContract = require('../fixtures/contracts').testConstant;
const waitChainData = require('../helpers/waitChainData');

const TronWeb = tronWebBuilder.TronWeb;
const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    UPDATED_TEST_TOKEN_OPTIONS,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved
} = require('../helpers/config');

describe('TronWeb.apiBuilder', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;
    let ApiBuilder;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
        ApiBuilder = TronWeb.ApiBuilder;
    });

    describe('#constructor()', function () {

        it('should initialize an api and set the args', function () {

            const api = new ApiBuilder(tronWeb, {
                    one: 1,
                    two: 2,
                    from: {},
                    options: () => {},
                    callback: undefined
                }, [
                    'string',
                    'object',
                    'function'
                ],
                {
                    amount: 0,
                    from: accounts.hex[0]
                }
            )

            api.set()

            assert.equal(api.args.from, accounts.hex[0])
            assert.equal(typeof api.args.options, 'object')
            assert.equal(typeof api.args.callback, 'function')

        });

        it('should do pre-validation', function () {

            const api = new ApiBuilder(tronWeb, {
                    one: 1,
                    two: 2,
                    from: {},
                    options: () => {},
                    callback: undefined
                }, [
                    'string',
                    'object',
                    'function'
                ],
                {
                    amount: 0,
                    from: accounts.hex[0]
                }
            )

            api.set()

            assert.equal(api.args.from, accounts.hex[0])
            assert.equal(typeof api.args.options, 'object')
            assert.equal(typeof api.args.callback, 'function')

        });


    });


});
