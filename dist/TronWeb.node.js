module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TronWeb; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lib_providers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib/providers */ "./src/lib/providers/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! js-sha3 */ "js-sha3");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(js_sha3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib/transactionBuilder */ "./src/lib/transactionBuilder.js");
/* harmony import */ var lib_trx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib/trx */ "./src/lib/trx.js");
/* harmony import */ var lib_witness__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lib/witness */ "./src/lib/witness.js");
/* harmony import */ var lib_contract__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lib/contract */ "./src/lib/contract/index.js");











class TronWeb {
  constructor(fullNode, solidityNode, eventServer = false, privateKey = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isString(fullNode)) fullNode = new lib_providers__WEBPACK_IMPORTED_MODULE_2__["default"].HttpProvider(fullNode);
    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isString(solidityNode)) solidityNode = new lib_providers__WEBPACK_IMPORTED_MODULE_2__["default"].HttpProvider(solidityNode);
    this.setFullNode(fullNode);
    this.setSolidityNode(solidityNode);
    this.setEventServer(eventServer);
    this.providers = lib_providers__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.BigNumber = bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a;
    this.defaultBlock = false;
    this.defaultPrivateKey = false;
    this.defaultAddress = {
      hex: false,
      base58: false
    };
    ['sha3', 'toHex', 'toUtf8', 'fromUtf8', 'toAscii', 'fromAscii', 'toDecimal', 'fromDecimal', 'toSun', 'fromSun', 'toBigNumber', 'isAddress', 'compile', 'createAccount', 'address'].forEach(key => {
      this[key] = TronWeb[key];
    });
    if (privateKey) this.setPrivateKey(privateKey);
    this.transactionBuilder = new lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_7__["default"](this);
    this.trx = new lib_trx__WEBPACK_IMPORTED_MODULE_8__["default"](this);
    this.witness = new lib_witness__WEBPACK_IMPORTED_MODULE_9__["default"](this);
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_3__["default"].promiseInjector(this);
  }

  setDefaultBlock(blockID = false) {
    if (blockID === false || blockID == 'latest' || blockID == 'earliest') return this.defaultBlock = blockID;
    if (!utils__WEBPACK_IMPORTED_MODULE_3__["default"].isInteger(blockID) || !blockID) throw new Error('Invalid block ID provided');
    this.defaultBlock = +blockID;
  }

  setPrivateKey(privateKey) {
    // Set address first as it clears the private key
    this.setAddress(this.address.fromPrivateKey(privateKey)); // TODO: Validate private key

    this.defaultPrivateKey = privateKey;
  }

  setAddress(address) {
    if (!this.isAddress(address)) throw new Error('Invalid address provided');
    const hex = this.address.toHex(address);
    const base58 = this.address.fromHex(address);
    if (this.defaultPrivateKey && this.address.fromPrivateKey !== hex) this.defaultPrivateKey = false;
    this.defaultAddress = {
      hex,
      base58
    };
  }

  isValidProvider(provider) {
    return Object.values(lib_providers__WEBPACK_IMPORTED_MODULE_2__["default"]).some(knownProvider => provider instanceof knownProvider);
  }

  isEventServerConnected() {
    if (!this.eventServer) return false;
    return axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(this.eventServer).then(({
      data
    }) => {
      return utils__WEBPACK_IMPORTED_MODULE_3__["default"].hasProperty(data, '_links');
    }).catch(() => false);
  }

  setFullNode(fullNode) {
    if (!this.isValidProvider(fullNode)) throw new Error('Invalid full node provided');
    this.fullNode = fullNode;
    this.fullNode.setStatusPage('wallet/getnowblock');
  }

  setSolidityNode(solidityNode) {
    if (!this.isValidProvider(solidityNode)) throw new Error('Invalid solidity node provided');
    this.solidityNode = solidityNode;
    this.solidityNode.setStatusPage('walletsolidity/getnowblock');
  }

  setEventServer(eventServer = false) {
    if (eventServer !== false && !utils__WEBPACK_IMPORTED_MODULE_3__["default"].isValidURL(eventServer)) throw new Error('Invalid URL provided for event server');
    this.eventServer = eventServer;
  }

  currentProviders() {
    return {
      fullNode: this.fullNode,
      solidityNode: this.solidityNode,
      eventServer: this.eventServer
    };
  }

  currentProvider() {
    return this.currentProviders();
  }

  getEventResult(contractAddress = false, eventName = false, blockNumber = false, callback = false) {
    if (!callback) return this.injectPromise(this.getEventResult, contractAddress, eventName, blockNumber);
    if (!this.eventServer) callback('No event server configured');
    const routeParams = [];
    if (!this.isAddress(contractAddress)) return callback('Invalid contract address provided');
    if (eventName && !contractAddress) return callback('Usage of event name filtering requires a contract address');
    if (blockNumber && !eventName) return callback('Usage of block number filtering requires an event name');
    if (contractAddress) routeParams.push(this.address.fromHex(contractAddress));
    if (eventName) routeParams.push(eventName);
    if (blockNumber) routeParams.push(blockNumber);
    return axios__WEBPACK_IMPORTED_MODULE_4___default()(`${this.eventServer}/event/contract/${routeParams.join('/')}`).then(({
      data = false
    }) => {
      if (!data) return callback('Unknown error occurred');
      if (!utils__WEBPACK_IMPORTED_MODULE_3__["default"].isArray(data)) return callback(data);
      return callback(null, data.map(event => utils__WEBPACK_IMPORTED_MODULE_3__["default"].mapEvent(event)));
    }).catch(err => callback(err.response.data || err));
  }

  getEventByTransacionID(transactionID = false, callback = false) {
    if (!callback) return this.injectPromise(this.getEventByTransacionID, transactionID);
    if (!this.eventServer) callback('No event server configured');
    return axios__WEBPACK_IMPORTED_MODULE_4___default()(`${this.eventServer}/event/transaction/${transactionID}`).then(({
      data = false
    }) => {
      if (!data) return callback('Unknown error occurred');
      if (!utils__WEBPACK_IMPORTED_MODULE_3__["default"].isArray(data)) return callback(data);
      return callback(null, data.map(event => utils__WEBPACK_IMPORTED_MODULE_3__["default"].mapEvent(event)));
    }).catch(err => callback(err.response.data || err));
  }

  contract(abi = [], address = false) {
    return new lib_contract__WEBPACK_IMPORTED_MODULE_10__["default"](this, abi, address);
  }

  static get address() {
    return {
      fromHex(address) {
        if (!utils__WEBPACK_IMPORTED_MODULE_3__["default"].isHex(address)) return address;
        return utils__WEBPACK_IMPORTED_MODULE_3__["default"].crypto.getBase58CheckAddress(utils__WEBPACK_IMPORTED_MODULE_3__["default"].code.hexStr2byteArray(address));
      },

      toHex(address) {
        if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isHex(address)) return address.toLowerCase();
        return utils__WEBPACK_IMPORTED_MODULE_3__["default"].code.byteArray2hexStr(utils__WEBPACK_IMPORTED_MODULE_3__["default"].crypto.decodeBase58Address(address)).toLowerCase();
      },

      fromPrivateKey(privateKey) {
        try {
          return utils__WEBPACK_IMPORTED_MODULE_3__["default"].crypto.pkToAddress(privateKey);
        } catch (_unused) {
          return false;
        }
      }

    };
  }

  static sha3(string) {
    return Object(js_sha3__WEBPACK_IMPORTED_MODULE_6__["sha3_256"])(string);
  }

  static toHex(val) {
    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isBoolean(val)) return TronWeb.fromDecimal(+val);
    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isBigNumber(val)) return TronWeb.fromDecimal(val);
    if (typeof val === 'object') return TronWeb.fromUtf8(JSON.stringify(val));

    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isString(val)) {
      if (val.indexOf('-0x') === 0) return TronWeb.fromDecimal(val);
      if (val.indexOf('0x') === 0) return val;
      if (!isFinite(val)) return TronWeb.fromUtf8(val);
    }

    return TronWeb.fromDecimal(val);
  }

  static toUtf8(hex) {
    return Buffer.from(hex, 'hex').toString('utf8');
  }

  static fromUtf8(string) {
    return Buffer.from(string, 'utf8').toString('hex');
  }

  static toAscii(hex) {
    return Buffer.from(hex, 'hex').toString('ascii');
  }

  static fromAscii(string, padding) {
    return Buffer.from(string, 'ascii').toString('hex').padEnd(padding, '0');
  }

  static toDecimal(value) {
    return TronWeb.toBigNumber(value).toNumber();
  }

  static fromDecimal(value) {
    const number = TronWeb.toBigNumber(value);
    const result = number.toString(16);
    return number.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
  }

  static fromSun(sun) {
    const trx = TronWeb.toBigNumber(trx).div(1000000);
    return utils__WEBPACK_IMPORTED_MODULE_3__["default"].isBigNumber(sun) ? trx : trx.toString(10);
  }

  static toSun(trx) {
    const sun = TronWeb.toBigNumber(trx).times(1000000);
    return utils__WEBPACK_IMPORTED_MODULE_3__["default"].isBigNumber(trx) ? sun : sun.toString(10);
  }

  static toBigNumber(amount = 0) {
    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isBigNumber(amount)) return amount;
    if (utils__WEBPACK_IMPORTED_MODULE_3__["default"].isString(amount) && (amount.indexOf('0x') === 0 || amount.indexOf('-0x') === 0)) return new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(amount.replace('0x', ''), 16);
    return new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(amount.toString(10), 10);
  }

  static isAddress(address = false) {
    if (!utils__WEBPACK_IMPORTED_MODULE_3__["default"].isString(address)) return false; // Convert HEX to Base58

    if (address.length === 42) {
      return TronWeb.isAddress(utils__WEBPACK_IMPORTED_MODULE_3__["default"].crypto.getBase58CheckAddress(utils__WEBPACK_IMPORTED_MODULE_3__["default"].code.hexStr2byteArray(address)));
    }

    return utils__WEBPACK_IMPORTED_MODULE_3__["default"].crypto.isAddressValid(address);
  } // TODO


  static compile(solditySource) {}

  static async createAccount(callback = false) {
    const account = utils__WEBPACK_IMPORTED_MODULE_3__["default"].accounts.generateAccount();
    if (callback) callback(null, account);
    return account;
  }

  async isConnected(callback = false) {
    if (!callback) return this.injectPromise(this.isConnected);
    callback(null, {
      fullNode: await this.fullNode.isConnected(),
      solidityNode: await this.solidityNode.isConnected(),
      eventServer: await this.isEventServerConnected()
    });
  }

}

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(TronWeb, "providers", lib_providers__WEBPACK_IMPORTED_MODULE_2__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(TronWeb, "BigNumber", bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a);

;

/***/ }),

/***/ "./src/lib/contract/index.js":
/*!***********************************!*\
  !*** ./src/lib/contract/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Contract; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! index */ "./src/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var _method__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./method */ "./src/lib/contract/method.js");




class Contract {
  constructor(tronWeb = false, abi = [], address = false) {
    if (!tronWeb || !tronWeb instanceof index__WEBPACK_IMPORTED_MODULE_1__["default"]) throw new Error('Expected instance of TronWeb');
    this.tronWeb = tronWeb;
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_2__["default"].promiseInjector(this);
    this.address = address;
    this.abi = abi;
    this.eventListener = false;
    this.bytecode = false;
    this.deployed = false;
    this.lastBlock = false;
    this.methods = {};
    if (this.tronWeb.isAddress(address)) this.deployed = true;else this.address = false;
    this.loadAbi(abi);
  }

  async _getEvents() {
    const events = await this.tronWeb.getEventResult(this.address);
    const [latestEvent] = events.sort((a, b) => b.block - a.block);
    const newEvents = events.filter((event, index) => {
      const duplicate = events.slice(0, index).some(priorEvent => JSON.stringify(priorEvent) == JSON.stringify(event));
      if (duplicate) return false;
      if (!this.lastBlock) return true;
      return event.block > this.lastBlock;
    });
    if (latestEvent) this.lastBlock = latestEvent.block;
    return newEvents;
  }

  async _startEventListener(callback) {
    if (this.eventListener) clearInterval(this.eventListener);
    if (!this.tronWeb.eventServer) throw new Error('Event server is not configured');
    if (!this.address) throw new Error('Contract is not configured with an address');
    this.eventCallback = callback;
    await this._getEvents();
    this.eventListener = setInterval(() => {
      this._getEvents().then(newEvents => newEvents.forEach(event => {
        this.eventCallback && this.eventCallback(event);
      })).catch(err => {
        console.error('Failed to get event list', err);
      });
    }, 3000);
  }

  _stopEventListener() {
    if (!this.eventListener) return;
    clearInterval(this.eventListener);
    this.eventListener = false;
    this.eventCallback = false;
  }

  loadAbi(abi) {
    this.abi = abi;
    this.methods = {};
    abi.forEach(func => {
      const method = new _method__WEBPACK_IMPORTED_MODULE_3__["default"](this, func);
      const methodCall = method.onMethod.bind(method);
      this.methods[method.name] = methodCall;
      this.methods[method.functionSelector] = methodCall;
      this.methods[method.signature] = methodCall;
    });
  }

  async new(options, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(privateKey)) {
      callback = privateKey;
      privateKey = this.tronWeb.defaultPrivateKey;
    }

    if (!callback) return this.injectPromise(this.new, options, privateKey);

    try {
      const address = this.tronWeb.address.fromPrivateKey(privateKey);
      const transaction = await this.tronWeb.transactionBuilder.createSmartContract(options, address);
      const signedTransaction = await this.tronWeb.trx.sign(transaction, privateKey);
      const contract = await this.tronWeb.trx.sendRawTransaction(signedTransaction);
      if (!contract.result) return callback('Unknown error: ' + JSON.stringify(contract, null, 2));
      return this.at(signedTransaction.contract_address, callback);
    } catch (ex) {
      return callback(ex);
    }
  }

  async at(contractAddress, callback = false) {
    if (!callback) return this.injectPromise(this.at, contractAddress);

    try {
      const contract = await this.tronWeb.trx.getContract(contractAddress);
      if (!contract.contract_address) callback('Unknown error: ' + JSON.stringify(contract, null, 2));
      this.address = contract.contract_address;
      this.bytecode = contract.bytecode;
      this.deployed = true;
      this.loadAbi(contract.abi.entrys);
      callback(null, this);
    } catch (ex) {
      if (ex.toString().includes('does not exist')) return callback('Contract has not been deployed on the network');
      return callback(ex);
    }
  }

  events(callback = false) {
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(callback)) throw new Error('Callback function expected');
    const self = this;
    return {
      start(startCallback = false) {
        if (!startCallback) {
          self._startEventListener(callback);

          return this;
        }

        self._startEventListener(callback).then(() => {
          startCallback();
        }).catch(err => {
          startCallback(err);
        });

        return this;
      },

      stop() {
        self._stopEventListener();
      }

    };
  }

}

/***/ }),

/***/ "./src/lib/contract/method.js":
/*!************************************!*\
  !*** ./src/lib/contract/method.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Method; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");



const abiCoder = new ethers__WEBPACK_IMPORTED_MODULE_1___default.a.utils.AbiCoder();

const getFunctionSelector = abi => {
  return abi.name + '(' + getParamTypes(abi.inputs || []).join(',') + ')';
};

const getParamTypes = params => {
  return params.map(({
    type
  }) => type);
};

const decodeOutput = (abi, output) => {
  if (abi.some(output => utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperty(output, 'name'))) {
    return abiCoder.decode(abi.map(({
      name
    }) => name), abi.map(({
      type
    }) => type), output);
  }

  return abiCoder.decode(abi.map(({
    type
  }) => type), output);
};

class Method {
  constructor(contract, abi) {
    this.tronWeb = contract.tronWeb;
    this.contract = contract;
    this.abi = abi;
    this.name = abi.name;
    this.inputs = abi.inputs || [];
    this.outputs = abi.outputs || [];
    this.signature = this.tronWeb.sha3(abi.name).slice(0, 8);
    this.functionSelector = getFunctionSelector(abi);
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_2__["default"].promiseInjector(this);
    this.defaultOptions = {
      feeLimit: 1000000000,
      callValue: 0,
      from: this.tronWeb.defaultAddress.hex,
      // Only used for send()
      shouldPollResponse: false // Only used for sign()

    };
  }

  onMethod(...args) {
    const types = getParamTypes(this.inputs);
    args.forEach((arg, index) => {
      if (types[index] == 'address') args[index] = this.tronWeb.address.toHex(arg).replace(/^(41)/, '0x');
    });
    return {
      call: (...methodArgs) => this._call(types, args, methodArgs),
      send: (...methodArgs) => this._send(types, args, methodArgs),
      watch: (...methodArgs) => this._watch(...methodArgs)
    };
  }

  async _call(types, args, options = {}, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(options)) {
      callback = options;
      options = {};
    }

    if (!callback) return this.injectPromise(this._call, types, args, options);
    if (types.length !== args.length) return callback('Invalid argument count provided');
    if (!this.contract.address) return callback('Smart contract is missing address');
    if (!this.contract.deployed) return callback('Calling smart contracts requires you to load the contract first');
    const {
      stateMutability
    } = this.abi;
    if (!['pure', 'view'].includes(stateMutability.toLowerCase())) return callback(`Methods with state mutability "${stateMutability}" must use send()`);
    options = { ...this.defaultOptions,
      ...options
    };
    const parameters = args.map((value, index) => ({
      type: types[index],
      value
    }));
    this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address, this.functionSelector, options.feeLimit, options.callValue, parameters, this.tronWeb.address.toHex(options.from), (err, transaction) => {
      if (err) return callback(err);
      if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperty(transaction, 'constant_result')) return callback('Failed to execute');

      try {
        let output = decodeOutput(this.outputs, '0x' + transaction.constant_result[0]);
        if (output.length === 1) output = output[0];
        return callback(null, output);
      } catch (ex) {
        return callback(ex);
      }
    });
  }

  async _send(types, args, options = {}, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(privateKey)) {
      callback = privateKey;
      privateKey = this.tronWeb.defaultPrivateKey;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(options)) {
      callback = options;
      options = {};
    }

    if (!callback) return this.injectPromise(this._send, types, args, options, privateKey);
    if (types.length !== args.length) throw new Error('Invalid argument count provided');
    if (!this.contract.address) return callback('Smart contract is missing address');
    if (!this.contract.deployed) return callback('Calling smart contracts requires you to load the contract first');
    if (!privateKey || !utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(privateKey)) return callback('Invalid private key provided');
    const {
      stateMutability
    } = this.abi;
    if (['pure', 'view'].includes(stateMutability.toLowerCase())) return callback(`Methods with state mutability "${stateMutability}" must use call()`);
    options = { ...this.defaultOptions,
      ...options
    };
    const parameters = args.map((value, index) => ({
      type: types[index],
      value
    }));

    try {
      const address = this.tronWeb.address.fromPrivateKey(privateKey);
      const transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address, this.functionSelector, options.feeLimit, options.callValue, parameters, this.tronWeb.address.toHex(address));
      if (!transaction.result || !transaction.result.result) return callback('Unknown error: ' + JSON.stringify(transaction, null, 2));
      const signedTransaction = await this.tronWeb.trx.sign(transaction.transaction, privateKey);
      const broadcast = await this.tronWeb.trx.sendRawTransaction(signedTransaction);
      if (!broadcast.result) return callback('Unknown error: ' + JSON.stringify(broadcast, null, 2));
      if (!options.shouldPollResponse) return callback(null, signedTransaction.txID);

      const checkResult = async (index = 0) => {
        if (index == 20) return callback(null, signedTransaction.txID);
        const output = await this.tronWeb.trx.getTransactionInfo(signedTransaction.txID);

        if (!Object.keys(output).length) {
          return setTimeout(() => {
            checkResult(index + 1);
          }, 3000);
        }

        if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperty(output, 'contractResult')) return callback('Failed to execute: ' + JSON.stringify(output, null, 2));
        let decoded = decodeOutput(this.outputs, '0x' + output.contractResult[0]);
        if (decoded.length === 1) decoded = decoded[0];
        return callback(null, decoded);
      };

      checkResult();
    } catch (ex) {
      return callback(ex);
    }
  }

  async _watch(callback = false) {
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(callback)) throw new Error('Expected callback to be provided');
    if (!this.contract.address) return callback('Smart contract is missing address');
    if (this.abi.type.toLowerCase() !== 'event') return callback('Invalid method type for event watching');
    if (!this.tronWeb.eventServer) return callback('No event server configured');
    let listener = false;
    let lastBlock = false;

    const getEvents = async () => {
      try {
        const events = await this.tronWeb.getEventResult(this.contract.address, this.name);
        const [latestEvent] = events.sort((a, b) => b.block - a.block);
        const newEvents = events.filter((event, index) => {
          const duplicate = events.slice(0, index).some(priorEvent => JSON.stringify(priorEvent) == JSON.stringify(event));
          if (duplicate) return false;
          if (!lastBlock) return true;
          return event.block > lastBlock;
        });
        if (latestEvent) lastBlock = latestEvent.block;
        return newEvents;
      } catch (ex) {
        return Promise.reject(ex);
      }
    };

    const bindListener = () => {
      if (listener) clearInterval(listener);
      listener = setInterval(() => {
        getEvents().then(events => events.forEach(event => {
          callback(null, utils__WEBPACK_IMPORTED_MODULE_2__["default"].parseEvent(event, this.abi));
        })).catch(err => callback(err));
      }, 3000);
    };

    await getEvents();
    bindListener();
    return {
      start: bindListener(),
      stop: () => {
        if (!listener) return;
        clearInterval(listener);
        listener = false;
      }
    };
  }

}

/***/ }),

/***/ "./src/lib/providers/HttpProvider.js":
/*!*******************************************!*\
  !*** ./src/lib/providers/HttpProvider.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HttpProvider; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");



class HttpProvider {
  constructor(host, timeout = 30000, user = false, password = false, headers = {}, statusPage = '/') {
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isValidURL(host)) throw new Error('Invalid URL provided to HttpProvider');
    if (isNaN(timeout) || timeout < 0) throw new Error('Invalid timeout duration provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isObject(headers)) throw new Error('Invalid headers object provided');
    if (host.charAt(host.length - 1) === '/') host = host.substr(0, host.length - 2);
    this.host = host;
    this.timeout = timeout;
    this.user = user;
    this.password = password;
    this.headers = headers;
    this.statusPage = statusPage;
    this.instance = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
      baseURL: host,
      timeout: timeout,
      headers: headers,
      auth: user && {
        user,
        password
      }
    });
  }

  setStatusPage(statusPage = '/') {
    this.statusPage = statusPage;
  }

  async isConnected(statusPage = this.statusPage) {
    return this.request(statusPage).then(data => {
      return utils__WEBPACK_IMPORTED_MODULE_2__["default"].hasProperties(data, 'blockID', 'block_header');
    }).catch(() => false);
  }

  request(url, payload = {}, method = 'get') {
    method = method.toLowerCase();
    return this.instance.request({
      data: method == 'post' && payload,
      params: method == 'get' && payload,
      url,
      method
    }).then(({
      data
    }) => data);
  }

}
;

/***/ }),

/***/ "./src/lib/providers/index.js":
/*!************************************!*\
  !*** ./src/lib/providers/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HttpProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpProvider */ "./src/lib/providers/HttpProvider.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  HttpProvider: _HttpProvider__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "./src/lib/transactionBuilder.js":
/*!***************************************!*\
  !*** ./src/lib/transactionBuilder.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionBuilder; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! index */ "./src/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_3__);




class TransactionBuilder {
  constructor(tronWeb = false) {
    if (!tronWeb || !tronWeb instanceof index__WEBPACK_IMPORTED_MODULE_1__["default"]) throw new Error('Expected instance of TronWeb');
    this.tronWeb = tronWeb;
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_2__["default"].promiseInjector(this);
  }

  sendTrx(to = false, amount = 0, from = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(from)) {
      callback = from;
      from = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.sendTrx, to, amount, from);
    if (!this.tronWeb.isAddress(to)) return callback('Invalid recipient address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
    if (!this.tronWeb.isAddress(from)) return callback('Invalid origin address provided');
    to = this.tronWeb.address.toHex(to);
    from = this.tronWeb.address.toHex(from);
    if (to === from) return callback('Cannot transfer TRX to the same account');
    this.tronWeb.fullNode.request('wallet/createtransaction', {
      to_address: to,
      owner_address: from,
      amount: parseInt(amount)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  sendToken(to = false, amount = 0, tokenID = false, from = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(from)) {
      callback = from;
      from = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.sendToken, to, amount, tokenID, from);
    if (!this.tronWeb.isAddress(to)) return callback('Invalid recipient address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(tokenID) || !tokenID.length) return callback('Invalid token ID provided');
    if (!this.tronWeb.isAddress(from)) return callback('Invalid origin address provided');
    to = this.tronWeb.address.toHex(to);
    tokenID = this.tronWeb.fromUtf8(tokenID);
    from = this.tronWeb.address.toHex(from);
    if (to === from) return callback('Cannot transfer tokens to the same account');
    this.tronWeb.fullNode.request('wallet/transferasset', {
      to_address: to,
      owner_address: from,
      asset_name: tokenID,
      amount: parseInt(amount)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  purchaseToken(issuerAddress = false, tokenID = false, amount = 0, buyer = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(buyer)) {
      callback = buyer;
      buyer = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.purchaseToken, issuerAddress, tokenID, amount, buyer);
    if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(tokenID) || !tokenID.length) return callback('Invalid token ID provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
    if (!this.tronWeb.isAddress(buyer)) return callback('Invalid buyer address provided');
    this.tronWeb.fullNode.request('wallet/participateassetissue', {
      to_address: this.tronWeb.address.toHex(issuerAddress),
      owner_address: this.tronWeb.address.toHex(buyer),
      asset_name: this.tronWeb.fromUtf8(tokenID),
      amount: parseInt(amount)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  freezeBalance(address = this.tronWeb.defaultAddress.hex, amount = 0, duration = 3, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(duration)) {
      callback = duration;
      duration = 3;
    }

    if (!callback) return this.injectPromise(this.freezeBalance, address, amount, duration);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(duration) || duration < 3) return callback('Invalid duration provided, minimum of 3 days');
    this.tronWeb.fullNode.request('wallet/freezebalance', {
      owner_address: this.tronWeb.address.toHex(address),
      frozen_balance: parseInt(amount),
      frozen_duration: parseInt(duration)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  unfreezeBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.unfreezeBalance, address);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    this.tronWeb.fullNode.request('wallet/unfreezebalance', {
      owner_address: this.tronWeb.address.toHex(address)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  withdrawBlockRewards(address = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.withdrawBlockRewards, address);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    this.tronWeb.fullNode.request('wallet/withdrawbalance', {
      owner_address: this.tronWeb.address.toHex(address)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  applyForSR(address = this.tronWeb.defaultAddress.hex, url = false, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isValidURL(address)) {
      callback = url || false;
      url = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.applyForSR, address, url);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isValidURL(url)) return callback('Invalid url provided');
    this.tronWeb.fullNode.request('wallet/createwitness', {
      owner_address: this.tronWeb.address.toHex(address),
      url: this.tronWeb.fromUtf8(url)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  vote(votes = {}, voterAddress = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(voterAddress)) {
      callback = voterAddress;
      voterAddress = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.vote, votes, voterAddress);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isObject(votes) || !Object.keys(votes).length) return callback('Invalid votes object provided');
    if (!this.tronWeb.isAddress(voterAddress)) return callback('Invalid voter address provided');
    let invalid = false;
    votes = Object.entries(votes).map(([srAddress, voteCount]) => {
      if (invalid) return;

      if (!this.tronWeb.isAddress(srAddress)) {
        callback('Invalid SR address provided: ' + srAddress);
        return invalid = true;
      }

      if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(voteCount) || voteCount <= 0) {
        callback('Invalid vote count provided for SR: ' + srAddress);
        return invalid = true;
      }

      return {
        vote_address: this.tronWeb.address.toHex(srAddress),
        vote_count: parseInt(voteCount)
      };
    });
    if (invalid) return;
    this.tronWeb.fullNode.request('wallet/votewitnessaccount', {
      owner_address: this.tronWeb.address.toHex(voterAddress),
      votes
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  createSmartContract(options = {}, issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(issuerAddress)) {
      callback = issuerAddress;
      issuerAddress = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.createSmartContract, options, issuerAddress);
    let {
      abi = false,
      bytecode = false,
      feeLimit = 1000000000,
      callValue = 0,
      bandwidthLimit = 0,
      parameters = []
    } = options;

    if (abi && utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(abi)) {
      try {
        abi = JSON.parse(abi);
      } catch (_unused) {
        return callback('Invalid options.abi provided');
      }
    }

    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(abi)) return callback('Invalid options.abi provided');
    const payable = abi.some(func => {
      return func.type == 'constructor' && func.payable;
    });
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isHex(bytecode)) return callback('Invalid options.bytecode provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(feeLimit) || feeLimit <= 0 || feeLimit > 1000000000) return callback('Invalid options.feeLimit provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(callValue) || callValue < 0) return callback('Invalid options.callValue provided');
    if (payable && callValue == 0) return callback('When contract is payable, options.callValue must be a positive integer');
    if (!payable && callValue > 0) return callback('When contract is not payable, options.callValue must be 0');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(bandwidthLimit) || bandwidthLimit < 0 || bandwidthLimit > 100) return callback('Invalid options.bandwidthLimit provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(parameters)) return callback('Invalid parameters provided');
    if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');

    if (parameters.length) {
      const abiCoder = new ethers__WEBPACK_IMPORTED_MODULE_3___default.a.utils.AbiCoder();
      const types = [];
      const values = [];

      for (let i = 0; i < parameters.length; i++) {
        let {
          type,
          value
        } = parameters[i];
        if (!type || !utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(type) || !type.length) return callback('Invalid parameter type provided: ' + type);
        if (type == 'address') value = this.tronWeb.address.toHex(value).replace(/^(41)/, '0x');
        types.push(type);
        values.push(value);
      }

      try {
        parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
      } catch (ex) {
        return callback(ex);
      }
    } else parameters = '';

    this.tronWeb.fullNode.request('wallet/deploycontract', {
      owner_address: this.tronWeb.address.toHex(issuerAddress),
      fee_limit: parseInt(feeLimit),
      call_value: parseInt(callValue),
      consume_user_resource_percent: bandwidthLimit,
      abi: JSON.stringify(abi),
      bytecode,
      parameter: parameters
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  triggerSmartContract(contractAddress, functionSelector, feeLimit = 1000000000, callValue = 0, parameters = [], issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(issuerAddress)) {
      callback = issuerAddress;
      issuerAddress = this.tronWeb.defaultAddress.hex;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(parameters)) {
      callback = parameters;
      parameters = [];
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(callValue)) {
      callback = callValue;
      callValue = 0;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(feeLimit)) {
      callback = feeLimit;
      feeLimit = 1000000000;
    }

    if (!callback) {
      return this.injectPromise(this.triggerSmartContract, contractAddress, functionSelector, feeLimit, callValue, parameters, issuerAddress);
    }

    if (!this.tronWeb.isAddress(contractAddress)) return callback('Invalid contract address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(functionSelector) || !functionSelector.length) return callback('Invalid function selector provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(callValue) || callValue < 0) return callback('Invalid call value provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(feeLimit) || feeLimit <= 0 || feeLimit > 1000000000) return callback('Invalid fee limit provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(parameters)) return callback('Invalid parameters provided');
    if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
    functionSelector = functionSelector.replace('/\s*/g', '');

    if (parameters.length) {
      const abiCoder = new ethers__WEBPACK_IMPORTED_MODULE_3___default.a.utils.AbiCoder();
      const types = [];
      const values = [];

      for (let i = 0; i < parameters.length; i++) {
        let {
          type,
          value
        } = parameters[i];
        if (!type || !utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(type) || !type.length) return callback('Invalid parameter type provided: ' + type);
        if (type == 'address') value = this.tronWeb.address.toHex(value).replace(/^(41)/, '0x');
        types.push(type);
        values.push(value);
      }

      try {
        parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
      } catch (ex) {
        return callback(ex);
      }
    } else parameters = '';

    this.tronWeb.fullNode.request('wallet/triggersmartcontract', {
      contract_address: this.tronWeb.address.toHex(contractAddress),
      owner_address: this.tronWeb.address.toHex(issuerAddress),
      function_selector: functionSelector,
      fee_limit: parseInt(feeLimit),
      call_value: parseInt(callValue),
      parameter: parameters
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);

      if (transaction.result && transaction.result.message) {
        return callback(this.tronWeb.toUtf8(transaction.result.message));
      }

      if (!transaction.result.result) return callback(transaction);
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  createToken(options = {}, issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(issuerAddress)) {
      callback = issuerAddress;
      issuerAddress = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.createToken, options, issuerAddress);
    const {
      name = false,
      abbreviation = false,
      description = false,
      url = false,
      totalSupply = 0,
      trxRatio = 1,
      // How much TRX will `tokenRatio` cost?
      tokenRatio = 1,
      // How many tokens will `trxRatio` afford?
      saleStart = Date.now(),
      saleEnd = false,
      freeBandwidth = 0,
      // The creator's "donated" bandwidth for use by token holders
      freeBandwidthLimit = 0,
      // Out of `totalFreeBandwidth`, the amount each token holder get
      frozenAmount = 0,
      frozenDuration = 0
    } = options;
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(name) || !name.length) return callback('Invalid token name provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(abbreviation) || !abbreviation.length) return callback('Invalid token abbreviation provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(totalSupply) || totalSupply <= 0) return callback('Invalid supply amount provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(trxRatio) || trxRatio <= 0) return callback('TRX ratio must be a positive integer');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(tokenRatio) || tokenRatio <= 0) return callback('Token ratio must be a positive integer');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(saleStart) || saleStart < Date.now()) return callback('Invalid sale start timestamp provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(saleEnd) || saleEnd <= saleStart) return callback('Invalid sale end timestamp provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(description) || !description.length) return callback('Invalid token description provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(url) || !url.length || !utils__WEBPACK_IMPORTED_MODULE_2__["default"].isValidURL(url)) return callback('Invalid token url provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(freeBandwidth) || freeBandwidth < 0) return callback('Invalid free bandwidth amount provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(freeBandwidthLimit) || freeBandwidthLimit < 0 || freeBandwidth && !freeBandwidthLimit) return callback('Invalid free bandwidth limit provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(frozenAmount) || frozenAmount < 0 || !frozenDuration && frozenAmount) return callback('Invalid frozen supply provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(frozenDuration) || frozenDuration < 0 || frozenDuration && !frozenAmount) return callback('Invalid frozen duration provided');
    if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
    this.tronWeb.fullNode.request('wallet/createassetissue', {
      owner_address: this.tronWeb.address.toHex(issuerAddress),
      name: this.tronWeb.fromUtf8(name),
      abbr: this.tronWeb.fromUtf8(abbreviation),
      description: this.tronWeb.fromUtf8(description),
      url: this.tronWeb.fromUtf8(url),
      total_supply: parseInt(totalSupply),
      trx_num: parseInt(trxRatio),
      num: parseInt(tokenRatio),
      start_time: parseInt(saleStart),
      end_time: parseInt(saleEnd),
      free_asset_net_limit: parseInt(freeBandwidth),
      public_free_asset_net_limit: parseInt(freeBandwidthLimit),
      frozen_supply: {
        frozen_amount: parseInt(frozenAmount),
        frozen_days: parseInt(frozenDuration)
      }
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);

      if (transaction.result && transaction.result.message) {
        return callback(this.tronWeb.toUtf8(transaction.result.message));
      }

      callback(null, transaction);
    }).catch(err => callback(err));
  }

  updateToken(options = {}, issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(issuerAddress)) {
      callback = issuerAddress;
      issuerAddress = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.updateToken, options, issuerAddress);
    const {
      description = false,
      url = false,
      freeBandwidth = 0,
      // The creator's "donated" bandwidth for use by token holders
      freeBandwidthLimit = 0 // Out of `totalFreeBandwidth`, the amount each token holder get

    } = options;
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(freeBandwidth) || freeBandwidth < 0) return callback('Invalid free bandwidth amount provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(freeBandwidthLimit) || freeBandwidthLimit < 0 || freeBandwidth && !freeBandwidthLimit) return callback('Invalid free bandwidth limit provided');
    if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
    this.tronWeb.fullNode.request('wallet/updateasset', {
      owner_address: this.tronWeb.address.toHex(issuerAddress),
      description: this.tronWeb.fromUtf8(description),
      url: this.tronWeb.fromUtf8(url),
      new_limit: parseInt(freeBandwidth),
      new_public_limit: parseInt(freeBandwidthLimit)
    }, 'post').then(transaction => {
      if (transaction.Error) return callback(transaction.Error);

      if (transaction.result && transaction.result.message) {
        return callback(this.tronWeb.toUtf8(transaction.result.message));
      }

      callback(null, transaction);
    }).catch(err => callback(err));
  }

  sendAsset(...args) {
    return this.sendToken(...args);
  }

  purchaseAsset(...args) {
    return this.purchaseToken(...args);
  }

  createAsset(...args) {
    return this.createToken(...args);
  }

  updateAsset(...args) {
    return this.updateToken(...args);
  }

}

/***/ }),

/***/ "./src/lib/trx.js":
/*!************************!*\
  !*** ./src/lib/trx.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Trx; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! index */ "./src/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/utils/index.js");



class Trx {
  constructor(tronWeb = false) {
    if (!tronWeb || !tronWeb instanceof index__WEBPACK_IMPORTED_MODULE_1__["default"]) throw new Error('Expected instance of TronWeb');
    this.tronWeb = tronWeb;
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_2__["default"].promiseInjector(this);
  }

  parseToken(token) {
    return { ...token,
      name: this.tronWeb.toUtf8(token.name),
      abbr: token.abbr && this.tronWeb.toUtf8(token.abbr),
      description: token.description && this.tronWeb.toUtf8(token.description),
      url: token.url && this.tronWeb.toUtf8(token.url)
    };
  }

  getCurrentBlock(callback = false) {
    if (!callback) return this.injectPromise(this.getCurrentBlock);
    this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
      callback(null, block);
    }).catch(err => callback(err));
  }

  getBlock(block = this.tronWeb.defaultBlock, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(block)) {
      callback = block;
      block = this.tronWeb.defaultBlock;
    }

    if (!callback) return this.injectPromise(this.getBlock, block);
    if (block === false) return callback('No block identifier provided');
    if (block == 'earliest') block = 0;
    if (block == 'latest') return this.getCurrentBlock(callback);
    if (isNaN(block) && utils__WEBPACK_IMPORTED_MODULE_2__["default"].isHex(block)) return this.getBlockByHash(block, callback);
    this.getBlockByNumber(block, callback);
  }

  getBlockByHash(blockHash, callback = false) {
    if (!callback) return this.injectPromise(this.getBlockByHash, blockHash);
    this.tronWeb.fullNode.request('wallet/getblockbyid', {
      value: blockHash
    }, 'post').then(block => {
      if (!Object.keys(block).length) return callback('Block not found');
      callback(null, block);
    }).catch(err => callback(err));
  }

  getBlockByNumber(blockID, callback = false) {
    if (!callback) return this.injectPromise(this.getBlockByNumber, blockID);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(blockID) || blockID < 0) return callback('Invalid block number provided');
    this.tronWeb.fullNode.request('wallet/getblockbynum', {
      num: parseInt(blockID)
    }, 'post').then(block => {
      if (!Object.keys(block).length) return callback('Block not found');
      callback(null, block);
    }).catch(err => callback(err));
  }

  getBlockTransactionCount(block = this.tronWeb.defaultBlock, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(block)) {
      callback = block;
      block = this.tronWeb.defaultBlock;
    }

    if (!callback) return this.injectPromise(this.getBlockTransactionCount, block);
    this.getBlock(block).then(({
      transactions = []
    }) => {
      callback(null, transactions.length);
    }).catch(err => callback(err));
  }

  getTransactionFromBlock(block = this.tronWeb.defaultBlock, index = 0, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(index)) {
      callback = index;
      index = 0;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(block)) {
      callback = block;
      block = this.tronWeb.defaultBlock;
    }

    if (!callback) return this.injectPromise(this.getTransactionFromBlock, block, index);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(index) || index < 0) return callback('Invalid transaction index provided');
    this.getBlock(block).then(({
      transactions = false
    }) => {
      if (!transactions || transactions.length < index) return callback('Transaction not found in block');
      callback(null, transactions[index]);
    }).catch(err => callback(err));
  }

  getTransaction(transactionID, callback = false) {
    if (!callback) return this.injectPromise(this.getTransaction, transactionID);
    this.tronWeb.fullNode.request('wallet/gettransactionbyid', {
      value: transactionID
    }, 'post').then(transaction => {
      if (!Object.keys(transaction).length) return callback('Transaction not found');
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  getTransactionInfo(transactionID, callback = false) {
    if (!callback) return this.injectPromise(this.getTransactionInfo, transactionID);
    this.tronWeb.solidityNode.request('walletsolidity/gettransactioninfobyid', {
      value: transactionID
    }, 'post').then(transaction => {
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  getTransactionsToAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(offset)) {
      callback = offset;
      offset = 0;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(limit)) {
      callback = limit;
      limit = 30;
    }

    if (!callback) return this.injectPromise(this.getTransactionsToAddress, address, limit, offset);
    return this.getTransactionsRelated(address, 'to', limit, offset, callback);
  }

  getTransactionsFromAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(offset)) {
      callback = offset;
      offset = 0;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(limit)) {
      callback = limit;
      limit = 30;
    }

    if (!callback) return this.injectPromise(this.getTransactionsFromAddress, address, limit, offset);
    return this.getTransactionsRelated(address, 'from', limit, offset, callback);
  }

  async getTransactionsRelated(address = this.tronWeb.defaultAddress.hex, direction = 'all', limit = 30, offset = 0, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(offset)) {
      callback = offset;
      offset = 0;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(limit)) {
      callback = limit;
      limit = 30;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(direction)) {
      callback = direction;
      direction = 'all';
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.getTransactionsRelated, address, direction, limit, offset);
    if (!['to', 'from', 'all'].includes(direction)) return callback('Invalid direction provided: Expected "to", "from" or "all"');

    if (direction == 'all') {
      try {
        const from = await this.getTransactionsRelated(address, 'from', limit, offset);
        const to = await this.getTransactionsRelated(address, 'to', limit, offset);
        return callback(null, [...from.map(tx => (tx.direction = 'from', tx)), ...to.map(tx => (tx.direction = 'to', tx))].sort((a, b) => b.raw_data.timestamp - a.raw_data.timestamp));
      } catch (ex) {
        return callback(ex);
      }
    }

    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(limit) || limit < 0 || offset && limit < 1) return callback('Invalid limit provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(offset) || offset < 0) return callback('Invalid offset provided');
    address = this.tronWeb.address.toHex(address);
    this.tronWeb.solidityNode.request(`walletextension/gettransactions${direction}this`, {
      account: {
        address
      },
      offset,
      limit
    }, 'post').then(({
      transaction
    }) => {
      callback(null, transaction);
    }).catch(err => callback(err));
  }

  getAccount(address = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.getAccount, address);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    address = this.tronWeb.address.toHex(address);
    this.tronWeb.solidityNode.request('walletsolidity/getaccount', {
      address
    }, 'post').then(account => {
      callback(null, account);
    }).catch(err => callback(err));
  }

  getBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.getBalance, address);
    this.getAccount(address).then(({
      balance = 0
    }) => {
      callback(null, balance);
    }).catch(err => callback(err));
  }

  getBandwidth(address = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.getBandwidth, address);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    address = this.tronWeb.address.toHex(address);
    this.tronWeb.fullNode.request('wallet/getaccountnet', {
      address
    }, 'post').then(({
      freeNetUsed = 0,
      freeNetLimit = 0,
      NetUsed = 0,
      NetLimit = 0
    }) => {
      callback(null, freeNetLimit - freeNetUsed + (NetLimit - NetUsed));
    }).catch(err => callback(err));
  }

  getTokensIssuedByAddress(address = this.tronWeb.defaultAddress.hex, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(address)) {
      callback = address;
      address = this.tronWeb.defaultAddress.hex;
    }

    if (!callback) return this.injectPromise(this.getTokensIssuedByAddress, address);
    if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
    address = this.tronWeb.address.toHex(address);
    this.tronWeb.fullNode.request('wallet/getassetissuebyaccount', {
      address
    }, 'post').then(({
      assetIssue = false
    }) => {
      if (!assetIssue) return callback(null, {});
      const tokens = assetIssue.map(token => {
        return this.parseToken(token);
      }).reduce((tokens, token) => {
        return tokens[token.name] = token, tokens;
      }, {});
      callback(null, tokens);
    }).catch(err => callback(err));
  }

  getTokenFromID(tokenID = false, callback = false) {
    if (!callback) return this.injectPromise(this.getTokenFromID, tokenID);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(tokenID) || !tokenID.length) return callback('Invalid token ID provided');
    this.tronWeb.fullNode.request('wallet/getassetissuebyname', {
      value: this.tronWeb.fromUtf8(tokenID)
    }, 'post').then(token => {
      if (!token.name) return callback('Token does not exist');
      callback(null, this.parseToken(token));
    }).catch(err => callback(err));
  }

  listNodes(callback = false) {
    if (!callback) return this.injectPromise(this.listNodes);
    this.tronWeb.fullNode.request('wallet/listnodes').then(({
      nodes = []
    }) => {
      callback(null, nodes.map(({
        address: {
          host,
          port
        }
      }) => `${this.tronWeb.toUtf8(host)}:${port}`));
    }).catch(err => callback(err));
  }

  getBlockRange(start = 0, end = 30, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(end)) {
      callback = end;
      end = 30;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(start)) {
      callback = start;
      start = 0;
    }

    if (!callback) return this.injectPromise(this.getBlockRange, start, end);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(start) || start < 0) return callback('Invalid start of range provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(end) || end <= start) return callback('Invalid end of range provided');
    this.tronWeb.fullNode.request('wallet/getblockbylimitnext', {
      startNum: parseInt(start),
      endNum: parseInt(end) + 1
    }, 'post').then(({
      block = []
    }) => {
      callback(null, block);
    }).catch(err => callback(err));
  }

  listSuperRepresentatives(callback = false) {
    if (!callback) return this.injectPromise(this.listSuperRepresentatives);
    this.tronWeb.fullNode.request('wallet/listwitnesses').then(({
      witnesses = []
    }) => {
      callback(null, witnesses);
    }).catch(err => callback(err));
  }

  listTokens(limit = 0, offset = 0, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(offset)) {
      callback = offset;
      offset = 0;
    }

    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(limit)) {
      callback = limit;
      limit = 0;
    }

    if (!callback) return this.injectPromise(this.listTokens, limit, offset);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(limit) || limit < 0 || offset && limit < 1) return callback('Invalid limit provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(offset) || offset < 0) return callback('Invalid offset provided');

    if (!limit) {
      return this.tronWeb.fullNode.request('wallet/getassetissuelist').then(({
        assetIssue = []
      }) => {
        callback(null, assetIssue.map(token => this.parseToken(token)));
      }).catch(err => callback(err));
    }

    this.tronWeb.fullNode.request('wallet/getpaginatedassetissuelist', {
      offset: parseInt(offset),
      limit: parseInt(limit)
    }, 'post').then(({
      assetIssue = []
    }) => {
      callback(null, assetIssue.map(token => this.parseToken(token)));
    }).catch(err => callback(err));
  }

  timeUntilNextVoteCycle(callback = false) {
    if (!callback) return this.injectPromise(this.timeUntilNextVoteCycle);
    this.tronWeb.fullNode.request('wallet/getnextmaintenancetime').then(({
      num = -1
    }) => {
      if (num == -1) return callback('Failed to get time until next vote cycle');
      callback(null, Math.floor(num / 1000));
    }).catch(err => callback(err));
  }

  getContract(contractAddress, callback = false) {
    if (!callback) return this.injectPromise(this.getContract, contractAddress);
    if (!this.tronWeb.isAddress(contractAddress)) return callback('Invalid contract address provided');
    contractAddress = this.tronWeb.address.toHex(contractAddress);
    this.tronWeb.fullNode.request('wallet/getcontract', {
      value: contractAddress
    }).then(contract => {
      if (contract.Error) return callback('Contract does not exist');
      callback(null, contract);
    }).catch(err => callback(err));
  }

  sign(transaction = false, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(privateKey)) {
      callback = privateKey;
      privateKey = this.tronWeb.defaultPrivateKey;
    }

    if (!callback) return this.injectPromise(this.sign, transaction, privateKey);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isObject(transaction)) return callback('Invalid transaction provided');
    if (transaction.signature) return callback('Transaction is already signed');

    try {
      const address = this.tronWeb.address.toHex(this.tronWeb.address.fromPrivateKey(privateKey)).toLowerCase();
      if (address !== transaction.raw_data.contract[0].parameter.value.owner_address.toLowerCase()) return callback('Private key does not match address in transaction');
      return callback(null, utils__WEBPACK_IMPORTED_MODULE_2__["default"].crypto.signTransaction(privateKey, transaction));
    } catch (ex) {
      callback(ex);
    }
  }

  sendRawTransaction(signedTransaction = false, callback = false) {
    if (!callback) return this.injectPromise(this.sendRawTransaction, signedTransaction);
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isObject(signedTransaction)) return callback('Invalid transaction provided');
    if (!signedTransaction.signature || !utils__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(signedTransaction.signature)) return callback('Transaction is not signed');
    this.tronWeb.fullNode.request('wallet/broadcasttransaction', signedTransaction, 'post').then(result => {
      callback(null, result);
    }).catch(err => callback(err));
  }

  async sendTransaction(to = false, amount = false, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(privateKey)) {
      callback = privateKey;
      privateKey = this.tronWeb.defaultPrivateKey;
    }

    if (!callback) return this.injectPromise(this.sendTransaction, to, amount, privateKey);
    if (!this.tronWeb.isAddress(to)) return callback('Invalid recipient provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');

    try {
      const address = this.tronWeb.address.fromPrivateKey(privateKey);
      const transaction = await this.tronWeb.transactionBuilder.sendTrx(to, amount, address);
      const signedTransaction = await this.sign(transaction, privateKey);
      const result = await this.sendRawTransaction(signedTransaction);
      return callback(null, result);
    } catch (ex) {
      return callback(ex);
    }
  }

  async sendToken(to = false, amount = false, tokenID = false, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
    if (utils__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(privateKey)) {
      callback = privateKey;
      privateKey = this.tronWeb.defaultPrivateKey;
    }

    if (!callback) return this.injectPromise(this.sendToken, to, amount, tokenID, privateKey);
    if (!this.tronWeb.isAddress(to)) return callback('Invalid recipient provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_2__["default"].isString(tokenID)) return callback('Invalid token ID provided');

    try {
      const address = this.tronWeb.address.fromPrivateKey(privateKey);
      const transaction = await this.tronWeb.transactionBuilder.sendToken(to, amount, tokenID, address);
      const signedTransaction = await this.sign(transaction, privateKey);
      const result = await this.sendRawTransaction(signedTransaction);
      return callback(null, result);
    } catch (ex) {
      return callback(ex);
    }
  }

  sendAsset(...args) {
    return this.sendToken(...args);
  }

  send(...args) {
    return this.sendTransaction(...args);
  }

  sendTrx(...args) {
    return this.sendTransaction(...args);
  }

  broadcast(...args) {
    return this.sendRawTransaction(...args);
  }

  signTransaction(...args) {
    return this.sign(...args);
  }

}
;

/***/ }),

/***/ "./src/lib/witness.js":
/*!****************************!*\
  !*** ./src/lib/witness.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Witness; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

class Witness {}

/***/ }),

/***/ "./src/utils/accounts.js":
/*!*******************************!*\
  !*** ./src/utils/accounts.js ***!
  \*******************************/
/*! exports provided: generateAccount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateAccount", function() { return generateAccount; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crypto */ "./src/utils/crypto.js");



function generateAccount() {
  const priKeyBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["genPriKey"])();
  const pubKeyBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["getPubKeyFromPriKey"])(priKeyBytes);
  const addressBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["getAddressFromPriKey"])(priKeyBytes);
  const privateKey = Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"])(priKeyBytes);
  const publicKey = Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"])(pubKeyBytes);
  return {
    privateKey,
    publicKey,
    address: {
      base58: Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["getBase58CheckAddress"])(addressBytes),
      hex: Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"])(addressBytes)
    }
  };
}

/***/ }),

/***/ "./src/utils/address.js":
/*!******************************!*\
  !*** ./src/utils/address.js ***!
  \******************************/
/*! exports provided: ADDRESS_SIZE, ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_SIZE", function() { return ADDRESS_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_PREFIX", function() { return ADDRESS_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_PREFIX_BYTE", function() { return ADDRESS_PREFIX_BYTE; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

const isTestNet = process.env.NET === 'testnet';
const ADDRESS_SIZE = isTestNet ? 35 : 34;
const ADDRESS_PREFIX = isTestNet ? "a0" : "41";
const ADDRESS_PREFIX_BYTE = isTestNet ? 0xa0 : 0x41;

/***/ }),

/***/ "./src/utils/base58.js":
/*!*****************************!*\
  !*** ./src/utils/base58.js ***!
  \*****************************/
/*! exports provided: encode58, decode58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode58", function() { return encode58; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode58", function() { return decode58; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP = {};

for (let i = 0; i < ALPHABET.length; i++) ALPHABET_MAP[ALPHABET.charAt(i)] = i;

const BASE = 58;
function encode58(buffer) {
  if (buffer.length === 0) return '';
  let i;
  let j;
  const digits = [0];

  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) digits[j] <<= 8;

    digits[0] += buffer[i];
    let carry = 0;

    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry;
      carry = digits[j] / BASE | 0;
      digits[j] %= BASE;
    }

    while (carry) {
      digits.push(carry % BASE);
      carry = carry / BASE | 0;
    }
  }

  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0);

  return digits.reverse().map(digit => ALPHABET[digit]).join('');
}
function decode58(string) {
  if (string.length === 0) return [];
  let i;
  let j;
  const bytes = [0];

  for (i = 0; i < string.length; i++) {
    const c = string[i];
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

    for (j = 0; j < bytes.length; j++) bytes[j] *= BASE;

    bytes[0] += ALPHABET_MAP[c];
    let carry = 0;

    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }

    while (carry) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (i = 0; string[i] === '1' && i < string.length - 1; i++) bytes.push(0);

  return bytes.reverse();
}

/***/ }),

/***/ "./src/utils/base64.js":
/*!*****************************!*\
  !*** ./src/utils/base64.js ***!
  \*****************************/
/*! exports provided: Base64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64", function() { return Base64; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

function Base64() {
  this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  this.encode = input => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) enc3 = enc4 = 64;else if (isNaN(chr3)) enc4 = 64;
      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }

    return output;
  };

  this.encodeIgnoreUtf8 = inputBytes => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) enc3 = enc4 = 64;else if (isNaN(chr3)) enc4 = 64;
      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }

    return output;
  };

  this.decode = input => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) output = output + String.fromCharCode(chr2);
      if (enc4 != 64) output = output + String.fromCharCode(chr3);
    }

    return this._utf8_decode(output);
  };

  this.decodeToByteArray = input => {
    let output = "";
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) output = output + String.fromCharCode(chr2);
      if (enc4 != 64) output = output + String.fromCharCode(chr3);
    }

    return this._out2ByteArray(output);
  };

  this._out2ByteArray = utftext => {
    const byteArray = new Array(utftext.length);
    let i = 0;
    let c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }

    return byteArray;
  };

  this._utf8_encode = string => {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "";

    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }

    return utftext;
  };

  this._utf8_decode = utftext => {
    let string = "";
    let i = 0;
    let c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode((c & 31) << 6 | c2 & 63);
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        i += 3;
      }
    }

    return string;
  };
}

/***/ }),

/***/ "./src/utils/bytes.js":
/*!****************************!*\
  !*** ./src/utils/bytes.js ***!
  \****************************/
/*! exports provided: byte2hexStr, bytesToString, hextoString, base64DecodeFromString, byteArray2hexStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byte2hexStr", function() { return byte2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hextoString", function() { return hextoString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64DecodeFromString", function() { return base64DecodeFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArray2hexStr", function() { return byteArray2hexStr; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/utils/base64.js");


function byte2hexStr(byte) {
  const hexByteMap = '0123456789ABCDEF';
  let str = '';
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}
function bytesToString(arr) {
  if (typeof arr === 'string') return arr;
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    const one = arr[i].toString(2);
    const v = one.match(/^1+?(?=0)/);

    if (v && one.length === 8) {
      const bytesLength = v[0].length;
      let store = arr[i].toString(2).slice(7 - bytesLength);

      for (let st = 1; st < bytesLength; st++) store += arr[st + i].toString(2).slice(2);

      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(arr[i]);
    }
  }

  return str;
}
function hextoString(hex) {
  const arr = hex.split('');
  let out = '';

  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
    out += String.fromCharCode(tmp);
  }

  return out;
}
function base64DecodeFromString(string64) {
  return new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]().decodeToByteArray(string64);
}
function byteArray2hexStr(byteArray) {
  let str = '';

  for (let i = 0; i < byteArray.length; i++) str += byte2hexStr(byteArray[i]);

  return str;
}

/***/ }),

/***/ "./src/utils/code.js":
/*!***************************!*\
  !*** ./src/utils/code.js ***!
  \***************************/
/*! exports provided: bin2String, arrayEquals, stringToBytes, bytesToString, hextoString, hexChar2byte, isHexChar, hexStr2byteArray, byte2hexStr, byteArray2hexStr, base64DecodeFromString, base64EncodeToString, strToDate, isNumber, getStringType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bin2String", function() { return bin2String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayEquals", function() { return arrayEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToBytes", function() { return stringToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hextoString", function() { return hextoString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexChar2byte", function() { return hexChar2byte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHexChar", function() { return isHexChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexStr2byteArray", function() { return hexStr2byteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byte2hexStr", function() { return byte2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArray2hexStr", function() { return byteArray2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64DecodeFromString", function() { return base64DecodeFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64EncodeToString", function() { return base64EncodeToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToDate", function() { return strToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringType", function() { return getStringType; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/utils/base64.js");


function bin2String(array) {
  return String.fromCharCode(...array);
}
function arrayEquals(array1, array2) {
  if (array1.length != array2.length) return false;
  let i;

  for (i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) return false;
  }

  return true;
}
function stringToBytes(str) {
  const bytes = new Array();
  let len;
  let c;
  len = str.length;

  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i);

    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(c >> 18 & 0x07 | 0xF0);
      bytes.push(c >> 12 & 0x3F | 0x80);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(c >> 12 & 0x0F | 0xE0);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(c >> 6 & 0x1F | 0xC0);
      bytes.push(c & 0x3F | 0x80);
    } else bytes.push(c & 0xFF);
  }

  return bytes;
}
function bytesToString(arr) {
  if (typeof arr === 'string') return arr;
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    const one = arr[i].toString(2);
    const v = one.match(/^1+?(?=0)/);

    if (v && one.length == 8) {
      const bytesLength = v[0].length;
      let store = arr[i].toString(2).slice(7 - bytesLength);

      for (let st = 1; st < bytesLength; st++) store += arr[st + i].toString(2).slice(2);

      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else str += String.fromCharCode(arr[i]);
  }

  return str;
}
function hextoString(hex) {
  const arr = hex.split("");
  let out = "";

  for (let i = 0; i < arr.length / 2; i++) {
    const tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
    const charValue = String.fromCharCode(tmp);
    out += charValue;
  }

  return out;
}
function hexChar2byte(c) {
  let d = 0;
  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0);
  return d;
}
function isHexChar(c) {
  if (c >= 'A' && c <= 'F' || c >= 'a' && c <= 'f' || c >= '0' && c <= '9') {
    return 1;
  }

  return 0;
}
function hexStr2byteArray(str) {
  const byteArray = Array();
  let d = 0;
  let j = 0;
  let k = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);

    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;

      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }

  return byteArray;
}
function byte2hexStr(byte) {
  const hexByteMap = "0123456789ABCDEF";
  let str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}
function byteArray2hexStr(byteArray) {
  return byteArray.reduce((string, byte) => {
    return string + byte2hexStr(byte);
  }, '');
}
function base64DecodeFromString(string64) {
  const b = new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]();
  const decodeBytes = b.decodeToByteArray(string64);
  return decodeBytes;
}
function base64EncodeToString(bytes) {
  const b = new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]();
  const string64 = b.encodeIgnoreUtf8(bytes);
  return string64;
} //yyyy-MM-DD HH-mm-ss

function strToDate(str) {
  const tempStrs = str.split(" ");
  const dateStrs = tempStrs[0].split("-");
  const year = parseInt(dateStrs[0], 10);
  const month = parseInt(dateStrs[1], 10) - 1;
  const day = parseInt(dateStrs[2], 10);

  if (tempStrs.length > 1) {
    const timeStrs = tempStrs[1].split("-");
    const hour = parseInt(timeStrs[0], 10);
    const minute = parseInt(timeStrs[1], 10) - 1;
    const second = parseInt(timeStrs[2], 10);
    return new Date(year, month, day, hour, minute, second);
  }

  return new Date(year, month, day);
}
function isNumber(c) {
  if (c >= '0' && c <= '9') return 1;
  return 0;
} //return 1: address  --- 20Bytes HexString
//return 2: blockNumber ------ Decimal number
//return 3: assetName ------ String
//return other: error

function getStringType(str) {
  if (null == str) return -1;
  if (typeof str != 'string') return -1;
  if (str.length == 0 || str == "") return -1;
  let i = 0;

  if (str.length == 40) {
    for (; i < 40; i++) {
      var c = str.charAt(i);
      if (!isHexChar(c)) break;
    }
  }

  if (i == 40) return 1; //40 Hex, Address

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (!isNumber(c)) break;
  }

  if (i == str.length) return 2; //Alll Decimal number, BlockNumber

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (c > ' ') return 3; //At least one visible character
  }

  return -1;
}

/***/ }),

/***/ "./src/utils/crypto.js":
/*!*****************************!*\
  !*** ./src/utils/crypto.js ***!
  \*****************************/
/*! exports provided: getBase58CheckAddress, decodeBase58Address, signTransaction, arrayToBase64String, signBytes, getRowBytesFromTransactionBase64, genPriKey, computeAddress, getAddressFromPriKey, decode58Check, isAddressValid, getBase58CheckAddressFromPriKeyBase64String, getHexStrAddressFromPriKeyBase64String, getAddressFromPriKeyBase64String, getPubKeyFromPriKey, ECKeySign, SHA256, passwordToAddress, pkToAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBase58CheckAddress", function() { return getBase58CheckAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeBase58Address", function() { return decodeBase58Address; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signTransaction", function() { return signTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToBase64String", function() { return arrayToBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signBytes", function() { return signBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRowBytesFromTransactionBase64", function() { return getRowBytesFromTransactionBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genPriKey", function() { return genPriKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeAddress", function() { return computeAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddressFromPriKey", function() { return getAddressFromPriKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode58Check", function() { return decode58Check; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAddressValid", function() { return isAddressValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBase58CheckAddressFromPriKeyBase64String", function() { return getBase58CheckAddressFromPriKeyBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHexStrAddressFromPriKeyBase64String", function() { return getHexStrAddressFromPriKeyBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddressFromPriKeyBase64String", function() { return getAddressFromPriKeyBase64String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPubKeyFromPriKey", function() { return getPubKeyFromPriKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECKeySign", function() { return ECKeySign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA256", function() { return SHA256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordToAddress", function() { return passwordToAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pkToAddress", function() { return pkToAddress; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jssha */ "jssha");
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jssha__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ "./src/utils/address.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code */ "./src/utils/code.js");
/* harmony import */ var _base58__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base58 */ "./src/utils/base58.js");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! js-sha3 */ "js-sha3");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(js_sha3__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! elliptic */ "elliptic");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_7__);










function getBase58CheckAddress(addressBytes) {
  const hash0 = SHA256(addressBytes);
  const hash1 = SHA256(hash0);
  let checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return Object(_base58__WEBPACK_IMPORTED_MODULE_4__["encode58"])(checkSum);
}
function decodeBase58Address(base58Sting) {
  if (typeof base58Sting != 'string') return false;
  if (base58Sting.length <= 4) return false;
  let address = Object(_base58__WEBPACK_IMPORTED_MODULE_4__["decode58"])(base58Sting);
  if (base58Sting.length <= 4) return false;
  const len = address.length;
  const offset = len - 4;
  const checkSum = address.slice(offset);
  address = address.slice(0, offset);
  const hash0 = SHA256(address);
  const hash1 = SHA256(hash0);
  const checkSum1 = hash1.slice(0, 4);

  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] == checkSum1[2] && checkSum[3] == checkSum1[3]) {
    return address;
  }

  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])('000000000000000000000000000000000000000000');
}
function signTransaction(priKeyBytes, transaction) {
  if (typeof priKeyBytes === 'string') priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(priKeyBytes);
  const txID = transaction.txID;
  const signature = ECKeySign(Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(txID), priKeyBytes);
  transaction.signature = [signature];
  return transaction;
}
function arrayToBase64String(a) {
  return btoa(String.fromCharCode(...a));
}
function signBytes(privateKey, contents) {
  if (typeof privateKey === 'string') privateKey = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(privateKey);
  const hashBytes = SHA256(contents);
  const signBytes = ECKeySign(hashBytes, privateKey);
  return signBytes;
}
function getRowBytesFromTransactionBase64(base64Data) {
  const bytesDecode = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(base64Data);
  const transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
  const raw = transaction.getRawData();
  return raw.serializeBinary();
}
function genPriKey() {
  const ec = new elliptic__WEBPACK_IMPORTED_MODULE_7__["ec"]('secp256k1');
  const key = ec.genKeyPair();
  const priKey = key.getPrivate();
  let priKeyHex = priKey.toString('hex');

  while (priKeyHex.length < 64) {
    priKeyHex = `0${priKeyHex}`;
  }

  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(priKeyHex);
}
function computeAddress(pubBytes) {
  if (pubBytes.length === 65) pubBytes = pubBytes.slice(1);
  const hash = Object(js_sha3__WEBPACK_IMPORTED_MODULE_5__["keccak256"])(pubBytes).toString();
  const addressHex = _address__WEBPACK_IMPORTED_MODULE_2__["ADDRESS_PREFIX"] + hash.substring(24);
  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(addressHex);
}
function getAddressFromPriKey(priKeyBytes) {
  let pubBytes = getPubKeyFromPriKey(priKeyBytes);
  return computeAddress(pubBytes);
}
function decode58Check(addressStr) {
  const decodeCheck = Object(_base58__WEBPACK_IMPORTED_MODULE_4__["decode58"])(addressStr);
  if (decodeCheck.length <= 4) return false;
  const decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
  const hash0 = SHA256(decodeData);
  const hash1 = SHA256(hash0);

  if (hash1[0] === decodeCheck[decodeData.length] && hash1[1] === decodeCheck[decodeData.length + 1] && hash1[2] === decodeCheck[decodeData.length + 2] && hash1[3] === decodeCheck[decodeData.length + 3]) {
    return decodeData;
  }

  return false;
}
function isAddressValid(base58Str) {
  if (typeof base58Str !== 'string') return false;
  if (base58Str.length !== _address__WEBPACK_IMPORTED_MODULE_2__["ADDRESS_SIZE"]) return false;
  let address = Object(_base58__WEBPACK_IMPORTED_MODULE_4__["decode58"])(base58Str);
  if (address.length !== 25) return false;
  if (address[0] !== _address__WEBPACK_IMPORTED_MODULE_2__["ADDRESS_PREFIX_BYTE"]) return false;
  const checkSum = address.slice(21);
  address = address.slice(0, 21);
  const hash0 = SHA256(address);
  const hash1 = SHA256(hash0);
  const checkSum1 = hash1.slice(0, 4);

  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] == checkSum1[2] && checkSum[3] == checkSum1[3]) {
    return true;
  }

  return false;
}
function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
  const priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(priKeyBase64String);
  const pubBytes = getPubKeyFromPriKey(priKeyBytes);
  const addressBytes = computeAddress(pubBytes);
  return getBase58CheckAddress(addressBytes);
}
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
  const priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(priKeyBase64String);
  const pubBytes = getPubKeyFromPriKey(priKeyBytes);
  const addressBytes = computeAddress(pubBytes);
  const addressHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_6__["byteArray2hexStr"])(addressBytes);
  return addressHex;
}
function getAddressFromPriKeyBase64String(priKeyBase64String) {
  const priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(priKeyBase64String);
  const pubBytes = getPubKeyFromPriKey(priKeyBytes);
  const addressBytes = computeAddress(pubBytes);
  const addressBase64 = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64EncodeToString"])(addressBytes);
  return addressBase64;
}
function getPubKeyFromPriKey(priKeyBytes) {
  const ec = new elliptic__WEBPACK_IMPORTED_MODULE_7__["ec"]('secp256k1');
  const key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  const pubkey = key.getPublic();
  const x = pubkey.x;
  const y = pubkey.y;
  let xHex = x.toString('hex');

  while (xHex.length < 64) {
    xHex = `0${xHex}`;
  }

  let yHex = y.toString('hex');

  while (yHex.length < 64) {
    yHex = `0${yHex}`;
  }

  const pubkeyHex = `04${xHex}${yHex}`;
  const pubkeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(pubkeyHex);
  return pubkeyBytes;
}
function ECKeySign(hashBytes, priKeyBytes) {
  const ec = new elliptic__WEBPACK_IMPORTED_MODULE_7__["ec"]('secp256k1');
  const key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  const signature = key.sign(hashBytes);
  const r = signature.r;
  const s = signature.s;
  const id = signature.recoveryParam;
  let rHex = r.toString('hex');

  while (rHex.length < 64) {
    rHex = `0${rHex}`;
  }

  let sHex = s.toString('hex');

  while (sHex.length < 64) {
    sHex = `0${sHex}`;
  }

  const idHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_6__["byte2hexStr"])(id);
  const signHex = rHex + sHex + idHex;
  return signHex;
}
function SHA256(msgBytes) {
  const shaObj = new jssha__WEBPACK_IMPORTED_MODULE_1___default.a('SHA-256', 'HEX');
  const msgHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_6__["byteArray2hexStr"])(msgBytes);
  shaObj.update(msgHex);
  const hashHex = shaObj.getHash('HEX');
  return Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(hashHex);
}
function passwordToAddress(password) {
  const com_priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["base64DecodeFromString"])(password);
  const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
  return getBase58CheckAddress(com_addressBytes);
}
function pkToAddress(privateKey) {
  const com_priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_3__["hexStr2byteArray"])(privateKey);
  const com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
  return getBase58CheckAddress(com_addressBytes);
}

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accounts */ "./src/utils/accounts.js");
/* harmony import */ var _base58__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base58 */ "./src/utils/base58.js");
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crypto */ "./src/utils/crypto.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./code */ "./src/utils/code.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! validator */ "validator");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_7__);








const utils = {
  isValidURL(url) {
    return validator__WEBPACK_IMPORTED_MODULE_6___default.a.isURL(url, {
      protocols: ['http', 'https']
    });
  },

  isObject(obj) {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
  },

  isArray(array) {
    return Array.isArray(array);
  },

  isJson(string) {
    try {
      return !!JSON.parse(string);
    } catch (ex) {
      return false;
    }
  },

  isBoolean(bool) {
    return typeof bool === 'boolean';
  },

  isBigNumber(number) {
    return number && (number instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_7___default.a || number.constructor && number.constructor.name === 'BigNumber');
  },

  isString(string) {
    return typeof string === 'string' || string && string.constructor && string.constructor.name === 'String';
  },

  isFunction(obj) {
    return typeof obj === 'function';
  },

  isHex(string) {
    return typeof string === 'string' && !isNaN(parseInt(string, 16));
  },

  isInteger(number) {
    return Number.isInteger(Number(number));
  },

  hasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
  },

  hasProperties(obj, ...properties) {
    return properties.length && !properties.map(property => {
      return this.hasProperty(obj, property);
    }).includes(false);
  },

  injectPromise(func, ...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, res) => {
        if (err) reject(err);else resolve(res);
      });
    });
  },

  promiseInjector(scope) {
    return (func, ...args) => {
      return this.injectPromise(func.bind(scope), ...args);
    };
  },

  mapEvent(event) {
    return {
      block: event.block_number,
      timestamp: event.block_timestamp,
      contract: event.contract_address,
      name: event.event_name,
      transaction: event.transaction_id,
      result: event.result
    };
  },

  parseEvent(event, {
    inputs: abi
  }) {
    if (!event.result) return event;
    event.result = event.result.reduce((obj, result, index) => {
      const {
        name,
        type
      } = abi[index];
      if (type == 'address') result = '41' + address.substr(2).toLowerCase();
      obj[name] = result;
      return obj;
    }, {});
    return event;
  }

};
/* harmony default export */ __webpack_exports__["default"] = ({ ...utils,
  code: _code__WEBPACK_IMPORTED_MODULE_5__,
  accounts: _accounts__WEBPACK_IMPORTED_MODULE_1__,
  base58: _base58__WEBPACK_IMPORTED_MODULE_2__,
  bytes: _bytes__WEBPACK_IMPORTED_MODULE_3__,
  crypto: _crypto__WEBPACK_IMPORTED_MODULE_4__
});

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bignumber.js":
/*!*******************************!*\
  !*** external "bignumber.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "elliptic":
/*!***************************!*\
  !*** external "elliptic" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("elliptic");

/***/ }),

/***/ "ethers":
/*!*************************!*\
  !*** external "ethers" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ethers");

/***/ }),

/***/ "js-sha3":
/*!**************************!*\
  !*** external "js-sha3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-sha3");

/***/ }),

/***/ "jssha":
/*!************************!*\
  !*** external "jssha" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jssha");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ })["default"];
//# sourceMappingURL=TronWeb.node.js.map