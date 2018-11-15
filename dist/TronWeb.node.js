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
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "@babel/runtime/helpers/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lib_providers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lib/providers */ "./src/lib/providers/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! eventemitter3 */ "eventemitter3");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lib/transactionBuilder */ "./src/lib/transactionBuilder.js");
/* harmony import */ var lib_trx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lib/trx */ "./src/lib/trx.js");
/* harmony import */ var lib_contract__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lib/contract */ "./src/lib/contract/index.js");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! js-sha3 */ "js-sha3");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(js_sha3__WEBPACK_IMPORTED_MODULE_18__);




















var TronWeb =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(TronWeb, _EventEmitter);

  function TronWeb(fullNode, solidityNode) {
    var _this;

    var eventServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var privateKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, TronWeb);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TronWeb).call(this));
    if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(fullNode)) fullNode = new lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"].HttpProvider(fullNode);
    if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(solidityNode)) solidityNode = new lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"].HttpProvider(solidityNode);
    if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(eventServer)) eventServer = new lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"].HttpProvider(eventServer);

    _this.setFullNode(fullNode);

    _this.setSolidityNode(solidityNode);

    _this.setEventServer(eventServer);

    _this.providers = lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"];
    _this.BigNumber = bignumber_js__WEBPACK_IMPORTED_MODULE_13___default.a;
    _this.defaultBlock = false;
    _this.defaultPrivateKey = false;
    _this.defaultAddress = {
      hex: false,
      base58: false
    };
    ['sha3', 'toHex', 'toUtf8', 'fromUtf8', 'toAscii', 'fromAscii', 'toDecimal', 'fromDecimal', 'toSun', 'fromSun', 'toBigNumber', 'isAddress', 'createAccount', 'address'].forEach(function (key) {
      _this[key] = TronWeb[key];
    });
    if (privateKey) _this.setPrivateKey(privateKey);
    _this.transactionBuilder = new lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_15__["default"](_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this)));
    _this.trx = new lib_trx__WEBPACK_IMPORTED_MODULE_16__["default"](_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this)));
    _this.utils = utils__WEBPACK_IMPORTED_MODULE_12__["default"];
    _this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_12__["default"].promiseInjector(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this)));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(TronWeb, [{
    key: "setDefaultBlock",
    value: function setDefaultBlock() {
      var blockID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if ([false, 'latest', 'earliest', 0].includes(blockID)) {
        return this.defaultBlock = blockID;
      }

      if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isInteger(blockID) || !blockID) throw new Error('Invalid block ID provided');
      this.defaultBlock = Math.abs(blockID);
    }
  }, {
    key: "setPrivateKey",
    value: function setPrivateKey(privateKey) {
      try {
        this.setAddress(this.address.fromPrivateKey(privateKey));
      } catch (_unused) {
        throw new Error('Invalid private key provided');
      }

      this.defaultPrivateKey = privateKey;
      this.emit('privateKeyChanged', privateKey);
    }
  }, {
    key: "setAddress",
    value: function setAddress(address) {
      if (!this.isAddress(address)) throw new Error('Invalid address provided');
      var hex = this.address.toHex(address);
      var base58 = this.address.fromHex(address);
      if (this.defaultPrivateKey && this.address.fromPrivateKey(this.defaultPrivateKey) !== base58) this.defaultPrivateKey = false;
      this.defaultAddress = {
        hex: hex,
        base58: base58
      };
      this.emit('addressChanged', {
        hex: hex,
        base58: base58
      });
    }
  }, {
    key: "isValidProvider",
    value: function isValidProvider(provider) {
      return Object.values(lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"]).some(function (knownProvider) {
        return provider instanceof knownProvider;
      });
    }
  }, {
    key: "setFullNode",
    value: function setFullNode(fullNode) {
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(fullNode)) fullNode = new lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"].HttpProvider(fullNode);
      if (!this.isValidProvider(fullNode)) throw new Error('Invalid full node provided');
      this.fullNode = fullNode;
      this.fullNode.setStatusPage('wallet/getnowblock');
    }
  }, {
    key: "setSolidityNode",
    value: function setSolidityNode(solidityNode) {
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(solidityNode)) solidityNode = new lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"].HttpProvider(solidityNode);
      if (!this.isValidProvider(solidityNode)) throw new Error('Invalid solidity node provided');
      this.solidityNode = solidityNode;
      this.solidityNode.setStatusPage('walletsolidity/getnowblock');
    }
  }, {
    key: "setEventServer",
    value: function setEventServer() {
      var _this2 = this;

      var eventServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!eventServer) return this.eventServer = false;
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(eventServer)) eventServer = new lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"].HttpProvider(eventServer);
      if (!this.isValidProvider(eventServer)) throw new Error('Invalid event server provided');
      this.eventServer = eventServer;

      this.eventServer.isConnected = function () {
        return _this2.eventServer.request('healthcheck').then(function () {
          return true;
        }).catch(function () {
          return _this2.eventServer.request('events?size=1').then(function (data) {
            return Array.isArray(data);
          });
        }).catch(function () {
          return false;
        });
      };
    }
  }, {
    key: "currentProviders",
    value: function currentProviders() {
      return {
        fullNode: this.fullNode,
        solidityNode: this.solidityNode,
        eventServer: this.eventServer
      };
    }
  }, {
    key: "currentProvider",
    value: function currentProvider() {
      return this.currentProviders();
    }
  }, {
    key: "getEventResult",
    value: function getEventResult() {
      var contractAddress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var sinceTimestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var blockNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      if (!callback) return this.injectPromise(this.getEventResult, contractAddress, sinceTimestamp, eventName, blockNumber);
      if (!this.eventServer) callback('No event server configured');
      var routeParams = [];
      if (!this.isAddress(contractAddress)) return callback('Invalid contract address provided');
      if (eventName && !contractAddress) return callback('Usage of event name filtering requires a contract address');
      if (blockNumber && !eventName) return callback('Usage of block number filtering requires an event name');
      if (contractAddress) routeParams.push(this.address.fromHex(contractAddress));
      if (eventName) routeParams.push(eventName);
      if (blockNumber) routeParams.push(blockNumber);
      return this.eventServer.request("event/contract/".concat(routeParams.join('/'), "?since=").concat(sinceTimestamp)).then(function () {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!data) return callback('Unknown error occurred');
        if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isArray(data)) return callback(data);
        return callback(null, data.map(function (event) {
          return utils__WEBPACK_IMPORTED_MODULE_12__["default"].mapEvent(event);
        }));
      }).catch(function (err) {
        return callback(err.response && err.response.data || err);
      });
    }
  }, {
    key: "getEventByTransactionID",
    value: function getEventByTransactionID() {
      var transactionID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getEventByTransactionID, transactionID);
      if (!this.eventServer) callback('No event server configured');
      return this.eventServer.request("event/transaction/".concat(transactionID)).then(function () {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!data) return callback('Unknown error occurred');
        if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isArray(data)) return callback(data);
        return callback(null, data.map(function (event) {
          return utils__WEBPACK_IMPORTED_MODULE_12__["default"].mapEvent(event);
        }));
      }).catch(function (err) {
        return callback(err.response && err.response.data || err);
      });
    }
  }, {
    key: "contract",
    value: function contract() {
      var abi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return new lib_contract__WEBPACK_IMPORTED_MODULE_17__["default"](this, abi, address);
    }
  }, {
    key: "isConnected",
    value: function () {
      var _isConnected = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        var callback,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                callback = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

                if (callback) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", this.injectPromise(this.isConnected));

              case 3:
                _context.t0 = callback;
                _context.next = 6;
                return this.fullNode.isConnected();

              case 6:
                _context.t1 = _context.sent;
                _context.next = 9;
                return this.solidityNode.isConnected();

              case 9:
                _context.t2 = _context.sent;
                _context.t3 = this.eventServer;

                if (!_context.t3) {
                  _context.next = 15;
                  break;
                }

                _context.next = 14;
                return this.eventServer.isConnected();

              case 14:
                _context.t3 = _context.sent;

              case 15:
                _context.t4 = _context.t3;
                _context.t5 = {
                  fullNode: _context.t1,
                  solidityNode: _context.t2,
                  eventServer: _context.t4
                };
                (0, _context.t0)(null, _context.t5);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function isConnected() {
        return _isConnected.apply(this, arguments);
      };
    }()
  }], [{
    key: "sha3",
    value: function sha3(string) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return (prefix ? '0x' : '') + Object(js_sha3__WEBPACK_IMPORTED_MODULE_18__["keccak256"])(string);
    }
  }, {
    key: "toHex",
    value: function toHex(val) {
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isBoolean(val)) return TronWeb.fromDecimal(+val);
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isBigNumber(val)) return TronWeb.fromDecimal(val);
      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(val) === 'object') return TronWeb.fromUtf8(JSON.stringify(val));

      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(val)) {
        if (/^(-|)0x/.test(val)) return val;
        if (!isFinite(val)) return TronWeb.fromUtf8(val);
      }

      var result = TronWeb.fromDecimal(val);

      if (result === '0xNaN') {
        throw new Error('The passed value is not convertible to a hex string');
      } else {
        return result;
      }
    }
  }, {
    key: "toUtf8",
    value: function toUtf8(hex) {
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isHex(hex)) {
        hex = hex.replace(/^0x/, '');
        return Buffer.from(hex, 'hex').toString('utf8');
      } else {
        throw new Error('The passed value is not a valid hex string');
      }
    }
  }, {
    key: "fromUtf8",
    value: function fromUtf8(string) {
      if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(string)) {
        throw new Error('The passed value is not a valid utf-8 string');
      }

      return '0x' + Buffer.from(string, 'utf8').toString('hex');
    }
  }, {
    key: "toAscii",
    value: function toAscii(hex) {
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isHex(hex)) {
        var str = "";
        var i = 0,
            l = hex.length;

        if (hex.substring(0, 2) === '0x') {
          i = 2;
        }

        for (; i < l; i += 2) {
          var code = parseInt(hex.substr(i, 2), 16);
          str += String.fromCharCode(code);
        }

        return str;
      } else {
        throw new Error('The passed value is not a valid hex string');
      }
    }
  }, {
    key: "fromAscii",
    value: function fromAscii(string, padding) {
      if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(string)) {
        throw new Error('The passed value is not a valid utf-8 string');
      }

      return '0x' + Buffer.from(string, 'ascii').toString('hex').padEnd(padding, '0');
    }
  }, {
    key: "toDecimal",
    value: function toDecimal(value) {
      return TronWeb.toBigNumber(value).toNumber();
    }
  }, {
    key: "fromDecimal",
    value: function fromDecimal(value) {
      var number = TronWeb.toBigNumber(value);
      var result = number.toString(16);
      return number.isLessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
    }
  }, {
    key: "fromSun",
    value: function fromSun(sun) {
      var trx = TronWeb.toBigNumber(sun).div(1000000);
      return utils__WEBPACK_IMPORTED_MODULE_12__["default"].isBigNumber(sun) ? trx : trx.toString(10);
    }
  }, {
    key: "toSun",
    value: function toSun(trx) {
      var sun = TronWeb.toBigNumber(trx).times(1000000);
      return utils__WEBPACK_IMPORTED_MODULE_12__["default"].isBigNumber(trx) ? sun : sun.toString(10);
    }
  }, {
    key: "toBigNumber",
    value: function toBigNumber() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isBigNumber(amount)) return amount;
      if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(amount) && /^(-|)0x/.test(amount)) return new bignumber_js__WEBPACK_IMPORTED_MODULE_13___default.a(amount.replace('0x', ''), 16);
      return new bignumber_js__WEBPACK_IMPORTED_MODULE_13___default.a(amount.toString(10), 10);
    }
  }, {
    key: "isAddress",
    value: function isAddress() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isString(address)) return false; // Convert HEX to Base58

      if (address.length === 42) {
        try {
          return TronWeb.isAddress(utils__WEBPACK_IMPORTED_MODULE_12__["default"].crypto.getBase58CheckAddress(utils__WEBPACK_IMPORTED_MODULE_12__["default"].code.hexStr2byteArray(address) // it throws an error if the address starts with 0x
          ));
        } catch (err) {
          return false;
        }
      }

      return utils__WEBPACK_IMPORTED_MODULE_12__["default"].crypto.isAddressValid(address);
    }
  }, {
    key: "createAccount",
    value: function () {
      var _createAccount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
        var callback,
            account,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                callback = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                account = utils__WEBPACK_IMPORTED_MODULE_12__["default"].accounts.generateAccount();
                if (callback) callback(null, account);
                return _context2.abrupt("return", account);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function createAccount() {
        return _createAccount.apply(this, arguments);
      };
    }()
  }, {
    key: "address",
    get: function get() {
      return {
        fromHex: function fromHex(address) {
          if (!utils__WEBPACK_IMPORTED_MODULE_12__["default"].isHex(address)) return address;
          return utils__WEBPACK_IMPORTED_MODULE_12__["default"].crypto.getBase58CheckAddress(utils__WEBPACK_IMPORTED_MODULE_12__["default"].code.hexStr2byteArray(address));
        },
        toHex: function toHex(address) {
          if (utils__WEBPACK_IMPORTED_MODULE_12__["default"].isHex(address)) return address.toLowerCase().replace(/^0x/, '41');
          return utils__WEBPACK_IMPORTED_MODULE_12__["default"].code.byteArray2hexStr(utils__WEBPACK_IMPORTED_MODULE_12__["default"].crypto.decodeBase58Address(address)).toLowerCase();
        },
        fromPrivateKey: function fromPrivateKey(privateKey) {
          try {
            return utils__WEBPACK_IMPORTED_MODULE_12__["default"].crypto.pkToAddress(privateKey);
          } catch (_unused2) {
            return false;
          }
        }
      };
    }
  }]);

  return TronWeb;
}(eventemitter3__WEBPACK_IMPORTED_MODULE_14___default.a);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(TronWeb, "providers", lib_providers__WEBPACK_IMPORTED_MODULE_11__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(TronWeb, "BigNumber", bignumber_js__WEBPACK_IMPORTED_MODULE_13___default.a);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(TronWeb, "TransactionBuilder", lib_transactionBuilder__WEBPACK_IMPORTED_MODULE_15__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(TronWeb, "Trx", lib_trx__WEBPACK_IMPORTED_MODULE_16__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(TronWeb, "Contract", lib_contract__WEBPACK_IMPORTED_MODULE_17__["default"]);


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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! index */ "./src/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var _method__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./method */ "./src/lib/contract/method.js");










var Contract =
/*#__PURE__*/
function () {
  function Contract() {
    var tronWeb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var abi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var address = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Contract);

    if (!tronWeb || !tronWeb instanceof index__WEBPACK_IMPORTED_MODULE_6__["default"]) throw new Error('Expected instance of TronWeb');
    this.tronWeb = tronWeb;
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_7__["default"].promiseInjector(this);
    this.address = address;
    this.abi = abi;
    this.eventListener = false;
    this.bytecode = false;
    this.deployed = false;
    this.lastBlock = false;
    this.methods = {};
    this.methodInstances = {};
    this.props = [];
    if (this.tronWeb.isAddress(address)) this.deployed = true;else this.address = false;
    this.loadAbi(abi);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Contract, [{
    key: "_getEvents",
    value: function () {
      var _getEvents2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this = this;

        var options,
            events,
            _events$sort,
            _events$sort2,
            latestEvent,
            newEvents,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.tronWeb.getEventResult(this.address);

              case 3:
                events = _context.sent;
                _events$sort = events.sort(function (a, b) {
                  return b.block - a.block;
                }), _events$sort2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_events$sort, 1), latestEvent = _events$sort2[0];
                newEvents = events.filter(function (event, index) {
                  if (options.resourceNode && !RegExp(options.resourceNode, 'i').test(event.resourceNode)) return false;
                  var duplicate = events.slice(0, index).some(function (priorEvent) {
                    return JSON.stringify(priorEvent) == JSON.stringify(event);
                  });
                  if (duplicate) return false;
                  if (!_this.lastBlock) return true;
                  return event.block > _this.lastBlock;
                });
                if (latestEvent) this.lastBlock = latestEvent.block;
                return _context.abrupt("return", newEvents);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function _getEvents() {
        return _getEvents2.apply(this, arguments);
      };
    }()
  }, {
    key: "_startEventListener",
    value: function () {
      var _startEventListener2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this2 = this;

        var options,
            callback,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                callback = _args2.length > 1 ? _args2[1] : undefined;

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (this.eventListener) clearInterval(this.eventListener);

                if (this.tronWeb.eventServer) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Event server is not configured');

              case 6:
                if (this.address) {
                  _context2.next = 8;
                  break;
                }

                throw new Error('Contract is not configured with an address');

              case 8:
                this.eventCallback = callback;
                _context2.next = 11;
                return this._getEvents(options);

              case 11:
                this.eventListener = setInterval(function () {
                  _this2._getEvents(options).then(function (newEvents) {
                    return newEvents.forEach(function (event) {
                      _this2.eventCallback && _this2.eventCallback(event);
                    });
                  }).catch(function (err) {
                    console.error('Failed to get event list', err);
                  });
                }, 3000);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _startEventListener() {
        return _startEventListener2.apply(this, arguments);
      };
    }()
  }, {
    key: "_stopEventListener",
    value: function _stopEventListener() {
      if (!this.eventListener) return;
      clearInterval(this.eventListener);
      this.eventListener = false;
      this.eventCallback = false;
    }
  }, {
    key: "hasProperty",
    value: function hasProperty(property) {
      return this.hasOwnProperty(property) || this.__proto__.hasOwnProperty(property);
    }
  }, {
    key: "loadAbi",
    value: function loadAbi(abi) {
      var _this3 = this;

      this.abi = abi;
      this.methods = {};
      this.props.forEach(function (prop) {
        return delete _this3[prop];
      });
      abi.forEach(function (func) {
        // Don't build a method for constructor function. That's handled through contract create.
        if (func.type.toLowerCase() === 'constructor') return;
        var method = new _method__WEBPACK_IMPORTED_MODULE_8__["default"](_this3, func);
        var methodCall = method.onMethod.bind(method);
        var name = method.name,
            functionSelector = method.functionSelector,
            signature = method.signature;
        _this3.methods[name] = methodCall;
        _this3.methods[functionSelector] = methodCall;
        _this3.methods[signature] = methodCall;
        _this3.methodInstances[name] = method;
        _this3.methodInstances[functionSelector] = method;
        _this3.methodInstances[signature] = method;

        if (!_this3.hasProperty(name)) {
          _this3[name] = methodCall;

          _this3.props.push(name);
        }

        if (!_this3.hasProperty(functionSelector)) {
          _this3[functionSelector] = methodCall;

          _this3.props.push(functionSelector);
        }

        if (!_this3.hasProperty(signature)) {
          _this3[signature] = methodCall;

          _this3.props.push(signature);
        }
      });
    }
  }, {
    key: "decodeInput",
    value: function decodeInput(data) {
      var methodName = data.substring(0, 8);
      var inputData = data.substring(8);
      if (!this.methodInstances[methodName]) throw new Error('Contract method ' + methodName + " not found");
      var methodInstance = this.methodInstances[methodName];
      return {
        name: methodInstance.name,
        params: this.methodInstances[methodName].decodeInput(inputData)
      };
    }
  }, {
    key: "new",
    value: function () {
      var _new2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(options) {
        var privateKey,
            callback,
            address,
            transaction,
            signedTransaction,
            contract,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                privateKey = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : this.tronWeb.defaultPrivateKey;
                callback = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(privateKey)) {
                  callback = privateKey;
                  privateKey = this.tronWeb.defaultPrivateKey;
                }

                if (callback) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", this.injectPromise(this.new, options, privateKey));

              case 5:
                _context3.prev = 5;
                address = this.tronWeb.address.fromPrivateKey(privateKey);
                _context3.next = 9;
                return this.tronWeb.transactionBuilder.createSmartContract(options, address);

              case 9:
                transaction = _context3.sent;
                _context3.next = 12;
                return this.tronWeb.trx.sign(transaction, privateKey);

              case 12:
                signedTransaction = _context3.sent;
                _context3.next = 15;
                return this.tronWeb.trx.sendRawTransaction(signedTransaction);

              case 15:
                contract = _context3.sent;

                if (contract.result) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("return", callback('Unknown error: ' + JSON.stringify(contract, null, 2)));

              case 18:
                return _context3.abrupt("return", this.at(signedTransaction.contract_address, callback));

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](5);
                return _context3.abrupt("return", callback(_context3.t0));

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 21]]);
      }));

      return function _new(_x) {
        return _new2.apply(this, arguments);
      };
    }()
  }, {
    key: "at",
    value: function () {
      var _at = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(contractAddress) {
        var callback,
            contract,
            _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                callback = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;

                if (callback) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", this.injectPromise(this.at, contractAddress));

              case 3:
                _context4.prev = 3;
                _context4.next = 6;
                return this.tronWeb.trx.getContract(contractAddress);

              case 6:
                contract = _context4.sent;
                if (!contract.contract_address) callback('Unknown error: ' + JSON.stringify(contract, null, 2));
                this.address = contract.contract_address;
                this.bytecode = contract.bytecode;
                this.deployed = true;
                this.loadAbi(contract.abi.entrys);
                callback(null, this);
                _context4.next = 20;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](3);

                if (!_context4.t0.toString().includes('does not exist')) {
                  _context4.next = 19;
                  break;
                }

                return _context4.abrupt("return", callback('Contract has not been deployed on the network'));

              case 19:
                return _context4.abrupt("return", callback(_context4.t0));

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 15]]);
      }));

      return function at(_x2) {
        return _at.apply(this, arguments);
      };
    }()
  }, {
    key: "events",
    value: function events() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(options)) {
        callback = options;
        options = {};
      }

      if (!utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(callback)) throw new Error('Callback function expected');
      var self = this;
      return {
        start: function start() {
          var startCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (!startCallback) {
            self._startEventListener(options, callback);

            return this;
          }

          self._startEventListener(options, callback).then(function () {
            startCallback();
          }).catch(function (err) {
            startCallback(err);
          });

          return this;
        },
        stop: function stop() {
          self._stopEventListener();
        }
      };
    }
  }]);

  return Contract;
}();



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
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! utils */ "./src/utils/index.js");









var getFunctionSelector = function getFunctionSelector(abi) {
  return abi.name + '(' + getParamTypes(abi.inputs || []).join(',') + ')';
};

var getParamTypes = function getParamTypes(params) {
  return params.map(function (_ref) {
    var type = _ref.type;
    return type;
  });
};

var decodeOutput = function decodeOutput(abi, output) {
  var names = abi.map(function (_ref2) {
    var name = _ref2.name;
    return name;
  }).filter(function (name) {
    return !!name;
  });
  var types = abi.map(function (_ref3) {
    var type = _ref3.type;
    return type;
  });
  return utils__WEBPACK_IMPORTED_MODULE_7__["default"].abi.decodeParams(names, types, output);
};

var Method =
/*#__PURE__*/
function () {
  function Method(contract, abi) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Method);

    this.tronWeb = contract.tronWeb;
    this.contract = contract;
    this.abi = abi;
    this.name = abi.name || (abi.name = abi.type);
    this.inputs = abi.inputs || [];
    this.outputs = abi.outputs || [];
    this.functionSelector = getFunctionSelector(abi);
    this.signature = this.tronWeb.sha3(this.functionSelector, false).slice(0, 8);
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_7__["default"].promiseInjector(this);
    this.defaultOptions = {
      feeLimit: 1000000000,
      callValue: 0,
      from: this.tronWeb.defaultAddress.hex,
      // Only used for send()
      shouldPollResponse: false // Only used for sign()

    };
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Method, [{
    key: "decodeInput",
    value: function decodeInput(data) {
      return decodeOutput(this.inputs, '0x' + data);
    }
  }, {
    key: "onMethod",
    value: function onMethod() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var types = getParamTypes(this.inputs);
      args.forEach(function (arg, index) {
        if (types[index] == 'address') args[index] = _this.tronWeb.address.toHex(arg).replace(/^(41)/, '0x');

        if (types[index] == 'address[]') {
          args[index] = args[index].map(function (address) {
            return _this.tronWeb.address.toHex(address).replace(/^(41)/, '0x');
          });
        }
      });
      return {
        call: function call() {
          for (var _len2 = arguments.length, methodArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            methodArgs[_key2] = arguments[_key2];
          }

          return _this._call.apply(_this, [types, args].concat(methodArgs));
        },
        send: function send() {
          for (var _len3 = arguments.length, methodArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            methodArgs[_key3] = arguments[_key3];
          }

          return _this._send.apply(_this, [types, args].concat(methodArgs));
        },
        watch: function watch() {
          return _this._watch.apply(_this, arguments);
        }
      };
    }
  }, {
    key: "_call",
    value: function () {
      var _call2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(types, args) {
        var _this2 = this;

        var options,
            callback,
            stateMutability,
            parameters,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                callback = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (callback) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", this.injectPromise(this._call, types, args, options));

              case 5:
                if (!(types.length !== args.length)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", callback('Invalid argument count provided'));

              case 7:
                if (this.contract.address) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", callback('Smart contract is missing address'));

              case 9:
                if (this.contract.deployed) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", callback('Calling smart contracts requires you to load the contract first'));

              case 11:
                stateMutability = this.abi.stateMutability;

                if (['pure', 'view'].includes(stateMutability.toLowerCase())) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", callback("Methods with state mutability \"".concat(stateMutability, "\" must use send()")));

              case 14:
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, this.defaultOptions, options);
                parameters = args.map(function (value, index) {
                  return {
                    type: types[index],
                    value: value
                  };
                });
                this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address, this.functionSelector, options.feeLimit, options.callValue, parameters, this.tronWeb.address.toHex(options.from), function (err, transaction) {
                  if (err) return callback(err);
                  if (!utils__WEBPACK_IMPORTED_MODULE_7__["default"].hasProperty(transaction, 'constant_result')) return callback('Failed to execute');

                  try {
                    var output = decodeOutput(_this2.outputs, '0x' + transaction.constant_result[0]);
                    if (output.length === 1) output = output[0];
                    return callback(null, output);
                  } catch (ex) {
                    return callback(ex);
                  }
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function _call(_x, _x2) {
        return _call2.apply(this, arguments);
      };
    }()
  }, {
    key: "_send",
    value: function () {
      var _send2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(types, args) {
        var _this3 = this;

        var options,
            privateKey,
            callback,
            stateMutability,
            parameters,
            address,
            transaction,
            signedTransaction,
            broadcast,
            checkResult,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                privateKey = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : this.tronWeb.defaultPrivateKey;
                callback = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(privateKey)) {
                  callback = privateKey;
                  privateKey = this.tronWeb.defaultPrivateKey;
                }

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (callback) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", this.injectPromise(this._send, types, args, options, privateKey));

              case 7:
                if (!(types.length !== args.length)) {
                  _context3.next = 9;
                  break;
                }

                throw new Error('Invalid argument count provided');

              case 9:
                if (this.contract.address) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", callback('Smart contract is missing address'));

              case 11:
                if (this.contract.deployed) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", callback('Calling smart contracts requires you to load the contract first'));

              case 13:
                stateMutability = this.abi.stateMutability;

                if (!['pure', 'view'].includes(stateMutability.toLowerCase())) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", callback("Methods with state mutability \"".concat(stateMutability, "\" must use call()")));

              case 16:
                // If a function isn't payable, dont provide a callValue.
                if (!['payable'].includes(stateMutability.toLowerCase())) options.callValue = 0;
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, this.defaultOptions, options);
                parameters = args.map(function (value, index) {
                  return {
                    type: types[index],
                    value: value
                  };
                });
                _context3.prev = 19;
                address = privateKey ? this.tronWeb.address.fromPrivateKey(privateKey) : this.tronWeb.defaultAddress.base58;
                _context3.next = 23;
                return this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address, this.functionSelector, options.feeLimit, options.callValue, parameters, this.tronWeb.address.toHex(address));

              case 23:
                transaction = _context3.sent;

                if (!(!transaction.result || !transaction.result.result)) {
                  _context3.next = 26;
                  break;
                }

                return _context3.abrupt("return", callback('Unknown error: ' + JSON.stringify(transaction, null, 2)));

              case 26:
                _context3.next = 28;
                return this.tronWeb.trx.sign(transaction.transaction, privateKey);

              case 28:
                signedTransaction = _context3.sent;

                if (signedTransaction.signature) {
                  _context3.next = 33;
                  break;
                }

                if (privateKey) {
                  _context3.next = 32;
                  break;
                }

                return _context3.abrupt("return", callback('Transaction was not signed properly'));

              case 32:
                return _context3.abrupt("return", callback('Invalid private key provided'));

              case 33:
                _context3.next = 35;
                return this.tronWeb.trx.sendRawTransaction(signedTransaction);

              case 35:
                broadcast = _context3.sent;

                if (broadcast.result) {
                  _context3.next = 38;
                  break;
                }

                return _context3.abrupt("return", callback('Unknown error: ' + JSON.stringify(broadcast, null, 2)));

              case 38:
                if (options.shouldPollResponse) {
                  _context3.next = 40;
                  break;
                }

                return _context3.abrupt("return", callback(null, signedTransaction.txID));

              case 40:
                checkResult =
                /*#__PURE__*/
                function () {
                  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
                  /*#__PURE__*/
                  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
                    var index,
                        output,
                        decoded,
                        _args2 = arguments;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            index = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0;

                            if (!(index == 20)) {
                              _context2.next = 3;
                              break;
                            }

                            return _context2.abrupt("return", callback({
                              error: 'Cannot find result in solidity node',
                              transaction: signedTransaction
                            }));

                          case 3:
                            _context2.next = 5;
                            return _this3.tronWeb.trx.getTransactionInfo(signedTransaction.txID);

                          case 5:
                            output = _context2.sent;

                            if (Object.keys(output).length) {
                              _context2.next = 8;
                              break;
                            }

                            return _context2.abrupt("return", setTimeout(function () {
                              checkResult(index + 1);
                            }, 3000));

                          case 8:
                            if (!(output.result && output.result == 'FAILED')) {
                              _context2.next = 10;
                              break;
                            }

                            return _context2.abrupt("return", callback({
                              error: _this3.tronWeb.toUtf8(output.resMessage),
                              transaction: signedTransaction,
                              output: output
                            }));

                          case 10:
                            if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].hasProperty(output, 'contractResult')) {
                              _context2.next = 12;
                              break;
                            }

                            return _context2.abrupt("return", callback({
                              error: 'Failed to execute: ' + JSON.stringify(output, null, 2),
                              transaction: signedTransaction,
                              output: output
                            }));

                          case 12:
                            decoded = decodeOutput(_this3.outputs, '0x' + output.contractResult[0]);
                            if (decoded.length === 1) decoded = decoded[0];
                            return _context2.abrupt("return", callback(null, decoded));

                          case 15:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  return function checkResult() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                checkResult();
                _context3.next = 47;
                break;

              case 44:
                _context3.prev = 44;
                _context3.t0 = _context3["catch"](19);
                return _context3.abrupt("return", callback(_context3.t0));

              case 47:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[19, 44]]);
      }));

      return function _send(_x3, _x4) {
        return _send2.apply(this, arguments);
      };
    }()
  }, {
    key: "_watch",
    value: function () {
      var _watch2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5() {
        var _this4 = this;

        var options,
            callback,
            listener,
            lastBlock,
            sinceTimestamp,
            getEvents,
            bindListener,
            _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                callback = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (utils__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction(callback)) {
                  _context5.next = 5;
                  break;
                }

                throw new Error('Expected callback to be provided');

              case 5:
                if (this.contract.address) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", callback('Smart contract is missing address'));

              case 7:
                if (!(this.abi.type.toLowerCase() !== 'event')) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", callback('Invalid method type for event watching'));

              case 9:
                if (this.tronWeb.eventServer) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", callback('No event server configured'));

              case 11:
                listener = false;
                lastBlock = false;
                sinceTimestamp = new Date().getTime();

                getEvents =
                /*#__PURE__*/
                function () {
                  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
                  /*#__PURE__*/
                  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
                    var events, _events$sort, _events$sort2, latestEvent, newEvents;

                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return _this4.tronWeb.getEventResult(_this4.contract.address, sinceTimestamp, _this4.name);

                          case 3:
                            events = _context4.sent;
                            _events$sort = events.sort(function (a, b) {
                              return b.block - a.block;
                            }), _events$sort2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_events$sort, 1), latestEvent = _events$sort2[0];
                            newEvents = events.filter(function (event, index) {
                              if (options.resourceNode && !RegExp(options.resourceNode, 'i').test(event.resourceNode)) return false;
                              var duplicate = events.slice(0, index).some(function (priorEvent) {
                                return JSON.stringify(priorEvent) == JSON.stringify(event);
                              });
                              if (duplicate) return false;
                              if (!lastBlock) return true;
                              return event.block > lastBlock;
                            });
                            if (latestEvent) lastBlock = latestEvent.block;
                            return _context4.abrupt("return", newEvents);

                          case 10:
                            _context4.prev = 10;
                            _context4.t0 = _context4["catch"](0);
                            return _context4.abrupt("return", Promise.reject(_context4.t0));

                          case 13:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this, [[0, 10]]);
                  }));

                  return function getEvents() {
                    return _ref5.apply(this, arguments);
                  };
                }();

                bindListener = function bindListener() {
                  if (listener) clearInterval(listener);
                  listener = setInterval(function () {
                    getEvents().then(function (events) {
                      return events.forEach(function (event) {
                        callback(null, utils__WEBPACK_IMPORTED_MODULE_7__["default"].parseEvent(event, _this4.abi));
                      });
                    }).catch(function (err) {
                      return callback(err);
                    });
                  }, 3000);
                };

                _context5.next = 18;
                return getEvents();

              case 18:
                bindListener();
                return _context5.abrupt("return", {
                  start: bindListener(),
                  stop: function stop() {
                    if (!listener) return;
                    clearInterval(listener);
                    listener = false;
                  }
                });

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function _watch() {
        return _watch2.apply(this, arguments);
      };
    }()
  }]);

  return Method;
}();



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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! utils */ "./src/utils/index.js");








var HttpProvider =
/*#__PURE__*/
function () {
  function HttpProvider(host) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;
    var user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var password = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var statusPage = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '/';

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, HttpProvider);

    if (!utils__WEBPACK_IMPORTED_MODULE_6__["default"].isValidURL(host)) throw new Error('Invalid URL provided to HttpProvider');
    if (isNaN(timeout) || timeout < 0) throw new Error('Invalid timeout duration provided');
    if (!utils__WEBPACK_IMPORTED_MODULE_6__["default"].isObject(headers)) throw new Error('Invalid headers object provided');
    host = host.replace(/\/+$/, '');
    this.host = host;
    this.timeout = timeout;
    this.user = user;
    this.password = password;
    this.headers = headers;
    this.statusPage = statusPage;
    this.instance = axios__WEBPACK_IMPORTED_MODULE_5___default.a.create({
      baseURL: host,
      timeout: timeout,
      headers: headers,
      auth: user && {
        user: user,
        password: password
      }
    });
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(HttpProvider, [{
    key: "setStatusPage",
    value: function setStatusPage() {
      var statusPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      this.statusPage = statusPage;
    }
  }, {
    key: "isConnected",
    value: function () {
      var _isConnected = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var statusPage,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                statusPage = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.statusPage;
                return _context.abrupt("return", this.request(statusPage).then(function (data) {
                  return utils__WEBPACK_IMPORTED_MODULE_6__["default"].hasProperties(data, 'blockID', 'block_header');
                }).catch(function () {
                  return false;
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function isConnected() {
        return _isConnected.apply(this, arguments);
      };
    }()
  }, {
    key: "request",
    value: function request(url) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
      method = method.toLowerCase();
      return this.instance.request({
        data: method == 'post' && payload,
        params: method == 'get' && payload,
        url: url,
        method: method
      }).then(function (_ref) {
        var data = _ref.data;
        return data;
      });
    }
  }]);

  return HttpProvider;
}();


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
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! index */ "./src/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_6__);








var TransactionBuilder =
/*#__PURE__*/
function () {
  function TransactionBuilder() {
    var tronWeb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TransactionBuilder);

    if (!tronWeb || !tronWeb instanceof index__WEBPACK_IMPORTED_MODULE_4__["default"]) throw new Error('Expected instance of TronWeb');
    this.tronWeb = tronWeb;
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_5__["default"].promiseInjector(this);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TransactionBuilder, [{
    key: "sendTrx",
    value: function sendTrx() {
      var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(from)) {
        callback = from;
        from = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.sendTrx, to, amount, from);
      if (!this.tronWeb.isAddress(to)) return callback('Invalid recipient address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
      if (!this.tronWeb.isAddress(from)) return callback('Invalid origin address provided');
      to = this.tronWeb.address.toHex(to);
      from = this.tronWeb.address.toHex(from);
      if (to === from) return callback('Cannot transfer TRX to the same account');
      this.tronWeb.fullNode.request('wallet/createtransaction', {
        to_address: to,
        owner_address: from,
        amount: parseInt(amount)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "sendToken",
    value: function sendToken() {
      var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var tokenID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(from)) {
        callback = from;
        from = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.sendToken, to, amount, tokenID, from);
      if (!this.tronWeb.isAddress(to)) return callback('Invalid recipient address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(tokenID) || !tokenID.length) return callback('Invalid token ID provided');
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
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "purchaseToken",
    value: function purchaseToken() {
      var issuerAddress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tokenID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var buyer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(buyer)) {
        callback = buyer;
        buyer = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.purchaseToken, issuerAddress, tokenID, amount, buyer);
      if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(tokenID) || !tokenID.length) return callback('Invalid token ID provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
      if (!this.tronWeb.isAddress(buyer)) return callback('Invalid buyer address provided');
      this.tronWeb.fullNode.request('wallet/participateassetissue', {
        to_address: this.tronWeb.address.toHex(issuerAddress),
        owner_address: this.tronWeb.address.toHex(buyer),
        asset_name: this.tronWeb.fromUtf8(tokenID),
        amount: parseInt(amount)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "freezeBalance",
    value: function freezeBalance() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      var resource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "BANDWIDTH";
      var address = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(duration)) {
        callback = duration;
        duration = 3;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(resource)) {
        callback = resource;
        resource = "BANDWIDTH";
      }

      if (!callback) return this.injectPromise(this.freezeBalance, amount, duration, resource, address);
      if (!['BANDWIDTH', 'ENERGY'].includes(resource)) return callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(amount) || amount <= 0) return callback('Invalid amount provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(duration) || duration < 3) return callback('Invalid duration provided, minimum of 3 days');
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      this.tronWeb.fullNode.request('wallet/freezebalance', {
        owner_address: this.tronWeb.address.toHex(address),
        frozen_balance: parseInt(amount),
        frozen_duration: parseInt(duration),
        resource: resource
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "unfreezeBalance",
    value: function unfreezeBalance() {
      var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "BANDWIDTH";
      var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(resource)) {
        callback = resource;
        resource = "BANDWIDTH";
      }

      if (!callback) return this.injectPromise(this.unfreezeBalance, resource, address);
      if (!['BANDWIDTH', 'ENERGY'].includes(resource)) return callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      this.tronWeb.fullNode.request('wallet/unfreezebalance', {
        owner_address: this.tronWeb.address.toHex(address),
        resource: resource
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "withdrawBlockRewards",
    value: function withdrawBlockRewards() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.withdrawBlockRewards, address);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      this.tronWeb.fullNode.request('wallet/withdrawbalance', {
        owner_address: this.tronWeb.address.toHex(address)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "applyForSR",
    value: function applyForSR() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isValidURL(address)) {
        callback = url || false;
        url = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.applyForSR, address, url);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isValidURL(url)) return callback('Invalid url provided');
      this.tronWeb.fullNode.request('wallet/createwitness', {
        owner_address: this.tronWeb.address.toHex(address),
        url: this.tronWeb.fromUtf8(url)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "vote",
    value: function vote() {
      var _this = this;

      var votes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var voterAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(voterAddress)) {
        callback = voterAddress;
        voterAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.vote, votes, voterAddress);
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isObject(votes) || !Object.keys(votes).length) return callback('Invalid votes object provided');
      if (!this.tronWeb.isAddress(voterAddress)) return callback('Invalid voter address provided');
      var invalid = false;
      votes = Object.entries(votes).map(function (_ref) {
        var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
            srAddress = _ref2[0],
            voteCount = _ref2[1];

        if (invalid) return;

        if (!_this.tronWeb.isAddress(srAddress)) {
          callback('Invalid SR address provided: ' + srAddress);
          return invalid = true;
        }

        if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(voteCount) || voteCount <= 0) {
          callback('Invalid vote count provided for SR: ' + srAddress);
          return invalid = true;
        }

        return {
          vote_address: _this.tronWeb.address.toHex(srAddress),
          vote_count: parseInt(voteCount)
        };
      });
      if (invalid) return;
      this.tronWeb.fullNode.request('wallet/votewitnessaccount', {
        owner_address: this.tronWeb.address.toHex(voterAddress),
        votes: votes
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "createSmartContract",
    value: function createSmartContract() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var issuerAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(issuerAddress)) {
        callback = issuerAddress;
        issuerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.createSmartContract, options, issuerAddress);
      var _options$abi = options.abi,
          abi = _options$abi === void 0 ? false : _options$abi,
          _options$bytecode = options.bytecode,
          bytecode = _options$bytecode === void 0 ? false : _options$bytecode,
          _options$feeLimit = options.feeLimit,
          feeLimit = _options$feeLimit === void 0 ? 1000000000 : _options$feeLimit,
          _options$callValue = options.callValue,
          callValue = _options$callValue === void 0 ? 0 : _options$callValue,
          _options$userFeePerce = options.userFeePercentage,
          userFeePercentage = _options$userFeePerce === void 0 ? 0 : _options$userFeePerce,
          _options$parameters = options.parameters,
          parameters = _options$parameters === void 0 ? [] : _options$parameters,
          _options$name = options.name,
          name = _options$name === void 0 ? "" : _options$name;

      if (abi && utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(abi)) {
        try {
          abi = JSON.parse(abi);
        } catch (_unused) {
          return callback('Invalid options.abi provided');
        }
      }

      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isArray(abi)) return callback('Invalid options.abi provided');
      var payable = abi.some(function (func) {
        return func.type == 'constructor' && func.payable;
      });
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isHex(bytecode)) return callback('Invalid options.bytecode provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(feeLimit) || feeLimit <= 0 || feeLimit > 1000000000) return callback('Invalid options.feeLimit provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(callValue) || callValue < 0) return callback('Invalid options.callValue provided');
      if (payable && callValue == 0) return callback('When contract is payable, options.callValue must be a positive integer');
      if (!payable && callValue > 0) return callback('When contract is not payable, options.callValue must be 0');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(userFeePercentage) || userFeePercentage < 0 || userFeePercentage > 100) return callback('Invalid options.userFeePercentage provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isArray(parameters)) return callback('Invalid parameters provided');
      if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
      var constructorParams = abi.find(function (it) {
        return it.type === 'constructor';
      });

      if (typeof constructorParams !== 'undefined' && constructorParams) {
        var abiCoder = new ethers__WEBPACK_IMPORTED_MODULE_6__["utils"].AbiCoder();
        var types = [];
        var values = [];
        constructorParams = constructorParams.inputs;
        if (parameters.length != constructorParams.length) return callback("constructor needs ".concat(constructorParams.length, " but ").concat(parameters.length, " provided"));

        for (var i = 0; i < parameters.length; i++) {
          var type = constructorParams[i].type;
          var value = parameters[i];
          if (!type || !utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(type) || !type.length) return callback('Invalid parameter type provided: ' + type);
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
        consume_user_resource_percent: userFeePercentage,
        abi: JSON.stringify(abi),
        bytecode: bytecode,
        parameter: parameters,
        name: name
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "triggerSmartContract",
    value: function triggerSmartContract(contractAddress, functionSelector) {
      var _this2 = this;

      var feeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000000000;
      var callValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var parameters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var issuerAddress = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(issuerAddress)) {
        callback = issuerAddress;
        issuerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(parameters)) {
        callback = parameters;
        parameters = [];
      }

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(callValue)) {
        callback = callValue;
        callValue = 0;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(feeLimit)) {
        callback = feeLimit;
        feeLimit = 1000000000;
      }

      if (!callback) {
        return this.injectPromise(this.triggerSmartContract, contractAddress, functionSelector, feeLimit, callValue, parameters, issuerAddress);
      }

      if (!this.tronWeb.isAddress(contractAddress)) return callback('Invalid contract address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(functionSelector) || !functionSelector.length) return callback('Invalid function selector provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(callValue) || callValue < 0) return callback('Invalid call value provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(feeLimit) || feeLimit <= 0 || feeLimit > 1000000000) return callback('Invalid fee limit provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isArray(parameters)) return callback('Invalid parameters provided');
      if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
      functionSelector = functionSelector.replace('/\s*/g', '');

      if (parameters.length) {
        var abiCoder = new ethers__WEBPACK_IMPORTED_MODULE_6__["utils"].AbiCoder();
        var types = [];
        var values = [];

        for (var i = 0; i < parameters.length; i++) {
          var _parameters$i = parameters[i],
              type = _parameters$i.type,
              value = _parameters$i.value;
          if (!type || !utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(type) || !type.length) return callback('Invalid parameter type provided: ' + type);
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
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this2.tronWeb.toUtf8(transaction.result.message));
        }

        if (!transaction.result.result) return callback(transaction);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "createToken",
    value: function createToken() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var issuerAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(issuerAddress)) {
        callback = issuerAddress;
        issuerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.createToken, options, issuerAddress);
      var _options$name2 = options.name,
          name = _options$name2 === void 0 ? false : _options$name2,
          _options$abbreviation = options.abbreviation,
          abbreviation = _options$abbreviation === void 0 ? false : _options$abbreviation,
          _options$description = options.description,
          description = _options$description === void 0 ? false : _options$description,
          _options$url = options.url,
          url = _options$url === void 0 ? false : _options$url,
          _options$totalSupply = options.totalSupply,
          totalSupply = _options$totalSupply === void 0 ? 0 : _options$totalSupply,
          _options$trxRatio = options.trxRatio,
          trxRatio = _options$trxRatio === void 0 ? 1 : _options$trxRatio,
          _options$tokenRatio = options.tokenRatio,
          tokenRatio = _options$tokenRatio === void 0 ? 1 : _options$tokenRatio,
          _options$saleStart = options.saleStart,
          saleStart = _options$saleStart === void 0 ? Date.now() : _options$saleStart,
          _options$saleEnd = options.saleEnd,
          saleEnd = _options$saleEnd === void 0 ? false : _options$saleEnd,
          _options$freeBandwidt = options.freeBandwidth,
          freeBandwidth = _options$freeBandwidt === void 0 ? 0 : _options$freeBandwidt,
          _options$freeBandwidt2 = options.freeBandwidthLimit,
          freeBandwidthLimit = _options$freeBandwidt2 === void 0 ? 0 : _options$freeBandwidt2,
          _options$frozenAmount = options.frozenAmount,
          frozenAmount = _options$frozenAmount === void 0 ? 0 : _options$frozenAmount,
          _options$frozenDurati = options.frozenDuration,
          frozenDuration = _options$frozenDurati === void 0 ? 0 : _options$frozenDurati;
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(name) || !name.length) return callback('Invalid token name provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(abbreviation) || !abbreviation.length) return callback('Invalid token abbreviation provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(totalSupply) || totalSupply <= 0) return callback('Invalid supply amount provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(trxRatio) || trxRatio <= 0) return callback('TRX ratio must be a positive integer');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(tokenRatio) || tokenRatio <= 0) return callback('Token ratio must be a positive integer');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(saleStart) || saleStart < Date.now()) return callback('Invalid sale start timestamp provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(saleEnd) || saleEnd <= saleStart) return callback('Invalid sale end timestamp provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(description) || !description.length) return callback('Invalid token description provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(url) || !url.length || !utils__WEBPACK_IMPORTED_MODULE_5__["default"].isValidURL(url)) return callback('Invalid token url provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(freeBandwidth) || freeBandwidth < 0) return callback('Invalid free bandwidth amount provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(freeBandwidthLimit) || freeBandwidthLimit < 0 || freeBandwidth && !freeBandwidthLimit) return callback('Invalid free bandwidth limit provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(frozenAmount) || frozenAmount < 0 || !frozenDuration && frozenAmount) return callback('Invalid frozen supply provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(frozenDuration) || frozenDuration < 0 || frozenDuration && !frozenAmount) return callback('Invalid frozen duration provided');
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
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this3.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "updateAccount",
    value: function updateAccount() {
      var accountName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) {
        return this.injectPromise(this.updateAccount, accountName, address);
      }

      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(accountName) || !accountName.length) {
        return callback('Name must be a string');
      }

      if (!this.tronWeb.isAddress(address)) {
        return callback('Invalid origin address provided');
      }

      this.tronWeb.fullNode.request('wallet/updateaccount', {
        account_name: this.tronWeb.fromUtf8(accountName),
        owner_address: this.tronWeb.address.toHex(address)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "updateToken",
    value: function updateToken() {
      var _this4 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var issuerAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(issuerAddress)) {
        callback = issuerAddress;
        issuerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.updateToken, options, issuerAddress);
      var _options$description2 = options.description,
          description = _options$description2 === void 0 ? false : _options$description2,
          _options$url2 = options.url,
          url = _options$url2 === void 0 ? false : _options$url2,
          _options$freeBandwidt3 = options.freeBandwidth,
          freeBandwidth = _options$freeBandwidt3 === void 0 ? 0 : _options$freeBandwidt3,
          _options$freeBandwidt4 = options.freeBandwidthLimit,
          freeBandwidthLimit = _options$freeBandwidt4 === void 0 ? 0 : _options$freeBandwidt4;
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(description) || !description.length) return callback('Invalid token description provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(url) || !url.length || !utils__WEBPACK_IMPORTED_MODULE_5__["default"].isValidURL(url)) return callback('Invalid token url provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(freeBandwidth) || freeBandwidth < 0) return callback('Invalid free bandwidth amount provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(freeBandwidthLimit) || freeBandwidthLimit < 0 || freeBandwidth && !freeBandwidthLimit) return callback('Invalid free bandwidth limit provided');
      if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuer address provided');
      this.tronWeb.fullNode.request('wallet/updateasset', {
        owner_address: this.tronWeb.address.toHex(issuerAddress),
        description: this.tronWeb.fromUtf8(description),
        url: this.tronWeb.fromUtf8(url),
        new_limit: parseInt(freeBandwidth),
        new_public_limit: parseInt(freeBandwidthLimit)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this4.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "sendAsset",
    value: function sendAsset() {
      return this.sendToken.apply(this, arguments);
    }
  }, {
    key: "purchaseAsset",
    value: function purchaseAsset() {
      return this.purchaseToken.apply(this, arguments);
    }
  }, {
    key: "createAsset",
    value: function createAsset() {
      return this.createToken.apply(this, arguments);
    }
  }, {
    key: "updateAsset",
    value: function updateAsset() {
      return this.updateToken.apply(this, arguments);
    }
    /**
     * Creates a proposal to modify the network.
     * Can only be created by a current Super Representative.
     */

  }, {
    key: "createProposal",
    value: function createProposal() {
      var _this5 = this;

      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var issuerAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(issuerAddress)) {
        callback = issuerAddress;
        issuerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!parameters) return callback('Invalid proposal parameters provided');
      if (!callback) return this.injectPromise(this.createProposal, parameters, issuerAddress);
      if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuerAddress provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isObject(parameters)) return callback('Invalid parameters provided');
      this.tronWeb.fullNode.request('wallet/proposalcreate', {
        owner_address: this.tronWeb.address.toHex(issuerAddress),
        parameters: parameters
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this5.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Deletes a network modification proposal that the owner issued.
     * Only current Super Representative can vote on a proposal.
     */

  }, {
    key: "deleteProposal",
    value: function deleteProposal() {
      var _this6 = this;

      var proposalID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var issuerAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(issuerAddress)) {
        callback = issuerAddress;
        issuerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.deleteProposal, proposalID, issuerAddress);
      if (!this.tronWeb.isAddress(issuerAddress)) return callback('Invalid issuerAddress provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(proposalID) || proposalID < 0) return callback('Invalid proposalID provided');
      this.tronWeb.fullNode.request('wallet/proposaldelete', {
        owner_address: this.tronWeb.address.toHex(issuerAddress),
        proposal_id: parseInt(proposalID)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this6.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Adds a vote to an issued network modification proposal.
     * Only current Super Representative can vote on a proposal.
     */

  }, {
    key: "voteProposal",
    value: function voteProposal() {
      var _this7 = this;

      var proposalID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var hasApproval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var voterAddress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(voterAddress)) {
        callback = voterAddress;
        voterAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.voteProposal, proposalID, hasApproval, voterAddress);
      if (!this.tronWeb.isAddress(voterAddress)) return callback('Invalid voterAddress address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(proposalID) || proposalID < 0) return callback('Invalid proposalID provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isBoolean(hasApproval)) return callback('Invalid hasApproval provided');
      this.tronWeb.fullNode.request('wallet/proposalapprove', {
        owner_address: this.tronWeb.address.toHex(voterAddress),
        proposal_id: parseInt(proposalID),
        is_add_approval: isApproval.toString()
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this7.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Create an exchange between a token and TRX.
     * Token Name should be a CASE SENSITIVE string. 
     * PLEASE VERIFY THIS ON TRONSCAN.
     */

  }, {
    key: "createTRXExchange",
    value: function createTRXExchange(tokenName, tokenBalance, trxBalance) {
      var ownerAddress = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(ownerAddress)) {
        callback = ownerAddress;
        ownerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.createTRXExchange, tokenName, tokenBalance, trxBalance, ownerAddress);
      if (!this.tronWeb.isAddress(ownerAddress)) return callback('Invalid address provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(tokenName) || !tokenName.length) return callback('Invalid tokenName provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(tokenBalance) || tokenBalance <= 0 || !utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(trxBalance) || trxBalance <= 0) return callback('Invalid amount provided');
      console.log({
        owner_address: this.tronWeb.address.toHex(ownerAddress),
        first_token_id: this.tronWeb.fromUtf8(tokenName),
        first_token_balance: tokenBalance,
        second_token_id: '5f',
        // Constant for TRX.
        second_token_balance: trxBalance
      });
      this.tronWeb.fullNode.request('wallet/exchangecreate', {
        owner_address: this.tronWeb.address.toHex(ownerAddress),
        first_token_id: this.tronWeb.fromUtf8(tokenName),
        first_token_balance: tokenBalance,
        second_token_id: '5f',
        // Constant for TRX.
        second_token_balance: trxBalance
      }, 'post').then(function (resources) {
        callback(null, resources);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Adds tokens into a bancor style exchange.
     */

  }, {
    key: "injectExchangeTokens",
    value: function injectExchangeTokens() {
      var _this8 = this;

      var exchangeID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tokenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tokenAmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var ownerAddress = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(ownerAddress)) {
        callback = ownerAddress;
        ownerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.injectExchangeTokens, exchangeID, tokenName, tokenAmount, ownerAddress);
      if (!this.tronWeb.isAddress(ownerAddress)) return callback('Invalid ownerAddress provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(exchangeID) || exchangeID < 0) return callback('Invalid exchangeID provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(tokenName) || !tokenName.length) return callback('Invalid tokenName provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(tokenAmount) || tokenAmount < 1) return callback('Invalid tokenAmount provided');
      this.tronWeb.fullNode.request('wallet/exchangeinject', {
        owner_address: this.tronWeb.address.toHex(ownerAddress),
        exchange_id: parseInt(exchangeID),
        token_id: this.tronWeb.fromUtf8(tokenName),
        quant: parseInt(tokenAmount)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this8.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Withdraws tokens from a bancor style exchange.
     */

  }, {
    key: "withdrawExchangeTokens",
    value: function withdrawExchangeTokens() {
      var _this9 = this;

      var exchangeID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tokenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tokenAmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var ownerAddress = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(ownerAddress)) {
        callback = ownerAddress;
        ownerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.withdrawExchangeTokens, exchangeID, tokenName, tokenAmount, ownerAddress);
      if (!this.tronWeb.isAddress(ownerAddress)) return callback('Invalid ownerAddress provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(exchangeID) || exchangeID < 0) return callback('Invalid exchangeID provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(tokenName) || !tokenName.length) return callback('Invalid tokenName provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(tokenAmount) || tokenAmount < 1) return callback('Invalid tokenAmount provided');
      this.tronWeb.fullNode.request('wallet/exchangewithdraw', {
        owner_address: this.tronWeb.address.toHex(ownerAddress),
        exchange_id: parseInt(exchangeID),
        token_id: this.tronWeb.fromUtf8(tokenName),
        quant: parseInt(tokenAmount)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this9.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Trade tokens on a bancor style exchange.
     */

  }, {
    key: "tradeExchangeTokens",
    value: function tradeExchangeTokens() {
      var _this10 = this;

      var exchangeID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tokenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tokenAmountSold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var tokenAmountExpected = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var ownerAddress = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_5__["default"].isFunction(ownerAddress)) {
        callback = ownerAddress;
        ownerAddress = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.tradeExchangeTokens, exchangeID, tokenName, tokenAmountSold, tokenAmountExpected, ownerAddress);
      if (!this.tronWeb.isAddress(ownerAddress)) return callback('Invalid ownerAddress provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(exchangeID) || exchangeID < 0) return callback('Invalid exchangeID provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isString(tokenName) || !tokenName.length) return callback('Invalid tokenName provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(tokenAmountSold) || tokenAmountSold < 1) return callback('Invalid tokenAmountSold provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_5__["default"].isInteger(tokenAmountExpected) || tokenAmountExpected < 1) return callback('Invalid tokenAmountExpected provided');
      this.tronWeb.fullNode.request('wallet/exchangewithdraw', {
        owner_address: this.tronWeb.address.toHex(ownerAddress),
        exchange_id: parseInt(exchangeID),
        token_id: this.tronWeb.fromAscii(tokenName),
        quant: parseInt(tokenAmountSold),
        expected: parseInt(tokenAmountExpected)
      }, 'post').then(function (transaction) {
        if (transaction.Error) return callback(transaction.Error);

        if (transaction.result && transaction.result.message) {
          return callback(_this10.tronWeb.toUtf8(transaction.result.message));
        }

        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }]);

  return TransactionBuilder;
}();



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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! index */ "./src/index.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! utils */ "./src/utils/index.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_9__);










var TRX_MESSAGE_HEADER = '\x19TRON Signed Message:\n32';
var ETH_MESSAGE_HEADER = '\x19Ethereum Signed Message:\n32';

var Trx =
/*#__PURE__*/
function () {
  function Trx() {
    var tronWeb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Trx);

    if (!tronWeb || !tronWeb instanceof index__WEBPACK_IMPORTED_MODULE_7__["default"]) throw new Error('Expected instance of TronWeb');
    this.tronWeb = tronWeb;
    this.injectPromise = utils__WEBPACK_IMPORTED_MODULE_8__["default"].promiseInjector(this);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Trx, [{
    key: "parseToken",
    value: function parseToken(token) {
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, token, {
        name: this.tronWeb.toUtf8(token.name),
        abbr: token.abbr && this.tronWeb.toUtf8(token.abbr),
        description: token.description && this.tronWeb.toUtf8(token.description),
        url: token.url && this.tronWeb.toUtf8(token.url)
      });
    }
  }, {
    key: "getCurrentBlock",
    value: function getCurrentBlock() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.getCurrentBlock);
      this.tronWeb.fullNode.request('wallet/getnowblock').then(function (block) {
        callback(null, block);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getBlock",
    value: function getBlock() {
      var block = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultBlock;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(block)) {
        callback = block;
        block = this.tronWeb.defaultBlock;
      }

      if (!callback) return this.injectPromise(this.getBlock, block);
      if (block === false) return callback('No block identifier provided');
      if (block == 'earliest') block = 0;
      if (block == 'latest') return this.getCurrentBlock(callback);
      if (isNaN(block) && utils__WEBPACK_IMPORTED_MODULE_8__["default"].isHex(block)) return this.getBlockByHash(block, callback);
      this.getBlockByNumber(block, callback);
    }
  }, {
    key: "getBlockByHash",
    value: function getBlockByHash(blockHash) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getBlockByHash, blockHash);
      this.tronWeb.fullNode.request('wallet/getblockbyid', {
        value: blockHash
      }, 'post').then(function (block) {
        if (!Object.keys(block).length) return callback('Block not found');
        callback(null, block);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getBlockByNumber",
    value: function getBlockByNumber(blockID) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getBlockByNumber, blockID);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(blockID) || blockID < 0) return callback('Invalid block number provided');
      this.tronWeb.fullNode.request('wallet/getblockbynum', {
        num: parseInt(blockID)
      }, 'post').then(function (block) {
        if (!Object.keys(block).length) return callback('Block not found');
        callback(null, block);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getBlockTransactionCount",
    value: function getBlockTransactionCount() {
      var block = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultBlock;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(block)) {
        callback = block;
        block = this.tronWeb.defaultBlock;
      }

      if (!callback) return this.injectPromise(this.getBlockTransactionCount, block);
      this.getBlock(block).then(function (_ref) {
        var _ref$transactions = _ref.transactions,
            transactions = _ref$transactions === void 0 ? [] : _ref$transactions;
        callback(null, transactions.length);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getTransactionFromBlock",
    value: function getTransactionFromBlock() {
      var block = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultBlock;
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(index)) {
        callback = index;
        index = 0;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(block)) {
        callback = block;
        block = this.tronWeb.defaultBlock;
      }

      if (!callback) return this.injectPromise(this.getTransactionFromBlock, block, index);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(index) || index < 0) return callback('Invalid transaction index provided');
      this.getBlock(block).then(function (_ref2) {
        var _ref2$transactions = _ref2.transactions,
            transactions = _ref2$transactions === void 0 ? false : _ref2$transactions;
        if (!transactions || transactions.length < index) return callback('Transaction not found in block');
        callback(null, transactions[index]);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getTransaction",
    value: function getTransaction(transactionID) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getTransaction, transactionID);
      this.tronWeb.fullNode.request('wallet/gettransactionbyid', {
        value: transactionID
      }, 'post').then(function (transaction) {
        if (!Object.keys(transaction).length) return callback('Transaction not found');
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getConfirmedTransaction",
    value: function getConfirmedTransaction(transactionID) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getConfirmedTransaction, transactionID);
      this.tronWeb.solidityNode.request('walletsolidity/gettransactionbyid', {
        value: transactionID
      }, 'post').then(function (transaction) {
        if (!Object.keys(transaction).length) return callback('Transaction not found');
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getTransactionInfo",
    value: function getTransactionInfo(transactionID) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getTransactionInfo, transactionID);
      this.tronWeb.solidityNode.request('walletsolidity/gettransactioninfobyid', {
        value: transactionID
      }, 'post').then(function (transaction) {
        callback(null, transaction);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getTransactionsToAddress",
    value: function getTransactionsToAddress() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(offset)) {
        callback = offset;
        offset = 0;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(limit)) {
        callback = limit;
        limit = 30;
      }

      if (!callback) return this.injectPromise(this.getTransactionsToAddress, address, limit, offset);
      address = this.tronWeb.address.toHex(address);
      return this.getTransactionsRelated(address, 'to', limit, offset, callback);
    }
  }, {
    key: "getTransactionsFromAddress",
    value: function getTransactionsFromAddress() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(offset)) {
        callback = offset;
        offset = 0;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(limit)) {
        callback = limit;
        limit = 30;
      }

      if (!callback) return this.injectPromise(this.getTransactionsFromAddress, address, limit, offset);
      address = this.tronWeb.address.toHex(address);
      return this.getTransactionsRelated(address, 'from', limit, offset, callback);
    }
  }, {
    key: "getTransactionsRelated",
    value: function () {
      var _getTransactionsRelated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var address,
            direction,
            limit,
            offset,
            callback,
            from,
            to,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                address = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.tronWeb.defaultAddress.hex;
                direction = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'all';
                limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 30;
                offset = _args.length > 3 && _args[3] !== undefined ? _args[3] : 0;
                callback = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(offset)) {
                  callback = offset;
                  offset = 0;
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(limit)) {
                  callback = limit;
                  limit = 30;
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(direction)) {
                  callback = direction;
                  direction = 'all';
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
                  callback = address;
                  address = this.tronWeb.defaultAddress.hex;
                }

                if (callback) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", this.injectPromise(this.getTransactionsRelated, address, direction, limit, offset));

              case 11:
                if (['to', 'from', 'all'].includes(direction)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", callback('Invalid direction provided: Expected "to", "from" or "all"'));

              case 13:
                if (!(direction == 'all')) {
                  _context.next = 27;
                  break;
                }

                _context.prev = 14;
                _context.next = 17;
                return this.getTransactionsRelated(address, 'from', limit, offset);

              case 17:
                from = _context.sent;
                _context.next = 20;
                return this.getTransactionsRelated(address, 'to', limit, offset);

              case 20:
                to = _context.sent;
                return _context.abrupt("return", callback(null, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(from.map(function (tx) {
                  return tx.direction = 'from', tx;
                })).concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(to.map(function (tx) {
                  return tx.direction = 'to', tx;
                }))).sort(function (a, b) {
                  return b.raw_data.timestamp - a.raw_data.timestamp;
                })));

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](14);
                return _context.abrupt("return", callback(_context.t0));

              case 27:
                if (this.tronWeb.isAddress(address)) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", callback('Invalid address provided'));

              case 29:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(limit) || limit < 0 || offset && limit < 1)) {
                  _context.next = 31;
                  break;
                }

                return _context.abrupt("return", callback('Invalid limit provided'));

              case 31:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(offset) || offset < 0)) {
                  _context.next = 33;
                  break;
                }

                return _context.abrupt("return", callback('Invalid offset provided'));

              case 33:
                address = this.tronWeb.address.toHex(address);
                this.tronWeb.solidityNode.request("walletextension/gettransactions".concat(direction, "this"), {
                  account: {
                    address: address
                  },
                  offset: offset,
                  limit: limit
                }, 'post').then(function (_ref3) {
                  var transaction = _ref3.transaction;
                  callback(null, transaction);
                }).catch(function (err) {
                  return callback(err);
                });

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[14, 24]]);
      }));

      return function getTransactionsRelated() {
        return _getTransactionsRelated.apply(this, arguments);
      };
    }()
  }, {
    key: "getAccount",
    value: function getAccount() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.getAccount, address);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      address = this.tronWeb.address.toHex(address);
      this.tronWeb.solidityNode.request('walletsolidity/getaccount', {
        address: address
      }, 'post').then(function (account) {
        callback(null, account);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getBalance",
    value: function getBalance() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.getBalance, address);
      this.getAccount(address).then(function (_ref4) {
        var _ref4$balance = _ref4.balance,
            balance = _ref4$balance === void 0 ? 0 : _ref4$balance;
        callback(null, balance);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getUnconfirmedAccount",
    value: function getUnconfirmedAccount() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.getUnconfirmedAccount, address);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      address = this.tronWeb.address.toHex(address);
      this.tronWeb.fullNode.request('wallet/getaccount', {
        address: address
      }, 'post').then(function (account) {
        callback(null, account);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getUnconfirmedBalance",
    value: function getUnconfirmedBalance() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.getUnconfirmedBalance, address);
      this.getUnconfirmedAccount(address).then(function (_ref5) {
        var _ref5$balance = _ref5.balance,
            balance = _ref5$balance === void 0 ? 0 : _ref5$balance;
        callback(null, balance);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getBandwidth",
    value: function getBandwidth() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.getBandwidth, address);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      address = this.tronWeb.address.toHex(address);
      this.tronWeb.fullNode.request('wallet/getaccountnet', {
        address: address
      }, 'post').then(function (_ref6) {
        var _ref6$freeNetUsed = _ref6.freeNetUsed,
            freeNetUsed = _ref6$freeNetUsed === void 0 ? 0 : _ref6$freeNetUsed,
            _ref6$freeNetLimit = _ref6.freeNetLimit,
            freeNetLimit = _ref6$freeNetLimit === void 0 ? 0 : _ref6$freeNetLimit,
            _ref6$NetUsed = _ref6.NetUsed,
            NetUsed = _ref6$NetUsed === void 0 ? 0 : _ref6$NetUsed,
            _ref6$NetLimit = _ref6.NetLimit,
            NetLimit = _ref6$NetLimit === void 0 ? 0 : _ref6$NetLimit;
        callback(null, freeNetLimit - freeNetUsed + (NetLimit - NetUsed));
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getTokensIssuedByAddress",
    value: function getTokensIssuedByAddress() {
      var _this = this;

      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
        callback = address;
        address = this.tronWeb.defaultAddress.hex;
      }

      if (!callback) return this.injectPromise(this.getTokensIssuedByAddress, address);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      address = this.tronWeb.address.toHex(address);
      this.tronWeb.fullNode.request('wallet/getassetissuebyaccount', {
        address: address
      }, 'post').then(function (_ref7) {
        var _ref7$assetIssue = _ref7.assetIssue,
            assetIssue = _ref7$assetIssue === void 0 ? false : _ref7$assetIssue;
        if (!assetIssue) return callback(null, {});
        var tokens = assetIssue.map(function (token) {
          return _this.parseToken(token);
        }).reduce(function (tokens, token) {
          return tokens[token.name] = token, tokens;
        }, {});
        callback(null, tokens);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getTokenFromID",
    value: function getTokenFromID() {
      var _this2 = this;

      var tokenID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getTokenFromID, tokenID);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isString(tokenID) || !tokenID.length) return callback('Invalid token ID provided');
      this.tronWeb.fullNode.request('wallet/getassetissuebyname', {
        value: this.tronWeb.fromUtf8(tokenID)
      }, 'post').then(function (token) {
        if (!token.name) return callback('Token does not exist');
        callback(null, _this2.parseToken(token));
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "listNodes",
    value: function listNodes() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.listNodes);
      this.tronWeb.fullNode.request('wallet/listnodes').then(function (_ref8) {
        var _ref8$nodes = _ref8.nodes,
            nodes = _ref8$nodes === void 0 ? [] : _ref8$nodes;
        callback(null, nodes.map(function (_ref9) {
          var _ref9$address = _ref9.address,
              host = _ref9$address.host,
              port = _ref9$address.port;
          return "".concat(_this3.tronWeb.toUtf8(host), ":").concat(port);
        }));
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getBlockRange",
    value: function getBlockRange() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(end)) {
        callback = end;
        end = 30;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(start)) {
        callback = start;
        start = 0;
      }

      if (!callback) return this.injectPromise(this.getBlockRange, start, end);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(start) || start < 0) return callback('Invalid start of range provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(end) || end <= start) return callback('Invalid end of range provided');
      this.tronWeb.fullNode.request('wallet/getblockbylimitnext', {
        startNum: parseInt(start),
        endNum: parseInt(end) + 1
      }, 'post').then(function (_ref10) {
        var _ref10$block = _ref10.block,
            block = _ref10$block === void 0 ? [] : _ref10$block;
        callback(null, block);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "listSuperRepresentatives",
    value: function listSuperRepresentatives() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.listSuperRepresentatives);
      this.tronWeb.fullNode.request('wallet/listwitnesses').then(function (_ref11) {
        var _ref11$witnesses = _ref11.witnesses,
            witnesses = _ref11$witnesses === void 0 ? [] : _ref11$witnesses;
        callback(null, witnesses);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "listTokens",
    value: function listTokens() {
      var _this4 = this;

      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(offset)) {
        callback = offset;
        offset = 0;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(limit)) {
        callback = limit;
        limit = 0;
      }

      if (!callback) return this.injectPromise(this.listTokens, limit, offset);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(limit) || limit < 0 || offset && limit < 1) return callback('Invalid limit provided');
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(offset) || offset < 0) return callback('Invalid offset provided');

      if (!limit) {
        return this.tronWeb.fullNode.request('wallet/getassetissuelist').then(function (_ref12) {
          var _ref12$assetIssue = _ref12.assetIssue,
              assetIssue = _ref12$assetIssue === void 0 ? [] : _ref12$assetIssue;
          callback(null, assetIssue.map(function (token) {
            return _this4.parseToken(token);
          }));
        }).catch(function (err) {
          return callback(err);
        });
      }

      this.tronWeb.fullNode.request('wallet/getpaginatedassetissuelist', {
        offset: parseInt(offset),
        limit: parseInt(limit)
      }, 'post').then(function (_ref13) {
        var _ref13$assetIssue = _ref13.assetIssue,
            assetIssue = _ref13$assetIssue === void 0 ? [] : _ref13$assetIssue;
        callback(null, assetIssue.map(function (token) {
          return _this4.parseToken(token);
        }));
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "timeUntilNextVoteCycle",
    value: function timeUntilNextVoteCycle() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.timeUntilNextVoteCycle);
      this.tronWeb.fullNode.request('wallet/getnextmaintenancetime').then(function (_ref14) {
        var _ref14$num = _ref14.num,
            num = _ref14$num === void 0 ? -1 : _ref14$num;
        if (num == -1) return callback('Failed to get time until next vote cycle');
        callback(null, Math.floor(num / 1000));
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "getContract",
    value: function getContract(contractAddress) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getContract, contractAddress);
      if (!this.tronWeb.isAddress(contractAddress)) return callback('Invalid contract address provided');
      contractAddress = this.tronWeb.address.toHex(contractAddress);
      this.tronWeb.fullNode.request('wallet/getcontract', {
        value: contractAddress
      }).then(function (contract) {
        if (contract.Error) return callback('Contract does not exist');
        callback(null, contract);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "verifyMessage",
    value: function () {
      var _verifyMessage = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var message,
            signature,
            address,
            useTronHeader,
            callback,
            messageBytes,
            messageDigest,
            recovered,
            tronAddress,
            base58Address,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                message = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                signature = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                address = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : this.tronWeb.defaultAddress.base58;
                useTronHeader = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : true;
                callback = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(address)) {
                  callback = address;
                  address = this.tronWeb.defaultAddress.base58;
                  useTronHeader = true;
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(useTronHeader)) {
                  callback = useTronHeader;
                  useTronHeader = true;
                }

                if (callback) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", this.injectPromise(this.verifyMessage, message, signature, address, useTronHeader));

              case 9:
                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isHex(message)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", callback('Expected hex message input'));

              case 11:
                if (message.substr(0, 2) == '0x') message = message.substring(2);
                if (signature.substr(0, 2) == '0x') signature = signature.substr(2);
                messageBytes = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(ethers__WEBPACK_IMPORTED_MODULE_9__["utils"].toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER)).concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(utils__WEBPACK_IMPORTED_MODULE_8__["default"].code.hexStr2byteArray(message)));
                messageDigest = ethers__WEBPACK_IMPORTED_MODULE_9__["utils"].keccak256(messageBytes);
                recovered = ethers__WEBPACK_IMPORTED_MODULE_9__["utils"].recoverAddress(messageDigest, {
                  recoveryParam: signature.substring(128, 130) == '1c' ? 1 : 0,
                  r: '0x' + signature.substring(0, 64),
                  s: '0x' + signature.substring(64, 128)
                });
                tronAddress = '41' + recovered.substr(2);
                base58Address = this.tronWeb.address.fromHex(tronAddress);

                if (!(base58Address == this.tronWeb.address.fromHex(address))) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt("return", callback(null, true));

              case 20:
                callback('Signature does not match');

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function verifyMessage() {
        return _verifyMessage.apply(this, arguments);
      };
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var transaction,
            privateKey,
            useTronHeader,
            callback,
            signingKey,
            messageBytes,
            messageDigest,
            signature,
            signatureHex,
            address,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                transaction = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
                privateKey = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : this.tronWeb.defaultPrivateKey;
                useTronHeader = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
                callback = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(privateKey)) {
                  callback = privateKey;
                  privateKey = this.tronWeb.defaultPrivateKey;
                  useTronHeader = true;
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(useTronHeader)) {
                  callback = useTronHeader;
                  useTronHeader = true;
                }

                if (callback) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", this.injectPromise(this.sign, transaction, privateKey, useTronHeader));

              case 8:
                if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isString(transaction)) {
                  _context3.next = 24;
                  break;
                }

                if (transaction.substring(0, 2) == '0x') transaction = transaction.substring(2);

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isHex(transaction)) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", callback('Expected hex message input'));

              case 12:
                _context3.prev = 12;
                signingKey = new ethers__WEBPACK_IMPORTED_MODULE_9__["utils"].SigningKey(privateKey);
                messageBytes = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(ethers__WEBPACK_IMPORTED_MODULE_9__["utils"].toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER)).concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(utils__WEBPACK_IMPORTED_MODULE_8__["default"].code.hexStr2byteArray(transaction)));
                messageDigest = ethers__WEBPACK_IMPORTED_MODULE_9__["utils"].keccak256(messageBytes);
                signature = signingKey.signDigest(messageDigest);
                signatureHex = ['0x', signature.r.substring(2), signature.s.substring(2), Number(signature.v).toString(16)].join('');
                return _context3.abrupt("return", callback(null, signatureHex));

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](12);
                callback(_context3.t0);

              case 24:
                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isObject(transaction)) {
                  _context3.next = 26;
                  break;
                }

                return _context3.abrupt("return", callback('Invalid transaction provided'));

              case 26:
                if (!transaction.signature) {
                  _context3.next = 28;
                  break;
                }

                return _context3.abrupt("return", callback('Transaction is already signed'));

              case 28:
                _context3.prev = 28;
                address = this.tronWeb.address.toHex(this.tronWeb.address.fromPrivateKey(privateKey)).toLowerCase();

                if (!(address !== transaction.raw_data.contract[0].parameter.value.owner_address.toLowerCase())) {
                  _context3.next = 32;
                  break;
                }

                return _context3.abrupt("return", callback('Private key does not match address in transaction'));

              case 32:
                return _context3.abrupt("return", callback(null, utils__WEBPACK_IMPORTED_MODULE_8__["default"].crypto.signTransaction(privateKey, transaction)));

              case 35:
                _context3.prev = 35;
                _context3.t1 = _context3["catch"](28);
                callback(_context3.t1);

              case 38:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[12, 21], [28, 35]]);
      }));

      return function sign() {
        return _sign.apply(this, arguments);
      };
    }()
  }, {
    key: "sendRawTransaction",
    value: function sendRawTransaction() {
      var signedTransaction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.sendRawTransaction, signedTransaction);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isObject(signedTransaction)) return callback('Invalid transaction provided');
      if (!signedTransaction.signature || !utils__WEBPACK_IMPORTED_MODULE_8__["default"].isArray(signedTransaction.signature)) return callback('Transaction is not signed');
      this.tronWeb.fullNode.request('wallet/broadcasttransaction', signedTransaction, 'post').then(function (result) {
        callback(null, result);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var to,
            amount,
            options,
            callback,
            address,
            transaction,
            signedTransaction,
            result,
            _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                to = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : false;
                amount = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;
                options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                callback = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (typeof options === 'string') options = {
                  privateKey: options
                };

                if (callback) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", this.injectPromise(this.sendTransaction, to, amount, options));

              case 8:
                if (this.tronWeb.isAddress(to)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", callback('Invalid recipient provided'));

              case 10:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(amount) || amount <= 0)) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", callback('Invalid amount provided'));

              case 12:
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  privateKey: this.tronWeb.defaultPrivateKey,
                  address: this.tronWeb.defaultAddress.hex
                }, options);

                if (!(!options.privateKey && !options.address)) {
                  _context4.next = 15;
                  break;
                }

                return _context4.abrupt("return", callback('Function requires either a private key or address to be set'));

              case 15:
                _context4.prev = 15;
                address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
                _context4.next = 19;
                return this.tronWeb.transactionBuilder.sendTrx(to, amount, address);

              case 19:
                transaction = _context4.sent;
                _context4.next = 22;
                return this.sign(transaction, options.privateKey || undefined);

              case 22:
                signedTransaction = _context4.sent;
                _context4.next = 25;
                return this.sendRawTransaction(signedTransaction);

              case 25:
                result = _context4.sent;
                return _context4.abrupt("return", callback(null, result));

              case 29:
                _context4.prev = 29;
                _context4.t0 = _context4["catch"](15);
                return _context4.abrupt("return", callback(_context4.t0));

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[15, 29]]);
      }));

      return function sendTransaction() {
        return _sendTransaction.apply(this, arguments);
      };
    }()
  }, {
    key: "sendToken",
    value: function () {
      var _sendToken = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var to,
            amount,
            tokenID,
            options,
            callback,
            address,
            transaction,
            signedTransaction,
            result,
            _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                to = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;
                amount = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;
                tokenID = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : false;
                options = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                callback = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (typeof options === 'string') options = {
                  privateKey: options
                };

                if (callback) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", this.injectPromise(this.sendToken, to, amount, tokenID, options));

              case 9:
                if (this.tronWeb.isAddress(to)) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", callback('Invalid recipient provided'));

              case 11:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(amount) || amount <= 0)) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", callback('Invalid amount provided'));

              case 13:
                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isString(tokenID)) {
                  _context5.next = 15;
                  break;
                }

                return _context5.abrupt("return", callback('Invalid token ID provided'));

              case 15:
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  privateKey: this.tronWeb.defaultPrivateKey,
                  address: this.tronWeb.defaultAddress.hex
                }, options);

                if (!(!options.privateKey && !options.address)) {
                  _context5.next = 18;
                  break;
                }

                return _context5.abrupt("return", callback('Function requires either a private key or address to be set'));

              case 18:
                _context5.prev = 18;
                address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
                _context5.next = 22;
                return this.tronWeb.transactionBuilder.sendToken(to, amount, tokenID, address);

              case 22:
                transaction = _context5.sent;
                _context5.next = 25;
                return this.sign(transaction, options.privateKey || undefined);

              case 25:
                signedTransaction = _context5.sent;
                _context5.next = 28;
                return this.sendRawTransaction(signedTransaction);

              case 28:
                result = _context5.sent;
                return _context5.abrupt("return", callback(null, result));

              case 32:
                _context5.prev = 32;
                _context5.t0 = _context5["catch"](18);
                return _context5.abrupt("return", callback(_context5.t0));

              case 35:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[18, 32]]);
      }));

      return function sendToken() {
        return _sendToken.apply(this, arguments);
      };
    }()
    /**
         * Freezes an amount of TRX.
         * Will give bandwidth OR Energy and TRON Power(voting rights)
         * to the owner of the frozen tokens.
         *
         * @param amount - is the number of frozen trx
         * @param duration - is the duration in days to be frozen
         * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
         * @param options
         * @param callback
         */

  }, {
    key: "freezeBalance",
    value: function () {
      var _freezeBalance = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {
        var amount,
            duration,
            resource,
            options,
            callback,
            address,
            freezeBalance,
            signedTransaction,
            result,
            _args6 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                amount = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : 0;
                duration = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 3;
                resource = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : "BANDWIDTH";
                options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                callback = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(duration)) {
                  callback = duration;
                  duration = 3;
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(resource)) {
                  callback = resource;
                  resource = "BANDWIDTH";
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (typeof options === 'string') options = {
                  privateKey: options
                };

                if (callback) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return", this.injectPromise(this.freezeBalance, amount, duration, resource, options));

              case 11:
                if (['BANDWIDTH', 'ENERGY'].includes(resource)) {
                  _context6.next = 13;
                  break;
                }

                return _context6.abrupt("return", callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'));

              case 13:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(amount) || amount <= 0)) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return", callback('Invalid amount provided'));

              case 15:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(duration) || duration < 3)) {
                  _context6.next = 17;
                  break;
                }

                return _context6.abrupt("return", callback('Invalid duration provided, minimum of 3 days'));

              case 17:
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  privateKey: this.tronWeb.defaultPrivateKey,
                  address: this.tronWeb.defaultAddress.hex
                }, options);

                if (!(!options.privateKey && !options.address)) {
                  _context6.next = 20;
                  break;
                }

                return _context6.abrupt("return", callback('Function requires either a private key or address to be set'));

              case 20:
                _context6.prev = 20;
                address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
                _context6.next = 24;
                return this.tronWeb.transactionBuilder.freezeBalance(amount, duration, resource, address);

              case 24:
                freezeBalance = _context6.sent;
                _context6.next = 27;
                return this.sign(freezeBalance, options.privateKey || undefined);

              case 27:
                signedTransaction = _context6.sent;
                _context6.next = 30;
                return this.sendRawTransaction(signedTransaction);

              case 30:
                result = _context6.sent;
                return _context6.abrupt("return", callback(null, result));

              case 34:
                _context6.prev = 34;
                _context6.t0 = _context6["catch"](20);
                return _context6.abrupt("return", callback(_context6.t0));

              case 37:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[20, 34]]);
      }));

      return function freezeBalance() {
        return _freezeBalance.apply(this, arguments);
      };
    }()
    /**
     * Unfreeze TRX that has passed the minimum freeze duration.
     * Unfreezing will remove bandwidth and TRON Power.
     *
     * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
     * @param options
     * @param callback
     */

  }, {
    key: "unfreezeBalance",
    value: function () {
      var _unfreezeBalance = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7() {
        var resource,
            options,
            callback,
            address,
            unfreezeBalance,
            signedTransaction,
            result,
            _args7 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resource = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : "BANDWIDTH";
                options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                callback = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(resource)) {
                  callback = resource;
                  resource = 'BANDWIDTH';
                }

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (typeof options === 'string') options = {
                  privateKey: options
                };

                if (callback) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", this.injectPromise(this.unfreezeBalance, resource, options));

              case 8:
                if (['BANDWIDTH', 'ENERGY'].includes(resource)) {
                  _context7.next = 10;
                  break;
                }

                return _context7.abrupt("return", callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'));

              case 10:
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  privateKey: this.tronWeb.defaultPrivateKey,
                  address: this.tronWeb.defaultAddress.hex
                }, options);

                if (!(!options.privateKey && !options.address)) {
                  _context7.next = 13;
                  break;
                }

                return _context7.abrupt("return", callback('Function requires either a private key or address to be set'));

              case 13:
                _context7.prev = 13;
                address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
                _context7.next = 17;
                return this.tronWeb.transactionBuilder.unfreezeBalance(resource, address);

              case 17:
                unfreezeBalance = _context7.sent;
                _context7.next = 20;
                return this.sign(unfreezeBalance, options.privateKey || undefined);

              case 20:
                signedTransaction = _context7.sent;
                _context7.next = 23;
                return this.sendRawTransaction(signedTransaction);

              case 23:
                result = _context7.sent;
                return _context7.abrupt("return", callback(null, result));

              case 27:
                _context7.prev = 27;
                _context7.t0 = _context7["catch"](13);
                return _context7.abrupt("return", callback(_context7.t0));

              case 30:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[13, 27]]);
      }));

      return function unfreezeBalance() {
        return _unfreezeBalance.apply(this, arguments);
      };
    }()
    /**
     * Modify account name
     * Note: Username is allowed to edit only once.
     *
     * @param privateKey - Account private Key
     * @param accountName - name of the account
     * @param callback
     *
     * @return modified Transaction Object
     */

  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8() {
        var accountName,
            options,
            callback,
            address,
            updateAccount,
            signedTransaction,
            result,
            _args8 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                accountName = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : false;
                options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                callback = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : false;

                if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(options)) {
                  callback = options;
                  options = {};
                }

                if (typeof options === 'string') options = {
                  privateKey: options
                };

                if (callback) {
                  _context8.next = 7;
                  break;
                }

                return _context8.abrupt("return", this.injectPromise(this.updateAccount, accountName, options));

              case 7:
                if (!(!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isString(accountName) || !accountName.length)) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", callback('Name must be a string'));

              case 9:
                options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({
                  privateKey: this.tronWeb.defaultPrivateKey,
                  address: this.tronWeb.defaultAddress.hex
                }, options);

                if (!(!options.privateKey && !options.address)) {
                  _context8.next = 12;
                  break;
                }

                return _context8.abrupt("return", callback('Function requires either a private key or address to be set'));

              case 12:
                _context8.prev = 12;
                address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
                _context8.next = 16;
                return this.tronWeb.transactionBuilder.updateAccount(accountName, address);

              case 16:
                updateAccount = _context8.sent;
                _context8.next = 19;
                return this.sign(updateAccount, options.privateKey || undefined);

              case 19:
                signedTransaction = _context8.sent;
                _context8.next = 22;
                return this.sendRawTransaction(signedTransaction);

              case 22:
                result = _context8.sent;
                return _context8.abrupt("return", callback(null, result));

              case 26:
                _context8.prev = 26;
                _context8.t0 = _context8["catch"](12);
                return _context8.abrupt("return", callback(_context8.t0));

              case 29:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[12, 26]]);
      }));

      return function updateAccount() {
        return _updateAccount.apply(this, arguments);
      };
    }()
  }, {
    key: "signMessage",
    value: function signMessage() {
      return this.sign.apply(this, arguments);
    }
  }, {
    key: "sendAsset",
    value: function sendAsset() {
      return this.sendToken.apply(this, arguments);
    }
  }, {
    key: "send",
    value: function send() {
      return this.sendTransaction.apply(this, arguments);
    }
  }, {
    key: "sendTrx",
    value: function sendTrx() {
      return this.sendTransaction.apply(this, arguments);
    }
  }, {
    key: "broadcast",
    value: function broadcast() {
      return this.sendRawTransaction.apply(this, arguments);
    }
  }, {
    key: "signTransaction",
    value: function signTransaction() {
      return this.sign.apply(this, arguments);
    }
    /**
     * Gets a network modification proposal by ID.
     */

  }, {
    key: "getProposal",
    value: function getProposal() {
      var proposalID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getProposal, proposalID);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(proposalID) || proposalID < 0) return callback('Invalid proposalID provided');
      this.tronWeb.fullNode.request('wallet/getproposalbyid', {
        id: parseInt(proposalID)
      }, 'post').then(function (proposal) {
        callback(null, proposal);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Lists all network modification proposals.
     */

  }, {
    key: "listProposals",
    value: function listProposals() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.listProposals);
      this.tronWeb.fullNode.request('wallet/listproposals', {}, 'post').then(function (_ref15) {
        var _ref15$proposals = _ref15.proposals,
            proposals = _ref15$proposals === void 0 ? [] : _ref15$proposals;
        callback(null, proposals);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Lists all parameters available for network modification proposals.
     */

  }, {
    key: "getChainParameters",
    value: function getChainParameters() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.getChainParameters);
      this.tronWeb.fullNode.request('wallet/getchainparameters', {}, 'post').then(function (_ref16) {
        var _ref16$chainParameter = _ref16.chainParameter,
            chainParameter = _ref16$chainParameter === void 0 ? [] : _ref16$chainParameter;
        callback(null, chainParameter);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Get the account resources
     */

  }, {
    key: "getAccountResources",
    value: function getAccountResources() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tronWeb.defaultAddress.hex;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getAccountResources, address);
      if (!this.tronWeb.isAddress(address)) return callback('Invalid address provided');
      this.tronWeb.fullNode.request('wallet/getaccountresource', {
        address: this.tronWeb.address.toHex(address)
      }, 'post').then(function (resources) {
        callback(null, resources);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Get the exchange ID.
     */

  }, {
    key: "getExchangeByID",
    value: function getExchangeByID() {
      var exchangeID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!callback) return this.injectPromise(this.getExchangeByID, exchangeID);
      if (!utils__WEBPACK_IMPORTED_MODULE_8__["default"].isInteger(exchangeID) || exchangeID < 0) return callback('Invalid exchangeID provided');
      this.tronWeb.fullNode.request('wallet/getexchangebyid', {
        value: exchangeID
      }, 'post').then(function (exchange) {
        callback(null, exchange);
      }).catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Lists the exchanges
     */

  }, {
    key: "listExchanges",
    value: function listExchanges() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!callback) return this.injectPromise(this.listExchanges);
      this.tronWeb.fullNode.request('wallet/listexchanges', {}, 'post').then(function (_ref17) {
        var _ref17$exchanges = _ref17.exchanges,
            exchanges = _ref17$exchanges === void 0 ? [] : _ref17$exchanges;
        callback(null, exchanges);
      }, 'post').catch(function (err) {
        return callback(err);
      });
    }
    /**
     * Lists all network modification proposals.
     */

  }, {
    key: "listExchangesPaginated",
    value: function listExchangesPaginated() {
      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(offset)) {
        callback = offset;
        offset = 0;
      }

      if (utils__WEBPACK_IMPORTED_MODULE_8__["default"].isFunction(limit)) {
        callback = limit;
        limit = 30;
      }

      if (!callback) return this.injectPromise(this.listExchanges);
      this.tronWeb.fullNode.request('wallet/listexchangespaginated', {
        limit: limit,
        offset: offset
      }, 'post').then(function (_ref18) {
        var _ref18$exchanges = _ref18.exchanges,
            exchanges = _ref18$exchanges === void 0 ? [] : _ref18$exchanges;
        callback(null, exchanges);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }]);

  return Trx;
}();


;

/***/ }),

/***/ "./src/utils/abi.js":
/*!**************************!*\
  !*** ./src/utils/abi.js ***!
  \**************************/
/*! exports provided: decodeParams, encodeParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeParams", function() { return decodeParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeParams", function() { return encodeParams; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! index */ "./src/index.js");



var abiCoder = new ethers__WEBPACK_IMPORTED_MODULE_1__["utils"].AbiCoder();
function decodeParams(names, types, output, ignoreMethodHash) {
  if (!output || typeof output === 'boolean') {
    ignoreMethodHash = output;
    output = types;
    types = names;
    names = [];
  }

  if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8) output = '0x' + output.replace(/^0x/, '').substring(8);
  if (output.replace(/^0x/, '').length % 64) throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');
  return abiCoder.decode(types, output).reduce(function (obj, arg, index) {
    if (types[index] == 'address') arg = '41' + arg.substr(2).toLowerCase();
    if (names.length) obj[names[index]] = arg;else obj.push(arg);
    return obj;
  }, names.length ? {} : []);
}
function encodeParams(types, values) {
  for (var i = 0; i < types.length; i++) {
    if (types[i] === 'address') {
      values[i] = index__WEBPACK_IMPORTED_MODULE_2__["default"].address.toHex(values[i]).replace(/^41/, '0x');
    }
  }

  return abiCoder.encode(types, values);
}

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
  var priKeyBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["genPriKey"])();
  var pubKeyBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["getPubKeyFromPriKey"])(priKeyBytes);
  var addressBytes = Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["getAddressFromPriKey"])(priKeyBytes);
  var privateKey = Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"])(priKeyBytes);
  var publicKey = Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"])(pubKeyBytes);
  return {
    privateKey: privateKey,
    publicKey: publicKey,
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

var ADDRESS_SIZE = 34;
var ADDRESS_PREFIX = "41";
var ADDRESS_PREFIX_BYTE = 0x41;

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

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var ALPHABET_MAP = {};

for (var i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}

var BASE = 58;
function encode58(buffer) {
  if (buffer.length === 0) return '';
  var i;
  var j;
  var digits = [0];

  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) {
      digits[j] <<= 8;
    }

    digits[0] += buffer[i];
    var carry = 0;

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

  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
    digits.push(0);
  }

  return digits.reverse().map(function (digit) {
    return ALPHABET[digit];
  }).join('');
}
function decode58(string) {
  if (string.length === 0) return [];
  var i;
  var j;
  var bytes = [0];

  for (i = 0; i < string.length; i++) {
    var c = string[i];
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

    for (j = 0; j < bytes.length; j++) {
      bytes[j] *= BASE;
    }

    bytes[0] += ALPHABET_MAP[c];
    var carry = 0;

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

  for (i = 0; string[i] === '1' && i < string.length - 1; i++) {
    bytes.push(0);
  }

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
  var _this = this;

  this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  this.encode = function (input) {
    var output = "";
    var chr1;
    var chr2;
    var chr3;
    var enc1;
    var enc2;
    var enc3;
    var enc4;
    var i = 0;

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) enc3 = enc4 = 64;else if (isNaN(chr3)) enc4 = 64;
      output = output + _this._keyStr.charAt(enc1) + _this._keyStr.charAt(enc2) + _this._keyStr.charAt(enc3) + _this._keyStr.charAt(enc4);
    }

    return output;
  };

  this.encodeIgnoreUtf8 = function (inputBytes) {
    var output = "";
    var chr1;
    var chr2;
    var chr3;
    var enc1;
    var enc2;
    var enc3;
    var enc4;
    var i = 0;

    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) enc3 = enc4 = 64;else if (isNaN(chr3)) enc4 = 64;
      output = output + _this._keyStr.charAt(enc1) + _this._keyStr.charAt(enc2) + _this._keyStr.charAt(enc3) + _this._keyStr.charAt(enc4);
    }

    return output;
  };

  this.decode = function (input) {
    var output = "";
    var chr1;
    var chr2;
    var chr3;
    var enc1;
    var enc2;
    var enc3;
    var enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _this._keyStr.indexOf(input.charAt(i++));
      enc2 = _this._keyStr.indexOf(input.charAt(i++));
      enc3 = _this._keyStr.indexOf(input.charAt(i++));
      enc4 = _this._keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) output = output + String.fromCharCode(chr2);
      if (enc4 != 64) output = output + String.fromCharCode(chr3);
    }

    return _this._utf8_decode(output);
  };

  this.decodeToByteArray = function (input) {
    var output = "";
    var chr1;
    var chr2;
    var chr3;
    var enc1;
    var enc2;
    var enc3;
    var enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _this._keyStr.indexOf(input.charAt(i++));
      enc2 = _this._keyStr.indexOf(input.charAt(i++));
      enc3 = _this._keyStr.indexOf(input.charAt(i++));
      enc4 = _this._keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) output = output + String.fromCharCode(chr2);
      if (enc4 != 64) output = output + String.fromCharCode(chr3);
    }

    return _this._out2ByteArray(output);
  };

  this._out2ByteArray = function (utftext) {
    var byteArray = new Array(utftext.length);
    var i = 0;
    var c = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }

    return byteArray;
  };

  this._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

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

  this._utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = 0;
    var c2 = 0;
    var c3 = 0;

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
/*! exports provided: byte2hexStr, bytesToString, hextoString, byteArray2hexStr, base64DecodeFromString, base64EncodeToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byte2hexStr", function() { return byte2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hextoString", function() { return hextoString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byteArray2hexStr", function() { return byteArray2hexStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64DecodeFromString", function() { return base64DecodeFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64EncodeToString", function() { return base64EncodeToString; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/utils/base64.js");


function byte2hexStr(byte) {
  if (typeof byte !== 'number') throw new Error('Input must be a number');
  if (byte < 0 || byte > 255) throw new Error('Input must be a byte');
  var hexByteMap = '0123456789ABCDEF';
  var str = '';
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}
function bytesToString(arr) {
  if (typeof arr === 'string') return arr;
  var str = '';

  for (var i = 0; i < arr.length; i++) {
    var one = arr[i].toString(2);
    var v = one.match(/^1+?(?=0)/);

    if (v && one.length === 8) {
      var bytesLength = v[0].length;
      var store = arr[i].toString(2).slice(7 - bytesLength);

      for (var st = 1; st < bytesLength; st++) {
        store += arr[st + i].toString(2).slice(2);
      }

      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(arr[i]);
    }
  }

  return str;
}
function hextoString(hex) {
  var arr = hex.replace(/^0x/, '').split('');
  var out = '';

  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = "0x".concat(arr[i * 2]).concat(arr[i * 2 + 1]);
    out += String.fromCharCode(tmp);
  }

  return out;
}
function byteArray2hexStr(byteArray) {
  var str = '';

  for (var i = 0; i < byteArray.length; i++) {
    str += byte2hexStr(byteArray[i]);
  }

  return str;
}
function base64DecodeFromString(string64) {
  return new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]().decodeToByteArray(string64);
}
function base64EncodeToString(bytes) {
  var b = new _base64__WEBPACK_IMPORTED_MODULE_1__["Base64"]();
  var string64 = b.encodeIgnoreUtf8(bytes);
  return string64;
}

/***/ }),

/***/ "./src/utils/code.js":
/*!***************************!*\
  !*** ./src/utils/code.js ***!
  \***************************/
/*! exports provided: bin2String, arrayEquals, stringToBytes, byte2hexStr, bytesToString, hextoString, byteArray2hexStr, base64DecodeFromString, base64EncodeToString, hexChar2byte, isHexChar, hexStr2byteArray, strToDate, isNumber, getStringType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bin2String", function() { return bin2String; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayEquals", function() { return arrayEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToBytes", function() { return stringToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexChar2byte", function() { return hexChar2byte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHexChar", function() { return isHexChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexStr2byteArray", function() { return hexStr2byteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToDate", function() { return strToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringType", function() { return getStringType; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "byte2hexStr", function() { return _bytes__WEBPACK_IMPORTED_MODULE_1__["byte2hexStr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return _bytes__WEBPACK_IMPORTED_MODULE_1__["bytesToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hextoString", function() { return _bytes__WEBPACK_IMPORTED_MODULE_1__["hextoString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "byteArray2hexStr", function() { return _bytes__WEBPACK_IMPORTED_MODULE_1__["byteArray2hexStr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base64DecodeFromString", function() { return _bytes__WEBPACK_IMPORTED_MODULE_1__["base64DecodeFromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base64EncodeToString", function() { return _bytes__WEBPACK_IMPORTED_MODULE_1__["base64EncodeToString"]; });



function bin2String(array) {
  // TODO Do we need this alias?
  return Object(_bytes__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(array);
}
function arrayEquals(array1, array2, strict) {
  if (array1.length != array2.length) return false;
  var i;

  for (i = 0; i < array1.length; i++) {
    if (strict) {
      if (array1[i] != array2[i]) return false;
    } else if (JSON.stringify(array1[i]) != JSON.stringify(array2[i])) return false;
  }

  return true;
}
function stringToBytes(str) {
  if (typeof str !== 'string') throw new Error('The passed string is not a string');
  var bytes = new Array();
  var len;
  var c;
  len = str.length;

  for (var i = 0; i < len; i++) {
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

function hexChar2byte(c) {
  var d;
  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0);
  if (typeof d === 'number') return d;else throw new Error('The passed hex char is not a valid hex char');
}
function isHexChar(c) {
  if (c >= 'A' && c <= 'F' || c >= 'a' && c <= 'f' || c >= '0' && c <= '9') {
    return 1;
  }

  return 0;
}
function hexStr2byteArray(str) {
  if (typeof str !== 'string') throw new Error('The passed string is not a string');
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);

    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;

      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    } else throw new Error('The passed hex char is not a valid hex string');
  }

  return byteArray;
} //yyyy-MM-DD HH-mm-ss

function strToDate(str) {
  if (!/^\d{4}-\d{2}-\d{2}( \d{2}-\d{2}-\d{2}|)/.test(str)) throw new Error('The passed date string is not valid');
  var tempStrs = str.split(" ");
  var dateStrs = tempStrs[0].split("-");
  var year = parseInt(dateStrs[0], 10);
  var month = parseInt(dateStrs[1], 10) - 1;
  var day = parseInt(dateStrs[2], 10);

  if (tempStrs.length > 1) {
    var timeStrs = tempStrs[1].split("-");
    var hour = parseInt(timeStrs[0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
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
  var i = 0; // TODO Should we return 1 if someone passes a full, 42-chars long address?
  // if (str.length == 42 && /^41/.test(str)) {
  //     for (; i < 40; i++) {
  //         var c = str.charAt(i+2);
  //
  //         if (!isHexChar(c))
  //             break;
  //     }
  // } else

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

  if (i == str.length) return 2; // All Decimal number, BlockNumber

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (c > ' ') return 3; // At least one visible character
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
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jssha */ "jssha");
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jssha__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./address */ "./src/utils/address.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./code */ "./src/utils/code.js");
/* harmony import */ var _base58__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base58 */ "./src/utils/base58.js");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! js-sha3 */ "js-sha3");
/* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(js_sha3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! elliptic */ "elliptic");
/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_8__);










function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return Object(_base58__WEBPACK_IMPORTED_MODULE_5__["encode58"])(checkSum);
}
function decodeBase58Address(base58Sting) {
  if (typeof base58Sting != 'string') return false;
  if (base58Sting.length <= 4) return false;
  var address = Object(_base58__WEBPACK_IMPORTED_MODULE_5__["decode58"])(base58Sting);
  if (base58Sting.length <= 4) return false;
  var len = address.length;
  var offset = len - 4;
  var checkSum = address.slice(offset);
  address = address.slice(0, offset);
  var hash0 = SHA256(address);
  var hash1 = SHA256(hash0);
  var checkSum1 = hash1.slice(0, 4);

  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] == checkSum1[2] && checkSum[3] == checkSum1[3]) {
    return address;
  }

  throw new Error('Invalid address provided');
}
function signTransaction(priKeyBytes, transaction) {
  if (typeof priKeyBytes === 'string') priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(priKeyBytes);
  var txID = transaction.txID;
  var signature = ECKeySign(Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(txID), priKeyBytes);
  transaction.signature = [signature];
  return transaction;
}
function arrayToBase64String(a) {
  return btoa(String.fromCharCode.apply(String, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(a)));
}
function signBytes(privateKey, contents) {
  if (typeof privateKey === 'string') privateKey = Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(privateKey);
  var hashBytes = SHA256(contents);
  var signBytes = ECKeySign(hashBytes, privateKey);
  return signBytes;
}
function getRowBytesFromTransactionBase64(base64Data) {
  var bytesDecode = Object(_code__WEBPACK_IMPORTED_MODULE_4__["base64DecodeFromString"])(base64Data);
  var transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
  var raw = transaction.getRawData();
  return raw.serializeBinary();
}
function genPriKey() {
  var ec = new elliptic__WEBPACK_IMPORTED_MODULE_8__["ec"]('secp256k1');
  var key = ec.genKeyPair();
  var priKey = key.getPrivate();
  var priKeyHex = priKey.toString('hex');

  while (priKeyHex.length < 64) {
    priKeyHex = "0".concat(priKeyHex);
  }

  return Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(priKeyHex);
}
function computeAddress(pubBytes) {
  if (pubBytes.length === 65) pubBytes = pubBytes.slice(1);
  var hash = Object(js_sha3__WEBPACK_IMPORTED_MODULE_6__["keccak256"])(pubBytes).toString();
  var addressHex = _address__WEBPACK_IMPORTED_MODULE_3__["ADDRESS_PREFIX"] + hash.substring(24);
  return Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(addressHex);
}
function getAddressFromPriKey(priKeyBytes) {
  var pubBytes = getPubKeyFromPriKey(priKeyBytes);
  return computeAddress(pubBytes);
}
function decode58Check(addressStr) {
  var decodeCheck = Object(_base58__WEBPACK_IMPORTED_MODULE_5__["decode58"])(addressStr);
  if (decodeCheck.length <= 4) return false;
  var decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
  var hash0 = SHA256(decodeData);
  var hash1 = SHA256(hash0);

  if (hash1[0] === decodeCheck[decodeData.length] && hash1[1] === decodeCheck[decodeData.length + 1] && hash1[2] === decodeCheck[decodeData.length + 2] && hash1[3] === decodeCheck[decodeData.length + 3]) {
    return decodeData;
  }

  return false;
}
function isAddressValid(base58Str) {
  if (typeof base58Str !== 'string') return false;
  if (base58Str.length !== _address__WEBPACK_IMPORTED_MODULE_3__["ADDRESS_SIZE"]) return false;
  var address = Object(_base58__WEBPACK_IMPORTED_MODULE_5__["decode58"])(base58Str);
  if (address.length !== 25) return false;
  if (address[0] !== _address__WEBPACK_IMPORTED_MODULE_3__["ADDRESS_PREFIX_BYTE"]) return false;
  var checkSum = address.slice(21);
  address = address.slice(0, 21);
  var hash0 = SHA256(address);
  var hash1 = SHA256(hash0);
  var checkSum1 = hash1.slice(0, 4);

  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] == checkSum1[2] && checkSum[3] == checkSum1[3]) {
    return true;
  }

  return false;
}
function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
  var priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["base64DecodeFromString"])(priKeyBase64String);
  var pubBytes = getPubKeyFromPriKey(priKeyBytes);
  var addressBytes = computeAddress(pubBytes);
  return getBase58CheckAddress(addressBytes);
}
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
  var priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["base64DecodeFromString"])(priKeyBase64String);
  var pubBytes = getPubKeyFromPriKey(priKeyBytes);
  var addressBytes = computeAddress(pubBytes);
  var addressHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_7__["byteArray2hexStr"])(addressBytes);
  return addressHex;
}
function getAddressFromPriKeyBase64String(priKeyBase64String) {
  var priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["base64DecodeFromString"])(priKeyBase64String);
  var pubBytes = getPubKeyFromPriKey(priKeyBytes);
  var addressBytes = computeAddress(pubBytes);
  var addressBase64 = Object(_code__WEBPACK_IMPORTED_MODULE_4__["base64EncodeToString"])(addressBytes);
  return addressBase64;
}
function getPubKeyFromPriKey(priKeyBytes) {
  var ec = new elliptic__WEBPACK_IMPORTED_MODULE_8__["ec"]('secp256k1');
  var key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  var pubkey = key.getPublic();
  var x = pubkey.x;
  var y = pubkey.y;
  var xHex = x.toString('hex');

  while (xHex.length < 64) {
    xHex = "0".concat(xHex);
  }

  var yHex = y.toString('hex');

  while (yHex.length < 64) {
    yHex = "0".concat(yHex);
  }

  var pubkeyHex = "04".concat(xHex).concat(yHex);
  var pubkeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(pubkeyHex);
  return pubkeyBytes;
}
function ECKeySign(hashBytes, priKeyBytes) {
  var ec = new elliptic__WEBPACK_IMPORTED_MODULE_8__["ec"]('secp256k1');
  var key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  var signature = key.sign(hashBytes);
  var r = signature.r;
  var s = signature.s;
  var id = signature.recoveryParam;
  var rHex = r.toString('hex');

  while (rHex.length < 64) {
    rHex = "0".concat(rHex);
  }

  var sHex = s.toString('hex');

  while (sHex.length < 64) {
    sHex = "0".concat(sHex);
  }

  var idHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_7__["byte2hexStr"])(id);
  var signHex = rHex + sHex + idHex;
  return signHex;
}
function SHA256(msgBytes) {
  var shaObj = new jssha__WEBPACK_IMPORTED_MODULE_2___default.a('SHA-256', 'HEX');
  var msgHex = Object(_bytes__WEBPACK_IMPORTED_MODULE_7__["byteArray2hexStr"])(msgBytes);
  shaObj.update(msgHex);
  var hashHex = shaObj.getHash('HEX');
  return Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(hashHex);
}
function passwordToAddress(password) {
  var com_priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["base64DecodeFromString"])(password);
  var com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
  return getBase58CheckAddress(com_addressBytes);
}
function pkToAddress(privateKey) {
  var com_priKeyBytes = Object(_code__WEBPACK_IMPORTED_MODULE_4__["hexStr2byteArray"])(privateKey);
  var com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _accounts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accounts */ "./src/utils/accounts.js");
/* harmony import */ var _base58__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base58 */ "./src/utils/base58.js");
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bytes */ "./src/utils/bytes.js");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./crypto */ "./src/utils/crypto.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./code */ "./src/utils/code.js");
/* harmony import */ var _abi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./abi */ "./src/utils/abi.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! validator */ "validator");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_9__);










var utils = {
  isValidURL: function isValidURL(url) {
    if (typeof url !== 'string') return false;
    return validator__WEBPACK_IMPORTED_MODULE_8___default.a.isURL(url.toString(), {
      protocols: ['http', 'https']
    });
  },
  isObject: function isObject(obj) {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
  },
  isArray: function isArray(array) {
    return Array.isArray(array);
  },
  isJson: function isJson(string) {
    try {
      return !!JSON.parse(string);
    } catch (ex) {
      return false;
    }
  },
  isBoolean: function isBoolean(bool) {
    return typeof bool === 'boolean';
  },
  isBigNumber: function isBigNumber(number) {
    return number && (number instanceof bignumber_js__WEBPACK_IMPORTED_MODULE_9___default.a || number.constructor && number.constructor.name === 'BigNumber');
  },
  isString: function isString(string) {
    return typeof string === 'string' || string && string.constructor && string.constructor.name === 'String';
  },
  isFunction: function isFunction(obj) {
    return typeof obj === 'function';
  },
  isHex: function isHex(string) {
    return typeof string === 'string' && !isNaN(parseInt(string, 16)) && /^(0x|)[a-fA-F0-9]+$/.test(string);
  },
  isInteger: function isInteger(number) {
    return Number.isInteger(Number(number));
  },
  hasProperty: function hasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
  },
  hasProperties: function hasProperties(obj) {
    var _this = this;

    for (var _len = arguments.length, properties = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      properties[_key - 1] = arguments[_key];
    }

    return properties.length && !properties.map(function (property) {
      return _this.hasProperty(obj, property);
    }).includes(false);
  },
  injectPromise: function injectPromise(func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return new Promise(function (resolve, reject) {
      func.apply(void 0, args.concat([function (err, res) {
        if (err) reject(err);else resolve(res);
      }]));
    });
  },
  promiseInjector: function promiseInjector(scope) {
    var _this2 = this;

    return function (func) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return _this2.injectPromise.apply(_this2, [func.bind(scope)].concat(args));
    };
  },
  mapEvent: function mapEvent(event) {
    return {
      block: event.block_number,
      timestamp: event.block_timestamp,
      contract: event.contract_address,
      name: event.event_name,
      transaction: event.transaction_id,
      result: event.result,
      resourceNode: event.resource_Node
    };
  },
  parseEvent: function parseEvent(event, _ref) {
    var abi = _ref.inputs;
    if (!event.result) return event;

    if (this.isObject(event.result)) {
      for (var i = 0; i < abi.length; i++) {
        var obj = abi[i];
        if (obj.type == 'address' && obj.name in event.result) event.result[obj.name] = '41' + event.result[obj.name].substr(2).toLowerCase();
      }
    } else if (this.isArray(event.result)) {
      event.result = event.result.reduce(function (obj, result, index) {
        var _abi$index = abi[index],
            name = _abi$index.name,
            type = _abi$index.type;
        if (type == 'address') result = '41' + result.substr(2).toLowerCase();
        obj[name] = result;
        return obj;
      }, {});
    }

    return event;
  },
  padLeft: function padLeft(input, padding, amount) {
    var res = input.toString();

    while (res.length < amount) {
      res = padding + res;
    }

    return res;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, utils, {
  code: _code__WEBPACK_IMPORTED_MODULE_6__,
  accounts: _accounts__WEBPACK_IMPORTED_MODULE_2__,
  base58: _base58__WEBPACK_IMPORTED_MODULE_3__,
  bytes: _bytes__WEBPACK_IMPORTED_MODULE_4__,
  crypto: _crypto__WEBPACK_IMPORTED_MODULE_5__,
  abi: _abi__WEBPACK_IMPORTED_MODULE_7__
}));

/***/ }),

/***/ "@babel/runtime/helpers/assertThisInitialized":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/assertThisInitialized" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/helpers/typeof":
/*!************************************************!*\
  !*** external "@babel/runtime/helpers/typeof" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

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

/***/ "eventemitter3":
/*!********************************!*\
  !*** external "eventemitter3" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

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