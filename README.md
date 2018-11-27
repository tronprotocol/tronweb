<p align="center">
  <a href="https://discord.gg/GsRgsTD">
    <img src="https://img.shields.io/badge/chat-on%20discord-brightgreen.svg">
  </a>
  
  <a href="https://github.com/tronprotocol/tron-web/issues">
    <img src="https://img.shields.io/github/issues/tronprotocol/tron-web.svg">
  </a>
  
  <a href="https://github.com/tronprotocol/tron-web/pulls">
    <img src="https://img.shields.io/github/issues-pr/tronprotocol/tron-web.svg">
  </a>
  
  <a href="https://github.com/tronprotocol/tron-web/graphs/contributors"> 
    <img src="https://img.shields.io/github/contributors/tronprotocol/tron-web.svg">
  </a>
  
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/tronprotocol/tron-web.svg">
  </a>
</p>

## What is TronWeb?

__[Tron Web - Developer Document](https://developers.tron.network/docs/tron-web-intro)__

TronWeb aims to deliver a unified, seamless development experience influenced by Ethereum's [Web3](https://github.com/ethereum/web3.js/) implementation. We have taken the core ideas and expanded upon it to unlock the functionality of TRON's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

You can access either version specifically from the `dist/` folder.

TronWeb is also compatible with frontend frameworks such as Angular, React and Vue.

You can also ship TronWeb in a Chrome extension.

## Installation

```
npm install tronweb
```

## Example

To look at the examples, first clone this repo, install the dependencies and run the example:
```
git clone https://github.com/tronprotocol/tron-web.git
cd tron-web
yarn
yarn build -d
yarn example
```
The example is at `examples/server/index.js`.

## TRON provides a private network to test with

* Full Node - https://api.shasta.trongrid.io
* Solidity Node - https://api.shasta.trongrid.io
* Event Server - https://api.shasta.trongrid.io
* Block Explorer - https://explorer.shasta.trongrid.io

* You can also set up your own private network, but you need to solve cross-domain CORS. The following example in Node reads from a full node listening on 16667 and a solidity node listening on 16668, and exposes the ports 8090 and 8091 with the needed headers.

```
var express = require('express');
var proxy = require('http-proxy-middleware');

function onProxyRes(proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  console.log(req.originalUrl)
}

var fullnode = express();
fullnode.use('/', proxy({
  target: 'http://127.0.0.1:16667',
  changeOrigin: true,
  onProxyRes
}));
fullnode.listen(8090);

var soliditynode = express();
soliditynode.use('/', proxy({
  target: 'http://127.0.0.1:16668',
  changeOrigin: true,
  onProxyRes,
  onError
}));
soliditynode.listen(8091);
```


## Creating an Instance

First off, in your javascript file, define TronWeb:

```js
const TronWeb = require('tronweb')
```
Specify the API endpoints:
```js
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.trongrid.io:'); // Solidity node http endpoint
const eventServer = 'https://api.trongrid.io'; // Contract events http endpoint
```
The provider above is optional, you can just use a url for the nodes instead, like here:

```js
const fullNode = 'https://api.trongrid.io';
const solidityNode = 'https://api.trongrid.io';
const eventServer = 'https://api.trongrid.io/';
```
Now, instance a tronWeb object:
```js
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
```
#### A full example:
```js
const TronWeb = require('tronweb')

const HttpProvider = TronWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider('https://api.trongrid.io'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.trongrid.io'); // Solidity node http endpoint
const eventServer = 'https://api.trongrid.io/'; // Contract events http endpoint

const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);


async function getBalance() {

    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

    // The majority of the function calls are asynchronus,
    // meaning that they cannot return the result instantly.
    // These methods therefore return a promise, which you can await.
    const balance = await tronWeb.trx.getBalance(address);
    console.log({balance});

    // You can also bind a `then` and `catch` method.
    tronWeb.trx.getBalance(address).then(balance => {
        console.log({balance});
    }).catch(err => console.error(err));

    // If you'd like to use a similar API to Web3, provide a callback function.
    tronWeb.trx.getBalance(address, (err, balance) => {
        if (err)
            return console.error(err);

        console.log({balance});
    });
}

getBalance();

```
#### Note:

For testing TronWeb API functions, it would be best to setup a private network on your local machine using the <a href="https://developers.tron.network/docs/getting-started-1" target="_blank">TRON Docker Quickstart guide</a>. The Docker guide sets up a Full Node, Solidity Node, and Event Server on your machine. You can then deploy smart contracts on your network and interact with them via TronWeb. If you wish to test TronWeb with other users, it would be best to deploy your contracts/DApps on the Shasta test network and interact from there.  
