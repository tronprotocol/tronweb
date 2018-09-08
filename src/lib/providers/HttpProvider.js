import axios from 'axios';
import utils from 'utils';

export default class HttpProvider {
    constructor(host, timeout = 30000, user = false, password = false, headers = {}) {
        if(!utils.isValidURL(host))
            throw new Error('Invalid URL provided to HttpProvider');

        if(isNaN(timeout) || timeout < 0)
            throw new Error('Invalid timeout duration provided');

        if(!utils.isObject(headers))
            throw new Error('Invalid headers object provided');

        if(host.charAt(host.length - 1) === '/')
            host = host.substr(0, host.length - 2);

        this.host = host;
        this.timeout = timeout;
        this.user = user;
        this.password = password;
        this.headers = headers;

        this.instance = axios.create({            
            baseURL: host,
            timeout: timeout,
            headers: headers,
            auth: {
                user,
                password
            },
        });
    }

    async isConnected() {
        return this.instance.get().then(() => {
            return false; // valid node will return 404 page
        }).catch(err => {
            return err.response && err.response.status === 404;
        });
    }

    // this.send('someMethod', { test: true }) -> http://node/someMethod?test=true
    // this.send('otherMethod', { test: false }, 'post') -> http://node/otherMethod with body { test: false }
    request(url, payload = {}, method = 'get') {
        method = method.toLowerCase();

        return this.instance.request({
            data: method == 'post' && payload,
            params: method =='get' && payload,
            url,
            method
        }).then(({ data }) => data);
    }
};