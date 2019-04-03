<h1 align="center">
  <img align="center" src="https://raw.githubusercontent.com/tronprotocol/tron-web/master/assets/TronWeb-logo.png" width="400"/>
</h1>

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

You can access either version specifically from the [dist](dist) folder.

TronWeb is also compatible with frontend frameworks such as:
- Angular 
- React
- Vue.

You can also ship TronWeb in a Chrome extension.

## Installation

### Node.js
```bash
npm install tronweb
```
or
```bash
yarn add tronweb
```

### Browser
First, don't use the release section of this repo, it has not updated in a long time.

Then easiest way to use TronWeb in a browser is to install it as above and copy the dist file to your working folder. For example:
```
cp node_modules/tronweb/dist/TronWeb.js ./js/tronweb.js
```
so that you can call it in your HTML page as
```
<script src="./js/tronweb.js"><script>
```

## Testnet

Shasta is the official Tron testnet. To use it use the following endpoint:
```
https://api.shasta.trongrid.io
```
Get some Shasta TRX at https://www.trongrid.io/shasta and play with it.
Anything you do should be explorable on https://shasta.tronscan.org

## Your local private network for heavy testing

You can set up your own private network, running Tron Quickstart. To do it you must [install Docker](https://docs.docker.com/install/) and, when ready, run a command like

```bash
docker run -it --rm \
  -p 9090:9090 \
  -e "defaultBalance=100000" \
  -e "showQueryString=true" \
  -e "showBody=true" \
  -e "formatJson=true" \
  --name tron \
  trontools/quickstart
```

[More details about Tron Quickstart on GitHub](https://github.com/tronprotocol/docker-tron-quickstart)

## Creating an Instance

First off, in your javascript file, define TronWeb:

```js
const TronWeb = require('tronweb')
```

When you instantiate TronWeb you can define

* fullNode
* solidityNode
* eventServer
* privateKey

you can also set a

* fullHost

which works as a jolly. If you do so, though, the more precise specification has priority.
Supposing you are using a server which provides everything, like TronGrid, you can instantiate TronWeb as:

```js
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    privateKey: 'your private key'
})
```

For retro-compatibility, though, you can continue to use the old approach, where any parameter is passed separately:
```js
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey)

```

If you are, for example, using a server as full and solidity node, and another server for the events, you can set it as:

```js
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    eventServer: 'https://api.someotherevent.io',
    privateKey: 'your private key'
  }
)
```

If you are using different servers for anything, you can do
```js
const tronWeb = new TronWeb({
    fullNode: 'https://some-node.tld',
    solidityNode: 'https://some-other-node.tld'
    eventServer: 'https://some-event-server.tld',
    privateKey: 'your private key'
  }
)
```

## A full example

The better way to understand how to work with Tron is to clone the [MetaCoin example](https://github.com/Tronbox-boxes/metacoin-box) and follow the instructions at
https://github.com/Tronbox-boxes/metacoin-box

## Contributions

In order to contribute you can

* fork this repo and clone it locally
* install the dependencies — `npm i`
* do your changes to the code
* build the TronWeb dist files — `npm run build`
* run a local private network using Tron Quickstart
* run the tests — `npm test:node`
* push your changes and open a pull request

## Recent History

__2.3.7__
* Get rid of jssha to reduce the size of the package a little bit.

__2.3.6__
* Supports `/wallet/getapprovedlist` and `/wallet/getsignweight` JavaTron API.
* Adds test for multi-sign workflow.

__2.3.5__
* Fixes a typo in `#event.getEventsByContractAddress` naming.

__2.3.4__
* Adds options to `#plugin.register` to pass parameters to `pluginInterface`.

__2.3.3__
* Adds filters during event watching.

__2.3.2__
* Removes mixed approach instantiating tronWeb. Before you could pass the servers as an object, and the privateKey as a separate parameter. Now, you pass them either in the options object or in the params.

__2.3.1__
* Adds support for not-tld domain, like http://localhost
* Improve the new format, allow passing the privateKey as a property in the option object

__2.3.0__
* Introduces new format to instantiate tronWeb, passing an options object instead that `fullNode`, `solidityNode` and `eventServer` as separate params
* Fixes bug in `_watch` which causes a continuous update of the `since` parameter

## Licence

TronWeb is distributed under a MIT licence.
