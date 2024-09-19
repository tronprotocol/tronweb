import { AxiosRequestHeaders } from 'axios';
import { BigNumber } from 'bignumber.js';
import type { HeadersType } from './Providers.js';
import HttpProvider from '../lib/providers/HttpProvider.js';

export type IBigNumber = InstanceType<typeof BigNumber>;

export interface TronWebOptions {
    fullNode?: NodeProvider;
    solidityNode?: NodeProvider;
    fullHost?: NodeProvider;
    eventServer?: NodeProvider;
    headers?: HeadersType;
    eventHeaders?: AxiosRequestHeaders;
    privateKey?: string;
    disablePlugins?: boolean;
}
export interface DefaultAddress {
    hex: string | false;
    base58: string | false;
}

export type NodeProvider = string | HttpProvider;
