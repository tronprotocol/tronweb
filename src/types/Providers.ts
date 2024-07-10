import { RawAxiosRequestHeaders, AxiosHeaders, HeadersDefaults } from 'axios';
export type HeadersType = RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
export type RequestHeaders = RawAxiosRequestHeaders;

export interface HttpProviderInstance {
    request<R = any>(config: any): Promise<R>;
}