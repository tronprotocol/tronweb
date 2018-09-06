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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_index__ = __webpack_require__("../src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__ = __webpack_require__("./node_modules/json-stringify-pretty-compact/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers__ = __webpack_require__("./node_modules/ethers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ethers__);

var _jsxFileName = "/Users/tron/Workspace/tron/tron-web/examples/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




 //let tronWeb = new TronWeb('http://52.44.75.99:8090');
//tronWeb.setEventServer('http://52.44.75.99:18889');
//tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
//tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

var tronWeb = new __WEBPACK_IMPORTED_MODULE_3__src_index__["a" /* default */]('http://testapi.trondapps.org');
tronWeb.setEventServer('http://testevent.trondapps.org');
tronWeb.defaultAccount = 'TWsm8HtU2A5eEzoT8ev8yaoFjHsXLLrckb';
tronWeb.defaultPk = '8ef7dd1a81d4ef2b538daae0c20e37f4edb3fd1338aff91b03e2b8b1ed956645';

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
        data: {}
      }
    }), _temp));
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var coder = new __WEBPACK_IMPORTED_MODULE_5_ethers__["utils"].AbiCoder();
      window.tronWeb = tronWeb;
    }
  }, {
    key: "triggerChromeWallet",
    value: function triggerChromeWallet() {
      tronWeb.sendTransactionByWallet({
        to: 'TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5',
        amount: 0.1
      }, function (result) {
        console.log('cbk', result);
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
                return tronWeb.generateAddressOnClient();

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
                return tronWeb.createWitness('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', 'http://www.xxx.com');

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
    }() //8、 解冻已经技术冻结期的 TRX

  }, {
    key: "unfreezeBalance",
    value: function () {
      var _unfreezeBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee16() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return tronWeb.unfreezeBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context16.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee17() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return tronWeb.unfreezeAsset('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

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

      return function unfreezeAsset() {
        return _unfreezeAsset.apply(this, arguments);
      };
    }() //10、超级代表提现奖励到balance,每24小时可提现一次

  }, {
    key: "withdrawBalance",
    value: function () {
      var _withdrawBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee18() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return tronWeb.withdrawBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

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

      return function withdrawBalance() {
        return _withdrawBalance.apply(this, arguments);
      };
    }() //11、修改token信息

  }, {
    key: "updateAsset",
    value: function () {
      var _updateAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee19() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return tronWeb.updateAsset({
                  owner_address: "TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9",
                  description: 'test',
                  url: 'http://www.baidu.com',
                  new_limit: 1000000,
                  new_public_limit: 100
                });

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

      return function updateAsset() {
        return _updateAsset.apply(this, arguments);
      };
    }() //12、查询api所在机器连接的节点

  }, {
    key: "listNodes",
    value: function () {
      var _listNodes = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee20() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return tronWeb.listNodes();

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

      return function listNodes() {
        return _listNodes.apply(this, arguments);
      };
    }() //13、查询账户发行的token

  }, {
    key: "getAssetIssueByAccount",
    value: function () {
      var _getAssetIssueByAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee21() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return tronWeb.getAssetIssueByAccount('TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL');

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

      return function getAssetIssueByAccount() {
        return _getAssetIssueByAccount.apply(this, arguments);
      };
    }() //14、根据名称查询token

  }, {
    key: "getAssetIssueByName",
    value: function () {
      var _getAssetIssueByName = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee22() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return tronWeb.getAssetIssueByName('ZZZ');

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

      return function getAssetIssueByName() {
        return _getAssetIssueByName.apply(this, arguments);
      };
    }() //15、查询最新块

  }, {
    key: "blockNumber",
    value: function () {
      var _blockNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee23() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return tronWeb.blockNumber();

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

      return function blockNumber() {
        return _blockNumber.apply(this, arguments);
      };
    }() //16、通过高度查询块

  }, {
    key: "getBlockByNum",
    value: function () {
      var _getBlockByNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee24() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return tronWeb.getBlockByNum(869015);

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

      return function getBlockByNum() {
        return _getBlockByNum.apply(this, arguments);
      };
    }() //17、通过id查询块

  }, {
    key: "getBlockById",
    value: function () {
      var _getBlockById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee25() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return tronWeb.getBlockById('00000000000d429759175a43cb3e112d0761ecabf06ef0c253affe1420977651');

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

      return function getBlockById() {
        return _getBlockById.apply(this, arguments);
      };
    }() //18、按照范围查询块

  }, {
    key: "getBlockByLimitNext",
    value: function () {
      var _getBlockByLimitNext = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee26() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return tronWeb.getBlockByLimitNext(869010, 869015);

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

      return function getBlockByLimitNext() {
        return _getBlockByLimitNext.apply(this, arguments);
      };
    }() //19、﻿查询最新的几个块

  }, {
    key: "getBlockByLatestNum",
    value: function () {
      var _getBlockByLatestNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee27() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return tronWeb.getBlockByLatestNum(5);

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

      return function getBlockByLatestNum() {
        return _getBlockByLatestNum.apply(this, arguments);
      };
    }() //20、通过ID查询交易

  }, {
    key: "getTransactionById",
    value: function () {
      var _getTransactionById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee28() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return tronWeb.getTransactionById('0689352aff84a0ff3691502bca94b1ded40abb4aa8806b313acb59a34cf10c22');

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

      return function getTransactionById() {
        return _getTransactionById.apply(this, arguments);
      };
    }() //21、查询所有超级代表列表

  }, {
    key: "listWitNesses",
    value: function () {
      var _listWitNesses = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee29() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return tronWeb.listWitNesses();

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

      return function listWitNesses() {
        return _listWitNesses.apply(this, arguments);
      };
    }() //22、查询所有token列表

  }, {
    key: "getAssetIssueList",
    value: function () {
      var _getAssetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee30() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return tronWeb.getAssetIssueList();

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

      return function getAssetIssueList() {
        return _getAssetIssueList.apply(this, arguments);
      };
    }() //23、分页查询token列表

  }, {
    key: "getPaginateDassetIssueList",
    value: function () {
      var _getPaginateDassetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee31() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return tronWeb.getPaginateDassetIssueList(1, 10);

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

      return function getPaginateDassetIssueList() {
        return _getPaginateDassetIssueList.apply(this, arguments);
      };
    }() //24、统计所有交易总数

  }, {
    key: "totalTransaction",
    value: function () {
      var _totalTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee32() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return tronWeb.getTransactionCount();

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

      return function totalTransaction() {
        return _totalTransaction.apply(this, arguments);
      };
    }() //25、获取下次统计投票时间

  }, {
    key: "getNextMaintenanceTime",
    value: function () {
      var _getNextMaintenanceTime = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee33() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return tronWeb.getNextMainteNanceTime();

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

      return function getNextMaintenanceTime() {
        return _getNextMaintenanceTime.apply(this, arguments);
      };
    }() //26、检查地址是否正确

  }, {
    key: "validateAddress",
    value: function () {
      var _validateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee34() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return tronWeb.validateAddress('TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5');

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

      return function validateAddress() {
        return _validateAddress.apply(this, arguments);
      };
    }() //27、部署合约

  }, {
    key: "deployContract",
    value: function () {
      var _deployContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee35(event) {
        var myContract, contractInstance;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                event.preventDefault();
                myContract = tronWeb.contract(JSON.parse(this.abi.value)); //部署合约

                _context35.next = 4;
                return myContract.new({
                  from: this.owner_address.value,
                  data: this.byteCode.value,
                  fee_limit: this.fee_limit.value,
                  call_value: this.call_value.value,
                  consume_user_resource_percent: this.consume_user_resource_percent.value
                }, this.pk.value);

              case 4:
                contractInstance = _context35.sent;
                this.setState({
                  data: contractInstance
                });

              case 6:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
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
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee36() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _context36.next = 2;
                return tronWeb.getContract(this.contract_address.value);

              case 2:
                res = _context36.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      return function getContract() {
        return _getContract.apply(this, arguments);
      };
    }() //29、调用合约

  }, {
    key: "triggerContract",
    value: function () {
      var _triggerContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee37() {
        var abi, myContract, contractAddress, contractInstance, _ref2, transaction, result, constant_result, res, myEvent;

        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                abi = [{
                  "constant": false,
                  "inputs": [{
                    "name": "number",
                    "type": "uint256"
                  }],
                  "name": "fibonacciNotify",
                  "outputs": [{
                    "name": "result",
                    "type": "uint256"
                  }],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                }, {
                  "constant": true,
                  "inputs": [{
                    "name": "number",
                    "type": "uint256"
                  }],
                  "name": "fibonacci",
                  "outputs": [{
                    "name": "result",
                    "type": "uint256"
                  }],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                }, {
                  "anonymous": false,
                  "inputs": [{
                    "indexed": false,
                    "name": "input",
                    "type": "uint256"
                  }, {
                    "indexed": false,
                    "name": "result",
                    "type": "uint256"
                  }],
                  "name": "Notify",
                  "type": "event"
                }];
                myContract = tronWeb.contract(abi);
                contractAddress = '41b3169cb739b1612e33188429e3872c0ca10238cd';
                _context37.next = 5;
                return myContract.at(contractAddress);

              case 5:
                contractInstance = _context37.sent;
                _context37.next = 8;
                return contractInstance.fibonacciNotify(7, {
                  fee_limit: 700000000000000,
                  call_value: 0
                });

              case 8:
                _ref2 = _context37.sent;
                transaction = _ref2.transaction;
                result = _ref2.result;
                constant_result = _ref2.constant_result;

                if (constant_result) {
                  _context37.next = 21;
                  break;
                }

                _context37.next = 15;
                return contractInstance.fibonacciNotify.sendTransaction(transaction, this.pk.value);

              case 15:
                res = _context37.sent;
                this.setState({
                  data: res
                }); //监听事件

                _context37.next = 19;
                return contractInstance.Notify();

              case 19:
                myEvent = _context37.sent;
                //默认根据合约地址查询，可以输入{eventName:'',blockNum:'',transactionId:''}
                myEvent.watch(function (err, result) {
                  var eventResult = '';
                  result.forEach(function (item) {
                    if (item.transaction_id == transaction.txID) {
                      eventResult = item.result;
                      myEvent.stopWatching();
                    }
                  });
                  console.log('eventResult:', eventResult);
                }); // console.log(eventResult)

              case 21:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      return function triggerContract() {
        return _triggerContract.apply(this, arguments);
      };
    }() //30、login

  }, {
    key: "login",
    value: function login() {
      var account = tronWeb.login(tronWeb.defaultPk);
      this.setState({
        data: account
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.state.data;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 373
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          marginTop: '200px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 374
        },
        className: "jsx-2187904324" + " " + "box"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 375
        },
        className: "jsx-2187904324"
      }, "\u5DE5\u5177\u51FD\u6570 - Tool function"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 376
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
          lineNumber: 377
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 379
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7\u3001\u8F6C\u8D26 - Account number, transfer"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 380
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
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 381
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
          lineNumber: 382
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 384
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
          lineNumber: 385
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 387
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
          lineNumber: 388
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
          lineNumber: 389
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 390
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
          lineNumber: 391
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
          lineNumber: 393
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
          lineNumber: 395
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 396
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 397
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
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
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
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
          lineNumber: 399
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
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
          lineNumber: 400
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
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
        defaultValue: tronWeb.defaultPk,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
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
          lineNumber: 402
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 405
        },
        className: "jsx-2187904324"
      }, "\u8282\u70B9\u67E5\u8BE2 - Node query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 406
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
          lineNumber: 407
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }, "\u5757\u67E5\u8BE2 - Block query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
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
          lineNumber: 411
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
          lineNumber: 412
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
          lineNumber: 413
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
          lineNumber: 414
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 416
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 420
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613\u67E5\u8BE2 - Transaction inquiry"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 421
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
          lineNumber: 422
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
          lineNumber: 423
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
          lineNumber: 424
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 426
        },
        className: "jsx-2187904324"
      }, "\u8D85\u7EA7\u4EE3\u8868 - Super Representative (SR)"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 427
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
          lineNumber: 428
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
          lineNumber: 429
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
          lineNumber: 430
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
          lineNumber: 431
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
          lineNumber: 432
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
          lineNumber: 433
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 435
        },
        className: "jsx-2187904324"
      }, "token\u7BA1\u7406 - Token management"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 436
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
          lineNumber: 437
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
          lineNumber: 438
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
          lineNumber: 439
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
          lineNumber: 440
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
          lineNumber: 441
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
          lineNumber: 442
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
          lineNumber: 443
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
          lineNumber: 444
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
          lineNumber: 445
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 447
        },
        className: "jsx-2187904324"
      }, "\u667A\u80FD\u5408\u7EA6 - Smart contract"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 449
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.deployContract(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 450
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 451
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 452
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
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 453
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 455
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 456
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
        defaultValue: tronWeb.defaultPk,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 457
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 459
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 460
        },
        className: "jsx-2187904324"
      }, "Abi"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "abi",
        defaultValue: "[ { \"constant\": true, \"inputs\": [], \"name\": \"getUsers\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256[]\" }, { \"name\": \"\", \"type\": \"bytes32[]\" }, { \"name\": \"\", \"type\": \"uint256[]\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"name\": \"users\", \"outputs\": [ { \"name\": \"id\", \"type\": \"uint256\" }, { \"name\": \"name\", \"type\": \"bytes32\" }, { \"name\": \"point\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"last_completed_migration\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"id\", \"type\": \"uint256\" } ], \"name\": \"getName\", \"outputs\": [ { \"name\": \"\", \"type\": \"string\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"owner\", \"outputs\": [ { \"name\": \"\", \"type\": \"address\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"id\", \"type\": \"uint256\" } ], \"name\": \"plusFive\", \"outputs\": [ { \"name\": \"suc\", \"type\": \"bool\" } ], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"userName\", \"type\": \"bytes32\" }, { \"name\": \"userPoint\", \"type\": \"uint256\" } ], \"name\": \"addUser\", \"outputs\": [ { \"name\": \"userID\", \"type\": \"uint256\" }, { \"name\": \"success\", \"type\": \"bool\" } ], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"inputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"constructor\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"key\", \"type\": \"uint256\" }, { \"name\": \"value\", \"type\": \"uint256\" } ], \"name\": \"set\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"key\", \"type\": \"uint256\" } ], \"name\": \"get\", \"outputs\": [ { \"name\": \"value\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"say\", \"outputs\": [ { \"name\": \"\", \"type\": \"string\" } ], \"payable\": false, \"stateMutability\": \"pure\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"name\", \"type\": \"string\" } ], \"name\": \"print\", \"outputs\": [ { \"name\": \"\", \"type\": \"string\" } ], \"payable\": false, \"stateMutability\": \"pure\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"_data\", \"type\": \"bytes\" } ], \"name\": \"useUtil\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"pure\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"getMigration\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"completed\", \"type\": \"uint256\" } ], \"name\": \"setCompleted\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"new_address\", \"type\": \"address\" } ], \"name\": \"upgrade\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" } ]",
        ref: function ref(input) {
          return _this2.abi = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 460
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 742
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 743
        },
        className: "jsx-2187904324"
      }, "byteCode"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "byteCode",
        defaultValue: '0x608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061100c806100616000396000f3006080604052600436106100da576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062ce8e3e146100df5780630900f010146101db57806311114af11461021e5780631ab06ee514610300578063223eb640146103375780632c841f5814610362578063365b98b2146103df578063445df0ac146104365780636b8ff574146104615780638da5cb5b146105075780639507d39a1461055e578063954ab4b21461059f578063a8293c281461062f578063b69ea68414610674578063fdacd576146106ce575b600080fd5b3480156100eb57600080fd5b506100f46106fb565b60405180806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b8381101561013f578082015181840152602081019050610124565b50505050905001848103835286818151815260200191508051906020019060200280838360005b83811015610181578082015181840152602081019050610166565b50505050905001848103825285818151815260200191508051906020019060200280838360005b838110156101c35780820151818401526020810190506101a8565b50505050905001965050505050505060405180910390f35b3480156101e757600080fd5b5061021c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061089b565b005b34801561022a57600080fd5b50610285600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610984565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102c55780820151818401526020810190506102aa565b50505050905090810190601f1680156102f25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561030c57600080fd5b50610335600480360381019080803590602001909291908035906020019092919050505061098e565b005b34801561034357600080fd5b5061034c6109e0565b6040518082815260200191505060405180910390f35b34801561036e57600080fd5b506103c9600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506109ea565b6040518082815260200191505060405180910390f35b3480156103eb57600080fd5b5061040a600480360381019080803590602001909291905050506109fc565b604051808481526020018360001916600019168152602001828152602001935050505060405180910390f35b34801561044257600080fd5b5061044b610a35565b6040518082815260200191505060405180910390f35b34801561046d57600080fd5b5061048c60048036038101908080359060200190929190505050610a3b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104cc5780820151818401526020810190506104b1565b50505050905090810190601f1680156104f95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561051357600080fd5b5061051c610a6d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561056a57600080fd5b5061058960048036038101908080359060200190929190505050610a93565b6040518082815260200191505060405180910390f35b3480156105ab57600080fd5b506105b4610ab0565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105f45780820151818401526020810190506105d9565b50505050905090810190601f1680156106215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561063b57600080fd5b5061065a60048036038101908080359060200190929190505050610aed565b604051808215151515815260200191505060405180910390f35b34801561068057600080fd5b506106ad600480360381019080803560001916906020019092919080359060200190929190505050610b40565b60405180838152602001821515151581526020019250505060405180910390f35b3480156106da57600080fd5b506106f960048036038101908080359060200190929190505050610bea565b005b6060806060600060608060606000610711610fbb565b6000805490509550856040519080825280602002602001820160405280156107485781602001602082028038833980820191505090505b5094508560405190808252806020026020018201604052801561077a5781602001602082028038833980820191505090505b509350856040519080825280602002602001820160405280156107ac5781602001602082028038833980820191505090505b509250600091505b85821015610887576000828154811015156107cb57fe5b9060005260206000209060030201606060405190810160405290816000820154815260200160018201546000191660001916815260200160028201548152505090508060000151858381518110151561082057fe5b90602001906020020181815250508060200151848381518110151561084157fe5b9060200190602002019060001916908160001916815250508060400151838381518110151561086c57fe5b906020019060200201818152505081806001019250506107b4565b848484985098509850505050505050909192565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610980578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766003546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561096757600080fd5b505af115801561097b573d6000803e3d6000fd5b505050505b5050565b6060819050919050565b60405180807f7878730000000000000000000000000000000000000000000000000000000000815250600301905060405180910390a08060046000848152602001908152602001600020819055505050565b6000600354905090565b60006109f582610c4b565b9050919050565b600081815481101515610a0b57fe5b90600052602060002090600302016000915090508060000154908060010154908060020154905083565b60035481565b6060610a66600083815481101515610a4f57fe5b906000526020600020906003020160010154610dbf565b9050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060046000838152602001908152602001600020549050919050565b60606040805190810160405280600e81526020017f68656c6c6f206d73686b2e746f70000000000000000000000000000000000000815250905090565b60006005600083815481101515610b0057fe5b90600052602060002090600302016002015401600083815481101515610b2257fe5b90600052602060002090600302016002018190555060019050919050565b600080610b4b610fbb565b60016000815480929190600101919050559250828160000181815250508481602001906000191690816000191681525050838160400181815250506000819080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000155602082015181600101906000191690556040820151816002015550505082600192509250509250929050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610c4857806003819055505b50565b60008060008060009250600490505b8451811015610db4578481815181101515610c7157fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027f01000000000000000000000000000000000000000000000000000000000000009004915060308210158015610cf25750603a82105b15610d0b576030826004859060020a0201039250610da7565b60618210158015610d1c5750606782105b15610d3857600a6061836004869060020a020103019250610da6565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f6279746573546f55696e74206572726f7200000000000000000000000000000081525060200191505060405180910390fd5b5b8080600101915050610c5a565b829350505050919050565b6060806000806000606060206040519080825280601f01601f191660200182016040528015610dfd5781602001602082028038833980820191505090505b50945060009350600092505b6020831015610ec7578260080260020a876001900402600102915060007f010000000000000000000000000000000000000000000000000000000000000002827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141515610eba57818585815181101515610e8157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535083806001019450505b8280600101935050610e09565b836040519080825280601f01601f191660200182016040528015610efa5781602001602082028038833980820191505090505b509050600092505b83831015610fae578483815181101515610f1857fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028184815181101515610f7157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508280600101935050610f02565b8095505050505050919050565b60606040519081016040528060008152602001600080191681526020016000815250905600a165627a7a7230582019d49e3861189bdfe95b3c9397bf51e7bab8db9883aa7a6204816699af692fc40029',
        ref: function ref(input) {
          return _this2.byteCode = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 743
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 746
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 747
        },
        className: "jsx-2187904324"
      }, "fee_limit\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.fee_limit = input;
        },
        defaultValue: Math.pow(10, 10),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 748
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 750
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 751
        },
        className: "jsx-2187904324"
      }, "call_value\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.call_value = input;
        },
        defaultValue: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 752
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 754
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 755
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
          lineNumber: 756
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 758
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "submit",
        value: "\u90E8\u7F72\u5408\u7EA6 - Deploy contract",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 759
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 762
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 764
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 765
        },
        className: "jsx-2187904324"
      }, "\u67E5\u8BE2\u5408\u7EA6\u5730\u5740 - Query contract address\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.contract_address = input;
        },
        defaultValue: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 766
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u5408\u7EA6 - Query contract",
        onClick: function onClick() {
          return _this2.getContract();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 767
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 769
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8C03\u7528\u5408\u7EA6 - Call contract",
        onClick: function onClick() {
          _this2.triggerContract();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 770
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 772
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u767B\u5F55 - login",
        onClick: function onClick() {
          return _this2.login();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 773
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
          lineNumber: 780
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "100",
        rows: "10",
        value: __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default()(data),
        onChange: function onChange() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 781
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default.a, {
        styleId: "2187904324",
        css: "label.jsx-2187904324{display:inline-block;width:150px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTh3QjRCLEFBSTZDLHFCQUNULFlBQ2YiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Ryb24vV29ya3NwYWNlL3Ryb24vdHJvbi13ZWIvZXhhbXBsZXMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1JlYWN0RE9NfSBmcm9tICdyZWFjdCdcbmltcG9ydCBUcm9uV2ViIGZyb20gJy4uLy4uL3NyYy9pbmRleCdcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnanNvbi1zdHJpbmdpZnktcHJldHR5LWNvbXBhY3QnXG5pbXBvcnQge3V0aWxzfSBmcm9tICdldGhlcnMnXG4vL2xldCB0cm9uV2ViID0gbmV3IFRyb25XZWIoJ2h0dHA6Ly81Mi40NC43NS45OTo4MDkwJyk7XG4vL3Ryb25XZWIuc2V0RXZlbnRTZXJ2ZXIoJ2h0dHA6Ly81Mi40NC43NS45OToxODg4OScpO1xuLy90cm9uV2ViLmRlZmF1bHRBY2NvdW50ID0gJ1RQTDY2VksyZ0NYTkNEN0VKZzlwZ0pSZnFjUmF6amhVWlknO1xuLy90cm9uV2ViLmRlZmF1bHRQaz0nZGExNDYzNzRhNzUzMTBiOTY2NmU4MzRlZTRhZDA4NjZkNmY0MDM1OTY3YmZjNzYyMTdjNWE0OTVmZmY5ZjBkMCc7XG5sZXQgdHJvbldlYiA9IG5ldyBUcm9uV2ViKCdodHRwOi8vdGVzdGFwaS50cm9uZGFwcHMub3JnJyk7XG50cm9uV2ViLnNldEV2ZW50U2VydmVyKCdodHRwOi8vdGVzdGV2ZW50LnRyb25kYXBwcy5vcmcnKTtcbnRyb25XZWIuZGVmYXVsdEFjY291bnQgPSAnVFdzbThIdFUyQTVlRXpvVDhldjh5YW9GakhzWExMcmNrYic7XG50cm9uV2ViLmRlZmF1bHRQaz0nOGVmN2RkMWE4MWQ0ZWYyYjUzOGRhYWUwYzIwZTM3ZjRlZGIzZmQxMzM4YWZmOTFiMDNlMmI4YjFlZDk1NjY0NSc7XG5jbGFzcyBJbmRleCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTp7fVxuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBsZXQgY29kZXIgPSBuZXcgdXRpbHMuQWJpQ29kZXIoKTtcbiAgICAgICAgd2luZG93LnRyb25XZWIgPSB0cm9uV2ViO1xuICAgIH1cbiAgICB0cmlnZ2VyQ2hyb21lV2FsbGV0KCl7XG4gICAgICAgIHRyb25XZWIuc2VuZFRyYW5zYWN0aW9uQnlXYWxsZXQoe3RvOidUWjNTbWtEOHFKSzNWWThBbnFOOVhGaVl1c3BFUDNjd0I1JyxhbW91bnQ6MC4xfSxmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NiaycscmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyB0b0JpZ051bWJlcigpe1xuICAgICAgICBsZXQgc3RyID0gJzIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSc7XG4gICAgICAgIGxldCBiaWdOdW1iZXIgPSB0cm9uV2ViLnRvQmlnTnVtYmVyKHN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpZ051bWJlci50b051bWJlcigpLCcyLjAwMDAwMDAwMDAwMDAwMDJlKzIzJylcbiAgICAgICAgbGV0IHZhbHVlID0gYmlnTnVtYmVyLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnZhbHVlXG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgYXN5bmMgZ2V0QmFsYW5jZSgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJhbGFuY2UodGhpcy5hY2NvdW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICBhc3luYyBnZXRCbG9jaygpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrKHRoaXMuaWRPckhlaWdodC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9IFxuICAgIGFzeW5jIGdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCh0aGlzLmlkT3JIZWlnaHQudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfSBcbiAgICBhc3luYyBnZXRUcmFuc2FjdGlvbigpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldFRyYW5zYWN0aW9uKHRoaXMudHJhbnNhY3Rpb25JZC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy/nlJ/miJDnp4HpkqXlkozlnLDlnYDlubblrZjlgqjliLBsb2NhbFN0b3JhZ2XkuK1cbiAgICAvL+ivpWFwaeacieazhOa8j3ByaXZhdGUga2V555qE6aOO6Zmp77yM6K+356Gu5L+d5Zyo5a6J5YWo55qE546v5aKD5Lit6LCD55So6K+lYXBpXG4gICAgYXN5bmMgZ2VuZXJhdGVBZGRyZXNzKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2VuZXJhdGVBZGRyZXNzT25MaW5lKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgYXN5bmMgZ2VuZXJhdGVBZGRyZXNzT25DbGllbnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZW5lcmF0ZUFkZHJlc3NPbkNsaWVudCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8v6YCa6L+H5a+G56CB5Yib5bu65Zyw5Z2AXG4gICAgYXN5bmMgY3JlYXRlQWRkcmVzc1dpdGhQYXNzV29yZCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmNyZWF0ZUFkZHJlc3MoJzEyMzQ1NicpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpOy8ve2Jhc2U1OGNoZWNrQWRkcmVzczogXCJUTWlwMk5uUktoeTJXeWYxRmpLRzFEMXluM0YxTExHQ0RWXCIsdmFsdWU6XCJcIjQxODBlODgxNjY1MTc5MGQ0ZDZjMTg3ZWVmMDlmOTBiN2ExOTQwOGJiOFwiXG4gICAgfVxuICAgIC8v6L2s6LSmXG4gICAgYXN5bmMgc2VuZFRyYW5zYWN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLmZyb20udmFsdWU7XG4gICAgICAgIGNvbnN0IHRvID0gdGhpcy50by52YWx1ZTtcbiAgICAgICAgY29uc3QgYW1vdW50ID1wYXJzZUludCh0aGlzLmFtb3VudC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHBrID0gdGhpcy5wa0ZvclRyYW5zYWN0aW9uLnZhbHVlO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLnNlbmRUcmFuc2FjdGlvbihmcm9tLHRvLGFtb3VudCxwayk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzHjgIHmm7TmlrDotKbmiLflkI3np7BcbiAgICBhc3luYyB1cGRhdGVBY2NvdW50KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudXBkYXRlQWNjb3VudCgnd3VqaWFvbG9uZzEwMDknLCdUVDY3clBOd2dtcGVpbXZIVU1WekZmS3NqTDlHWjF3R3c4Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8y44CBVm90ZSBmb3IgdGhlIHN1cGVycmVwcmVzZW50YXRpdmVcbiAgICBhc3luYyB2b3RlV2l0bmVzc0FjY291bnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi52b3RlV2l0bmVzc0FjY291bnQoJ1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFt7XG4gICAgICAgICAgICB2b3RlX2FkZHJlc3M6J1RReHlRdTVkNzZNYXhzRUY0bkJmOXRGYThzOTNuU0hlOE0nLFxuICAgICAgICAgICAgdm90ZV9jb3VudDoxXG4gICAgICAgIH1dKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzPjgIHlj5HooYx0b2tlblxuICAgIGFzeW5jIGNyZWF0ZUFzc2V0SXNzdWUoKXtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBvd25lcl9hZGRyZXNzOidUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5JyxcbiAgICAgICAgICAgIG5hbWU6J1Rlc3RUUlgnLC8v5ZCN56ewXG4gICAgICAgICAgICBhYmJyOidUVFJYJywvL+eugOensFxuICAgICAgICAgICAgdG90YWxfc3VwcGx5IDoxMDAsLy/lj5HooYzmgLvph49cbiAgICAgICAgICAgIHRyeF9udW06MSwvLyDlkowgbnVtIOeahOWFkeaNouavlOS+i1xuICAgICAgICAgICAgbnVtOjEsXG4gICAgICAgICAgICBzdGFydF90aW1lIDogMTUzMDg5NDMxNTE1OCwvL+W8gOWni+aXtumXtFxuICAgICAgICAgICAgZW5kX3RpbWU6MTUzMzg5NDMxMjE1OCwvL+e7k+adn+aXtumXtFxuICAgICAgICAgICAgZGVzY3JpcHRpb246J+i/meaYr+S4gOS4qua1i+ivlXRva2VuJywvL+aPj+i/sFxuICAgICAgICAgICAgdXJsOidodHRwOi8vd3d3LmJhaWR1LmNvbScsLy/lrpjnvZHlnLDlnYBcbiAgICAgICAgICAgIGZyZWVfYXNzZXRfbmV0X2xpbWl0OjEwMDAwLC8v5YWN6LS55bim5a69XG4gICAgICAgICAgICBwdWJsaWNfZnJlZV9hc3NldF9uZXRfbGltaXQ6MTAwMDAsLy8g5q+P5LiqdG9rZW7nlKjmiLfog73kvb/nlKjmnKx0b2tlbueahOWFjei0ueW4puWuvVxuICAgICAgICAgICAgZnJvemVuX3N1cHBseTp7XG4gICAgICAgICAgICAgICAgZnJvemVuX2Ftb3VudDoxLC8v5Y+R6KGM6ICF5Zyo5Y+R6KGM55qE5pe25YCZ5oyH5a6a5Ya757uT55qEdG9rZW5cbiAgICAgICAgICAgICAgICBmcm96ZW5fZGF5czoyIC8v5Ya757uT55qE5aSp5pWwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5jcmVhdGVUb2tlbihvcHRpb25zKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vNeOAgSBBcHBseSB0byBiZSBhIHN1cGVycmVwcmVzZW50YXRpdmVcbiAgICBhc3luYyBjcmVhdGVXaXRuZXNzKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuY3JlYXRlV2l0bmVzcygnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScsJ2h0dHA6Ly93d3cueHh4LmNvbScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vNuOAgSBUcmFuc2ZlciB0b2tlblxuICAgIGFzeW5jIHRyYW5zZmVyQXNzZXQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi50cmFuc2ZlckFzc2V0KHtcbiAgICAgICAgICAgIG93bmVyX2FkZHJlc3M6J1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFxuICAgICAgICAgICAgdG9fYWRkcmVzczonVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcsXG4gICAgICAgICAgICBhc3NldF9uYW1lOidaWlonLFxuICAgICAgICAgICAgYW1vdW50OjFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8344CBIFBhcnRpY2lwYXRpb24gaW4gdG9rZW4gZGlzdHJpYnV0aW9uXG4gICAgYXN5bmMgcGFydGljaXBhdGVBc3NldElzc3VlKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudHJhbnNmZXJBc3NldCh7XG4gICAgICAgICAgICBvd25lcl9hZGRyZXNzOidUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5JyxcbiAgICAgICAgICAgIHRvX2FkZHJlc3M6J1RSenpNYkZETmRGblJnR3FLQ2txb0N1TG9IZnlSWmZ1VkwnLFxuICAgICAgICAgICAgYXNzZXRfbmFtZTonWlpaJyxcbiAgICAgICAgICAgIGFtb3VudDoxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vOOOAgSDop6Plhrvlt7Lnu4/mioDmnK/lhrvnu5PmnJ/nmoQgVFJYXG4gICAgYXN5bmMgdW5mcmVlemVCYWxhbmNlKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLnVuZnJlZXplQmFsYW5jZSgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vOeOAgeino+WGu+W3sue7j+e7k+adn+WGu+e7k+acn+eahCB0b2tlblxuICAgIGFzeW5jIHVuZnJlZXplQXNzZXQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudW5mcmVlemVBc3NldCgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTDjgIHotoXnuqfku6Pooajmj5DnjrDlpZblirHliLBiYWxhbmNlLOavjzI05bCP5pe25Y+v5o+Q546w5LiA5qyhXG4gICAgYXN5bmMgd2l0aGRyYXdCYWxhbmNlKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLndpdGhkcmF3QmFsYW5jZSgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTHjgIHkv67mlLl0b2tlbuS/oeaBr1xuICAgIGFzeW5jIHVwZGF0ZUFzc2V0KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudXBkYXRlQXNzZXQoe1xuICAgICAgICAgICAgb3duZXJfYWRkcmVzczpcIlRCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjlcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGVzdCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vd3d3LmJhaWR1LmNvbScsXG4gICAgICAgICAgICBuZXdfbGltaXQgOiAxMDAwMDAwLFxuICAgICAgICAgICAgbmV3X3B1YmxpY19saW1pdCA6IDEwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzEy44CB5p+l6K+iYXBp5omA5Zyo5py65Zmo6L+e5o6l55qE6IqC54K5XG4gICAgYXN5bmMgbGlzdE5vZGVzKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmxpc3ROb2RlcygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTPjgIHmn6Xor6LotKbmiLflj5HooYznmoR0b2tlblxuICAgIGFzeW5jIGdldEFzc2V0SXNzdWVCeUFjY291bnQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUJ5QWNjb3VudCgnVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTTjgIHmoLnmja7lkI3np7Dmn6Xor6J0b2tlblxuICAgIGFzeW5jIGdldEFzc2V0SXNzdWVCeU5hbWUoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUJ5TmFtZSgnWlpaJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNeOAgeafpeivouacgOaWsOWdl1xuICAgIGFzeW5jIGJsb2NrTnVtYmVyKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmJsb2NrTnVtYmVyKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNuOAgemAmui/h+mrmOW6puafpeivouWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlOdW0oKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QmxvY2tCeU51bSg4NjkwMTUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTfjgIHpgJrov4dpZOafpeivouWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlJZCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5SWQoJzAwMDAwMDAwMDAwZDQyOTc1OTE3NWE0M2NiM2UxMTJkMDc2MWVjYWJmMDZlZjBjMjUzYWZmZTE0MjA5Nzc2NTEnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzE444CB5oyJ54Wn6IyD5Zu05p+l6K+i5Z2XXG4gICAgYXN5bmMgZ2V0QmxvY2tCeUxpbWl0TmV4dCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5TGltaXROZXh0KDg2OTAxMCw4NjkwMTUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTnjgIHvu7/mn6Xor6LmnIDmlrDnmoTlh6DkuKrlnZdcbiAgICBhc3luYyBnZXRCbG9ja0J5TGF0ZXN0TnVtKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrQnlMYXRlc3ROdW0oNSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLzIw44CB6YCa6L+HSUTmn6Xor6LkuqTmmJNcbiAgICBhc3luYyBnZXRUcmFuc2FjdGlvbkJ5SWQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0VHJhbnNhY3Rpb25CeUlkKCcwNjg5MzUyYWZmODRhMGZmMzY5MTUwMmJjYTk0YjFkZWQ0MGFiYjRhYTg4MDZiMzEzYWNiNTlhMzRjZjEwYzIyJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIx44CB5p+l6K+i5omA5pyJ6LaF57qn5Luj6KGo5YiX6KGoXG4gICAgYXN5bmMgbGlzdFdpdE5lc3Nlcygpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5saXN0V2l0TmVzc2VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yMuOAgeafpeivouaJgOaciXRva2Vu5YiX6KGoXG4gICAgYXN5bmMgZ2V0QXNzZXRJc3N1ZUxpc3QoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUxpc3QoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIz44CB5YiG6aG15p+l6K+idG9rZW7liJfooahcbiAgICBhc3luYyBnZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgxLDEwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzI044CB57uf6K6h5omA5pyJ5Lqk5piT5oC75pWwXG4gICAgYXN5bmMgdG90YWxUcmFuc2FjdGlvbigpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRUcmFuc2FjdGlvbkNvdW50KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yNeOAgeiOt+WPluS4i+asoee7n+iuoeaKleelqOaXtumXtFxuICAgIGFzeW5jIGdldE5leHRNYWludGVuYW5jZVRpbWUoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0TmV4dE1haW50ZU5hbmNlVGltZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjbjgIHmo4Dmn6XlnLDlnYDmmK/lkKbmraPnoa5cbiAgICBhc3luYyB2YWxpZGF0ZUFkZHJlc3MoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudmFsaWRhdGVBZGRyZXNzKCdUWjNTbWtEOHFKSzNWWThBbnFOOVhGaVl1c3BFUDNjd0I1Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yN+OAgemDqOe9suWQiOe6plxuICAgIGFzeW5jIGRlcGxveUNvbnRyYWN0KGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG15Q29udHJhY3QgPSB0cm9uV2ViLmNvbnRyYWN0KEpTT04ucGFyc2UodGhpcy5hYmkudmFsdWUpKTtcbiAgICAgICAgLy/pg6jnvbLlkIjnuqZcbiAgICAgICAgbGV0IGNvbnRyYWN0SW5zdGFuY2UgPSBhd2FpdCBteUNvbnRyYWN0Lm5ldyh7XG4gICAgICAgICAgICBmcm9tOnRoaXMub3duZXJfYWRkcmVzcy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6dGhpcy5ieXRlQ29kZS52YWx1ZSxcbiAgICAgICAgICAgIGZlZV9saW1pdDp0aGlzLmZlZV9saW1pdC52YWx1ZSxcbiAgICAgICAgICAgIGNhbGxfdmFsdWU6dGhpcy5jYWxsX3ZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgY29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnQ6dGhpcy5jb25zdW1lX3VzZXJfcmVzb3VyY2VfcGVyY2VudC52YWx1ZVxuICAgICAgICB9LHRoaXMucGsudmFsdWUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpjb250cmFjdEluc3RhbmNlXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjjjgIHmn6Xor6LlkIjnuqZcbiAgICBhc3luYyBnZXRDb250cmFjdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRDb250cmFjdCh0aGlzLmNvbnRyYWN0X2FkZHJlc3MudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjnjgIHosIPnlKjlkIjnuqZcbiAgICBhc3luYyB0cmlnZ2VyQ29udHJhY3QoKXtcbiAgICAgICAgbGV0IGFiaSA9IFt7XCJjb25zdGFudFwiOmZhbHNlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjpcIm51bWJlclwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJmaWJvbmFjY2lOb3RpZnlcIixcIm91dHB1dHNcIjpbe1wibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcInBheWFibGVcIjpmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOlwibm9ucGF5YWJsZVwiLFwidHlwZVwiOlwiZnVuY3Rpb25cIn0se1wiY29uc3RhbnRcIjp0cnVlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjpcIm51bWJlclwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJmaWJvbmFjY2lcIixcIm91dHB1dHNcIjpbe1wibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcInBheWFibGVcIjpmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOlwidmlld1wiLFwidHlwZVwiOlwiZnVuY3Rpb25cIn0se1wiYW5vbnltb3VzXCI6ZmFsc2UsXCJpbnB1dHNcIjpbe1wiaW5kZXhlZFwiOmZhbHNlLFwibmFtZVwiOlwiaW5wdXRcIixcInR5cGVcIjpcInVpbnQyNTZcIn0se1wiaW5kZXhlZFwiOmZhbHNlLFwibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcIm5hbWVcIjpcIk5vdGlmeVwiLFwidHlwZVwiOlwiZXZlbnRcIn1dO1xuICAgICAgICBsZXQgbXlDb250cmFjdCA9IHRyb25XZWIuY29udHJhY3QoYWJpKTtcbiAgICAgICAgbGV0IGNvbnRyYWN0QWRkcmVzcyA9ICc0MWIzMTY5Y2I3MzliMTYxMmUzMzE4ODQyOWUzODcyYzBjYTEwMjM4Y2QnXG4gICAgICAgIGxldCBjb250cmFjdEluc3RhbmNlID0gYXdhaXQgbXlDb250cmFjdC5hdChjb250cmFjdEFkZHJlc3MpO1xuXG4gICAgICAgIGxldCB7IHRyYW5zYWN0aW9uLHJlc3VsdCxjb25zdGFudF9yZXN1bHQgfSA9IGF3YWl0IGNvbnRyYWN0SW5zdGFuY2UuZmlib25hY2NpTm90aWZ5KDcse1xuICAgICAgICAgICAgZmVlX2xpbWl0OjcwMDAwMDAwMDAwMDAwMCxcbiAgICAgICAgICAgIGNhbGxfdmFsdWU6MFxuICAgICAgICB9KVxuICAgICAgICBpZighY29uc3RhbnRfcmVzdWx0KXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCBjb250cmFjdEluc3RhbmNlLmZpYm9uYWNjaU5vdGlmeS5zZW5kVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24sdGhpcy5way52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8v55uR5ZCs5LqL5Lu2XG4gICAgICAgICAgICBsZXQgbXlFdmVudCA9IGF3YWl0IGNvbnRyYWN0SW5zdGFuY2UuTm90aWZ5KCk7Ly/pu5jorqTmoLnmja7lkIjnuqblnLDlnYDmn6Xor6LvvIzlj6/ku6XovpPlhaV7ZXZlbnROYW1lOicnLGJsb2NrTnVtOicnLHRyYW5zYWN0aW9uSWQ6Jyd9XG4gICAgICAgICAgICAgbXlFdmVudC53YXRjaChmdW5jdGlvbihlcnIscmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgbGV0IGV2ZW50UmVzdWx0ID0gJyc7XG4gICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS50cmFuc2FjdGlvbl9pZCA9PXRyYW5zYWN0aW9uLnR4SUQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50UmVzdWx0ID0gaXRlbS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbXlFdmVudC5zdG9wV2F0Y2hpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50UmVzdWx0OicsZXZlbnRSZXN1bHQpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudFJlc3VsdClcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLzMw44CBbG9naW5cbiAgICBsb2dpbigpe1xuICAgICAgICBsZXQgYWNjb3VudCA9IHRyb25XZWIubG9naW4odHJvbldlYi5kZWZhdWx0UGspO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6YWNjb3VudFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCIgc3R5bGU9e3ttYXJnaW5Ub3A6JzIwMHB4J319PlxuICAgICAgICAgICAgICAgICAgICA8aDM+5bel5YW35Ye95pWwIC0gVG9vbCBmdW5jdGlvbjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwidG8gQmlnTnVtYmVyXCIgb25DbGljaz17KCk9PnRoaXMudG9CaWdOdW1iZXIoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPui0puWPt+OAgei9rOi0piAtIEFjY291bnQgbnVtYmVyLCB0cmFuc2ZlcjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDotKblj7cgLSBhY2NvdW50IG51bWJlcu+8mjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5hY2NvdW50ID1pbnB1dH0gZGVmYXVsdFZhbHVlPXt0cm9uV2ViLmRlZmF1bHRBY2NvdW50fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEJhbGFuY2UoKX0gdmFsdWU9XCLmn6Xor6LotKbmiLfkvZnpop0gLSBDaGVjayBhY2NvdW50IGJhbGFuY2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJ0cmlnZ2VyV2FsbGV0XCIgb25DbGljaz17KCk9PnRoaXMudHJpZ2dlckNocm9tZVdhbGxldCgpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIueUn+aIkOengemSpeWcsOWdgCAtIEdlbmVyYXRlIHByaXZhdGUga2V5IGFkZHJlc3Mob25MaW5lKVwiIG9uQ2xpY2s9eygpPT50aGlzLmdlbmVyYXRlQWRkcmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55Sf5oiQ56eB6ZKl5Zyw5Z2AIC0gR2VuZXJhdGUgcHJpdmF0ZSBrZXkgYWRkcmVzcyhvbkNsaWVudClcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZW5lcmF0ZUFkZHJlc3NPbkNsaWVudCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpqozor4HlnLDlnYAgLSBWZXJpZnkgYWRkcmVzc1wiIG9uQ2xpY2s9eygpPT50aGlzLnZhbGlkYXRlQWRkcmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4flr4bnoIHliJvlu7rlnLDlnYAgLSBDcmVhdGUgYW4gYWRkcmVzcyB3aXRoIGEgcGFzc3dvcmRcIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVBZGRyZXNzV2l0aFBhc3NXb3JkKCl9Lz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuabtOaWsOi0puWPt+WQjeensCAtIFVwZGF0ZSBhY2NvdW50IG5hbWVcIiBvbkNsaWNrPXsoKT0+dGhpcy51cGRhdGVBY2NvdW50KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+ZnJvbTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLmZyb20gPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFjY291bnR9Lz4gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxsYWJlbD50bzwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnRvID1pbnB1dH0gZGVmYXVsdFZhbHVlPXtgVEdoZXB5THV5TUw1bjVqUUJUeWtLcWg5b2Q4aFFyQkRrU2B9Lz4gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5hbW91bnQ8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj17KGlucHV0KT0+dGhpcy5hbW91bnQgPWlucHV0fSAgZGVmYXVsdFZhbHVlPXsxMDAwMDAwfSAvPiA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGxhYmVsPnBrPC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAgc3R5bGU9e3t3aWR0aDonNTAwcHgnfX1yZWY9eyhpbnB1dCk9PnRoaXMucGtGb3JUcmFuc2FjdGlvbiA9aW5wdXR9IGRlZmF1bHRWYWx1ZT17dHJvbldlYi5kZWZhdWx0UGt9IC8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhlKT0+dGhpcy5zZW5kVHJhbnNhY3Rpb24oZSl9IHZhbHVlPVwi6L2s6LSmIC0gVHJhbnNmZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuiKgueCueafpeivoiAtIE5vZGUgcXVlcnk8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivokFQSeaJgOWcqOacuuWZqOi/nuaOpeeahOiKgueCuSAtIFF1ZXJ5IHRoZSBub2RlIHRvIHdoaWNoIHRoZSBtYWNoaW5lIHdoZXJlIHRoZSBBUEkgaXMgY29ubmVjdGVkXCIgb25DbGljaz17KCk9PnRoaXMubGlzdE5vZGVzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7lnZfmn6Xor6IgLSBCbG9jayBxdWVyeTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDlnZdpZOaIlumrmOW6piAtIEJsb2NrIGlkIG9yIGhlaWdodO+8mjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzYwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5pZE9ySGVpZ2h0ID1pbnB1dH0gZGVmYXVsdFZhbHVlPScwMDAwMDAwMDAwMDAwNWFlMDdmNDI3NzZiM2JmZDhlODczZmVhZWJmMmQ3NDNhY2ViNzE2ZGI1ZjcwY2IzNzNiJyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCbG9jaygpfSB2YWx1ZT1cIuafpeivouWMuuWdlyAtIFF1ZXJ5IGJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50KCl9IHZhbHVlPVwi5p+l6K+i5Yy65Z2X5YaF5Lqk5piT5pWw6YePIC0gUXVlcnkgdGhlIG51bWJlciBvZiB0cmFuc2FjdGlvbnMgaW4gdGhlIGJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmnIDmlrDlnZcgLSBRdWVyeSB0aGUgbGF0ZXN0IGJsb2NrXCIgb25DbGljaz17KCk9PnRoaXMuYmxvY2tOdW1iZXIoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4fpq5jluqbojIPlm7Tmn6Xor6LlnZcgLSBRdWVyeSBibG9jayBieSBoZWlnaHQgcmFuZ2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCbG9ja0J5TGltaXROZXh0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmnIDov5HnmoTlh6DkuKrlnZcgLSBRdWVyeSB0aGUgbW9zdCByZWNlbnQgYmxvY2tzXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tCeUxhdGVzdE51bSgpfS8+Ki99XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDM+5Lqk5piT5p+l6K+iIC0gVHJhbnNhY3Rpb24gaW5xdWlyeTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDkuqTmmJNpZCAtIFRyYW5zYWN0aW9uIGlk77yaPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonNjAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnRyYW5zYWN0aW9uSWQgPWlucHV0fSBkZWZhdWx0VmFsdWU9J2M1MjNlZGQ3YjRiNzc2YWE0NGU0Y2Q0YmJkZjkyNWNiNGViNmQwNDdlMjczMTZlMWZmOTE5MDE0Y2M2YTlmNTQnLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4dpZOafpeivouS6pOaYk+iusOW9lSAtIFF1ZXJ5IHRyYW5zYWN0aW9uIHJlY29yZHMgYnkgaWRcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRUcmFuc2FjdGlvbigpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi57uf6K6h5omA5pyJ55qE5Lqk5piT5oC75pWwIC0gQ291bnQgYWxsIHRyYW5zYWN0aW9uc1wiIG9uQ2xpY2s9eygpPT50aGlzLnRvdGFsVHJhbnNhY3Rpb24oKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPui2hee6p+S7o+ihqCAtIFN1cGVyIFJlcHJlc2VudGF0aXZlIChTUik8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivouaJgOaciei2hee6p+S7o+ihqCAtIFF1ZXJ5IGFsbCBTUlwiIG9uQ2xpY2s9eygpPT50aGlzLmxpc3RXaXROZXNzZXMoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuiOt+WPluS4i+asoee7n+iuoeaKleelqOaXtumXtCAtIEdldCB0aGUgbmV4dCBtYWludGVuYW5jZSB0aW1lXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0TmV4dE1haW50ZW5hbmNlVGltZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55Sz6K+35oiQ5Li66LaF57qn5Luj6KGoIC0gQXBwbHkgdG8gYmVjb21lIGEgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVXaXRuZXNzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLkuLrotoXnuqfku6PooajmipXnpaggLSBWb3RlIGZvciB0aGUgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy52b3RlV2l0bmVzc0FjY291bnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuino+WGu+e7k+adn+WGu+e7k+acn+eahHRyeCAtIFVuZnJlZXplIHRoZSB0cnggYXQgdGhlIGVuZCBvZiB0aGUgZnJlZXplIHBlcmlvZFwiIG9uQ2xpY2s9eygpPT50aGlzLnVuZnJlZXplQmFsYW5jZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6LaF57qn5Luj6KGo5o+Q546w5aWW5Yqx5YiwYmFsYW5jZSAtIFNSIHdpdGhkcmF3cyB0aGUgcmV3YXJkIHRvIGJhbGFuY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy53aXRoZHJhd0JhbGFuY2UoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPnRva2Vu566h55CGIC0gVG9rZW4gbWFuYWdlbWVudDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5omA5pyJdG9rZW7liJfooaggLSBRdWVyeSBhbGwgdG9rZW4gbGlzdHNcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRBc3NldElzc3VlTGlzdCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5YiG6aG15p+l6K+idG9rZW7liJfooaggLSBQYWdpbmcgcXVlcnkgdG9rZW4gbGlzdFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldFBhZ2luYXRlRGFzc2V0SXNzdWVMaXN0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6Lmn5DotKbmiLflj5HooYznmoR0b2tlbiAtIFF1ZXJ5IHRoZSB0b2tlbiBpc3N1ZWQgYnkgYW4gYWNjb3VudFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEFzc2V0SXNzdWVCeUFjY291bnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuagueaNruWQjeensOafpeivonRva2VuIC0gUXVlcnkgdG9rZW4gYnkgbmFtZVwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEFzc2V0SXNzdWVCeU5hbWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPkeihjHRva2VuIC0gSXNzdWUgdG9rZW5cIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVBc3NldElzc3VlKCl9IHN0eWxlPXt7Y29sb3I6J3JlZCd9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6L2s6LSmdG9rZW4gLSBUcmFuc2ZlciB0b2tlblwiIG9uQ2xpY2s9eygpPT50aGlzLnRyYW5zZmVyQXNzZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuS/ruaUuXRva2VuIC0gTW9kaWZ5IHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMudXBkYXRlQXNzZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuino+WGu3Rva2VuIC0gVW5mcmVlemUgdGhlIHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMudW5mcmVlemVBc3NldCgpfSBzdHlsZT17e2NvbG9yOidyZWQnfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPguS4jnRva2Vu5Y+R6KGMIC0gUGFydGljaXBhdGUgaW4gdG9rZW4gaXNzdWFuY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5wYXJ0aWNpcGF0ZUFzc2V0SXNzdWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuaZuuiDveWQiOe6piAtIFNtYXJ0IGNvbnRyYWN0PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17KGUpPT50aGlzLmRlcGxveUNvbnRyYWN0KGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPm93bmVyX2FkZHJlc3PvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5vd25lcl9hZGRyZXNzPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFjY291bnR9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+cGs6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOic1MDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMucGsgPSBpbnB1dH0gZGVmYXVsdFZhbHVlPXt0cm9uV2ViLmRlZmF1bHRQa30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5BYmk8L2xhYmVsPjx0ZXh0YXJlYSBjb2xzPVwiNTBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj1cImFiaVwiIGRlZmF1bHRWYWx1ZT0nW1xuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtdLFxuICAgICAgXCJuYW1lXCI6IFwiZ2V0VXNlcnNcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2W11cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMltdXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZbXVwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwidXNlcnNcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJpZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwibmFtZVwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwicG9pbnRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwidmlld1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICBcIm5hbWVcIjogXCJsYXN0X2NvbXBsZXRlZF9taWdyYXRpb25cIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwidmlld1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiaWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwibmFtZVwiOiBcImdldE5hbWVcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJ2aWV3XCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgIFwibmFtZVwiOiBcIm93bmVyXCIsXG4gICAgICBcIm91dHB1dHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJpZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwicGx1c0ZpdmVcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJzdWNcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJib29sXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcInVzZXJOYW1lXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJ1c2VyUG9pbnRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwibmFtZVwiOiBcImFkZFVzZXJcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJ1c2VySURcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJib29sXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcbiAgICAgIFwidHlwZVwiOiBcImNvbnN0cnVjdG9yXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJrZXlcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcInZhbHVlXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwidWludDI1NlwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcIm5hbWVcIjogXCJzZXRcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwia2V5XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwidWludDI1NlwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcIm5hbWVcIjogXCJnZXRcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJ2YWx1ZVwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJ2aWV3XCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgIFwibmFtZVwiOiBcInNheVwiLFxuICAgICAgXCJvdXRwdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInB1cmVcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIm5hbWVcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwicHJpbnRcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwdXJlXCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJfZGF0YVwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwibmFtZVwiOiBcInVzZVV0aWxcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicHVyZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICBcIm5hbWVcIjogXCJnZXRNaWdyYXRpb25cIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwidmlld1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcImNvbXBsZXRlZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwic2V0Q29tcGxldGVkXCIsXG4gICAgICBcIm91dHB1dHNcIjogW10sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJuZXdfYWRkcmVzc1wiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImFkZHJlc3NcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwidXBncmFkZVwiLFxuICAgICAgXCJvdXRwdXRzXCI6IFtdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJub25wYXlhYmxlXCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfVxuICBdJyByZWY9eyhpbnB1dCk9PnRoaXMuYWJpID0gaW5wdXR9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPmJ5dGVDb2RlPC9sYWJlbD48dGV4dGFyZWEgIGNvbHM9XCI1MFwiIHJvd3M9XCIxMFwiIHBsYWNlaG9sZGVyPSdieXRlQ29kZScgZGVmYXVsdFZhbHVlPXsnMHg2MDgwNjA0MDUyMzQ4MDE1NjEwMDEwNTc2MDAwODBmZDViNTAzMzYwMDI2MDAwNjEwMTAwMGE4MTU0ODE3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYwMjE5MTY5MDgzNzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTYwMjE3OTA1NTUwNjExMDBjODA2MTAwNjE2MDAwMzk2MDAwZjMwMDYwODA2MDQwNTI2MDA0MzYxMDYxMDBkYTU3NjAwMDM1N2MwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOTAwNDYzZmZmZmZmZmYxNjgwNjJjZThlM2UxNDYxMDBkZjU3ODA2MzA5MDBmMDEwMTQ2MTAxZGI1NzgwNjMxMTExNGFmMTE0NjEwMjFlNTc4MDYzMWFiMDZlZTUxNDYxMDMwMDU3ODA2MzIyM2ViNjQwMTQ2MTAzMzc1NzgwNjMyYzg0MWY1ODE0NjEwMzYyNTc4MDYzMzY1Yjk4YjIxNDYxMDNkZjU3ODA2MzQ0NWRmMGFjMTQ2MTA0MzY1NzgwNjM2YjhmZjU3NDE0NjEwNDYxNTc4MDYzOGRhNWNiNWIxNDYxMDUwNzU3ODA2Mzk1MDdkMzlhMTQ2MTA1NWU1NzgwNjM5NTRhYjRiMjE0NjEwNTlmNTc4MDYzYTgyOTNjMjgxNDYxMDYyZjU3ODA2M2I2OWVhNjg0MTQ2MTA2NzQ1NzgwNjNmZGFjZDU3NjE0NjEwNmNlNTc1YjYwMDA4MGZkNWIzNDgwMTU2MTAwZWI1NzYwMDA4MGZkNWI1MDYxMDBmNDYxMDZmYjU2NWI2MDQwNTE4MDgwNjAyMDAxODA2MDIwMDE4MDYwMjAwMTg0ODEwMzg0NTI4NzgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA2MDIwMDI4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDEzZjU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDEyNDU2NWI1MDUwNTA1MDkwNTAwMTg0ODEwMzgzNTI4NjgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA2MDIwMDI4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDE4MTU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDE2NjU2NWI1MDUwNTA1MDkwNTAwMTg0ODEwMzgyNTI4NTgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA2MDIwMDI4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDFjMzU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDFhODU2NWI1MDUwNTA1MDkwNTAwMTk2NTA1MDUwNTA1MDUwNTA2MDQwNTE4MDkxMDM5MGYzNWIzNDgwMTU2MTAxZTc1NzYwMDA4MGZkNWI1MDYxMDIxYzYwMDQ4MDM2MDM4MTAxOTA4MDgwMzU3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTA4OWI1NjViMDA1YjM0ODAxNTYxMDIyYTU3NjAwMDgwZmQ1YjUwNjEwMjg1NjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA4MjAxODAzNTkwNjAyMDAxOTA4MDgwNjAxZjAxNjAyMDgwOTEwNDAyNjAyMDAxNjA0MDUxOTA4MTAxNjA0MDUyODA5MzkyOTE5MDgxODE1MjYwMjAwMTgzODM4MDgyODQzNzgyMDE5MTUwNTA1MDUwNTA1MDkxOTI5MTkyOTA1MDUwNTA2MTA5ODQ1NjViNjA0MDUxODA4MDYwMjAwMTgyODEwMzgyNTI4MzgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDJjNTU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDJhYTU2NWI1MDUwNTA1MDkwNTA5MDgxMDE5MDYwMWYxNjgwMTU2MTAyZjI1NzgwODIwMzgwNTE2MDAxODM2MDIwMDM2MTAxMDAwYTAzMTkxNjgxNTI2MDIwMDE5MTUwNWI1MDkyNTA1MDUwNjA0MDUxODA5MTAzOTBmMzViMzQ4MDE1NjEwMzBjNTc2MDAwODBmZDViNTA2MTAzMzU2MDA0ODAzNjAzODEwMTkwODA4MDM1OTA2MDIwMDE5MDkyOTE5MDgwMzU5MDYwMjAwMTkwOTI5MTkwNTA1MDUwNjEwOThlNTY1YjAwNWIzNDgwMTU2MTAzNDM1NzYwMDA4MGZkNWI1MDYxMDM0YzYxMDllMDU2NWI2MDQwNTE4MDgyODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDM2ZTU3NjAwMDgwZmQ1YjUwNjEwM2M5NjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA4MjAxODAzNTkwNjAyMDAxOTA4MDgwNjAxZjAxNjAyMDgwOTEwNDAyNjAyMDAxNjA0MDUxOTA4MTAxNjA0MDUyODA5MzkyOTE5MDgxODE1MjYwMjAwMTgzODM4MDgyODQzNzgyMDE5MTUwNTA1MDUwNTA1MDkxOTI5MTkyOTA1MDUwNTA2MTA5ZWE1NjViNjA0MDUxODA4MjgxNTI2MDIwMDE5MTUwNTA2MDQwNTE4MDkxMDM5MGYzNWIzNDgwMTU2MTAzZWI1NzYwMDA4MGZkNWI1MDYxMDQwYTYwMDQ4MDM2MDM4MTAxOTA4MDgwMzU5MDYwMjAwMTkwOTI5MTkwNTA1MDUwNjEwOWZjNTY1YjYwNDA1MTgwODQ4MTUyNjAyMDAxODM2MDAwMTkxNjYwMDAxOTE2ODE1MjYwMjAwMTgyODE1MjYwMjAwMTkzNTA1MDUwNTA2MDQwNTE4MDkxMDM5MGYzNWIzNDgwMTU2MTA0NDI1NzYwMDA4MGZkNWI1MDYxMDQ0YjYxMGEzNTU2NWI2MDQwNTE4MDgyODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDQ2ZDU3NjAwMDgwZmQ1YjUwNjEwNDhjNjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTBhM2I1NjViNjA0MDUxODA4MDYwMjAwMTgyODEwMzgyNTI4MzgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDRjYzU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDRiMTU2NWI1MDUwNTA1MDkwNTA5MDgxMDE5MDYwMWYxNjgwMTU2MTA0Zjk1NzgwODIwMzgwNTE2MDAxODM2MDIwMDM2MTAxMDAwYTAzMTkxNjgxNTI2MDIwMDE5MTUwNWI1MDkyNTA1MDUwNjA0MDUxODA5MTAzOTBmMzViMzQ4MDE1NjEwNTEzNTc2MDAwODBmZDViNTA2MTA1MWM2MTBhNmQ1NjViNjA0MDUxODA4MjczZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjE2NzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY4MTUyNjAyMDAxOTE1MDUwNjA0MDUxODA5MTAzOTBmMzViMzQ4MDE1NjEwNTZhNTc2MDAwODBmZDViNTA2MTA1ODk2MDA0ODAzNjAzODEwMTkwODA4MDM1OTA2MDIwMDE5MDkyOTE5MDUwNTA1MDYxMGE5MzU2NWI2MDQwNTE4MDgyODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDVhYjU3NjAwMDgwZmQ1YjUwNjEwNWI0NjEwYWIwNTY1YjYwNDA1MTgwODA2MDIwMDE4MjgxMDM4MjUyODM4MTgxNTE4MTUyNjAyMDAxOTE1MDgwNTE5MDYwMjAwMTkwODA4MzgzNjAwMDViODM4MTEwMTU2MTA1ZjQ1NzgwODIwMTUxODE4NDAxNTI2MDIwODEwMTkwNTA2MTA1ZDk1NjViNTA1MDUwNTA5MDUwOTA4MTAxOTA2MDFmMTY4MDE1NjEwNjIxNTc4MDgyMDM4MDUxNjAwMTgzNjAyMDAzNjEwMTAwMGEwMzE5MTY4MTUyNjAyMDAxOTE1MDViNTA5MjUwNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDYzYjU3NjAwMDgwZmQ1YjUwNjEwNjVhNjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTBhZWQ1NjViNjA0MDUxODA4MjE1MTUxNTE1ODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDY4MDU3NjAwMDgwZmQ1YjUwNjEwNmFkNjAwNDgwMzYwMzgxMDE5MDgwODAzNTYwMDAxOTE2OTA2MDIwMDE5MDkyOTE5MDgwMzU5MDYwMjAwMTkwOTI5MTkwNTA1MDUwNjEwYjQwNTY1YjYwNDA1MTgwODM4MTUyNjAyMDAxODIxNTE1MTUxNTgxNTI2MDIwMDE5MjUwNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDZkYTU3NjAwMDgwZmQ1YjUwNjEwNmY5NjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTBiZWE1NjViMDA1YjYwNjA4MDYwNjA2MDAwNjA2MDgwNjA2MDYwMDA2MTA3MTE2MTBmYmI1NjViNjAwMDgwNTQ5MDUwOTU1MDg1NjA0MDUxOTA4MDgyNTI4MDYwMjAwMjYwMjAwMTgyMDE2MDQwNTI4MDE1NjEwNzQ4NTc4MTYwMjAwMTYwMjA4MjAyODAzODgzMzk4MDgyMDE5MTUwNTA5MDUwNWI1MDk0NTA4NTYwNDA1MTkwODA4MjUyODA2MDIwMDI2MDIwMDE4MjAxNjA0MDUyODAxNTYxMDc3YTU3ODE2MDIwMDE2MDIwODIwMjgwMzg4MzM5ODA4MjAxOTE1MDUwOTA1MDViNTA5MzUwODU2MDQwNTE5MDgwODI1MjgwNjAyMDAyNjAyMDAxODIwMTYwNDA1MjgwMTU2MTA3YWM1NzgxNjAyMDAxNjAyMDgyMDI4MDM4ODMzOTgwODIwMTkxNTA1MDkwNTA1YjUwOTI1MDYwMDA5MTUwNWI4NTgyMTAxNTYxMDg4NzU3NjAwMDgyODE1NDgxMTAxNTE1NjEwN2NiNTdmZTViOTA2MDAwNTI2MDIwNjAwMDIwOTA2MDAzMDIwMTYwNjA2MDQwNTE5MDgxMDE2MDQwNTI5MDgxNjAwMDgyMDE1NDgxNTI2MDIwMDE2MDAxODIwMTU0NjAwMDE5MTY2MDAwMTkxNjgxNTI2MDIwMDE2MDAyODIwMTU0ODE1MjUwNTA5MDUwODA2MDAwMDE1MTg1ODM4MTUxODExMDE1MTU2MTA4MjA1N2ZlNWI5MDYwMjAwMTkwNjAyMDAyMDE4MTgxNTI1MDUwODA2MDIwMDE1MTg0ODM4MTUxODExMDE1MTU2MTA4NDE1N2ZlNWI5MDYwMjAwMTkwNjAyMDAyMDE5MDYwMDAxOTE2OTA4MTYwMDAxOTE2ODE1MjUwNTA4MDYwNDAwMTUxODM4MzgxNTE4MTEwMTUxNTYxMDg2YzU3ZmU1YjkwNjAyMDAxOTA2MDIwMDIwMTgxODE1MjUwNTA4MTgwNjAwMTAxOTI1MDUwNjEwN2I0NTY1Yjg0ODQ4NDk4NTA5ODUwOTg1MDUwNTA1MDUwNTA1MDkwOTE5MjU2NWI2MDAwNjAwMjYwMDA5MDU0OTA2MTAxMDAwYTkwMDQ3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjczZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjE2MzM3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjE0MTU2MTA5ODA1NzgxOTA1MDgwNzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY2M2ZkYWNkNTc2NjAwMzU0NjA0MDUxODI2M2ZmZmZmZmZmMTY3YzAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjgxNTI2MDA0MDE4MDgyODE1MjYwMjAwMTkxNTA1MDYwMDA2MDQwNTE4MDgzMDM4MTYwMDA4NzgwM2IxNTgwMTU2MTA5Njc1NzYwMDA4MGZkNWI1MDVhZjExNTgwMTU2MTA5N2I1NzNkNjAwMDgwM2UzZDYwMDBmZDViNTA1MDUwNTA1YjUwNTA1NjViNjA2MDgxOTA1MDkxOTA1MDU2NWI2MDQwNTE4MDgwN2Y3ODc4NzMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwODE1MjUwNjAwMzAxOTA1MDYwNDA1MTgwOTEwMzkwYTA4MDYwMDQ2MDAwODQ4MTUyNjAyMDAxOTA4MTUyNjAyMDAxNjAwMDIwODE5MDU1NTA1MDUwNTY1YjYwMDA2MDAzNTQ5MDUwOTA1NjViNjAwMDYxMDlmNTgyNjEwYzRiNTY1YjkwNTA5MTkwNTA1NjViNjAwMDgxODE1NDgxMTAxNTE1NjEwYTBiNTdmZTViOTA2MDAwNTI2MDIwNjAwMDIwOTA2MDAzMDIwMTYwMDA5MTUwOTA1MDgwNjAwMDAxNTQ5MDgwNjAwMTAxNTQ5MDgwNjAwMjAxNTQ5MDUwODM1NjViNjAwMzU0ODE1NjViNjA2MDYxMGE2NjYwMDA4MzgxNTQ4MTEwMTUxNTYxMGE0ZjU3ZmU1YjkwNjAwMDUyNjAyMDYwMDAyMDkwNjAwMzAyMDE2MDAxMDE1NDYxMGRiZjU2NWI5MDUwOTE5MDUwNTY1YjYwMDI2MDAwOTA1NDkwNjEwMTAwMGE5MDA0NzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY4MTU2NWI2MDAwNjAwNDYwMDA4MzgxNTI2MDIwMDE5MDgxNTI2MDIwMDE2MDAwMjA1NDkwNTA5MTkwNTA1NjViNjA2MDYwNDA4MDUxOTA4MTAxNjA0MDUyODA2MDBlODE1MjYwMjAwMTdmNjg2NTZjNmM2ZjIwNmQ3MzY4NmIyZTc0NmY3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDgxNTI1MDkwNTA5MDU2NWI2MDAwNjAwNTYwMDA4MzgxNTQ4MTEwMTUxNTYxMGIwMDU3ZmU1YjkwNjAwMDUyNjAyMDYwMDAyMDkwNjAwMzAyMDE2MDAyMDE1NDAxNjAwMDgzODE1NDgxMTAxNTE1NjEwYjIyNTdmZTViOTA2MDAwNTI2MDIwNjAwMDIwOTA2MDAzMDIwMTYwMDIwMTgxOTA1NTUwNjAwMTkwNTA5MTkwNTA1NjViNjAwMDgwNjEwYjRiNjEwZmJiNTY1YjYwMDE2MDAwODE1NDgwOTI5MTkwNjAwMTAxOTE5MDUwNTU5MjUwODI4MTYwMDAwMTgxODE1MjUwNTA4NDgxNjAyMDAxOTA2MDAwMTkxNjkwODE2MDAwMTkxNjgxNTI1MDUwODM4MTYwNDAwMTgxODE1MjUwNTA2MDAwODE5MDgwNjAwMTgxNTQwMTgwODI1NTgwOTE1MDUwOTA2MDAxODIwMzkwNjAwMDUyNjAyMDYwMDAyMDkwNjAwMzAyMDE2MDAwOTA5MTkyOTA5MTkwOTE1MDYwMDA4MjAxNTE4MTYwMDAwMTU1NjAyMDgyMDE1MTgxNjAwMTAxOTA2MDAwMTkxNjkwNTU2MDQwODIwMTUxODE2MDAyMDE1NTUwNTA1MDgyNjAwMTkyNTA5MjUwNTA5MjUwOTI5MDUwNTY1YjYwMDI2MDAwOTA1NDkwNjEwMTAwMGE5MDA0NzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjMzNzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTYxNDE1NjEwYzQ4NTc4MDYwMDM4MTkwNTU1MDViNTA1NjViNjAwMDgwNjAwMDgwNjAwMDkyNTA2MDA0OTA1MDViODQ1MTgxMTAxNTYxMGRiNDU3ODQ4MTgxNTE4MTEwMTUxNTYxMGM3MTU3ZmU1YjkwNjAyMDAxMDE1MTdmMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDkwMDQ3ZjAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjdmMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDkwMDQ5MTUwNjAzMDgyMTAxNTgwMTU2MTBjZjI1NzUwNjAzYTgyMTA1YjE1NjEwZDBiNTc2MDMwODI2MDA0ODU5MDYwMDIwYTAyMDEwMzkyNTA2MTBkYTc1NjViNjA2MTgyMTAxNTgwMTU2MTBkMWM1NzUwNjA2NzgyMTA1YjE1NjEwZDM4NTc2MDBhNjA2MTgzNjAwNDg2OTA2MDAyMGEwMjAxMDMwMTkyNTA2MTBkYTY1NjViNjA0MDUxN2YwOGMzNzlhMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwODE1MjYwMDQwMTgwODA2MDIwMDE4MjgxMDM4MjUyNjAxMTgxNTI2MDIwMDE4MDdmNjI3OTc0NjU3MzU0NmY1NTY5NmU3NDIwNjU3MjcyNmY3MjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDgxNTI1MDYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZmQ1YjViODA4MDYwMDEwMTkxNTA1MDYxMGM1YTU2NWI4MjkzNTA1MDUwNTA5MTkwNTA1NjViNjA2MDgwNjAwMDgwNjAwMDYwNjA2MDIwNjA0MDUxOTA4MDgyNTI4MDYwMWYwMTYwMWYxOTE2NjAyMDAxODIwMTYwNDA1MjgwMTU2MTBkZmQ1NzgxNjAyMDAxNjAyMDgyMDI4MDM4ODMzOTgwODIwMTkxNTA1MDkwNTA1YjUwOTQ1MDYwMDA5MzUwNjAwMDkyNTA1YjYwMjA4MzEwMTU2MTBlYzc1NzgyNjAwODAyNjAwMjBhODc2MDAxOTAwNDAyNjAwMTAyOTE1MDYwMDA3ZjAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjgyN2VmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjE5MTYxNDE1MTU2MTBlYmE1NzgxODU4NTgxNTE4MTEwMTUxNTYxMGU4MTU3ZmU1YjkwNjAyMDAxMDE5MDdlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxOTE2OTA4MTYwMDAxYTkwNTM1MDgzODA2MDAxMDE5NDUwNTA1YjgyODA2MDAxMDE5MzUwNTA2MTBlMDk1NjViODM2MDQwNTE5MDgwODI1MjgwNjAxZjAxNjAxZjE5MTY2MDIwMDE4MjAxNjA0MDUyODAxNTYxMGVmYTU3ODE2MDIwMDE2MDIwODIwMjgwMzg4MzM5ODA4MjAxOTE1MDUwOTA1MDViNTA5MDUwNjAwMDkyNTA1YjgzODMxMDE1NjEwZmFlNTc4NDgzODE1MTgxMTAxNTE1NjEwZjE4NTdmZTViOTA2MDIwMDEwMTUxN2YwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOTAwNDdmMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAyODE4NDgxNTE4MTEwMTUxNTYxMGY3MTU3ZmU1YjkwNjAyMDAxMDE5MDdlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxOTE2OTA4MTYwMDAxYTkwNTM1MDgyODA2MDAxMDE5MzUwNTA2MTBmMDI1NjViODA5NTUwNTA1MDUwNTA1MDkxOTA1MDU2NWI2MDYwNjA0MDUxOTA4MTAxNjA0MDUyODA2MDAwODE1MjYwMjAwMTYwMDA4MDE5MTY4MTUyNjAyMDAxNjAwMDgxNTI1MDkwNTYwMGExNjU2MjdhN2E3MjMwNTgyMDE5ZDQ5ZTM4NjExODliZGZlOTViM2M5Mzk3YmY1MWU3YmFiOGRiOTg4M2FhN2E2MjA0ODE2Njk5YWY2OTJmYzQwMDI5J30gcmVmPXsoaW5wdXQpPT50aGlzLmJ5dGVDb2RlID0gaW5wdXR9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPmZlZV9saW1pdO+8mjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPXsoaW5wdXQpPT50aGlzLmZlZV9saW1pdD1pbnB1dH0gZGVmYXVsdFZhbHVlPXtNYXRoLnBvdygxMCwxMCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPmNhbGxfdmFsdWXvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj17KGlucHV0KT0+dGhpcy5jYWxsX3ZhbHVlPWlucHV0fSBkZWZhdWx0VmFsdWU9ezB9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPmNvbnN1bWVfdXNlcl9yZXNvdXJjZV9wZXJjZW5077yaPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9eyhpbnB1dCk9PnRoaXMuY29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnQ9aW5wdXR9IGRlZmF1bHRWYWx1ZT17MH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCLpg6jnvbLlkIjnuqYgLSBEZXBsb3kgY29udHJhY3RcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPuafpeivouWQiOe6puWcsOWdgCAtIFF1ZXJ5IGNvbnRyYWN0IGFkZHJlc3PvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5jb250cmFjdF9hZGRyZXNzPWlucHV0fSBkZWZhdWx0VmFsdWU9e2BgfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivouWQiOe6piAtIFF1ZXJ5IGNvbnRyYWN0XCIgb25DbGljaz17KCk9PnRoaXMuZ2V0Q29udHJhY3QoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLosIPnlKjlkIjnuqYgLSBDYWxsIGNvbnRyYWN0XCIgb25DbGljaz17KCk9Pnt0aGlzLnRyaWdnZXJDb250cmFjdCgpfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLnmbvlvZUgLSBsb2dpblwiIG9uQ2xpY2s9eygpPT50aGlzLmxvZ2luKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246J2ZpeGVkJyxsZWZ0OjAsdG9wOjB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNvbHM9XCIxMDBcIiByb3dzPVwiMTBcIiAgdmFsdWU9e3N0cmluZ2lmeShkYXRhKX0gb25DaGFuZ2U9eygpPT57fX0+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3R5bGUganN4PntgXG5cbiAgICAgICAgICAgICAgICAgICAgbGFiZWx7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIClcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBJbmRleCJdfQ== */\n/*@ sourceURL=pages/index.js */"
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
//# sourceMappingURL=4.ca29ea3e4a2e1df8428a.hot-update.js.map