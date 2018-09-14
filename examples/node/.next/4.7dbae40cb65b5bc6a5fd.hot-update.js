webpackHotUpdate(4,{

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__ = __webpack_require__("./node_modules/styled-jsx/style.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js__ = __webpack_require__("../../dist/TronWeb.node.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__ = __webpack_require__("./node_modules/json-stringify-pretty-compact/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_circular_json__ = __webpack_require__("./node_modules/circular-json/build/circular-json.node.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_circular_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_circular_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ethers__ = __webpack_require__("../../node_modules/ethers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ethers__);

var _jsxFileName = "/Users/tianhan/tron/tron-web/examples/node/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }






var HttpProvider = __WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js___default.a.providers.HttpProvider;
var fullNode = new HttpProvider('https://api.trongrid.io:8090');
var solidityNode = new HttpProvider('https://api.trongrid.io:8091');
var eventServer = 'https://api.trongrid.io/';
var privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
var sampleAbi = '[{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacciNotify","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacci","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"input","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"Notify","type":"event"}]';
var sampleBytecode = '608060405234801561001057600080fd5b5061014f806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c7fdc70811461005057806361047ff41461007a575b600080fd5b34801561005c57600080fd5b50610068600435610092565b60408051918252519081900360200190f35b34801561008657600080fd5b506100686004356100e1565b600061009d826100e1565b604080518481526020810183905281519293507f71e71a8458267085d5ab16980fd5f114d2d37f232479c245d523ce8d23ca40ed929081900390910190a15b919050565b60008115156100f2575060006100dc565b8160011415610103575060016100dc565b61010f600283036100e1565b61011b600184036100e1565b0190506100dc5600a165627a7a72305820904e9c4de084d9b9f25cb9fd3ef040e92d6315d4a1596f3f015b2a66dcd3512f0029';
var tronWeb = new __WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js___default.a(fullNode, solidityNode, eventServer, privateKey);

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        resource: 'BANDWIDTH',
        data: {},
        contractAddress: '',
        contractAddressBase58: ''
      }
    }), _temp));
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var coder = new __WEBPACK_IMPORTED_MODULE_6_ethers__["utils"].AbiCoder();
      window.tronWeb = tronWeb;
    }
  }, {
    key: "triggerChromeWallet",
    value: function triggerChromeWallet() {
      var res = tronWeb.sendTransactionByWallet({
        to: 'TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5',
        amount: 0.1
      }, function (result) {
        console.log('cbk', result);
      });
      this.setState({
        data: res
      });
    }
  }, {
    key: "toBigNumber",
    value: function () {
      var _toBigNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
        var str, bigNumber, value;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                str = '200000000000000000000001';
                bigNumber = tronWeb.toBigNumber(str);
                console.log(bigNumber.toNumber(), '2.0000000000000002e+23');
                value = bigNumber.toString(10);
                this.setState({
                  data: value
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function toBigNumber() {
        return _toBigNumber.apply(this, arguments);
      };
    }()
  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tronWeb.getBalance(this.account.value);

              case 2:
                res = _context2.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getBalance() {
        return _getBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "getBlock",
    value: function () {
      var _getBlock = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return tronWeb.getBlock(this.idOrHeight.value);

              case 2:
                res = _context3.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getBlock() {
        return _getBlock.apply(this, arguments);
      };
    }()
  }, {
    key: "getBlockTransactionCount",
    value: function () {
      var _getBlockTransactionCount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee4() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return tronWeb.getBlockTransactionCount(this.idOrHeight.value);

              case 2:
                res = _context4.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getBlockTransactionCount() {
        return _getBlockTransactionCount.apply(this, arguments);
      };
    }()
  }, {
    key: "getTransaction",
    value: function () {
      var _getTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee5() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return tronWeb.getTransaction(this.transactionId.value);

              case 2:
                res = _context5.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getTransaction() {
        return _getTransaction.apply(this, arguments);
      };
    }() //生成私钥和地址并存储到localStorage中
    //该api有泄漏private key的风险，请确保在安全的环境中调用该api

  }, {
    key: "generateAddress",
    value: function () {
      var _generateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee6() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return tronWeb.generateAddressOnLine();

              case 2:
                res = _context6.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function generateAddress() {
        return _generateAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "generateAddressOnClient",
    value: function () {
      var _generateAddressOnClient = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee7() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return tronWeb.generateAccount();

              case 2:
                res = _context7.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function generateAddressOnClient() {
        return _generateAddressOnClient.apply(this, arguments);
      };
    }() //通过密码创建地址

  }, {
    key: "createAddressWithPassWord",
    value: function () {
      var _createAddressWithPassWord = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee8() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return tronWeb.createAddress('123456');

              case 2:
                res = _context8.sent;
                console.log(res); //{base58checkAddress: "TMip2NnRKhy2Wyf1FjKG1D1yn3F1LLGCDV",value:""4180e8816651790d4d6c187eef09f90b7a19408bb8"

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function createAddressWithPassWord() {
        return _createAddressWithPassWord.apply(this, arguments);
      };
    }() //转账

  }, {
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee9(e) {
        var from, to, amount, pk, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                e.preventDefault();
                from = this.from.value;
                to = this.to.value;
                amount = parseInt(this.amount.value);
                pk = this.pkForTransaction.value;
                _context9.next = 7;
                return tronWeb.sendTransaction(from, to, amount, pk);

              case 7:
                res = _context9.sent;
                this.setState({
                  data: res
                });

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function sendTransaction(_x) {
        return _sendTransaction.apply(this, arguments);
      };
    }() //1、更新账户名称

  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee10() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return tronWeb.updateAccount('wujiaolong1009', 'TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8');

              case 2:
                res = _context10.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function updateAccount() {
        return _updateAccount.apply(this, arguments);
      };
    }() //2、Vote for the superrepresentative

  }, {
    key: "voteWitnessAccount",
    value: function () {
      var _voteWitnessAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee11() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return tronWeb.voteWitnessAccount('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', [{
                  vote_address: 'TQxyQu5d76MaxsEF4nBf9tFa8s93nSHe8M',
                  vote_count: 1
                }]);

              case 2:
                res = _context11.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function voteWitnessAccount() {
        return _voteWitnessAccount.apply(this, arguments);
      };
    }() //3、发行token

  }, {
    key: "createAssetIssue",
    value: function () {
      var _createAssetIssue = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee12() {
        var options, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                options = {
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  name: 'TestTRX',
                  //名称
                  abbr: 'TTRX',
                  //简称
                  total_supply: 100,
                  //发行总量
                  trx_num: 1,
                  // 和 num 的兑换比例
                  num: 1,
                  start_time: 1530894315158,
                  //开始时间
                  end_time: 1533894312158,
                  //结束时间
                  description: '这是一个测试token',
                  //描述
                  url: 'http://www.baidu.com',
                  //官网地址
                  free_asset_net_limit: 10000,
                  //免费带宽
                  public_free_asset_net_limit: 10000,
                  // 每个token用户能使用本token的免费带宽
                  frozen_supply: {
                    frozen_amount: 1,
                    //发行者在发行的时候指定冻结的token
                    frozen_days: 2 //冻结的天数

                  }
                };
                _context12.next = 3;
                return tronWeb.createToken(options);

              case 3:
                res = _context12.sent;
                this.setState({
                  data: res
                });

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function createAssetIssue() {
        return _createAssetIssue.apply(this, arguments);
      };
    }() //5、 Apply to be a superrepresentative

  }, {
    key: "createWitness",
    value: function () {
      var _createWitness = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee13() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return tronWeb.createWitness('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', 'http://www.baidu.com');

              case 2:
                res = _context13.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function createWitness() {
        return _createWitness.apply(this, arguments);
      };
    }() //6、 Transfer token

  }, {
    key: "transferAsset",
    value: function () {
      var _transferAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee14() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return tronWeb.transferAsset({
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  to_address: 'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
                  asset_name: 'ZZZ',
                  amount: 1
                });

              case 2:
                res = _context14.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function transferAsset() {
        return _transferAsset.apply(this, arguments);
      };
    }() //7、 Participation in token distribution

  }, {
    key: "participateAssetIssue",
    value: function () {
      var _participateAssetIssue = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee15() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return tronWeb.transferAsset({
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  to_address: 'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
                  asset_name: 'ZZZ',
                  amount: 1
                });

              case 2:
                res = _context15.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function participateAssetIssue() {
        return _participateAssetIssue.apply(this, arguments);
      };
    }() // 

  }, {
    key: "freezeBalance",
    value: function () {
      var _freezeBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee16() {
        var frozen_balance, resource, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                frozen_balance = Number(this.frozen_balance.value);
                resource = this.state.resource;
                _context16.next = 4;
                return tronWeb.freezeBalance(tronWeb.defaultAddress.base58, frozen_balance, 3, resource);

              case 4:
                res = _context16.sent;
                this.setState({
                  data: res
                });

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function freezeBalance() {
        return _freezeBalance.apply(this, arguments);
      };
    }() //8、 解冻已经技术冻结期的 TRX

  }, {
    key: "unfreezeBalance",
    value: function () {
      var _unfreezeBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee17() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return tronWeb.unfreezeBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context17.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function unfreezeBalance() {
        return _unfreezeBalance.apply(this, arguments);
      };
    }() //9、解冻已经结束冻结期的 token

  }, {
    key: "unfreezeAsset",
    value: function () {
      var _unfreezeAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee18() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return tronWeb.unfreezeAsset('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context18.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function unfreezeAsset() {
        return _unfreezeAsset.apply(this, arguments);
      };
    }() //10、超级代表提现奖励到balance,每24小时可提现一次

  }, {
    key: "withdrawBalance",
    value: function () {
      var _withdrawBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee19() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return tronWeb.withdrawBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context19.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      return function withdrawBalance() {
        return _withdrawBalance.apply(this, arguments);
      };
    }() //11、修改token信息

  }, {
    key: "updateAsset",
    value: function () {
      var _updateAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee20() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return tronWeb.updateAsset({
                  owner_address: "TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9",
                  description: 'test',
                  url: 'http://www.baidu.com',
                  new_limit: 1000000,
                  new_public_limit: 100
                });

              case 2:
                res = _context20.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      return function updateAsset() {
        return _updateAsset.apply(this, arguments);
      };
    }() //12、查询api所在机器连接的节点

  }, {
    key: "listNodes",
    value: function () {
      var _listNodes = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee21() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return tronWeb.listNodes();

              case 2:
                res = _context21.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      return function listNodes() {
        return _listNodes.apply(this, arguments);
      };
    }() //13、查询账户发行的token

  }, {
    key: "getAssetIssueByAccount",
    value: function () {
      var _getAssetIssueByAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee22() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return tronWeb.getAssetIssueByAccount('TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL');

              case 2:
                res = _context22.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      return function getAssetIssueByAccount() {
        return _getAssetIssueByAccount.apply(this, arguments);
      };
    }() //14、根据名称查询token

  }, {
    key: "getAssetIssueByName",
    value: function () {
      var _getAssetIssueByName = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee23() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return tronWeb.getAssetIssueByName('ZZZ');

              case 2:
                res = _context23.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      return function getAssetIssueByName() {
        return _getAssetIssueByName.apply(this, arguments);
      };
    }() //15、查询最新块

  }, {
    key: "blockNumber",
    value: function () {
      var _blockNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee24() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return tronWeb.blockNumber();

              case 2:
                res = _context24.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      return function blockNumber() {
        return _blockNumber.apply(this, arguments);
      };
    }() //16、通过高度查询块

  }, {
    key: "getBlockByNum",
    value: function () {
      var _getBlockByNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee25() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return tronWeb.getBlockByNum(869015);

              case 2:
                res = _context25.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      return function getBlockByNum() {
        return _getBlockByNum.apply(this, arguments);
      };
    }() //17、通过id查询块

  }, {
    key: "getBlockById",
    value: function () {
      var _getBlockById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee26() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return tronWeb.getBlockById('00000000000d429759175a43cb3e112d0761ecabf06ef0c253affe1420977651');

              case 2:
                res = _context26.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      return function getBlockById() {
        return _getBlockById.apply(this, arguments);
      };
    }() //18、按照范围查询块

  }, {
    key: "getBlockByLimitNext",
    value: function () {
      var _getBlockByLimitNext = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee27() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return tronWeb.getBlockByLimitNext(869010, 869015);

              case 2:
                res = _context27.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      return function getBlockByLimitNext() {
        return _getBlockByLimitNext.apply(this, arguments);
      };
    }() //19、﻿查询最新的几个块

  }, {
    key: "getBlockByLatestNum",
    value: function () {
      var _getBlockByLatestNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee28() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return tronWeb.getBlockByLatestNum(5);

              case 2:
                res = _context28.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      return function getBlockByLatestNum() {
        return _getBlockByLatestNum.apply(this, arguments);
      };
    }() //20、通过ID查询交易

  }, {
    key: "getTransactionById",
    value: function () {
      var _getTransactionById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee29() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return tronWeb.getTransactionById('0689352aff84a0ff3691502bca94b1ded40abb4aa8806b313acb59a34cf10c22');

              case 2:
                res = _context29.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      return function getTransactionById() {
        return _getTransactionById.apply(this, arguments);
      };
    }() //21、查询所有超级代表列表

  }, {
    key: "listWitNesses",
    value: function () {
      var _listWitNesses = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee30() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return tronWeb.listWitNesses();

              case 2:
                res = _context30.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      return function listWitNesses() {
        return _listWitNesses.apply(this, arguments);
      };
    }() //22、查询所有token列表

  }, {
    key: "getAssetIssueList",
    value: function () {
      var _getAssetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee31() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return tronWeb.getAssetIssueList();

              case 2:
                res = _context31.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      return function getAssetIssueList() {
        return _getAssetIssueList.apply(this, arguments);
      };
    }() //23、分页查询token列表

  }, {
    key: "getPaginateDassetIssueList",
    value: function () {
      var _getPaginateDassetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee32() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return tronWeb.getPaginateDassetIssueList(1, 10);

              case 2:
                res = _context32.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      return function getPaginateDassetIssueList() {
        return _getPaginateDassetIssueList.apply(this, arguments);
      };
    }() //24、统计所有交易总数

  }, {
    key: "totalTransaction",
    value: function () {
      var _totalTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee33() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return tronWeb.getTransactionCount();

              case 2:
                res = _context33.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      return function totalTransaction() {
        return _totalTransaction.apply(this, arguments);
      };
    }() //25、获取下次统计投票时间

  }, {
    key: "getNextMaintenanceTime",
    value: function () {
      var _getNextMaintenanceTime = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee34() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return tronWeb.getNextMainteNanceTime();

              case 2:
                res = _context34.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      return function getNextMaintenanceTime() {
        return _getNextMaintenanceTime.apply(this, arguments);
      };
    }() //26、检查地址是否正确

  }, {
    key: "validateAddress",
    value: function () {
      var _validateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee35() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _context35.next = 2;
                return tronWeb.validateAddress('TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5');

              case 2:
                res = _context35.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      return function validateAddress() {
        return _validateAddress.apply(this, arguments);
      };
    }() //27、部署合约

  }, {
    key: "deployContract",
    value: function () {
      var _deployContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee36(event) {
        var contractInstance, contract;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                event.preventDefault(); //部署合约

                _context36.next = 3;
                return tronWeb.contract().new({
                  abi: JSON.parse(this.abi.value),
                  bytecode: this.byteCode.value
                });

              case 3:
                contractInstance = _context36.sent;
                contract = {
                  contractAddress: contractInstance.address,
                  contractAddressBase58: tronWeb.address.fromHex(contractInstance.address)
                };
                this.setState({
                  data: contract,
                  contractAddress: contractInstance.address,
                  contractAddressBase58: tronWeb.address.fromHex(contractInstance.address)
                });

              case 6:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      return function deployContract(_x2) {
        return _deployContract.apply(this, arguments);
      };
    }() //28、查询合约

  }, {
    key: "getContract",
    value: function () {
      var _getContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee37(event) {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                event.preventDefault();
                _context37.next = 3;
                return tronWeb.contract().at(this.contract_address.value);

              case 3:
                res = _context37.sent;
                this.setState({
                  data: res
                });

              case 5:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      return function getContract(_x3) {
        return _getContract.apply(this, arguments);
      };
    }() //29、调用合约

  }, {
    key: "triggerContract",
    value: function () {
      var _triggerContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee38(event) {
        var contractInstance, args, paramsArray, _ref2, result;

        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                event.preventDefault();
                _context38.next = 3;
                return tronWeb.contract().at(this.contract_address.value);

              case 3:
                contractInstance = _context38.sent;

                if (this.watchEvent.value) {
                  contractInstance[this.watchEvent.value]().watch(function (err, res) {
                    console.log("error " + err);
                    console.log('eventResult:', res);
                  });
                }

                args = {
                  callValue: this.callValue.value,
                  shouldPollResponse: true
                };
                paramsArray = this.params.value.split(',');
                _context38.next = 9;
                return contractInstance[this.functionName.value].apply(this, paramsArray).send(args);

              case 9:
                _ref2 = _context38.sent;
                result = _ref2.result;
                console.log("Function call result:", result);

              case 12:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));

      return function triggerContract(_x4) {
        return _triggerContract.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.state.data;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 384
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          marginTop: '200px',
          marginLeft: '10px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 385
        },
        className: "jsx-2187904324" + " " + "box"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 386
        },
        className: "jsx-2187904324"
      }, "\u5DE5\u5177\u51FD\u6570 - Tool function"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 387
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "to BigNumber",
        onClick: function onClick() {
          return _this2.toBigNumber();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 388
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 390
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7\u3001\u8F6C\u8D26 - Account number, transfer"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 391
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7 - account number\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.account = input;
        },
        defaultValue: tronWeb.defaultAddress.base58,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 392
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBalance();
        },
        value: "\u67E5\u8BE2\u8D26\u6237\u4F59\u989D - Check account balance",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 393
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 395
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "triggerWallet",
        onClick: function onClick() {
          return _this2.triggerChromeWallet();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 396
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u751F\u6210\u79C1\u94A5\u5730\u5740 - Generate private key address(onLine)",
        onClick: function onClick() {
          return _this2.generateAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u751F\u6210\u79C1\u94A5\u5730\u5740 - Generate private key address(onClient)",
        onClick: function onClick() {
          return _this2.generateAddressOnClient();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u9A8C\u8BC1\u5730\u5740 - Verify address",
        onClick: function onClick() {
          return _this2.validateAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 402
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u901A\u8FC7\u5BC6\u7801\u521B\u5EFA\u5730\u5740 - Create an address with a password",
        onClick: function onClick() {
          return _this2.createAddressWithPassWord();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 404
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u66F4\u65B0\u8D26\u53F7\u540D\u79F0 - Update account name",
        onClick: function onClick() {
          return _this2.updateAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 406
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 407
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 408
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }, "from"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.from = input;
        },
        defaultValue: tronWeb.defaultAddress.base58,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
        },
        className: "jsx-2187904324"
      }, "to"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.to = input;
        },
        defaultValue: "TGhepyLuyML5n5jQBTykKqh9od8hQrBDkS",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 411
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 411
        },
        className: "jsx-2187904324"
      }, "amount"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.amount = input;
        },
        defaultValue: 1000000,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 411
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 412
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 412
        },
        className: "jsx-2187904324"
      }, "pk"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.pkForTransaction = input;
        },
        defaultValue: privateKey,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 412
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick(e) {
          return _this2.sendTransaction(e);
        },
        value: "\u8F6C\u8D26 - Transfer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 413
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 416
        },
        className: "jsx-2187904324"
      }, "\u8282\u70B9\u67E5\u8BE2 - Node query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 417
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2API\u6240\u5728\u673A\u5668\u8FDE\u63A5\u7684\u8282\u70B9 - Query the node to which the machine where the API is connected",
        onClick: function onClick() {
          return _this2.listNodes();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 418
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 420
        },
        className: "jsx-2187904324"
      }, "\u5757\u67E5\u8BE2 - Block query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 421
        },
        className: "jsx-2187904324"
      }, "\u5757id\u6216\u9AD8\u5EA6 - Block id or height\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '600px'
        },
        ref: function ref(input) {
          return _this2.idOrHeight = input;
        },
        defaultValue: "00000000000005ae07f42776b3bfd8e873feaebf2d743aceb716db5f70cb373b",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 422
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBlock();
        },
        value: "\u67E5\u8BE2\u533A\u5757 - Query block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 423
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBlockTransactionCount();
        },
        value: "\u67E5\u8BE2\u533A\u5757\u5185\u4EA4\u6613\u6570\u91CF - Query the number of transactions in the block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 424
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6700\u65B0\u5757 - Query the latest block",
        onClick: function onClick() {
          return _this2.blockNumber();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 425
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 427
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 431
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613\u67E5\u8BE2 - Transaction inquiry"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 432
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613id - Transaction id\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '600px'
        },
        ref: function ref(input) {
          return _this2.transactionId = input;
        },
        defaultValue: "c523edd7b4b776aa44e4cd4bbdf925cb4eb6d047e27316e1ff919014cc6a9f54",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 433
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u901A\u8FC7id\u67E5\u8BE2\u4EA4\u6613\u8BB0\u5F55 - Query transaction records by id",
        onClick: function onClick() {
          return _this2.getTransaction();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 434
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u7EDF\u8BA1\u6240\u6709\u7684\u4EA4\u6613\u603B\u6570 - Count all transactions",
        onClick: function onClick() {
          return _this2.totalTransaction();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 435
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 437
        },
        className: "jsx-2187904324"
      }, "\u8D85\u7EA7\u4EE3\u8868 - Super Representative (SR)"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 438
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6240\u6709\u8D85\u7EA7\u4EE3\u8868 - Query all SR",
        onClick: function onClick() {
          return _this2.listWitNesses();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 439
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u83B7\u53D6\u4E0B\u6B21\u7EDF\u8BA1\u6295\u7968\u65F6\u95F4 - Get the next maintenance time",
        onClick: function onClick() {
          return _this2.getNextMaintenanceTime();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 440
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u7533\u8BF7\u6210\u4E3A\u8D85\u7EA7\u4EE3\u8868 - Apply to become a SR",
        onClick: function onClick() {
          return _this2.createWitness();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 441
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u4E3A\u8D85\u7EA7\u4EE3\u8868\u6295\u7968 - Vote for the SR",
        onClick: function onClick() {
          return _this2.voteWitnessAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 442
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u89E3\u51BB\u7ED3\u675F\u51BB\u7ED3\u671F\u7684trx - Unfreeze the trx at the end of the freeze period",
        onClick: function onClick() {
          return _this2.unfreezeBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 443
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8D85\u7EA7\u4EE3\u8868\u63D0\u73B0\u5956\u52B1\u5230balance - SR withdraws the reward to balance",
        onClick: function onClick() {
          return _this2.withdrawBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 444
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 446
        },
        className: "jsx-2187904324"
      }, "token\u7BA1\u7406 - Token management"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 447
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      }, "BANDWIDTH:", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        defaultChecked: true,
        ref: "resource",
        name: "resource",
        onChange: function onChange() {
          _this2.setState({
            resource: 'BANDWIDTH'
          });
        },
        type: "radio",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      }, "ENERGY:", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        ref: "resource",
        name: "resource",
        onChange: function onChange() {
          _this2.setState({
            resource: 'ENERGY'
          });
        },
        type: "radio",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        defaultValue: "1000000",
        ref: function ref(input) {
          return _this2.frozen_balance = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u51BB\u7ED3\u83B7\u53D6\u8D44\u6E90 - freeze gain resource",
        onClick: function onClick() {
          return _this2.freezeBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 450
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6240\u6709token\u5217\u8868 - Query all token lists",
        onClick: function onClick() {
          return _this2.getAssetIssueList();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 451
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u5206\u9875\u67E5\u8BE2token\u5217\u8868 - Paging query token list",
        onClick: function onClick() {
          return _this2.getPaginateDassetIssueList();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 452
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u67D0\u8D26\u6237\u53D1\u884C\u7684token - Query the token issued by an account",
        onClick: function onClick() {
          return _this2.getAssetIssueByAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 453
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u6839\u636E\u540D\u79F0\u67E5\u8BE2token - Query token by name",
        onClick: function onClick() {
          return _this2.getAssetIssueByName();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 454
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u53D1\u884Ctoken - Issue token",
        onClick: function onClick() {
          return _this2.createAssetIssue();
        },
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 455
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8F6C\u8D26token - Transfer token",
        onClick: function onClick() {
          return _this2.transferAsset();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 456
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u4FEE\u6539token - Modify token",
        onClick: function onClick() {
          return _this2.updateAsset();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 457
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u89E3\u51BBtoken - Unfreeze the token",
        onClick: function onClick() {
          return _this2.unfreezeAsset();
        },
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 458
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u53C2\u4E0Etoken\u53D1\u884C - Participate in token issuance",
        onClick: function onClick() {
          return _this2.participateAssetIssue();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 459
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 461
        },
        className: "jsx-2187904324"
      }, "\u667A\u80FD\u5408\u7EA6 - Smart contract"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 462
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 463
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.deployContract(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 464
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 465
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 466
        },
        className: "jsx-2187904324"
      }, "owner_address\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.owner_address = input;
        },
        defaultValue: tronWeb.defaultAddress.base58,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 467
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 469
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 470
        },
        className: "jsx-2187904324"
      }, "pk:"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.pk = input;
        },
        defaultValue: privateKey,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 471
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 473
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 474
        },
        className: "jsx-2187904324"
      }, "Abi"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "abi",
        defaultValue: sampleAbi,
        ref: function ref(input) {
          return _this2.abi = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 474
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 476
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 477
        },
        className: "jsx-2187904324"
      }, "byteCode"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "byteCode",
        defaultValue: sampleBytecode,
        ref: function ref(input) {
          return _this2.byteCode = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 477
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 479
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 480
        },
        className: "jsx-2187904324"
      }, "consume_user_resource_percent\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.consume_user_resource_percent = input;
        },
        defaultValue: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 481
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 483
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "submit",
        value: "\u90E8\u7F72\u5408\u7EA6 - Deploy contract",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 484
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 487
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 489
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.getContract(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 490
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 491
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 492
        },
        className: "jsx-2187904324"
      }, "contract_address:"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.contract_address = input;
        },
        defaultValue: data.contractAddress,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 493
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 495
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "submit",
        value: "\u67E5\u8BE2\u5408\u7EA6 - Query contract",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 496
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 499
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 501
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.triggerContract(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 502
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 503
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 504
        },
        className: "jsx-2187904324"
      }, "contract_address:"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.contract_address = input;
        },
        defaultValue: data.contractAddress,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 505
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 507
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 508
        },
        className: "jsx-2187904324"
      }, "functionName:"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.functionName = input;
        },
        defaultValue: "fibonacciNotify",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 509
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 511
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 512
        },
        className: "jsx-2187904324"
      }, "params:(comma separated)"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.params = input;
        },
        defaultValue: "7",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 513
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 515
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 516
        },
        className: "jsx-2187904324"
      }, "callValue: "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.callValue = input;
        },
        defaultValue: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 517
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 519
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 520
        },
        className: "jsx-2187904324"
      }, "watch event"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.watchEvent = input;
        },
        defaultValue: "Notify",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 521
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 523
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "submit",
        value: "\u90E8\u7F72\u5408\u7EA6 - Call contract",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 524
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 527
        },
        className: "jsx-2187904324"
      })))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          position: 'fixed',
          left: 0,
          top: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 534
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "100",
        rows: "10",
        value: __WEBPACK_IMPORTED_MODULE_5_circular_json___default.a.stringify(data),
        onChange: function onChange() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 535
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default.a, {
        styleId: "2187904324",
        css: "label.jsx-2187904324{display:inline-block;width:150px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdoQjRCLEFBSTZDLHFCQUNULFlBQ2YiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RpYW5oYW4vdHJvbi90cm9uLXdlYi9leGFtcGxlcy9ub2RlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtSZWFjdERPTX0gZnJvbSAncmVhY3QnXG5pbXBvcnQgVHJvbldlYiBmcm9tICcuLi8uLi8uLi9kaXN0L1Ryb25XZWIubm9kZS5qcydcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnanNvbi1zdHJpbmdpZnktcHJldHR5LWNvbXBhY3QnXG5pbXBvcnQgQ2lyY3VsYXJKc29uIGZyb20gJ2NpcmN1bGFyLWpzb24nXG5pbXBvcnQge3V0aWxzfSBmcm9tICdldGhlcnMnXG5jb25zdCBIdHRwUHJvdmlkZXIgPSBUcm9uV2ViLnByb3ZpZGVycy5IdHRwUHJvdmlkZXI7XG5cbmNvbnN0IGZ1bGxOb2RlID0gbmV3IEh0dHBQcm92aWRlcignaHR0cHM6Ly9hcGkudHJvbmdyaWQuaW86ODA5MCcpO1xuY29uc3Qgc29saWRpdHlOb2RlID0gbmV3IEh0dHBQcm92aWRlcignaHR0cHM6Ly9hcGkudHJvbmdyaWQuaW86ODA5MScpO1xuY29uc3QgZXZlbnRTZXJ2ZXIgPSAnaHR0cHM6Ly9hcGkudHJvbmdyaWQuaW8vJztcbmNvbnN0IHByaXZhdGVLZXkgPSAnZGExNDYzNzRhNzUzMTBiOTY2NmU4MzRlZTRhZDA4NjZkNmY0MDM1OTY3YmZjNzYyMTdjNWE0OTVmZmY5ZjBkMCc7XG5cbmNvbnN0IHNhbXBsZUFiaSA9ICdbe1wiY29uc3RhbnRcIjpmYWxzZSxcImlucHV0c1wiOlt7XCJuYW1lXCI6XCJudW1iZXJcIixcInR5cGVcIjpcInVpbnQyNTZcIn1dLFwibmFtZVwiOlwiZmlib25hY2NpTm90aWZ5XCIsXCJvdXRwdXRzXCI6W3tcIm5hbWVcIjpcInJlc3VsdFwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJwYXlhYmxlXCI6ZmFsc2UsXCJzdGF0ZU11dGFiaWxpdHlcIjpcIm5vbnBheWFibGVcIixcInR5cGVcIjpcImZ1bmN0aW9uXCJ9LHtcImNvbnN0YW50XCI6dHJ1ZSxcImlucHV0c1wiOlt7XCJuYW1lXCI6XCJudW1iZXJcIixcInR5cGVcIjpcInVpbnQyNTZcIn1dLFwibmFtZVwiOlwiZmlib25hY2NpXCIsXCJvdXRwdXRzXCI6W3tcIm5hbWVcIjpcInJlc3VsdFwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJwYXlhYmxlXCI6ZmFsc2UsXCJzdGF0ZU11dGFiaWxpdHlcIjpcInZpZXdcIixcInR5cGVcIjpcImZ1bmN0aW9uXCJ9LHtcImFub255bW91c1wiOmZhbHNlLFwiaW5wdXRzXCI6W3tcImluZGV4ZWRcIjpmYWxzZSxcIm5hbWVcIjpcImlucHV0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9LHtcImluZGV4ZWRcIjpmYWxzZSxcIm5hbWVcIjpcInJlc3VsdFwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJOb3RpZnlcIixcInR5cGVcIjpcImV2ZW50XCJ9XSc7XG5jb25zdCBzYW1wbGVCeXRlY29kZSA9ICc2MDgwNjA0MDUyMzQ4MDE1NjEwMDEwNTc2MDAwODBmZDViNTA2MTAxNGY4MDYxMDAyMDYwMDAzOTYwMDBmMzAwNjA4MDYwNDA1MjYwMDQzNjEwNjEwMDRiNTc2M2ZmZmZmZmZmN2MwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNjAwMDM1MDQxNjYzM2M3ZmRjNzA4MTE0NjEwMDUwNTc4MDYzNjEwNDdmZjQxNDYxMDA3YTU3NWI2MDAwODBmZDViMzQ4MDE1NjEwMDVjNTc2MDAwODBmZDViNTA2MTAwNjg2MDA0MzU2MTAwOTI1NjViNjA0MDgwNTE5MTgyNTI1MTkwODE5MDAzNjAyMDAxOTBmMzViMzQ4MDE1NjEwMDg2NTc2MDAwODBmZDViNTA2MTAwNjg2MDA0MzU2MTAwZTE1NjViNjAwMDYxMDA5ZDgyNjEwMGUxNTY1YjYwNDA4MDUxODQ4MTUyNjAyMDgxMDE4MzkwNTI4MTUxOTI5MzUwN2Y3MWU3MWE4NDU4MjY3MDg1ZDVhYjE2OTgwZmQ1ZjExNGQyZDM3ZjIzMjQ3OWMyNDVkNTIzY2U4ZDIzY2E0MGVkOTI5MDgxOTAwMzkwOTEwMTkwYTE1YjkxOTA1MDU2NWI2MDAwODExNTE1NjEwMGYyNTc1MDYwMDA2MTAwZGM1NjViODE2MDAxMTQxNTYxMDEwMzU3NTA2MDAxNjEwMGRjNTY1YjYxMDEwZjYwMDI4MzAzNjEwMGUxNTY1YjYxMDExYjYwMDE4NDAzNjEwMGUxNTY1YjAxOTA1MDYxMDBkYzU2MDBhMTY1NjI3YTdhNzIzMDU4MjA5MDRlOWM0ZGUwODRkOWI5ZjI1Y2I5ZmQzZWYwNDBlOTJkNjMxNWQ0YTE1OTZmM2YwMTViMmE2NmRjZDM1MTJmMDAyOSc7XG5cbmNvbnN0IHRyb25XZWIgPSBuZXcgVHJvbldlYihcbiAgICBmdWxsTm9kZSxcbiAgICBzb2xpZGl0eU5vZGUsXG4gICAgZXZlbnRTZXJ2ZXIsXG4gICAgcHJpdmF0ZUtleVxuKTtcblxuY2xhc3MgSW5kZXggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgc3RhdGUgPSB7XG4gICAgICAgIHJlc291cmNlOidCQU5EV0lEVEgnLFxuICAgICAgICBkYXRhOnt9LFxuICAgICAgICBjb250cmFjdEFkZHJlc3M6JycsXG4gICAgICAgIGNvbnRyYWN0QWRkcmVzc0Jhc2U1ODonJyxcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgbGV0IGNvZGVyID0gbmV3IHV0aWxzLkFiaUNvZGVyKCk7XG4gICAgICAgIHdpbmRvdy50cm9uV2ViID0gdHJvbldlYjtcbiAgICB9XG4gICAgdHJpZ2dlckNocm9tZVdhbGxldCgpe1xuICAgICAgICBjb25zdCByZXMgPSB0cm9uV2ViLnNlbmRUcmFuc2FjdGlvbkJ5V2FsbGV0KHt0bzonVFozU21rRDhxSkszVlk4QW5xTjlYRmlZdXNwRVAzY3dCNScsYW1vdW50OjAuMX0sZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYmsnLHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyB0b0JpZ051bWJlcigpe1xuICAgICAgICBsZXQgc3RyID0gJzIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSc7XG4gICAgICAgIGxldCBiaWdOdW1iZXIgPSB0cm9uV2ViLnRvQmlnTnVtYmVyKHN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpZ051bWJlci50b051bWJlcigpLCcyLjAwMDAwMDAwMDAwMDAwMDJlKzIzJylcbiAgICAgICAgbGV0IHZhbHVlID0gYmlnTnVtYmVyLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnZhbHVlXG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgYXN5bmMgZ2V0QmFsYW5jZSgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJhbGFuY2UodGhpcy5hY2NvdW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICBhc3luYyBnZXRCbG9jaygpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrKHRoaXMuaWRPckhlaWdodC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9IFxuICAgIGFzeW5jIGdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCh0aGlzLmlkT3JIZWlnaHQudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfSBcbiAgICBhc3luYyBnZXRUcmFuc2FjdGlvbigpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldFRyYW5zYWN0aW9uKHRoaXMudHJhbnNhY3Rpb25JZC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy/nlJ/miJDnp4HpkqXlkozlnLDlnYDlubblrZjlgqjliLBsb2NhbFN0b3JhZ2XkuK1cbiAgICAvL+ivpWFwaeacieazhOa8j3ByaXZhdGUga2V555qE6aOO6Zmp77yM6K+356Gu5L+d5Zyo5a6J5YWo55qE546v5aKD5Lit6LCD55So6K+lYXBpXG4gICAgYXN5bmMgZ2VuZXJhdGVBZGRyZXNzKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2VuZXJhdGVBZGRyZXNzT25MaW5lKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgYXN5bmMgZ2VuZXJhdGVBZGRyZXNzT25DbGllbnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZW5lcmF0ZUFjY291bnQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvL+mAmui/h+WvhueggeWIm+W7uuWcsOWdgFxuICAgIGFzeW5jIGNyZWF0ZUFkZHJlc3NXaXRoUGFzc1dvcmQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5jcmVhdGVBZGRyZXNzKCcxMjM0NTYnKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTsvL3tiYXNlNThjaGVja0FkZHJlc3M6IFwiVE1pcDJOblJLaHkyV3lmMUZqS0cxRDF5bjNGMUxMR0NEVlwiLHZhbHVlOlwiXCI0MTgwZTg4MTY2NTE3OTBkNGQ2YzE4N2VlZjA5ZjkwYjdhMTk0MDhiYjhcIlxuICAgIH1cbiAgICAvL+i9rOi0plxuICAgIGFzeW5jIHNlbmRUcmFuc2FjdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5mcm9tLnZhbHVlO1xuICAgICAgICBjb25zdCB0byA9IHRoaXMudG8udmFsdWU7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9cGFyc2VJbnQodGhpcy5hbW91bnQudmFsdWUpO1xuICAgICAgICBjb25zdCBwayA9IHRoaXMucGtGb3JUcmFuc2FjdGlvbi52YWx1ZTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5zZW5kVHJhbnNhY3Rpb24oZnJvbSx0byxhbW91bnQscGspO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8x44CB5pu05paw6LSm5oi35ZCN56ewXG4gICAgYXN5bmMgdXBkYXRlQWNjb3VudCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLnVwZGF0ZUFjY291bnQoJ3d1amlhb2xvbmcxMDA5JywnVFQ2N3JQTndnbXBlaW12SFVNVnpGZktzakw5R1oxd0d3OCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMuOAgVZvdGUgZm9yIHRoZSBzdXBlcnJlcHJlc2VudGF0aXZlXG4gICAgYXN5bmMgdm90ZVdpdG5lc3NBY2NvdW50KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudm90ZVdpdG5lc3NBY2NvdW50KCdUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5Jyxbe1xuICAgICAgICAgICAgdm90ZV9hZGRyZXNzOidUUXh5UXU1ZDc2TWF4c0VGNG5CZjl0RmE4czkzblNIZThNJyxcbiAgICAgICAgICAgIHZvdGVfY291bnQ6MVxuICAgICAgICB9XSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8z44CB5Y+R6KGMdG9rZW5cbiAgICBhc3luYyBjcmVhdGVBc3NldElzc3VlKCl7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgb3duZXJfYWRkcmVzczonVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScsXG4gICAgICAgICAgICBuYW1lOidUZXN0VFJYJywvL+WQjeensFxuICAgICAgICAgICAgYWJicjonVFRSWCcsLy/nroDnp7BcbiAgICAgICAgICAgIHRvdGFsX3N1cHBseSA6MTAwLC8v5Y+R6KGM5oC76YePXG4gICAgICAgICAgICB0cnhfbnVtOjEsLy8g5ZKMIG51bSDnmoTlhZHmjaLmr5TkvotcbiAgICAgICAgICAgIG51bToxLFxuICAgICAgICAgICAgc3RhcnRfdGltZSA6IDE1MzA4OTQzMTUxNTgsLy/lvIDlp4vml7bpl7RcbiAgICAgICAgICAgIGVuZF90aW1lOjE1MzM4OTQzMTIxNTgsLy/nu5PmnZ/ml7bpl7RcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOifov5nmmK/kuIDkuKrmtYvor5V0b2tlbicsLy/mj4/ov7BcbiAgICAgICAgICAgIHVybDonaHR0cDovL3d3dy5iYWlkdS5jb20nLC8v5a6Y572R5Zyw5Z2AXG4gICAgICAgICAgICBmcmVlX2Fzc2V0X25ldF9saW1pdDoxMDAwMCwvL+WFjei0ueW4puWuvVxuICAgICAgICAgICAgcHVibGljX2ZyZWVfYXNzZXRfbmV0X2xpbWl0OjEwMDAwLC8vIOavj+S4qnRva2Vu55So5oi36IO95L2/55So5pysdG9rZW7nmoTlhY3otLnluKblrr1cbiAgICAgICAgICAgIGZyb3plbl9zdXBwbHk6e1xuICAgICAgICAgICAgICAgIGZyb3plbl9hbW91bnQ6MSwvL+WPkeihjOiAheWcqOWPkeihjOeahOaXtuWAmeaMh+WumuWGu+e7k+eahHRva2VuXG4gICAgICAgICAgICAgICAgZnJvemVuX2RheXM6MiAvL+WGu+e7k+eahOWkqeaVsFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuY3JlYXRlVG9rZW4ob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzXjgIEgQXBwbHkgdG8gYmUgYSBzdXBlcnJlcHJlc2VudGF0aXZlXG4gICAgYXN5bmMgY3JlYXRlV2l0bmVzcygpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmNyZWF0ZVdpdG5lc3MoJ1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLCdodHRwOi8vd3d3LmJhaWR1LmNvbScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vNuOAgSBUcmFuc2ZlciB0b2tlblxuICAgIGFzeW5jIHRyYW5zZmVyQXNzZXQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi50cmFuc2ZlckFzc2V0KHtcbiAgICAgICAgICAgIG93bmVyX2FkZHJlc3M6J1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFxuICAgICAgICAgICAgdG9fYWRkcmVzczonVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcsXG4gICAgICAgICAgICBhc3NldF9uYW1lOidaWlonLFxuICAgICAgICAgICAgYW1vdW50OjFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8344CBIFBhcnRpY2lwYXRpb24gaW4gdG9rZW4gZGlzdHJpYnV0aW9uXG4gICAgYXN5bmMgcGFydGljaXBhdGVBc3NldElzc3VlKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudHJhbnNmZXJBc3NldCh7XG4gICAgICAgICAgICBvd25lcl9hZGRyZXNzOidUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5JyxcbiAgICAgICAgICAgIHRvX2FkZHJlc3M6J1RSenpNYkZETmRGblJnR3FLQ2txb0N1TG9IZnlSWmZ1VkwnLFxuICAgICAgICAgICAgYXNzZXRfbmFtZTonWlpaJyxcbiAgICAgICAgICAgIGFtb3VudDoxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vIFxuICAgIGFzeW5jIGZyZWV6ZUJhbGFuY2UoKXtcbiAgICAgICAgY29uc3QgZnJvemVuX2JhbGFuY2UgPSBOdW1iZXIodGhpcy5mcm96ZW5fYmFsYW5jZS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5zdGF0ZS5yZXNvdXJjZTtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZnJlZXplQmFsYW5jZSh0cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmJhc2U1OCxmcm96ZW5fYmFsYW5jZSwzLHJlc291cmNlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KSAgICBcbiAgICB9XG4gICAgLy8444CBIOino+WGu+W3sue7j+aKgOacr+WGu+e7k+acn+eahCBUUlhcbiAgICBhc3luYyB1bmZyZWV6ZUJhbGFuY2UoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudW5mcmVlemVCYWxhbmNlKCdUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8544CB6Kej5Ya75bey57uP57uT5p2f5Ya757uT5pyf55qEIHRva2VuXG4gICAgYXN5bmMgdW5mcmVlemVBc3NldCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi51bmZyZWV6ZUFzc2V0KCdUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xMOOAgei2hee6p+S7o+ihqOaPkOeOsOWlluWKseWIsGJhbGFuY2Us5q+PMjTlsI/ml7blj6/mj5DnjrDkuIDmrKFcbiAgICBhc3luYyB3aXRoZHJhd0JhbGFuY2UoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIud2l0aGRyYXdCYWxhbmNlKCdUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xMeOAgeS/ruaUuXRva2Vu5L+h5oGvXG4gICAgYXN5bmMgdXBkYXRlQXNzZXQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi51cGRhdGVBc3NldCh7XG4gICAgICAgICAgICBvd25lcl9hZGRyZXNzOlwiVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICd0ZXN0JyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly93d3cuYmFpZHUuY29tJyxcbiAgICAgICAgICAgIG5ld19saW1pdCA6IDEwMDAwMDAsXG4gICAgICAgICAgICBuZXdfcHVibGljX2xpbWl0IDogMTAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTLjgIHmn6Xor6JhcGnmiYDlnKjmnLrlmajov57mjqXnmoToioLngrlcbiAgICBhc3luYyBsaXN0Tm9kZXMoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIubGlzdE5vZGVzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xM+OAgeafpeivoui0puaIt+WPkeihjOeahHRva2VuXG4gICAgYXN5bmMgZ2V0QXNzZXRJc3N1ZUJ5QWNjb3VudCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRBc3NldElzc3VlQnlBY2NvdW50KCdUUnp6TWJGRE5kRm5SZ0dxS0NrcW9DdUxvSGZ5UlpmdVZMJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNOOAgeagueaNruWQjeensOafpeivonRva2VuXG4gICAgYXN5bmMgZ2V0QXNzZXRJc3N1ZUJ5TmFtZSgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRBc3NldElzc3VlQnlOYW1lKCdaWlonKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzE144CB5p+l6K+i5pyA5paw5Z2XXG4gICAgYXN5bmMgYmxvY2tOdW1iZXIoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuYmxvY2tOdW1iZXIoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzE244CB6YCa6L+H6auY5bqm5p+l6K+i5Z2XXG4gICAgYXN5bmMgZ2V0QmxvY2tCeU51bSgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5TnVtKDg2OTAxNSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xN+OAgemAmui/h2lk5p+l6K+i5Z2XXG4gICAgYXN5bmMgZ2V0QmxvY2tCeUlkKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrQnlJZCgnMDAwMDAwMDAwMDBkNDI5NzU5MTc1YTQzY2IzZTExMmQwNzYxZWNhYmYwNmVmMGMyNTNhZmZlMTQyMDk3NzY1MScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTjjgIHmjInnhafojIPlm7Tmn6Xor6LlnZdcbiAgICBhc3luYyBnZXRCbG9ja0J5TGltaXROZXh0KCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrQnlMaW1pdE5leHQoODY5MDEwLDg2OTAxNSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xOeOAge+7v+afpeivouacgOaWsOeahOWHoOS4quWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlMYXRlc3ROdW0oKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QmxvY2tCeUxhdGVzdE51bSg1KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vMjDjgIHpgJrov4dJROafpeivouS6pOaYk1xuICAgIGFzeW5jIGdldFRyYW5zYWN0aW9uQnlJZCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRUcmFuc2FjdGlvbkJ5SWQoJzA2ODkzNTJhZmY4NGEwZmYzNjkxNTAyYmNhOTRiMWRlZDQwYWJiNGFhODgwNmIzMTNhY2I1OWEzNGNmMTBjMjInKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjHjgIHmn6Xor6LmiYDmnInotoXnuqfku6PooajliJfooahcbiAgICBhc3luYyBsaXN0V2l0TmVzc2VzKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmxpc3RXaXROZXNzZXMoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIy44CB5p+l6K+i5omA5pyJdG9rZW7liJfooahcbiAgICBhc3luYyBnZXRBc3NldElzc3VlTGlzdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRBc3NldElzc3VlTGlzdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjPjgIHliIbpobXmn6Xor6J0b2tlbuWIl+ihqFxuICAgIGFzeW5jIGdldFBhZ2luYXRlRGFzc2V0SXNzdWVMaXN0KCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldFBhZ2luYXRlRGFzc2V0SXNzdWVMaXN0KDEsMTApO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjTjgIHnu5/orqHmiYDmnInkuqTmmJPmgLvmlbBcbiAgICBhc3luYyB0b3RhbFRyYW5zYWN0aW9uKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldFRyYW5zYWN0aW9uQ291bnQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzI144CB6I635Y+W5LiL5qyh57uf6K6h5oqV56Wo5pe26Ze0XG4gICAgYXN5bmMgZ2V0TmV4dE1haW50ZW5hbmNlVGltZSgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXROZXh0TWFpbnRlTmFuY2VUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yNuOAgeajgOafpeWcsOWdgOaYr+WQpuato+ehrlxuICAgIGFzeW5jIHZhbGlkYXRlQWRkcmVzcygpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi52YWxpZGF0ZUFkZHJlc3MoJ1RaM1Nta0Q4cUpLM1ZZOEFucU45WEZpWXVzcEVQM2N3QjUnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vMjfjgIHpg6jnvbLlkIjnuqZcbiAgICBhc3luYyBkZXBsb3lDb250cmFjdChldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8v6YOo572y5ZCI57qmXG4gICAgICAgIGxldCBjb250cmFjdEluc3RhbmNlID0gYXdhaXQgdHJvbldlYi5jb250cmFjdCgpLm5ldyh7XG4gICAgICAgICAgICBhYmk6SlNPTi5wYXJzZSh0aGlzLmFiaS52YWx1ZSksXG4gICAgICAgICAgICBieXRlY29kZTp0aGlzLmJ5dGVDb2RlLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBjb250cmFjdCA9IHtcbiAgICAgICAgICAgIGNvbnRyYWN0QWRkcmVzczpjb250cmFjdEluc3RhbmNlLmFkZHJlc3MsXG4gICAgICAgICAgICBjb250cmFjdEFkZHJlc3NCYXNlNTg6dHJvbldlYi5hZGRyZXNzLmZyb21IZXgoY29udHJhY3RJbnN0YW5jZS5hZGRyZXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOmNvbnRyYWN0LFxuICAgICAgICAgICAgY29udHJhY3RBZGRyZXNzOmNvbnRyYWN0SW5zdGFuY2UuYWRkcmVzcyxcbiAgICAgICAgICAgIGNvbnRyYWN0QWRkcmVzc0Jhc2U1ODp0cm9uV2ViLmFkZHJlc3MuZnJvbUhleChjb250cmFjdEluc3RhbmNlLmFkZHJlc3MpLFxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzI444CB5p+l6K+i5ZCI57qmXG4gICAgYXN5bmMgZ2V0Q29udHJhY3QoZXZlbnQpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5jb250cmFjdCgpLmF0KHRoaXMuY29udHJhY3RfYWRkcmVzcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yOeOAgeiwg+eUqOWQiOe6plxuICAgIGFzeW5jIHRyaWdnZXJDb250cmFjdChldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBjb250cmFjdEluc3RhbmNlID0gYXdhaXQgdHJvbldlYi5jb250cmFjdCgpLmF0KHRoaXMuY29udHJhY3RfYWRkcmVzcy52YWx1ZSk7XG5cblxuICAgICAgICBpZiAodGhpcy53YXRjaEV2ZW50LnZhbHVlKSB7XG4gICAgICAgICAgICBjb250cmFjdEluc3RhbmNlW3RoaXMud2F0Y2hFdmVudC52YWx1ZV0oKS53YXRjaChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgXCIgK2VycilcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXZlbnRSZXN1bHQ6JyxyZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYXJncyA9IHtcbiAgICAgICAgICAgIGNhbGxWYWx1ZTp0aGlzLmNhbGxWYWx1ZS52YWx1ZSxcbiAgICAgICAgICAgIHNob3VsZFBvbGxSZXNwb25zZTogdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmFtc0FycmF5ID0gdGhpcy5wYXJhbXMudmFsdWUuc3BsaXQoJywnKTtcbiAgICAgICAgbGV0IHsgcmVzdWx0IH0gPSBhd2FpdCBjb250cmFjdEluc3RhbmNlW3RoaXMuZnVuY3Rpb25OYW1lLnZhbHVlXS5hcHBseSggdGhpcywgcGFyYW1zQXJyYXkgKS5zZW5kKGFyZ3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZ1bmN0aW9uIGNhbGwgcmVzdWx0OlwiLCByZXN1bHQpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIiBzdHlsZT17e21hcmdpblRvcDonMjAwcHgnLG1hcmdpbkxlZnQ6JzEwcHgnfX0+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7lt6Xlhbflh73mlbAgLSBUb29sIGZ1bmN0aW9uPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJ0byBCaWdOdW1iZXJcIiBvbkNsaWNrPXsoKT0+dGhpcy50b0JpZ051bWJlcigpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDM+6LSm5Y+344CB6L2s6LSmIC0gQWNjb3VudCBudW1iZXIsIHRyYW5zZmVyPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIOi0puWPtyAtIGFjY291bnQgbnVtYmVy77yaPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLmFjY291bnQgPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFkZHJlc3MuYmFzZTU4fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEJhbGFuY2UoKX0gdmFsdWU9XCLmn6Xor6LotKbmiLfkvZnpop0gLSBDaGVjayBhY2NvdW50IGJhbGFuY2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJ0cmlnZ2VyV2FsbGV0XCIgb25DbGljaz17KCk9PnRoaXMudHJpZ2dlckNocm9tZVdhbGxldCgpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIueUn+aIkOengemSpeWcsOWdgCAtIEdlbmVyYXRlIHByaXZhdGUga2V5IGFkZHJlc3Mob25MaW5lKVwiIG9uQ2xpY2s9eygpPT50aGlzLmdlbmVyYXRlQWRkcmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55Sf5oiQ56eB6ZKl5Zyw5Z2AIC0gR2VuZXJhdGUgcHJpdmF0ZSBrZXkgYWRkcmVzcyhvbkNsaWVudClcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZW5lcmF0ZUFkZHJlc3NPbkNsaWVudCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpqozor4HlnLDlnYAgLSBWZXJpZnkgYWRkcmVzc1wiIG9uQ2xpY2s9eygpPT50aGlzLnZhbGlkYXRlQWRkcmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4flr4bnoIHliJvlu7rlnLDlnYAgLSBDcmVhdGUgYW4gYWRkcmVzcyB3aXRoIGEgcGFzc3dvcmRcIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVBZGRyZXNzV2l0aFBhc3NXb3JkKCl9Lz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuabtOaWsOi0puWPt+WQjeensCAtIFVwZGF0ZSBhY2NvdW50IG5hbWVcIiBvbkNsaWNrPXsoKT0+dGhpcy51cGRhdGVBY2NvdW50KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+ZnJvbTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLmZyb20gPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFkZHJlc3MuYmFzZTU4fS8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+dG88L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy50byA9aW5wdXR9IGRlZmF1bHRWYWx1ZT17YFRHaGVweUx1eU1MNW41alFCVHlrS3FoOW9kOGhRckJEa1NgfS8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+YW1vdW50PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiByZWY9eyhpbnB1dCk9PnRoaXMuYW1vdW50ID1pbnB1dH0gIGRlZmF1bHRWYWx1ZT17MTAwMDAwMH0gLz4gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5wazwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgIHN0eWxlPXt7d2lkdGg6JzUwMHB4J319cmVmPXsoaW5wdXQpPT50aGlzLnBrRm9yVHJhbnNhY3Rpb24gPWlucHV0fSBkZWZhdWx0VmFsdWU9e3ByaXZhdGVLZXl9IC8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhlKT0+dGhpcy5zZW5kVHJhbnNhY3Rpb24oZSl9IHZhbHVlPVwi6L2s6LSmIC0gVHJhbnNmZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuiKgueCueafpeivoiAtIE5vZGUgcXVlcnk8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivokFQSeaJgOWcqOacuuWZqOi/nuaOpeeahOiKgueCuSAtIFF1ZXJ5IHRoZSBub2RlIHRvIHdoaWNoIHRoZSBtYWNoaW5lIHdoZXJlIHRoZSBBUEkgaXMgY29ubmVjdGVkXCIgb25DbGljaz17KCk9PnRoaXMubGlzdE5vZGVzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7lnZfmn6Xor6IgLSBCbG9jayBxdWVyeTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDlnZdpZOaIlumrmOW6piAtIEJsb2NrIGlkIG9yIGhlaWdodO+8mjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzYwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5pZE9ySGVpZ2h0ID1pbnB1dH0gZGVmYXVsdFZhbHVlPScwMDAwMDAwMDAwMDAwNWFlMDdmNDI3NzZiM2JmZDhlODczZmVhZWJmMmQ3NDNhY2ViNzE2ZGI1ZjcwY2IzNzNiJyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCbG9jaygpfSB2YWx1ZT1cIuafpeivouWMuuWdlyAtIFF1ZXJ5IGJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50KCl9IHZhbHVlPVwi5p+l6K+i5Yy65Z2X5YaF5Lqk5piT5pWw6YePIC0gUXVlcnkgdGhlIG51bWJlciBvZiB0cmFuc2FjdGlvbnMgaW4gdGhlIGJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmnIDmlrDlnZcgLSBRdWVyeSB0aGUgbGF0ZXN0IGJsb2NrXCIgb25DbGljaz17KCk9PnRoaXMuYmxvY2tOdW1iZXIoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4fpq5jluqbojIPlm7Tmn6Xor6LlnZcgLSBRdWVyeSBibG9jayBieSBoZWlnaHQgcmFuZ2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCbG9ja0J5TGltaXROZXh0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmnIDov5HnmoTlh6DkuKrlnZcgLSBRdWVyeSB0aGUgbW9zdCByZWNlbnQgYmxvY2tzXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tCeUxhdGVzdE51bSgpfS8+Ki99XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDM+5Lqk5piT5p+l6K+iIC0gVHJhbnNhY3Rpb24gaW5xdWlyeTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDkuqTmmJNpZCAtIFRyYW5zYWN0aW9uIGlk77yaPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonNjAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnRyYW5zYWN0aW9uSWQgPWlucHV0fSBkZWZhdWx0VmFsdWU9J2M1MjNlZGQ3YjRiNzc2YWE0NGU0Y2Q0YmJkZjkyNWNiNGViNmQwNDdlMjczMTZlMWZmOTE5MDE0Y2M2YTlmNTQnLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4dpZOafpeivouS6pOaYk+iusOW9lSAtIFF1ZXJ5IHRyYW5zYWN0aW9uIHJlY29yZHMgYnkgaWRcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRUcmFuc2FjdGlvbigpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi57uf6K6h5omA5pyJ55qE5Lqk5piT5oC75pWwIC0gQ291bnQgYWxsIHRyYW5zYWN0aW9uc1wiIG9uQ2xpY2s9eygpPT50aGlzLnRvdGFsVHJhbnNhY3Rpb24oKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPui2hee6p+S7o+ihqCAtIFN1cGVyIFJlcHJlc2VudGF0aXZlIChTUik8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivouaJgOaciei2hee6p+S7o+ihqCAtIFF1ZXJ5IGFsbCBTUlwiIG9uQ2xpY2s9eygpPT50aGlzLmxpc3RXaXROZXNzZXMoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuiOt+WPluS4i+asoee7n+iuoeaKleelqOaXtumXtCAtIEdldCB0aGUgbmV4dCBtYWludGVuYW5jZSB0aW1lXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0TmV4dE1haW50ZW5hbmNlVGltZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55Sz6K+35oiQ5Li66LaF57qn5Luj6KGoIC0gQXBwbHkgdG8gYmVjb21lIGEgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVXaXRuZXNzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLkuLrotoXnuqfku6PooajmipXnpaggLSBWb3RlIGZvciB0aGUgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy52b3RlV2l0bmVzc0FjY291bnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuino+WGu+e7k+adn+WGu+e7k+acn+eahHRyeCAtIFVuZnJlZXplIHRoZSB0cnggYXQgdGhlIGVuZCBvZiB0aGUgZnJlZXplIHBlcmlvZFwiIG9uQ2xpY2s9eygpPT50aGlzLnVuZnJlZXplQmFsYW5jZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6LaF57qn5Luj6KGo5o+Q546w5aWW5Yqx5YiwYmFsYW5jZSAtIFNSIHdpdGhkcmF3cyB0aGUgcmV3YXJkIHRvIGJhbGFuY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy53aXRoZHJhd0JhbGFuY2UoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPnRva2Vu566h55CGIC0gVG9rZW4gbWFuYWdlbWVudDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QkFORFdJRFRIOjxpbnB1dCBkZWZhdWx0Q2hlY2tlZCByZWY9XCJyZXNvdXJjZVwiIG5hbWU9XCJyZXNvdXJjZVwiIG9uQ2hhbmdlPXsoKT0+e3RoaXMuc2V0U3RhdGUoe3Jlc291cmNlOidCQU5EV0lEVEgnfSl9fSB0eXBlPVwicmFkaW9cIiAgLz48L2xhYmVsPjxsYWJlbD5FTkVSR1k6PGlucHV0IHJlZj1cInJlc291cmNlXCIgbmFtZT1cInJlc291cmNlXCIgb25DaGFuZ2U9eygpPT57dGhpcy5zZXRTdGF0ZSh7cmVzb3VyY2U6J0VORVJHWSd9KX19IHR5cGU9XCJyYWRpb1wiIC8+PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiBkZWZhdWx0VmFsdWU9XCIxMDAwMDAwXCIgcmVmPXtpbnB1dD0+dGhpcy5mcm96ZW5fYmFsYW5jZSA9IGlucHV0fSAgLz48aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Ya757uT6I635Y+W6LWE5rqQIC0gZnJlZXplIGdhaW4gcmVzb3VyY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5mcmVlemVCYWxhbmNlKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5omA5pyJdG9rZW7liJfooaggLSBRdWVyeSBhbGwgdG9rZW4gbGlzdHNcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRBc3NldElzc3VlTGlzdCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5YiG6aG15p+l6K+idG9rZW7liJfooaggLSBQYWdpbmcgcXVlcnkgdG9rZW4gbGlzdFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldFBhZ2luYXRlRGFzc2V0SXNzdWVMaXN0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6Lmn5DotKbmiLflj5HooYznmoR0b2tlbiAtIFF1ZXJ5IHRoZSB0b2tlbiBpc3N1ZWQgYnkgYW4gYWNjb3VudFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEFzc2V0SXNzdWVCeUFjY291bnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuagueaNruWQjeensOafpeivonRva2VuIC0gUXVlcnkgdG9rZW4gYnkgbmFtZVwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEFzc2V0SXNzdWVCeU5hbWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPkeihjHRva2VuIC0gSXNzdWUgdG9rZW5cIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVBc3NldElzc3VlKCl9IHN0eWxlPXt7Y29sb3I6J3JlZCd9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6L2s6LSmdG9rZW4gLSBUcmFuc2ZlciB0b2tlblwiIG9uQ2xpY2s9eygpPT50aGlzLnRyYW5zZmVyQXNzZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuS/ruaUuXRva2VuIC0gTW9kaWZ5IHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMudXBkYXRlQXNzZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuino+WGu3Rva2VuIC0gVW5mcmVlemUgdGhlIHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMudW5mcmVlemVBc3NldCgpfSBzdHlsZT17e2NvbG9yOidyZWQnfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPguS4jnRva2Vu5Y+R6KGMIC0gUGFydGljaXBhdGUgaW4gdG9rZW4gaXNzdWFuY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5wYXJ0aWNpcGF0ZUFzc2V0SXNzdWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuaZuuiDveWQiOe6piAtIFNtYXJ0IGNvbnRyYWN0PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17KGUpPT50aGlzLmRlcGxveUNvbnRyYWN0KGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPm93bmVyX2FkZHJlc3PvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5vd25lcl9hZGRyZXNzPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFkZHJlc3MuYmFzZTU4fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnBrOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonNTAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnBrID0gaW5wdXR9IGRlZmF1bHRWYWx1ZT17cHJpdmF0ZUtleX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5BYmk8L2xhYmVsPjx0ZXh0YXJlYSBjb2xzPVwiNTBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj1cImFiaVwiIGRlZmF1bHRWYWx1ZT17c2FtcGxlQWJpfSByZWY9eyhpbnB1dCk9PnRoaXMuYWJpID0gaW5wdXR9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPmJ5dGVDb2RlPC9sYWJlbD48dGV4dGFyZWEgIGNvbHM9XCI1MFwiIHJvd3M9XCIxMFwiIHBsYWNlaG9sZGVyPSdieXRlQ29kZScgZGVmYXVsdFZhbHVlPXtzYW1wbGVCeXRlY29kZX0gcmVmPXsoaW5wdXQpPT50aGlzLmJ5dGVDb2RlID0gaW5wdXR9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsID5jb25zdW1lX3VzZXJfcmVzb3VyY2VfcGVyY2VudO+8mjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPXsoaW5wdXQpPT50aGlzLmNvbnN1bWVfdXNlcl9yZXNvdXJjZV9wZXJjZW50PWlucHV0fSBkZWZhdWx0VmFsdWU9ezB9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwi6YOo572y5ZCI57qmIC0gRGVwbG95IGNvbnRyYWN0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9eyhlKT0+dGhpcy5nZXRDb250cmFjdChlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5jb250cmFjdF9hZGRyZXNzOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLmNvbnRyYWN0X2FkZHJlc3M9aW5wdXR9IGRlZmF1bHRWYWx1ZT17ZGF0YS5jb250cmFjdEFkZHJlc3N9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwi5p+l6K+i5ZCI57qmIC0gUXVlcnkgY29udHJhY3RcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXsoZSk9PnRoaXMudHJpZ2dlckNvbnRyYWN0KGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPmNvbnRyYWN0X2FkZHJlc3M6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOiczMDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMuY29udHJhY3RfYWRkcmVzcz1pbnB1dH0gZGVmYXVsdFZhbHVlPXtkYXRhLmNvbnRyYWN0QWRkcmVzc30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5mdW5jdGlvbk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOic1MDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMuZnVuY3Rpb25OYW1lID0gaW5wdXR9IGRlZmF1bHRWYWx1ZT17XCJmaWJvbmFjY2lOb3RpZnlcIn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5wYXJhbXM6KGNvbW1hIHNlcGFyYXRlZCk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzUwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5wYXJhbXMgPSBpbnB1dH0gZGVmYXVsdFZhbHVlPXtcIjdcIn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCA+Y2FsbFZhbHVlOiA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj17KGlucHV0KT0+dGhpcy5jYWxsVmFsdWU9aW5wdXR9IGRlZmF1bHRWYWx1ZT17MH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD53YXRjaCBldmVudDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonNTAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLndhdGNoRXZlbnQgPSBpbnB1dH0gZGVmYXVsdFZhbHVlPXtcIk5vdGlmeVwifS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIumDqOe9suWQiOe6piAtIENhbGwgY29udHJhY3RcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjonZml4ZWQnLGxlZnQ6MCx0b3A6MH19PlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY29scz1cIjEwMFwiIHJvd3M9XCIxMFwiICB2YWx1ZT17Q2lyY3VsYXJKc29uLnN0cmluZ2lmeShkYXRhKX0gb25DaGFuZ2U9eygpPT57fX0+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3R5bGUganN4PntgXG5cbiAgICAgICAgICAgICAgICAgICAgbGFiZWx7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIClcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmRleCJdfQ== */\n/*@ sourceURL=pages/index.js */"
      }));
    }
  }]);

  return Index;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Index);
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=4.7dbae40cb65b5bc6a5fd.hot-update.js.map