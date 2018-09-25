## What is Tron-Web?

TronWeb aims to deliver a unified, seamless development experience influenced by Ethereum's [Web3](https://github.com/ethereum/web3.js/) implementation. We have taken the core of [Web3](https://github.com/ethereum/web3.js/) and expanded upon it to unlock the functionality of TRON's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

You can access either version specifically from the `dist/` folder.

TronWeb is also compatible with frontend frameworks such as Angular, React and Vue.

You can also ship TronWeb in a Chrome extension.

## Installation

* npm: npm install tronweb

## Example
You can run the example with `yarn example` or `npm run-script example`. Don't forget to run `yarn install` beforehand.

## Documentation (Currently for 1.0, this branch is 2.0)
* [English](http://doc.tron.network/en)
* [Chinese](http://doc.tron.network/)

## TRON provides a private network to test with
* Full Node - https://api.trongrid.io:8090
* Solidity Node - https://api.trongrid.io:8091
* Event Server - https://api.trongrid.io
* Block Explorer - https://explorer.trongrid.io

* You can also set up your own private network, but you need to solve cross-domain CORS. The following `nginx` configuration file will allow you to route the headers properly:

```
    upstream fullnodeapi_server {
        ip_hash;
        server 39.105.72.181:8090;
    }

    server {
        listen       80;
        listen       [::]:80;
        server_name  testapi.trondapps.org;
        access_log  /var/log/nginx/server.access.log  main;

        gzip on;
        gzip_min_length 1k;
        gzip_buffers 4 16k;
        gzip_comp_level 6;
        gzip_types text/css text/javascript application/css application/javascript image/jpeg image/gif image/png;
        gzip_vary on;

        location / {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Headers X-Requested-With,Content-Type,Accept;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            proxy_http_version 1.1;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_pass http://fullnodeapi_server;
            proxy_redirect off;
        }
        
        error_page   500 502 503 504  /50x.html;

        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
```

### Creating an Instance

You need to initiate a new TronWeb instance like below:

```js
    import TronWeb from 'TronWeb'

    const HttpProvider = TronWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
    const fullNode = new HttpProvider('https://api.trongrid.io:8090'); // Full node http endpoint
    const solidityNode = new HttpProvider('https://api.trongrid.io:8091'); // Solidity node http endpoint
    const eventServer = 'https://api.trongrid.io/'; // Contract events http endpoint

    const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );
        
    // The majority of the function calls are asynchronus, 
    // meaning that they cannot return the result instantly.
    // These methods therefore return a promise, which you can await.
    const balance = await tronWeb.trx.getBalance(address);
    console.log({ balance });

    // You can also bind a `then` and `catch` method.
    tronWeb.trx.getBalance(address).then(balance => {
        console.log({ balance });
    }).catch(err => console.error(err));

    // If you'd like to use a similar API to Web3, provide a callback function.
    tronWeb.trx.getBalance(address, (err, balance) => {
        if(err)
            return console.error(err);
        
        console.log({ balance });
    });
```

# GitHub
https://github.com/tronprotocol/tron-web.git

