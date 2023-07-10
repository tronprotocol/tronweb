import { AxiosRequestHeaders } from 'axios';
import HttpProvider from '../lib/providers/HttpProvider';

export interface TronWebOptions {
    fullNode?: string;
    solidityNode?: string;
    fullHost?: string;
    eventServer?: string;
    headers?: AxiosRequestHeaders;
    eventHeaders?: AxiosRequestHeaders;
    privateKey?: string;
}
export interface DefaultAddress {
    hex: string | false;
    base58: string | false;
}

// @todo: confirm name
export type NodeService = string | HttpProvider;
