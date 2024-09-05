import axios, { Method } from 'axios';
import { hasProperties, isObject, isValidURL } from '../../utils/validations.js';
import { HeadersType, HttpProviderInstance } from '../../types/Providers.js';

export default class HttpProvider {
    host: string;
    timeout: number;
    user: string;
    password: string;
    headers: HeadersType;
    statusPage: string;
    instance: HttpProviderInstance;
    constructor(host: string, timeout = 30000, user = '', password = '', headers: HeadersType = {}, statusPage = '/') {
        if (!isValidURL(host)) throw new Error('Invalid URL provided to HttpProvider');

        if (isNaN(timeout) || timeout < 0) throw new Error('Invalid timeout duration provided');

        if (!isObject(headers)) throw new Error('Invalid headers object provided');

        host = host.replace(/\/+$/, '');

        this.host = host;
        this.timeout = timeout;
        this.user = user;
        this.password = password;
        this.headers = headers;
        this.statusPage = statusPage;

        this.instance = axios.create({
            baseURL: host,
            timeout: timeout,
            headers: headers,
            auth: user
                ? {
                      username: user,
                      password,
                  }
                : undefined,
        });
    }

    setStatusPage(statusPage = '/') {
        this.statusPage = statusPage;
    }

    async isConnected(statusPage = this.statusPage) {
        return this.request(statusPage)
            .then((data) => {
                return hasProperties(data as Record<string, string>, 'blockID', 'block_header');
            })
            .catch(() => false);
    }

    request<T = unknown>(url: string, payload = {}, method: Method = 'get'): Promise<T> {
        method = method.toLowerCase() as Method;

        return this.instance
            .request<T>({
                data: method == 'post' && Object.keys(payload).length ? payload : null,
                params: method == 'get' && payload,
                url,
                method,
            })
            .then(({ data }) => data);
    }
}
