import { RawAxiosRequestHeaders, AxiosHeaders, HeadersDefaults } from 'axios';
export type HeadersType = RawAxiosRequestHeaders | InstanceType<typeof AxiosHeaders> | Partial<HeadersDefaults>;
export type RequestHeaders = RawAxiosRequestHeaders;

export interface HttpProviderInstance {
    request<R = unknown>(config: any): Promise<{ data: R }>;
}