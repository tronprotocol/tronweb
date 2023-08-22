import { AxiosRequestHeaders } from 'axios';
import HttpProvider from '../lib/providers/HttpProvider.js';

export interface TronWebOptions {
    fullNode?: NodeService;
    solidityNode?: NodeService;
    fullHost?: NodeService;
    eventServer?: NodeService;
    headers?: AxiosRequestHeaders;
    eventHeaders?: AxiosRequestHeaders;
    privateKey?: string;
    disablePlugins?: boolean;
}
export interface DefaultAddress {
    hex: string | false;
    base58: string | false;
}

// @todo: confirm name
export type NodeService = string | HttpProvider;
