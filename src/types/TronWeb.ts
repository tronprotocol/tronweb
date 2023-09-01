import { AxiosRequestHeaders } from 'axios';
import HttpProvider from '../lib/providers/HttpProvider.js';

export interface TronWebOptions {
    fullNode?: NodeProvider;
    solidityNode?: NodeProvider;
    fullHost?: NodeProvider;
    eventServer?: NodeProvider;
    headers?: AxiosRequestHeaders;
    eventHeaders?: AxiosRequestHeaders;
    privateKey?: string;
    disablePlugins?: boolean;
}
export interface DefaultAddress {
    hex: string | false;
    base58: string | false;
}

export type NodeProvider = string | HttpProvider;
