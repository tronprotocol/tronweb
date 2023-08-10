import TronWeb from '../index.js';
import { NodeService } from '../types/TronWeb.js';
import utils from '../utils/index.js';
import providers from './providers/index.js';

interface getEventsByContractAddressOptions {
    event_name?: string;
    block_number?: number;
    only_unconfirmed?: boolean;
    only_confirmed?: boolean;
    min_block_timestamp?: number;
    max_block_timestamp?: number;
    order_by?: 'block_timestamp,desc' | 'block_timestamp,asc';
    fingerprint?: string;
    limit?: number;
}

interface EventResponse {
    success: boolean;
    error?: string;
    data?: {
        block_number: number;
        block_timestamp: number;
        caller_contract_address: string;
        contract_address: string;
        event_index: number;
        event_name: string;
        result: Record<string, string>;
        result_type: Record<string, string>;
        event: string;
        transaction_id: string;
        _unconfirmed: boolean;
    }[];
    meta?: {
        at: number;
        fingerprint?: string;
        links?: {
            next: string;
        };
        page_size: number;
    };
}

export default class Event {
    tronWeb: TronWeb;

    constructor(tronWeb: TronWeb) {
        if (!tronWeb || !(tronWeb instanceof TronWeb)) throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
    }

    setServer(eventServer: NodeService, healthcheck = 'healthcheck') {
        if (!eventServer) return (this.tronWeb.eventServer = undefined);

        if (utils.isString(eventServer)) eventServer = new providers.HttpProvider(eventServer);

        if (!this.tronWeb.isValidProvider(eventServer)) throw new Error('Invalid event server provided');

        this.tronWeb.eventServer = eventServer;
        this.tronWeb.eventServer.isConnected = () =>
            this.tronWeb
                .eventServer!.request(healthcheck)
                .then(() => true)
                .catch(() => false);
    }

    getEventsByContractAddress(contractAddress: string, options: getEventsByContractAddressOptions = {}) {
        let {
            event_name,
            block_number,
            only_unconfirmed,
            only_confirmed,
            min_block_timestamp,
            max_block_timestamp,
            order_by,
            fingerprint,
            limit,
        }: getEventsByContractAddressOptions = Object.assign(
            {
                limit: 20,
            },
            options
        );

        if (!this.tronWeb.eventServer) {
            throw new Error('No event server configured');
        }

        if (!this.tronWeb.isAddress(contractAddress)) {
            throw new Error('Invalid contract address provided');
        }

        if (typeof min_block_timestamp !== 'undefined' && !utils.isInteger(min_block_timestamp)) {
            throw new Error('Invalid min_block_timestamp provided');
        }

        if (typeof max_block_timestamp !== 'undefined' && !utils.isInteger(max_block_timestamp)) {
            throw new Error('Invalid max_block_timestamp provided');
        }

        if (utils.isInteger(limit) && limit > 200) {
            console.warn('Defaulting to maximum accepted limit: 200');
            limit = 200;
        }

        const qs = {} as any;

        if (event_name) qs.event_name = event_name;
        if (block_number) qs.block_number = block_number;
        if (typeof only_unconfirmed === 'boolean') qs.only_unconfirmed = only_unconfirmed;
        if (typeof only_confirmed === 'boolean') qs.only_confirmed = only_confirmed;
        if (min_block_timestamp) qs.min_block_timestamp = min_block_timestamp;
        if (max_block_timestamp) qs.max_block_timestamp = max_block_timestamp;
        if (order_by) qs.order_by = order_by;
        if (fingerprint) qs.fingerprint = fingerprint;
        if (utils.isInteger(limit)) qs.limit = limit;

        return this.tronWeb.eventServer
            .request<EventResponse>(`v1/contract/${contractAddress}/events?${new URLSearchParams(qs).toString()}`)
            .then((res) => {
                if (res.success) {
                    return res;
                }
                throw new Error(res.error);
            });
    }

    async getEventsByTransactionID(
        transactionID: string,
        options: {
            only_unconfirmed?: boolean;
            only_confirmed?: boolean;
        } = {}
    ) {
        if (!this.tronWeb.eventServer) {
            throw new Error('No event server configured');
        }

        const qs = {} as any;

        if (typeof options.only_unconfirmed === 'boolean') {
            qs.only_unconfirmed = options.only_unconfirmed;
        }

        if (typeof options.only_confirmed === 'boolean') {
            qs.only_confirmed = options.only_confirmed;
        }

        return this.tronWeb.eventServer
            .request<EventResponse>(`v1/transactions/${transactionID}/events?${new URLSearchParams(qs).toString()}`)
            .then((res) => {
                if (res.success) {
                    return res;
                }
                throw new Error(JSON.parse(res.error!).message);
            });
    }

    async getEventsByBlockNumber(
        blockNumber: number | string,
        options: {
            only_confirmed?: boolean;
            limit?: number;
            fingerprint?: string;
        } = {}
    ) {
        if (!this.tronWeb.eventServer) {
            throw new Error('No event server configured');
        }

        const qs = {} as any;

        if (typeof options.only_confirmed === 'boolean') {
            qs.only_confirmed = options.only_confirmed;
        }

        if (options.limit) {
            qs.limit = options.limit;
        }

        if (options.fingerprint) {
            qs.fingerprint = options.fingerprint;
        }

        return this.tronWeb.eventServer
            .request<EventResponse>(`v1/blocks/${blockNumber}/events?${new URLSearchParams(qs).toString()}`)
            .then((res) => {
                if (res.success) {
                    return res;
                }
                throw new Error(res.error);
            });
    }

    async getEventsOfLatestBlock(
        options: {
            only_confirmed?: boolean;
        } = {}
    ) {
        if (!this.tronWeb.eventServer) {
            throw new Error('No event server configured');
        }

        const qs = {} as any;

        if (typeof options.only_confirmed === 'boolean') {
            qs.only_confirmed = options.only_confirmed;
        }

        return this.tronWeb.eventServer
            .request<EventResponse>(`v1/blocks/latest/events?${new URLSearchParams(qs).toString()}`)
            .then((res) => {
                if (res.success) {
                    return res;
                }
                throw new Error(res.error);
            });
    }
}
