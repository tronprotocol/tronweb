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
The easiest way to instantiate tronWeb is to run
```js
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
    },
    privateKey
)
```
but you can continue to use the old way:
```js
const tronWeb = new TronWeb({
    fullNode,
    solidityNode,
    eventServer,
    privateKey
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

## Licence

TronWeb is distributed under a MIT licence.
