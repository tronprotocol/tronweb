import TronWeb from '../index';
import utils from '../utils';
import providers from "./providers";
import querystring from "querystring-es3";
import injectpromise from 'injectpromise';

export default class Event {

    constructor(tronWeb = false) {
        if (!tronWeb || !(tronWeb instanceof TronWeb))
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
        this.injectPromise = injectpromise(this);
    }

    setServer(eventServer = false, healthcheck = 'healthcheck') {
        if (!eventServer)
            return this.tronWeb.eventServer = false;

        if (utils.isString(eventServer))
            eventServer = new providers.HttpProvider(eventServer);

        if (!this.tronWeb.isValidProvider(eventServer))
            throw new Error('Invalid event server provided');

        this.tronWeb.eventServer = eventServer;
        this.tronWeb.eventServer.isConnected = () => this.tronWeb.eventServer.request(healthcheck).then(() => true).catch(() => false);
    }

    getEventsByContractAddress(contractAddress = false, options = {}, callback = false) {

        let {
            sinceTimestamp,
            since,
            fromTimestamp,
            eventName,
            blockNumber,
            size,
            page,
            onlyConfirmed,
            onlyUnconfirmed,
            previousLastEventFingerprint,
            previousFingerprint,
            fingerprint,
            rawResponse,
            sort,
            filters
        } = Object.assign({
            sinceTimestamp: 0,
            eventName: false,
            blockNumber: false,
            size: 20,
            page: 1
        }, options)

        if (!callback)
            return this.injectPromise(this.getEventsByContractAddress, contractAddress, options);

        fromTimestamp = fromTimestamp || sinceTimestamp || since;

        if (!this.tronWeb.eventServer)
            return callback('No event server configured');

        const routeParams = [];

        if (!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if (eventName && !contractAddress)
            return callback('Usage of event name filtering requires a contract address');

        if (typeof fromTimestamp !== 'undefined' && !utils.isInteger(fromTimestamp))
            return callback('Invalid fromTimestamp provided');

        if (!utils.isInteger(size))
            return callback('Invalid size provided');

        if (size > 200) {
            console.warn('Defaulting to maximum accepted size: 200');
            size = 200;
        }

        if (!utils.isInteger(page))
            return callback('Invalid page provided');

        if (blockNumber && !eventName)
            return callback('Usage of block number filtering requires an event name');

        if (contractAddress)
            routeParams.push(this.tronWeb.address.fromHex(contractAddress));

        if (eventName)
            routeParams.push(eventName);

        if (blockNumber)
            routeParams.push(blockNumber);

        const qs = {
            size,
            page
        }

        if (typeof filters === 'object' && Object.keys(filters).length > 0) {
            qs.filters = JSON.stringify(filters);
        }

        if (fromTimestamp) {
            qs.fromTimestamp = qs.since = fromTimestamp;
        }

        if (onlyConfirmed)
            qs.only_confirmed = onlyConfirmed

        if (onlyUnconfirmed && !onlyConfirmed)
            qs.only_unconfirmed = onlyUnconfirmed

        if (sort)
            qs.sort = sort

        fingerprint = fingerprint || previousFingerprint || previousLastEventFingerprint
        if (fingerprint)
            qs.fingerprint = fingerprint

        return this.tronWeb.eventServer.request(`event/contract/${routeParams.join('/')}?${querystring.stringify(qs)}`).then((data = false) => {
            if (!data)
                return callback('Unknown error occurred');

            if (!utils.isArray(data))
                return callback(data);

            return callback(null,
                rawResponse === true ? data : data.map(event => utils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }


    getEventsByTransactionID(transactionID = false, options = {}, callback = false) {

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getEventsByTransactionID, transactionID, options);

        if (!this.tronWeb.eventServer)
            return callback('No event server configured');

        return this.tronWeb.eventServer.request(`event/transaction/${transactionID}`).then((data = false) => {
            if (!data)
                return callback('Unknown error occurred');

            if (!utils.isArray(data))
                return callback(data);

            return callback(null,
                options.rawResponse === true ? data : data.map(event => utils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

}

