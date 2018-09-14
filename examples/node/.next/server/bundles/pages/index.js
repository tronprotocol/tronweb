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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../dist/TronWeb.node.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=17)}([function(t,e){t.exports=__webpack_require__("@babel/runtime/regenerator")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/asyncToGenerator")},function(t,e){t.exports=__webpack_require__("source-map-support/register")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/classCallCheck")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/createClass")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/objectSpread")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/toConsumableArray")},function(t,e){t.exports=__webpack_require__("bignumber.js")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/slicedToArray")},function(t,e){t.exports=__webpack_require__("axios")},function(t,e){t.exports=__webpack_require__("ethers")},function(t,e){t.exports=__webpack_require__("js-sha3")},function(t,e){t.exports=__webpack_require__("elliptic")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/defineProperty")},function(t,e){t.exports=__webpack_require__("@babel/runtime/helpers/typeof")},function(t,e){t.exports=__webpack_require__("jssha")},function(t,e){t.exports=__webpack_require__("validator")},function(t,e,r){"use strict";r.r(e);var n={};r.r(n),r.d(n,"byte2hexStr",function(){return W}),r.d(n,"bytesToString",function(){return S}),r.d(n,"hextoString",function(){return P}),r.d(n,"base64DecodeFromString",function(){return C}),r.d(n,"byteArray2hexStr",function(){return _});var i={};r.r(i),r.d(i,"bin2String",function(){return O}),r.d(i,"arrayEquals",function(){return U}),r.d(i,"stringToBytes",function(){return R}),r.d(i,"bytesToString",function(){return L}),r.d(i,"hextoString",function(){return D}),r.d(i,"hexChar2byte",function(){return K}),r.d(i,"isHexChar",function(){return V}),r.d(i,"hexStr2byteArray",function(){return z}),r.d(i,"byte2hexStr",function(){return J}),r.d(i,"byteArray2hexStr",function(){return M}),r.d(i,"base64DecodeFromString",function(){return X}),r.d(i,"base64EncodeToString",function(){return Z}),r.d(i,"strToDate",function(){return G}),r.d(i,"isNumber",function(){return Q}),r.d(i,"getStringType",function(){return Y});var o={};r.r(o),r.d(o,"encode58",function(){return nt}),r.d(o,"decode58",function(){return it});var s={};r.r(s),r.d(s,"getBase58CheckAddress",function(){return at}),r.d(s,"decodeBase58Address",function(){return ut}),r.d(s,"signTransaction",function(){return ct}),r.d(s,"arrayToBase64String",function(){return dt}),r.d(s,"signBytes",function(){return lt}),r.d(s,"getRowBytesFromTransactionBase64",function(){return ht}),r.d(s,"genPriKey",function(){return ft}),r.d(s,"computeAddress",function(){return vt}),r.d(s,"getAddressFromPriKey",function(){return pt}),r.d(s,"decode58Check",function(){return gt}),r.d(s,"isAddressValid",function(){return bt}),r.d(s,"getBase58CheckAddressFromPriKeyBase64String",function(){return yt}),r.d(s,"getHexStrAddressFromPriKeyBase64String",function(){return mt}),r.d(s,"getAddressFromPriKeyBase64String",function(){return kt}),r.d(s,"getPubKeyFromPriKey",function(){return xt}),r.d(s,"ECKeySign",function(){return wt}),r.d(s,"SHA256",function(){return At}),r.d(s,"passwordToAddress",function(){return It}),r.d(s,"pkToAddress",function(){return Wt});var a={};r.r(a),r.d(a,"generateAccount",function(){return St});var u=r(14),c=r.n(u),d=r(0),l=r.n(d),h=r(1),f=r.n(h),v=r(3),p=r.n(v),g=r(4),b=r.n(g),y=r(13),m=r.n(y),k=(r(2),r(9)),x=r.n(k),w=r(5),A=r.n(w);function I(){var t=this;this._keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",this.encode=function(e){for(var r,n,i,o,s,a,u,c="",d=0;d<e.length;)o=(r=e.charCodeAt(d++))>>2,s=(3&r)<<4|(n=e.charCodeAt(d++))>>4,a=(15&n)<<2|(i=e.charCodeAt(d++))>>6,u=63&i,isNaN(n)?a=u=64:isNaN(i)&&(u=64),c=c+t._keyStr.charAt(o)+t._keyStr.charAt(s)+t._keyStr.charAt(a)+t._keyStr.charAt(u);return c},this.encodeIgnoreUtf8=function(e){for(var r,n,i,o,s,a,u,c="",d=0;d<e.length;)o=(r=e[d++])>>2,s=(3&r)<<4|(n=e[d++])>>4,a=(15&n)<<2|(i=e[d++])>>6,u=63&i,isNaN(n)?a=u=64:isNaN(i)&&(u=64),c=c+t._keyStr.charAt(o)+t._keyStr.charAt(s)+t._keyStr.charAt(a)+t._keyStr.charAt(u);return c},this.decode=function(e){var r,n,i,o,s,a,u="",c=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<e.length;)r=_keyStr.indexOf(e.charAt(c++))<<2|(o=_keyStr.indexOf(e.charAt(c++)))>>4,n=(15&o)<<4|(s=_keyStr.indexOf(e.charAt(c++)))>>2,i=(3&s)<<6|(a=_keyStr.indexOf(e.charAt(c++))),u+=String.fromCharCode(r),64!=s&&(u+=String.fromCharCode(n)),64!=a&&(u+=String.fromCharCode(i));return t._utf8_decode(u)},this.decodeToByteArray=function(e){var r,n,i,o,s,a,u="",c=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<e.length;)r=_keyStr.indexOf(e.charAt(c++))<<2|(o=_keyStr.indexOf(e.charAt(c++)))>>4,n=(15&o)<<4|(s=_keyStr.indexOf(e.charAt(c++)))>>2,i=(3&s)<<6|(a=_keyStr.indexOf(e.charAt(c++))),u+=String.fromCharCode(r),64!=s&&(u+=String.fromCharCode(n)),64!=a&&(u+=String.fromCharCode(i));return t._out2ByteArray(u)},this._out2ByteArray=function(t){for(var e=new Array(t.length),r=0,n=c1=c2=0;r<t.length;)n=t.charCodeAt(r),e[r]=n,r++;return e},this._utf8_encode=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e+=String.fromCharCode(n):n>127&&n<2048?(e+=String.fromCharCode(n>>6|192),e+=String.fromCharCode(63&n|128)):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128),e+=String.fromCharCode(63&n|128))}return e},this._utf8_decode=function(t){for(var e="",r=0,n=c1=c2=0;r<t.length;)(n=t.charCodeAt(r))<128?(e+=String.fromCharCode(n),r++):n>191&&n<224?(c2=t.charCodeAt(r+1),e+=String.fromCharCode((31&n)<<6|63&c2),r+=2):(c2=t.charCodeAt(r+1),c3=t.charCodeAt(r+2),e+=String.fromCharCode((15&n)<<12|(63&c2)<<6|63&c3),r+=3);return e}}function W(t){var e="";return e+="0123456789ABCDEF".charAt(t>>4),e+="0123456789ABCDEF".charAt(15&t)}function S(t){if("string"==typeof t)return t;for(var e="",r=0;r<t.length;r++){var n=t[r].toString(2),i=n.match(/^1+?(?=0)/);if(i&&8===n.length){for(var o=i[0].length,s=t[r].toString(2).slice(7-o),a=1;a<o;a++)s+=t[a+r].toString(2).slice(2);e+=String.fromCharCode(parseInt(s,2)),r+=o-1}else e+=String.fromCharCode(t[r])}return e}function P(t){for(var e=t.split(""),r="",n=0;n<e.length/2;n++){var i="0x".concat(e[2*n]).concat(e[2*n+1]);r+=String.fromCharCode(i)}return r}function C(t){return(new I).decodeToByteArray(t)}function _(t){for(var e="",r=0;r<t.length;r++)e+=W(t[r]);return e}var B=r(6),N=r.n(B),T=r(15),j=r.n(T),E="testnet"===process.env.NET,F=E?35:34,q=E?"a0":"41",H=E?160:65;function O(t){return String.fromCharCode.apply(String,N()(t))}function U(t,e){if(t.length!=e.length)return!1;var r;for(r=0;r<t.length;r++)if(t[r]!=e[r])return!1;return!0}function R(t){var e,r,n=new Array;e=t.length;for(var i=0;i<e;i++)(r=t.charCodeAt(i))>=65536&&r<=1114111?(n.push(r>>18&7|240),n.push(r>>12&63|128),n.push(r>>6&63|128),n.push(63&r|128)):r>=2048&&r<=65535?(n.push(r>>12&15|224),n.push(r>>6&63|128),n.push(63&r|128)):r>=128&&r<=2047?(n.push(r>>6&31|192),n.push(63&r|128)):n.push(255&r);return n}function L(t){if("string"==typeof t)return t;for(var e="",r=0;r<t.length;r++){var n=t[r].toString(2),i=n.match(/^1+?(?=0)/);if(i&&8==n.length){for(var o=i[0].length,s=t[r].toString(2).slice(7-o),a=1;a<o;a++)s+=t[a+r].toString(2).slice(2);e+=String.fromCharCode(parseInt(s,2)),r+=o-1}else e+=String.fromCharCode(t[r])}return e}function D(t){for(var e=t.split(""),r="",n=0;n<e.length/2;n++){var i="0x".concat(e[2*n]).concat(e[2*n+1]);r+=String.fromCharCode(i)}return r}function K(t){var e=0;return t>="A"&&t<="F"?e=t.charCodeAt(0)-"A".charCodeAt(0)+10:t>="a"&&t<="f"?e=t.charCodeAt(0)-"a".charCodeAt(0)+10:t>="0"&&t<="9"&&(e=t.charCodeAt(0)-"0".charCodeAt(0)),e}function V(t){return t>="A"&&t<="F"||t>="a"&&t<="f"||t>="0"&&t<="9"?1:0}function z(t){for(var e=Array(),r=0,n=0,i=0,o=0;o<t.length;o++){var s=t.charAt(o);V(s)&&(r<<=4,r+=K(s),0==++n%2&&(e[i++]=r,r=0))}return e}function J(t){var e="";return e+="0123456789ABCDEF".charAt(t>>4),e+="0123456789ABCDEF".charAt(15&t)}function M(t){return t.reduce(function(t,e){return t+J(e)},"")}function X(t){return(new I).decodeToByteArray(t)}function Z(t){return(new I).encodeIgnoreUtf8(t)}function G(t){var e=t.split(" "),r=e[0].split("-"),n=parseInt(r[0],10),i=parseInt(r[1],10)-1,o=parseInt(r[2],10);if(e.length>1){var s=e[1].split("-"),a=parseInt(s[0],10),u=parseInt(s[1],10)-1,c=parseInt(s[2],10);return new Date(n,i,o,a,u,c)}return new Date(n,i,o)}function Q(t){return t>="0"&&t<="9"?1:0}function Y(t){if(null==t)return-1;if("string"!=typeof t)return-1;if(0==t.length||""==t)return-1;var e=0;if(40==t.length)for(;e<40;e++){if(!V(t.charAt(e)))break}if(40==e)return 1;for(e=0;e<t.length;e++){if(!Q(t.charAt(e)))break}if(e==t.length)return 2;for(e=0;e<t.length;e++){if(t.charAt(e)>" ")return 3}return-1}for(var $="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",tt={},et=0;et<$.length;et++)tt[$.charAt(et)]=et;var rt=58;function nt(t){if(0===t.length)return"";var e,r,n=[0];for(e=0;e<t.length;e++){for(r=0;r<n.length;r++)n[r]<<=8;n[0]+=t[e];var i=0;for(r=0;r<n.length;++r)n[r]+=i,i=n[r]/rt|0,n[r]%=rt;for(;i;)n.push(i%rt),i=i/rt|0}for(e=0;0===t[e]&&e<t.length-1;e++)n.push(0);return n.reverse().map(function(t){return $[t]}).join("")}function it(t){if(0===t.length)return[];var e,r,n=[0];for(e=0;e<t.length;e++){var i=t[e];if(!(i in tt))throw new Error("Non-base58 character");for(r=0;r<n.length;r++)n[r]*=rt;n[0]+=tt[i];var o=0;for(r=0;r<n.length;++r)n[r]+=o,o=n[r]>>8,n[r]&=255;for(;o;)n.push(255&o),o>>=8}for(e=0;"1"===t[e]&&e<t.length-1;e++)n.push(0);return n.reverse()}var ot=r(11),st=r(12);function at(t){var e=At(At(t)).slice(0,4);return nt(e=t.concat(e))}function ut(t){if("string"!=typeof t)return!1;if(t.length<=4)return!1;var e=it(t);if(t.length<=4)return!1;var r=e.length-4,n=e.slice(r),i=At(At(e=e.slice(0,r))).slice(0,4);return n[0]==i[0]&&n[1]==i[1]&&n[2]==i[2]&&n[3]==i[3]?e:z("000000000000000000000000000000000000000000")}function ct(t,e){"string"==typeof t&&(t=z(t));var r=wt(z(e.txID),t);return e.signature=[r],e}function dt(t){return btoa(String.fromCharCode.apply(String,N()(t)))}function lt(t,e){return"string"==typeof t&&(t=z(t)),wt(At(e),t)}function ht(t){var e=X(t);return proto.protocol.Transaction.deserializeBinary(e).getRawData().serializeBinary()}function ft(){for(var t=new st.ec("secp256k1").genKeyPair().getPrivate().toString("hex");t.length<64;)t="0".concat(t);return z(t)}function vt(t){65===t.length&&(t=t.slice(1));var e=Object(ot.keccak256)(t).toString();return z(q+e.substring(24))}function pt(t){return vt(xt(t))}function gt(t){var e=it(t);if(e.length<=4)return!1;var r=e.slice(0,e.length-4),n=At(At(r));return n[0]===e[r.length]&&n[1]===e[r.length+1]&&n[2]===e[r.length+2]&&n[3]===e[r.length+3]&&r}function bt(t){if("string"!=typeof t)return!1;if(t.length!==F)return!1;var e=it(t);if(25!==e.length)return!1;if(e[0]!==H)return!1;var r=e.slice(21),n=At(At(e=e.slice(0,21))).slice(0,4);return r[0]==n[0]&&r[1]==n[1]&&r[2]==n[2]&&r[3]==n[3]}function yt(t){return at(vt(xt(X(t))))}function mt(t){return _(vt(xt(X(t))))}function kt(t){return Z(vt(xt(X(t))))}function xt(t){for(var e=new st.ec("secp256k1").keyFromPrivate(t,"bytes").getPublic(),r=e.x,n=e.y,i=r.toString("hex");i.length<64;)i="0".concat(i);for(var o=n.toString("hex");o.length<64;)o="0".concat(o);return z("04".concat(i).concat(o))}function wt(t,e){for(var r=new st.ec("secp256k1").keyFromPrivate(e,"bytes").sign(t),n=r.r,i=r.s,o=r.recoveryParam,s=n.toString("hex");s.length<64;)s="0".concat(s);for(var a=i.toString("hex");a.length<64;)a="0".concat(a);return s+a+W(o)}function At(t){var e=new j.a("SHA-256","HEX"),r=_(t);return e.update(r),z(e.getHash("HEX"))}function It(t){return at(pt(X(t)))}function Wt(t){return at(pt(z(t)))}function St(){var t=ft(),e=xt(t),r=pt(t);return{privateKey:_(t),publicKey:_(e),address:{base58:at(r),hex:_(r)}}}var Pt=r(16),Ct=r.n(Pt),_t=r(7),Bt=r.n(_t),Nt={isValidURL:function(t){return Ct.a.isURL(t,{protocols:["http","https"]})},isObject:function(t){return t===Object(t)&&"[object Array]"!==Object.prototype.toString.call(t)},isArray:function(t){return Array.isArray(t)},isJson:function(t){try{return!!JSON.parse(t)}catch(t){return!1}},isBoolean:function(t){return"boolean"==typeof t},isBigNumber:function(t){return t&&(t instanceof Bt.a||t.constructor&&"BigNumber"===t.constructor.name)},isString:function(t){return"string"==typeof t||t&&t.constructor&&"String"===t.constructor.name},isFunction:function(t){return"function"==typeof t},isHex:function(t){return"string"==typeof t&&!isNaN(parseInt(t,16))},isInteger:function(t){return Number.isInteger(Number(t))},hasProperty:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},hasProperties:function(t){for(var e=this,r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];return n.length&&!n.map(function(r){return e.hasProperty(t,r)}).includes(!1)},injectPromise:function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return new Promise(function(e,n){t.apply(void 0,r.concat([function(t,r){t?n(t):e(r)}]))})},promiseInjector:function(t){var e=this;return function(r){for(var n=arguments.length,i=new Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];return e.injectPromise.apply(e,[r.bind(t)].concat(i))}},mapEvent:function(t){return{block:t.block_number,timestamp:t.block_timestamp,contract:t.contract_address,name:t.event_name,transaction:t.transaction_id,result:t.result}},parseEvent:function(t,e){var r=e.inputs;return t.result?(t.result=t.result.reduce(function(t,e,n){var i=r[n],o=i.name;return"address"==i.type&&(e="41"+e.substr(2).toLowerCase()),t[o]=e,t},{}),t):t}},Tt=A()({},Nt,{code:i,accounts:a,base58:o,bytes:n,crypto:s}),jt={HttpProvider:function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"/";if(p()(this,t),!Tt.isValidURL(e))throw new Error("Invalid URL provided to HttpProvider");if(isNaN(r)||r<0)throw new Error("Invalid timeout duration provided");if(!Tt.isObject(o))throw new Error("Invalid headers object provided");"/"===e.charAt(e.length-1)&&(e=e.substr(0,e.length-2)),this.host=e,this.timeout=r,this.user=n,this.password=i,this.headers=o,this.statusPage=s,this.instance=x.a.create({baseURL:e,timeout:r,headers:o,auth:n&&{user:n,password:i}})}return b()(t,[{key:"setStatusPage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";this.statusPage=t}},{key:"isConnected",value:function(){var t=f()(l.a.mark(function t(){var e,r=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=r.length>0&&void 0!==r[0]?r[0]:this.statusPage,t.abrupt("return",this.request(e).then(function(t){return Tt.hasProperties(t,"blockID","block_header")}).catch(function(){return!1}));case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"request",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"get";return r=r.toLowerCase(),this.instance.request({data:"post"==r&&e,params:"get"==r&&e,url:t,method:r}).then(function(t){return t.data})}}]),t}()},Et=r(8),Ft=r.n(Et),qt=r(10),Ht=r.n(qt),Ot=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(p()(this,t),!e||!e instanceof Mt)throw new Error("Expected instance of TronWeb");this.tronWeb=e,this.injectPromise=Tt.promiseInjector(this)}return b()(t,[{key:"sendTrx",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.tronWeb.defaultAddress.hex,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Tt.isFunction(r)&&(n=r,r=this.tronWeb.defaultAddress.hex),n?this.tronWeb.isAddress(t)?!Tt.isInteger(e)||e<=0?n("Invalid amount provided"):this.tronWeb.isAddress(r)?(t=this.tronWeb.address.toHex(t))===(r=this.tronWeb.address.toHex(r))?n("Cannot transfer TRX to the same account"):void this.tronWeb.fullNode.request("wallet/createtransaction",{to_address:t,owner_address:r,amount:parseInt(e)},"post").then(function(t){if(t.Error)return n(t.Error);n(null,t)}).catch(function(t){return n(t)}):n("Invalid origin address provided"):n("Invalid recipient address provided"):this.injectPromise(this.sendTrx,t,e,r)}},{key:"sendToken",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return Tt.isFunction(n)&&(i=n,n=this.tronWeb.defaultAddress.hex),i?this.tronWeb.isAddress(t)?!Tt.isInteger(e)||e<=0?i("Invalid amount provided"):Tt.isString(r)&&r.length?this.tronWeb.isAddress(n)?(t=this.tronWeb.address.toHex(t),r=this.tronWeb.fromUtf8(r),t===(n=this.tronWeb.address.toHex(n))?i("Cannot transfer tokens to the same account"):void this.tronWeb.fullNode.request("wallet/transferasset",{to_address:t,owner_address:n,asset_name:r,amount:parseInt(e)},"post").then(function(t){if(t.Error)return i(t.Error);i(null,t)}).catch(function(t){return i(t)})):i("Invalid origin address provided"):i("Invalid token ID provided"):i("Invalid recipient address provided"):this.injectPromise(this.sendToken,t,e,r,n)}},{key:"purchaseToken",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return Tt.isFunction(n)&&(i=n,n=this.tronWeb.defaultAddress.hex),i?this.tronWeb.isAddress(t)?Tt.isString(e)&&e.length?!Tt.isInteger(r)||r<=0?i("Invalid amount provided"):this.tronWeb.isAddress(n)?void this.tronWeb.fullNode.request("wallet/participateassetissue",{to_address:this.tronWeb.address.toHex(t),owner_address:this.tronWeb.address.toHex(n),asset_name:this.tronWeb.fromUtf8(e),amount:parseInt(r)},"post").then(function(t){if(t.Error)return i(t.Error);i(null,t)}).catch(function(t){return i(t)}):i("Invalid buyer address provided"):i("Invalid token ID provided"):i("Invalid issuer address provided"):this.injectPromise(this.purchaseToken,t,e,r,n)}},{key:"freezeBalance",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Tt.isFunction(r)&&(n=r,r=3),n?this.tronWeb.isAddress(t)?!Tt.isInteger(e)||e<=0?n("Invalid amount provided"):!Tt.isInteger(r)||r<3?n("Invalid duration provided, minimum of 3 days"):void this.tronWeb.fullNode.request("wallet/freezebalance",{owner_address:this.tronWeb.address.toHex(t),frozen_balance:parseInt(e),frozen_duration:parseInt(r)},"post").then(function(t){if(t.Error)return n(t.Error);n(null,t)}).catch(function(t){return n(t)}):n("Invalid address provided"):this.injectPromise(this.freezeBalance,t,e,r)}},{key:"unfreezeBalance",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultAddress.hex),e?this.tronWeb.isAddress(t)?void this.tronWeb.fullNode.request("wallet/unfreezebalance",{owner_address:this.tronWeb.address.toHex(t)},"post").then(function(t){if(t.Error)return e(t.Error);e(null,t)}).catch(function(t){return e(t)}):e("Invalid address provided"):this.injectPromise(this.unfreezeBalance,t)}},{key:"withdrawBlockRewards",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultAddress.hex),e?this.tronWeb.isAddress(t)?void this.tronWeb.fullNode.request("wallet/withdrawbalance",{owner_address:this.tronWeb.address.toHex(t)},"post").then(function(t){if(t.Error)return e(t.Error);e(null,t)}).catch(function(t){return e(t)}):e("Invalid address provided"):this.injectPromise(this.withdrawBlockRewards,t)}},{key:"applyForSR",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Tt.isValidURL(t)&&(r=e||!1,e=t,t=this.tronWeb.defaultAddress.hex),r?this.tronWeb.isAddress(t)?Tt.isValidURL(e)?void this.tronWeb.fullNode.request("wallet/createwitness",{owner_address:this.tronWeb.address.toHex(t),url:this.tronWeb.fromUtf8(e)},"post").then(function(t){if(t.Error)return r(t.Error);r(null,t)}).catch(function(t){return r(t)}):r("Invalid url provided"):r("Invalid address provided"):this.injectPromise(this.applyForSR,t,e)}},{key:"vote",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Tt.isFunction(r)&&(n=r,r=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.vote,e,r);if(!Tt.isObject(e)||!Object.keys(e).length)return n("Invalid votes object provided");if(!this.tronWeb.isAddress(r))return n("Invalid voter address provided");var i=!1;e=Object.entries(e).map(function(e){var r=Ft()(e,2),o=r[0],s=r[1];if(!i)return t.tronWeb.isAddress(o)?!Tt.isInteger(s)||s<=0?(n("Invalid vote count provided for SR: "+o),i=!0):{vote_address:t.tronWeb.address.toHex(o),vote_count:parseInt(s)}:(n("Invalid SR address provided: "+o),i=!0)}),i||this.tronWeb.fullNode.request("wallet/votewitnessaccount",{owner_address:this.tronWeb.address.toHex(r),votes:e},"post").then(function(t){if(t.Error)return n(t.Error);n(null,t)}).catch(function(t){return n(t)})}},{key:"createSmartContract",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Tt.isFunction(e)&&(r=e,e=this.tronWeb.defaultAddress.hex),!r)return this.injectPromise(this.createSmartContract,t,e);var n=t.abi,i=void 0!==n&&n,o=t.bytecode,s=void 0!==o&&o,a=t.feeLimit,u=void 0===a?1e9:a,c=t.callValue,d=void 0===c?0:c,l=t.bandwidthLimit,h=void 0===l?0:l,f=t.parameters,v=void 0===f?[]:f;if(i&&Tt.isString(i))try{i=JSON.parse(i)}catch(t){return r("Invalid options.abi provided")}if(!Tt.isArray(i))return r("Invalid options.abi provided");var p=i.some(function(t){return"constructor"==t.type&&t.payable});if(!Tt.isHex(s))return r("Invalid options.bytecode provided");if(!Tt.isInteger(u)||u<=0||u>1e9)return r("Invalid options.feeLimit provided");if(!Tt.isInteger(d)||d<0)return r("Invalid options.callValue provided");if(p&&0==d)return r("When contract is payable, options.callValue must be a positive integer");if(!p&&d>0)return r("When contract is not payable, options.callValue must be 0");if(!Tt.isInteger(h)||h<0||h>100)return r("Invalid options.bandwidthLimit provided");if(!Tt.isArray(v))return r("Invalid parameters provided");if(!this.tronWeb.isAddress(e))return r("Invalid issuer address provided");if(v.length){for(var g=new Ht.a.utils.AbiCoder,b=[],y=[],m=0;m<v.length;m++){var k=v[m],x=k.type,w=k.value;if(!x||!Tt.isString(x)||!x.length)return r("Invalid parameter type provided: "+x);"address"==x&&(w=this.tronWeb.address.toHex(w).replace(/^(41)/,"0x")),b.push(x),y.push(w)}try{v=g.encode(b,y).replace(/^(0x)/,"")}catch(t){return r(t)}}else v="";this.tronWeb.fullNode.request("wallet/deploycontract",{owner_address:this.tronWeb.address.toHex(e),fee_limit:parseInt(u),call_value:parseInt(d),consume_user_resource_percent:h,abi:JSON.stringify(i),bytecode:s,parameter:v},"post").then(function(t){if(t.Error)return r(t.Error);r(null,t)}).catch(function(t){return r(t)})}},{key:"triggerSmartContract",value:function(t,e){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e9,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:this.tronWeb.defaultAddress.hex,a=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(Tt.isFunction(s)&&(a=s,s=this.tronWeb.defaultAddress.hex),Tt.isFunction(o)&&(a=o,o=[]),Tt.isFunction(i)&&(a=i,i=0),Tt.isFunction(n)&&(a=n,n=1e9),!a)return this.injectPromise(this.triggerSmartContract,t,e,n,i,o,s);if(!this.tronWeb.isAddress(t))return a("Invalid contract address provided");if(!Tt.isString(e)||!e.length)return a("Invalid function selector provided");if(!Tt.isInteger(i)||i<0)return a("Invalid call value provided");if(!Tt.isInteger(n)||n<=0||n>1e9)return a("Invalid fee limit provided");if(!Tt.isArray(o))return a("Invalid parameters provided");if(!this.tronWeb.isAddress(s))return a("Invalid issuer address provided");if(e=e.replace("/s*/g",""),o.length){for(var u=new Ht.a.utils.AbiCoder,c=[],d=[],l=0;l<o.length;l++){var h=o[l],f=h.type,v=h.value;if(!f||!Tt.isString(f)||!f.length)return a("Invalid parameter type provided: "+f);"address"==f&&(v=this.tronWeb.address.toHex(v).replace(/^(41)/,"0x")),c.push(f),d.push(v)}try{o=u.encode(c,d).replace(/^(0x)/,"")}catch(t){return a(t)}}else o="";this.tronWeb.fullNode.request("wallet/triggersmartcontract",{contract_address:this.tronWeb.address.toHex(t),owner_address:this.tronWeb.address.toHex(s),function_selector:e,fee_limit:parseInt(n),call_value:parseInt(i),parameter:o},"post").then(function(t){return t.Error?a(t.Error):t.result&&t.result.message?a(r.tronWeb.toUtf8(t.result.message)):t.result.result?void a(null,t):a(t)}).catch(function(t){return a(t)})}},{key:"createToken",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Tt.isFunction(r)&&(n=r,r=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.createToken,e,r);var i=e.name,o=void 0!==i&&i,s=e.abbreviation,a=void 0!==s&&s,u=e.description,c=void 0!==u&&u,d=e.url,l=void 0!==d&&d,h=e.totalSupply,f=void 0===h?0:h,v=e.trxRatio,p=void 0===v?1:v,g=e.tokenRatio,b=void 0===g?1:g,y=e.saleStart,m=void 0===y?Date.now():y,k=e.saleEnd,x=void 0!==k&&k,w=e.freeBandwidth,A=void 0===w?0:w,I=e.freeBandwidthLimit,W=void 0===I?0:I,S=e.frozenAmount,P=void 0===S?0:S,C=e.frozenDuration,_=void 0===C?0:C;return Tt.isString(o)&&o.length?Tt.isString(a)&&a.length?!Tt.isInteger(f)||f<=0?n("Invalid supply amount provided"):!Tt.isInteger(p)||p<=0?n("TRX ratio must be a positive integer"):!Tt.isInteger(b)||b<=0?n("Token ratio must be a positive integer"):!Tt.isInteger(m)||m<Date.now()?n("Invalid sale start timestamp provided"):!Tt.isInteger(x)||x<=m?n("Invalid sale end timestamp provided"):Tt.isString(c)&&c.length?Tt.isString(l)&&l.length&&Tt.isValidURL(l)?!Tt.isInteger(A)||A<0?n("Invalid free bandwidth amount provided"):!Tt.isInteger(W)||W<0||A&&!W?n("Invalid free bandwidth limit provided"):!Tt.isInteger(P)||P<0||!_&&P?n("Invalid frozen supply provided"):!Tt.isInteger(_)||_<0||_&&!P?n("Invalid frozen duration provided"):this.tronWeb.isAddress(r)?void this.tronWeb.fullNode.request("wallet/createassetissue",{owner_address:this.tronWeb.address.toHex(r),name:this.tronWeb.fromUtf8(o),abbr:this.tronWeb.fromUtf8(a),description:this.tronWeb.fromUtf8(c),url:this.tronWeb.fromUtf8(l),total_supply:parseInt(f),trx_num:parseInt(p),num:parseInt(b),start_time:parseInt(m),end_time:parseInt(x),free_asset_net_limit:parseInt(A),public_free_asset_net_limit:parseInt(W),frozen_supply:{frozen_amount:parseInt(P),frozen_days:parseInt(_)}},"post").then(function(e){return e.Error?n(e.Error):e.result&&e.result.message?n(t.tronWeb.toUtf8(e.result.message)):void n(null,e)}).catch(function(t){return n(t)}):n("Invalid issuer address provided"):n("Invalid token url provided"):n("Invalid token description provided"):n("Invalid token abbreviation provided"):n("Invalid token name provided")}},{key:"updateToken",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Tt.isFunction(r)&&(n=r,r=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.updateToken,e,r);var i=e.description,o=void 0!==i&&i,s=e.url,a=void 0!==s&&s,u=e.freeBandwidth,c=void 0===u?0:u,d=e.freeBandwidthLimit,l=void 0===d?0:d;return!Tt.isInteger(c)||c<0?n("Invalid free bandwidth amount provided"):!Tt.isInteger(l)||l<0||c&&!l?n("Invalid free bandwidth limit provided"):this.tronWeb.isAddress(r)?void this.tronWeb.fullNode.request("wallet/updateasset",{owner_address:this.tronWeb.address.toHex(r),description:this.tronWeb.fromUtf8(o),url:this.tronWeb.fromUtf8(a),new_limit:parseInt(c),new_public_limit:parseInt(l)},"post").then(function(e){return e.Error?n(e.Error):e.result&&e.result.message?n(t.tronWeb.toUtf8(e.result.message)):void n(null,e)}).catch(function(t){return n(t)}):n("Invalid issuer address provided")}},{key:"sendAsset",value:function(){return this.sendToken.apply(this,arguments)}},{key:"purchaseAsset",value:function(){return this.purchaseToken.apply(this,arguments)}},{key:"createAsset",value:function(){return this.createToken.apply(this,arguments)}},{key:"updateAsset",value:function(){return this.updateToken.apply(this,arguments)}}]),t}(),Ut=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(p()(this,t),!e||!e instanceof Mt)throw new Error("Expected instance of TronWeb");this.tronWeb=e,this.injectPromise=Tt.promiseInjector(this)}return b()(t,[{key:"parseToken",value:function(t){return A()({},t,{name:this.tronWeb.toUtf8(t.name),abbr:t.abbr&&this.tronWeb.toUtf8(t.abbr),description:t.description&&this.tronWeb.toUtf8(t.description),url:t.url&&this.tronWeb.toUtf8(t.url)})}},{key:"getCurrentBlock",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!t)return this.injectPromise(this.getCurrentBlock);this.tronWeb.fullNode.request("wallet/getnowblock").then(function(e){t(null,e)}).catch(function(e){return t(e)})}},{key:"getBlock",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultBlock,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultBlock),e?!1===t?e("No block identifier provided"):("earliest"==t&&(t=0),"latest"==t?this.getCurrentBlock(e):isNaN(t)&&Tt.isHex(t)?this.getBlockByHash(t,e):void this.getBlockByNumber(t,e)):this.injectPromise(this.getBlock,t)}},{key:"getBlockByHash",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e)return this.injectPromise(this.getBlockByHash,t);this.tronWeb.fullNode.request("wallet/getblockbyid",{value:t},"post").then(function(t){if(!Object.keys(t).length)return e("Block not found");e(null,t)}).catch(function(t){return e(t)})}},{key:"getBlockByNumber",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?!Tt.isInteger(t)||t<0?e("Invalid block number provided"):void this.tronWeb.fullNode.request("wallet/getblockbynum",{num:parseInt(t)},"post").then(function(t){if(!Object.keys(t).length)return e("Block not found");e(null,t)}).catch(function(t){return e(t)}):this.injectPromise(this.getBlockByNumber,t)}},{key:"getBlockTransactionCount",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultBlock,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultBlock),!e)return this.injectPromise(this.getBlockTransactionCount,t);this.getBlock(t).then(function(t){var r=t.transactions;e(null,(void 0===r?[]:r).length)}).catch(function(t){return e(t)})}},{key:"getTransactionFromBlock",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultBlock,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Tt.isFunction(e)&&(r=e,e=0),Tt.isFunction(t)&&(r=t,t=this.tronWeb.defaultBlock),r?!Tt.isInteger(e)||e<0?r("Invalid transaction index provided"):void this.getBlock(t).then(function(t){var n=t.transactions,i=void 0!==n&&n;if(!i||i.length<e)return r("Transaction not found in block");r(null,i[e])}).catch(function(t){return r(t)}):this.injectPromise(this.getTransactionFromBlock,t,e)}},{key:"getTransaction",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e)return this.injectPromise(this.getTransaction,t);this.tronWeb.fullNode.request("wallet/gettransactionbyid",{value:t},"post").then(function(t){if(!Object.keys(t).length)return e("Transaction not found");e(null,t)}).catch(function(t){return e(t)})}},{key:"getTransactionInfo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e)return this.injectPromise(this.getTransactionInfo,t);this.tronWeb.solidityNode.request("walletsolidity/gettransactioninfobyid",{value:t},"post").then(function(t){e(null,t)}).catch(function(t){return e(t)})}},{key:"getTransactionsToAddress",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Tt.isFunction(r)&&(n=r,r=0),Tt.isFunction(e)&&(n=e,e=30),n?this.getTransactionsRelated(t,"to",e,r,n):this.injectPromise(this.getTransactionsToAddress,t,e,r)}},{key:"getTransactionsFromAddress",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Tt.isFunction(r)&&(n=r,r=0),Tt.isFunction(e)&&(n=e,e=30),n?this.getTransactionsRelated(t,"from",e,r,n):this.injectPromise(this.getTransactionsFromAddress,t,e,r)}},{key:"getTransactionsRelated",value:function(){var t=f()(l.a.mark(function t(){var e,r,n,i,o,s,a,u=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=u.length>0&&void 0!==u[0]?u[0]:this.tronWeb.defaultAddress.hex,r=u.length>1&&void 0!==u[1]?u[1]:"all",n=u.length>2&&void 0!==u[2]?u[2]:30,i=u.length>3&&void 0!==u[3]?u[3]:0,o=u.length>4&&void 0!==u[4]&&u[4],Tt.isFunction(i)&&(o=i,i=0),Tt.isFunction(n)&&(o=n,n=30),Tt.isFunction(r)&&(o=r,r="all"),Tt.isFunction(e)&&(o=e,e=this.tronWeb.defaultAddress.hex),o){t.next=11;break}return t.abrupt("return",this.injectPromise(this.getTransactionsRelated,e,r,n,i));case 11:if(["to","from","all"].includes(r)){t.next=13;break}return t.abrupt("return",o('Invalid direction provided: Expected "to", "from" or "all"'));case 13:if("all"!=r){t.next=27;break}return t.prev=14,t.next=17,this.getTransactionsRelated(e,"from",n,i);case 17:return s=t.sent,t.next=20,this.getTransactionsRelated(e,"to",n,i);case 20:return a=t.sent,t.abrupt("return",o(null,N()(s.map(function(t){return t.direction="from",t})).concat(N()(a.map(function(t){return t.direction="to",t}))).sort(function(t,e){return e.raw_data.timestamp-t.raw_data.timestamp})));case 24:return t.prev=24,t.t0=t.catch(14),t.abrupt("return",o(t.t0));case 27:if(this.tronWeb.isAddress(e)){t.next=29;break}return t.abrupt("return",o("Invalid address provided"));case 29:if(!(!Tt.isInteger(n)||n<0||i&&n<1)){t.next=31;break}return t.abrupt("return",o("Invalid limit provided"));case 31:if(Tt.isInteger(i)&&!(i<0)){t.next=33;break}return t.abrupt("return",o("Invalid offset provided"));case 33:e=this.tronWeb.address.toHex(e),this.tronWeb.solidityNode.request("walletextension/gettransactions".concat(r,"this"),{account:{address:e},offset:i,limit:n},"post").then(function(t){var e=t.transaction;o(null,e)}).catch(function(t){return o(t)});case 35:case"end":return t.stop()}},t,this,[[14,24]])}));return function(){return t.apply(this,arguments)}}()},{key:"getAccount",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultAddress.hex),e?this.tronWeb.isAddress(t)?(t=this.tronWeb.address.toHex(t),void this.tronWeb.solidityNode.request("walletsolidity/getaccount",{address:t},"post").then(function(t){e(null,t)}).catch(function(t){return e(t)})):e("Invalid address provided"):this.injectPromise(this.getAccount,t)}},{key:"getBalance",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultAddress.hex),!e)return this.injectPromise(this.getBalance,t);this.getAccount(t).then(function(t){var r=t.balance;e(null,void 0===r?0:r)}).catch(function(t){return e(t)})}},{key:"getBandwidth",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Tt.isFunction(t)&&(e=t,t=this.tronWeb.defaultAddress.hex),e?this.tronWeb.isAddress(t)?(t=this.tronWeb.address.toHex(t),void this.tronWeb.fullNode.request("wallet/getaccountnet",{address:t},"post").then(function(t){var r=t.freeNetUsed,n=void 0===r?0:r,i=t.freeNetLimit,o=void 0===i?0:i,s=t.NetUsed,a=void 0===s?0:s,u=t.NetLimit;e(null,o-n+((void 0===u?0:u)-a))}).catch(function(t){return e(t)})):e("Invalid address provided"):this.injectPromise(this.getBandwidth,t)}},{key:"getTokensIssuedByAddress",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Tt.isFunction(e)&&(r=e,e=this.tronWeb.defaultAddress.hex),r?this.tronWeb.isAddress(e)?(e=this.tronWeb.address.toHex(e),void this.tronWeb.fullNode.request("wallet/getassetissuebyaccount",{address:e},"post").then(function(e){var n=e.assetIssue,i=void 0!==n&&n;if(!i)return r(null,{});var o=i.map(function(e){return t.parseToken(e)}).reduce(function(t,e){return t[e.name]=e,t},{});r(null,o)}).catch(function(t){return r(t)})):r("Invalid address provided"):this.injectPromise(this.getTokensIssuedByAddress,e)}},{key:"getTokenFromID",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r?Tt.isString(e)&&e.length?void this.tronWeb.fullNode.request("wallet/getassetissuebyname",{value:this.tronWeb.fromUtf8(e)},"post").then(function(e){if(!e.name)return r("Token does not exist");r(null,t.parseToken(e))}).catch(function(t){return r(t)}):r("Invalid token ID provided"):this.injectPromise(this.getTokenFromID,e)}},{key:"listNodes",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.listNodes);this.tronWeb.fullNode.request("wallet/listnodes").then(function(r){var n=r.nodes;e(null,(void 0===n?[]:n).map(function(e){var r=e.address,n=r.host,i=r.port;return"".concat(t.tronWeb.toUtf8(n),":").concat(i)}))}).catch(function(t){return e(t)})}},{key:"getBlockRange",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Tt.isFunction(e)&&(r=e,e=30),Tt.isFunction(t)&&(r=t,t=0),r?!Tt.isInteger(t)||t<0?r("Invalid start of range provided"):!Tt.isInteger(e)||e<=t?r("Invalid end of range provided"):void this.tronWeb.fullNode.request("wallet/getblockbylimitnext",{startNum:parseInt(t),endNum:parseInt(e)+1},"post").then(function(t){var e=t.block;r(null,void 0===e?[]:e)}).catch(function(t){return r(t)}):this.injectPromise(this.getBlockRange,t,e)}},{key:"listSuperRepresentatives",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!t)return this.injectPromise(this.listSuperRepresentatives);this.tronWeb.fullNode.request("wallet/listwitnesses").then(function(e){var r=e.witnesses;t(null,void 0===r?[]:r)}).catch(function(e){return t(e)})}},{key:"listTokens",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Tt.isFunction(r)&&(n=r,r=0),Tt.isFunction(e)&&(n=e,e=0),n?!Tt.isInteger(e)||e<0||r&&e<1?n("Invalid limit provided"):!Tt.isInteger(r)||r<0?n("Invalid offset provided"):e?void this.tronWeb.fullNode.request("wallet/getpaginatedassetissuelist",{offset:parseInt(r),limit:parseInt(e)},"post").then(function(e){var r=e.assetIssue;n(null,(void 0===r?[]:r).map(function(e){return t.parseToken(e)}))}).catch(function(t){return n(t)}):this.tronWeb.fullNode.request("wallet/getassetissuelist").then(function(e){var r=e.assetIssue;n(null,(void 0===r?[]:r).map(function(e){return t.parseToken(e)}))}).catch(function(t){return n(t)}):this.injectPromise(this.listTokens,e,r)}},{key:"timeUntilNextVoteCycle",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!t)return this.injectPromise(this.timeUntilNextVoteCycle);this.tronWeb.fullNode.request("wallet/getnextmaintenancetime").then(function(e){var r=e.num,n=void 0===r?-1:r;if(-1==n)return t("Failed to get time until next vote cycle");t(null,Math.floor(n/1e3))}).catch(function(e){return t(e)})}},{key:"getContract",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?this.tronWeb.isAddress(t)?(t=this.tronWeb.address.toHex(t),void this.tronWeb.fullNode.request("wallet/getcontract",{value:t}).then(function(t){if(t.Error)return e("Contract does not exist");e(null,t)}).catch(function(t){return e(t)})):e("Invalid contract address provided"):this.injectPromise(this.getContract,t)}},{key:"sign",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultPrivateKey,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Tt.isFunction(e)&&(r=e,e=this.tronWeb.defaultPrivateKey),!r)return this.injectPromise(this.sign,t,e);if(!Tt.isObject(t))return r("Invalid transaction provided");if(t.signature)return r("Transaction is already signed");try{return this.tronWeb.address.toHex(this.tronWeb.address.fromPrivateKey(e)).toLowerCase()!==t.raw_data.contract[0].parameter.value.owner_address.toLowerCase()?r("Private key does not match address in transaction"):r(null,Tt.crypto.signTransaction(e,t))}catch(t){r(t)}}},{key:"sendRawTransaction",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?Tt.isObject(t)?t.signature&&Tt.isArray(t.signature)?void this.tronWeb.fullNode.request("wallet/broadcasttransaction",t,"post").then(function(t){e(null,t)}).catch(function(t){return e(t)}):e("Transaction is not signed"):e("Invalid transaction provided"):this.injectPromise(this.sendRawTransaction,t)}},{key:"sendTransaction",value:function(){var t=f()(l.a.mark(function t(){var e,r,n,i,o,s,a,u,c=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=c.length>0&&void 0!==c[0]&&c[0],r=c.length>1&&void 0!==c[1]&&c[1],n=c.length>2&&void 0!==c[2]?c[2]:this.tronWeb.defaultPrivateKey,i=c.length>3&&void 0!==c[3]&&c[3],Tt.isFunction(n)&&(i=n,n=this.tronWeb.defaultPrivateKey),i){t.next=7;break}return t.abrupt("return",this.injectPromise(this.sendTransaction,e,r,n));case 7:if(this.tronWeb.isAddress(e)){t.next=9;break}return t.abrupt("return",i("Invalid recipient provided"));case 9:if(Tt.isInteger(r)&&!(r<=0)){t.next=11;break}return t.abrupt("return",i("Invalid amount provided"));case 11:return t.prev=11,o=this.tronWeb.address.fromPrivateKey(n),t.next=15,this.tronWeb.transactionBuilder.sendTrx(e,r,o);case 15:return s=t.sent,t.next=18,this.sign(s,n);case 18:return a=t.sent,t.next=21,this.sendRawTransaction(a);case 21:return u=t.sent,t.abrupt("return",i(null,u));case 25:return t.prev=25,t.t0=t.catch(11),t.abrupt("return",i(t.t0));case 28:case"end":return t.stop()}},t,this,[[11,25]])}));return function(){return t.apply(this,arguments)}}()},{key:"sendToken",value:function(){var t=f()(l.a.mark(function t(){var e,r,n,i,o,s,a,u,c,d=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=d.length>0&&void 0!==d[0]&&d[0],r=d.length>1&&void 0!==d[1]&&d[1],n=d.length>2&&void 0!==d[2]&&d[2],i=d.length>3&&void 0!==d[3]?d[3]:this.tronWeb.defaultPrivateKey,o=d.length>4&&void 0!==d[4]&&d[4],Tt.isFunction(i)&&(o=i,i=this.tronWeb.defaultPrivateKey),o){t.next=8;break}return t.abrupt("return",this.injectPromise(this.sendToken,e,r,n,i));case 8:if(this.tronWeb.isAddress(e)){t.next=10;break}return t.abrupt("return",o("Invalid recipient provided"));case 10:if(Tt.isInteger(r)&&!(r<=0)){t.next=12;break}return t.abrupt("return",o("Invalid amount provided"));case 12:if(Tt.isString(n)){t.next=14;break}return t.abrupt("return",o("Invalid token ID provided"));case 14:return t.prev=14,s=this.tronWeb.address.fromPrivateKey(i),t.next=18,this.tronWeb.transactionBuilder.sendToken(e,r,n,s);case 18:return a=t.sent,t.next=21,this.sign(a,i);case 21:return u=t.sent,t.next=24,this.sendRawTransaction(u);case 24:return c=t.sent,t.abrupt("return",o(null,c));case 28:return t.prev=28,t.t0=t.catch(14),t.abrupt("return",o(t.t0));case 31:case"end":return t.stop()}},t,this,[[14,28]])}));return function(){return t.apply(this,arguments)}}()},{key:"sendAsset",value:function(){return this.sendToken.apply(this,arguments)}},{key:"send",value:function(){return this.sendTransaction.apply(this,arguments)}},{key:"sendTrx",value:function(){return this.sendTransaction.apply(this,arguments)}},{key:"broadcast",value:function(){return this.sendRawTransaction.apply(this,arguments)}},{key:"signTransaction",value:function(){return this.sign.apply(this,arguments)}}]),t}(),Rt=function t(){p()(this,t)},Lt=new Ht.a.utils.AbiCoder,Dt=function(t){return t.name+"("+Kt(t.inputs||[]).join(",")+")"},Kt=function(t){return t.map(function(t){return t.type})},Vt=function(t,e){var r=t.map(function(t){return t.name}).filter(function(t){return!!t}),n=t.map(function(t){return t.type});return Lt.decode(n,e).reduce(function(t,e,i){return"address"==n[i]&&(e="41"+e.substr(2).toLowerCase()),r.length?t[r[i]]=e:t.push(e),t},r.length?{}:[])},zt=function(){function t(e,r){p()(this,t),this.tronWeb=e.tronWeb,this.contract=e,this.abi=r,this.name=r.name,this.inputs=r.inputs||[],this.outputs=r.outputs||[],this.signature=this.tronWeb.sha3(r.name).slice(0,8),this.functionSelector=Dt(r),this.injectPromise=Tt.promiseInjector(this),this.defaultOptions={feeLimit:1e9,callValue:0,from:this.tronWeb.defaultAddress.hex,shouldPollResponse:!0}}return b()(t,[{key:"onMethod",value:function(){for(var t=this,e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];var i=Kt(this.inputs);return r.forEach(function(e,n){"address"==i[n]&&(r[n]=t.tronWeb.address.toHex(e).replace(/^(41)/,"0x"))}),{call:function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return t._call.apply(t,[i,r].concat(n))},send:function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return t._send.apply(t,[i,r].concat(n))},watch:function(){return t._watch.apply(t,arguments)}}}},{key:"_call",value:function(){var t=f()(l.a.mark(function t(e,r){var n,i,o,s,a=this,u=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=u.length>2&&void 0!==u[2]?u[2]:{},i=u.length>3&&void 0!==u[3]&&u[3],Tt.isFunction(n)&&(i=n,n={}),i){t.next=5;break}return t.abrupt("return",this.injectPromise(this._call,e,r,n));case 5:if(e.length===r.length){t.next=7;break}return t.abrupt("return",i("Invalid argument count provided"));case 7:if(this.contract.address){t.next=9;break}return t.abrupt("return",i("Smart contract is missing address"));case 9:if(this.contract.deployed){t.next=11;break}return t.abrupt("return",i("Calling smart contracts requires you to load the contract first"));case 11:if(o=this.abi.stateMutability,["pure","view"].includes(o.toLowerCase())){t.next=14;break}return t.abrupt("return",i('Methods with state mutability "'.concat(o,'" must use send()')));case 14:n=A()({},this.defaultOptions,n),s=r.map(function(t,r){return{type:e[r],value:t}}),this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address,this.functionSelector,n.feeLimit,n.callValue,s,this.tronWeb.address.toHex(n.from),function(t,e){if(t)return i(t);if(!Tt.hasProperty(e,"constant_result"))return i("Failed to execute");try{var r=Vt(a.outputs,"0x"+e.constant_result[0]);return 1===r.length&&(r=r[0]),i(null,r)}catch(t){return i(t)}});case 17:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}()},{key:"_send",value:function(){var t=f()(l.a.mark(function t(e,r){var n,i,o,s,a,u,c,d,h,v,p=this,g=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=g.length>2&&void 0!==g[2]?g[2]:{},i=g.length>3&&void 0!==g[3]?g[3]:this.tronWeb.defaultPrivateKey,o=g.length>4&&void 0!==g[4]&&g[4],Tt.isFunction(i)&&(o=i,i=this.tronWeb.defaultPrivateKey),Tt.isFunction(n)&&(o=n,n={}),o){t.next=7;break}return t.abrupt("return",this.injectPromise(this._send,e,r,n,i));case 7:if(e.length===r.length){t.next=9;break}throw new Error("Invalid argument count provided");case 9:if(this.contract.address){t.next=11;break}return t.abrupt("return",o("Smart contract is missing address"));case 11:if(this.contract.deployed){t.next=13;break}return t.abrupt("return",o("Calling smart contracts requires you to load the contract first"));case 13:if(i&&Tt.isString(i)){t.next=15;break}return t.abrupt("return",o("Invalid private key provided"));case 15:if(s=this.abi.stateMutability,!["pure","view"].includes(s.toLowerCase())){t.next=18;break}return t.abrupt("return",o('Methods with state mutability "'.concat(s,'" must use call()')));case 18:return n=A()({},this.defaultOptions,n),a=r.map(function(t,r){return{type:e[r],value:t}}),t.prev=20,u=this.tronWeb.address.fromPrivateKey(i),t.next=24,this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address,this.functionSelector,n.feeLimit,n.callValue,a,this.tronWeb.address.toHex(u));case 24:if((c=t.sent).result&&c.result.result){t.next=27;break}return t.abrupt("return",o("Unknown error: "+JSON.stringify(c,null,2)));case 27:return t.next=29,this.tronWeb.trx.sign(c.transaction,i);case 29:return d=t.sent,t.next=32,this.tronWeb.trx.sendRawTransaction(d);case 32:if((h=t.sent).result){t.next=35;break}return t.abrupt("return",o("Unknown error: "+JSON.stringify(h,null,2)));case 35:if(n.shouldPollResponse){t.next=37;break}return t.abrupt("return",o(null,d.txID));case 37:(v=function(){var t=f()(l.a.mark(function t(){var e,r,n,i=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(20!=(e=i.length>0&&void 0!==i[0]?i[0]:0)){t.next=3;break}return t.abrupt("return",o({error:"Cannot find result in solidity node",transaction:d}));case 3:return t.next=5,p.tronWeb.trx.getTransactionInfo(d.txID);case 5:if(r=t.sent,Object.keys(r).length){t.next=8;break}return t.abrupt("return",setTimeout(function(){v(e+1)},3e3));case 8:if(!r.result||"FAILED"!=r.result){t.next=10;break}return t.abrupt("return",o({error:p.tronWeb.toUtf8(r.resMessage),transaction:d,output:r}));case 10:if(Tt.hasProperty(r,"contractResult")){t.next=12;break}return t.abrupt("return",o({error:"Failed to execute: "+JSON.stringify(r,null,2),transaction:d,output:r}));case 12:return 1===(n=Vt(p.outputs,"0x"+r.contractResult[0])).length&&(n=n[0]),t.abrupt("return",o(null,n));case 15:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}())(),t.next=44;break;case 41:return t.prev=41,t.t0=t.catch(20),t.abrupt("return",o(t.t0));case 44:case"end":return t.stop()}},t,this,[[20,41]])}));return function(e,r){return t.apply(this,arguments)}}()},{key:"_watch",value:function(){var t=f()(l.a.mark(function t(){var e,r,n,i,o,s=this,a=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=a.length>0&&void 0!==a[0]&&a[0],Tt.isFunction(e)){t.next=3;break}throw new Error("Expected callback to be provided");case 3:if(this.contract.address){t.next=5;break}return t.abrupt("return",e("Smart contract is missing address"));case 5:if("event"===this.abi.type.toLowerCase()){t.next=7;break}return t.abrupt("return",e("Invalid method type for event watching"));case 7:if(this.tronWeb.eventServer){t.next=9;break}return t.abrupt("return",e("No event server configured"));case 9:return r=!1,n=!1,i=function(){var t=f()(l.a.mark(function t(){var e,r,i,o,a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.tronWeb.getEventResult(s.contract.address,s.name);case 3:return e=t.sent,r=e.sort(function(t,e){return e.block-t.block}),i=Ft()(r,1),o=i[0],a=e.filter(function(t,r){return!e.slice(0,r).some(function(e){return JSON.stringify(e)==JSON.stringify(t)})&&(!n||t.block>n)}),o&&(n=o.block),t.abrupt("return",a);case 10:return t.prev=10,t.t0=t.catch(0),t.abrupt("return",Promise.reject(t.t0));case 13:case"end":return t.stop()}},t,this,[[0,10]])}));return function(){return t.apply(this,arguments)}}(),o=function(){r&&clearInterval(r),r=setInterval(function(){i().then(function(t){return t.forEach(function(t){e(null,Tt.parseEvent(t,s.abi))})}).catch(function(t){return e(t)})},3e3)},t.next=15,i();case 15:return o(),t.abrupt("return",{start:o(),stop:function(){r&&(clearInterval(r),r=!1)}});case 17:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}]),t}(),Jt=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(p()(this,t),!e||!e instanceof Mt)throw new Error("Expected instance of TronWeb");this.tronWeb=e,this.injectPromise=Tt.promiseInjector(this),this.address=n,this.abi=r,this.eventListener=!1,this.bytecode=!1,this.deployed=!1,this.lastBlock=!1,this.methods={},this.props=[],this.tronWeb.isAddress(n)?this.deployed=!0:this.address=!1,this.loadAbi(r)}return b()(t,[{key:"_getEvents",value:function(){var t=f()(l.a.mark(function t(){var e,r,n,i,o,s=this;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.tronWeb.getEventResult(this.address);case 2:return e=t.sent,r=e.sort(function(t,e){return e.block-t.block}),n=Ft()(r,1),i=n[0],o=e.filter(function(t,r){return!e.slice(0,r).some(function(e){return JSON.stringify(e)==JSON.stringify(t)})&&(!s.lastBlock||t.block>s.lastBlock)}),i&&(this.lastBlock=i.block),t.abrupt("return",o);case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"_startEventListener",value:function(){var t=f()(l.a.mark(function t(e){var r=this;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.eventListener&&clearInterval(this.eventListener),this.tronWeb.eventServer){t.next=3;break}throw new Error("Event server is not configured");case 3:if(this.address){t.next=5;break}throw new Error("Contract is not configured with an address");case 5:return this.eventCallback=e,t.next=8,this._getEvents();case 8:this.eventListener=setInterval(function(){r._getEvents().then(function(t){return t.forEach(function(t){r.eventCallback&&r.eventCallback(t)})}).catch(function(t){console.error("Failed to get event list",t)})},3e3);case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"_stopEventListener",value:function(){this.eventListener&&(clearInterval(this.eventListener),this.eventListener=!1,this.eventCallback=!1)}},{key:"hasProperty",value:function(t){return this.hasOwnProperty(t)||this.__proto__.hasOwnProperty(t)}},{key:"loadAbi",value:function(t){var e=this;this.abi=t,this.methods={},this.props.forEach(function(t){return delete e[t]}),t.forEach(function(t){var r=new zt(e,t),n=r.onMethod.bind(r),i=r.name,o=r.functionSelector,s=r.signature;e.methods[i]=n,e.methods[o]=n,e.methods[s]=n,e.hasProperty(i)||(e[i]=n,e.props.push(i)),e.hasProperty(o)||(e[o]=n,e.props.push(o)),e.hasProperty(s)||(e[s]=n,e.props.push(s))})}},{key:"new",value:function(){var t=f()(l.a.mark(function t(e){var r,n,i,o,s,a,u=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=u.length>1&&void 0!==u[1]?u[1]:this.tronWeb.defaultPrivateKey,n=u.length>2&&void 0!==u[2]&&u[2],Tt.isFunction(r)&&(n=r,r=this.tronWeb.defaultPrivateKey),n){t.next=5;break}return t.abrupt("return",this.injectPromise(this.new,e,r));case 5:return t.prev=5,i=this.tronWeb.address.fromPrivateKey(r),t.next=9,this.tronWeb.transactionBuilder.createSmartContract(e,i);case 9:return o=t.sent,t.next=12,this.tronWeb.trx.sign(o,r);case 12:return s=t.sent,t.next=15,this.tronWeb.trx.sendRawTransaction(s);case 15:if((a=t.sent).result){t.next=18;break}return t.abrupt("return",n("Unknown error: "+JSON.stringify(a,null,2)));case 18:return t.abrupt("return",this.at(s.contract_address,n));case 21:return t.prev=21,t.t0=t.catch(5),t.abrupt("return",n(t.t0));case 24:case"end":return t.stop()}},t,this,[[5,21]])}));return function(e){return t.apply(this,arguments)}}()},{key:"at",value:function(){var t=f()(l.a.mark(function t(e){var r,n,i=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=i.length>1&&void 0!==i[1]&&i[1]){t.next=3;break}return t.abrupt("return",this.injectPromise(this.at,e));case 3:return t.prev=3,t.next=6,this.tronWeb.trx.getContract(e);case 6:(n=t.sent).contract_address||r("Unknown error: "+JSON.stringify(n,null,2)),this.address=n.contract_address,this.bytecode=n.bytecode,this.deployed=!0,this.loadAbi(n.abi.entrys),r(null,this),t.next=20;break;case 15:if(t.prev=15,t.t0=t.catch(3),!t.t0.toString().includes("does not exist")){t.next=19;break}return t.abrupt("return",r("Contract has not been deployed on the network"));case 19:return t.abrupt("return",r(t.t0));case 20:case"end":return t.stop()}},t,this,[[3,15]])}));return function(e){return t.apply(this,arguments)}}()},{key:"events",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!Tt.isFunction(t))throw new Error("Callback function expected");var e=this;return{start:function(){var r=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r?(e._startEventListener(t).then(function(){r()}).catch(function(t){r(t)}),this):(e._startEventListener(t),this)},stop:function(){e._stopEventListener()}}}}]),t}();r.d(e,"default",function(){return Mt});var Mt=function(){function t(e,r){var n=this,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];p()(this,t),Tt.isString(e)&&(e=new jt.HttpProvider(e)),Tt.isString(r)&&(r=new jt.HttpProvider(r)),this.setFullNode(e),this.setSolidityNode(r),this.setEventServer(i),this.providers=jt,this.BigNumber=Bt.a,this.defaultBlock=!1,this.defaultPrivateKey=!1,this.defaultAddress={hex:!1,base58:!1},["sha3","toHex","toUtf8","fromUtf8","toAscii","fromAscii","toDecimal","fromDecimal","toSun","fromSun","toBigNumber","isAddress","compile","createAccount","address"].forEach(function(e){n[e]=t[e]}),o&&this.setPrivateKey(o),this.transactionBuilder=new Ot(this),this.trx=new Ut(this),this.witness=new Rt(this),this.injectPromise=Tt.promiseInjector(this)}return b()(t,[{key:"setDefaultBlock",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!1===t||"latest"==t||"earliest"==t)return this.defaultBlock=t;if(!Tt.isInteger(t)||!t)throw new Error("Invalid block ID provided");this.defaultBlock=+t}},{key:"setPrivateKey",value:function(t){this.setAddress(this.address.fromPrivateKey(t)),this.defaultPrivateKey=t}},{key:"setAddress",value:function(t){if(!this.isAddress(t))throw new Error("Invalid address provided");var e=this.address.toHex(t),r=this.address.fromHex(t);this.defaultPrivateKey&&this.address.fromPrivateKey!==e&&(this.defaultPrivateKey=!1),this.defaultAddress={hex:e,base58:r}}},{key:"isValidProvider",value:function(t){return Object.values(jt).some(function(e){return t instanceof e})}},{key:"isEventServerConnected",value:function(){return!!this.eventServer&&x.a.get(this.eventServer).then(function(t){var e=t.data;return Tt.hasProperty(e,"_links")}).catch(function(){return!1})}},{key:"setFullNode",value:function(t){if(!this.isValidProvider(t))throw new Error("Invalid full node provided");this.fullNode=t,this.fullNode.setStatusPage("wallet/getnowblock")}},{key:"setSolidityNode",value:function(t){if(!this.isValidProvider(t))throw new Error("Invalid solidity node provided");this.solidityNode=t,this.solidityNode.setStatusPage("walletsolidity/getnowblock")}},{key:"setEventServer",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!1!==t&&!Tt.isValidURL(t))throw new Error("Invalid URL provided for event server");this.eventServer=t}},{key:"currentProviders",value:function(){return{fullNode:this.fullNode,solidityNode:this.solidityNode,eventServer:this.eventServer}}},{key:"currentProvider",value:function(){return this.currentProviders()}},{key:"getEventResult",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!n)return this.injectPromise(this.getEventResult,t,e,r);this.eventServer||n("No event server configured");var i=[];return this.isAddress(t)?e&&!t?n("Usage of event name filtering requires a contract address"):r&&!e?n("Usage of block number filtering requires an event name"):(t&&i.push(this.address.fromHex(t)),e&&i.push(e),r&&i.push(r),x()("".concat(this.eventServer,"/event/contract/").concat(i.join("/"))).then(function(t){var e=t.data,r=void 0!==e&&e;return r?Tt.isArray(r)?n(null,r.map(function(t){return Tt.mapEvent(t)})):n(r):n("Unknown error occurred")}).catch(function(t){return n(t.response.data||t)})):n("Invalid contract address provided")}},{key:"getEventByTransacionID",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?(this.eventServer||e("No event server configured"),x()("".concat(this.eventServer,"/event/transaction/").concat(t)).then(function(t){var r=t.data,n=void 0!==r&&r;return n?Tt.isArray(n)?e(null,n.map(function(t){return Tt.mapEvent(t)})):e(n):e("Unknown error occurred")}).catch(function(t){return e(t.response.data||t)})):this.injectPromise(this.getEventByTransacionID,t)}},{key:"contract",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Jt(this,t,e)}},{key:"isConnected",value:function(){var t=f()(l.a.mark(function t(){var e,r=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=r.length>0&&void 0!==r[0]&&r[0]){t.next=3;break}return t.abrupt("return",this.injectPromise(this.isConnected));case 3:return t.t0=e,t.next=6,this.fullNode.isConnected();case 6:return t.t1=t.sent,t.next=9,this.solidityNode.isConnected();case 9:return t.t2=t.sent,t.next=12,this.isEventServerConnected();case 12:t.t3=t.sent,t.t4={fullNode:t.t1,solidityNode:t.t2,eventServer:t.t3},(0,t.t0)(null,t.t4);case 15:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}],[{key:"sha3",value:function(t){return Object(ot.sha3_256)(t)}},{key:"toHex",value:function(e){if(Tt.isBoolean(e))return t.fromDecimal(+e);if(Tt.isBigNumber(e))return t.fromDecimal(e);if("object"===c()(e))return t.fromUtf8(JSON.stringify(e));if(Tt.isString(e)){if(0===e.indexOf("-0x"))return t.fromDecimal(e);if(0===e.indexOf("0x"))return e;if(!isFinite(e))return t.fromUtf8(e)}return t.fromDecimal(e)}},{key:"toUtf8",value:function(t){return Buffer.from(t,"hex").toString("utf8")}},{key:"fromUtf8",value:function(t){return Buffer.from(t,"utf8").toString("hex")}},{key:"toAscii",value:function(t){return Buffer.from(t,"hex").toString("ascii")}},{key:"fromAscii",value:function(t,e){return Buffer.from(t,"ascii").toString("hex").padEnd(e,"0")}},{key:"toDecimal",value:function(e){return t.toBigNumber(e).toNumber()}},{key:"fromDecimal",value:function(e){var r=t.toBigNumber(e),n=r.toString(16);return r.lessThan(0)?"-0x"+n.substr(1):"0x"+n}},{key:"fromSun",value:function(e){var r=t.toBigNumber(r).div(1e6);return Tt.isBigNumber(e)?r:r.toString(10)}},{key:"toSun",value:function(e){var r=t.toBigNumber(e).times(1e6);return Tt.isBigNumber(e)?r:r.toString(10)}},{key:"toBigNumber",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Tt.isBigNumber(t)?t:!Tt.isString(t)||0!==t.indexOf("0x")&&0!==t.indexOf("-0x")?new Bt.a(t.toString(10),10):new Bt.a(t.replace("0x",""),16)}},{key:"isAddress",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return!!Tt.isString(e)&&(42===e.length?t.isAddress(Tt.crypto.getBase58CheckAddress(Tt.code.hexStr2byteArray(e))):Tt.crypto.isAddressValid(e))}},{key:"compile",value:function(t){}},{key:"createAccount",value:function(){var t=f()(l.a.mark(function t(){var e,r,n=arguments;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.length>0&&void 0!==n[0]&&n[0],r=Tt.accounts.generateAccount(),e&&e(null,r),t.abrupt("return",r);case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"address",get:function(){return{fromHex:function(t){return Tt.isHex(t)?Tt.crypto.getBase58CheckAddress(Tt.code.hexStr2byteArray(t)):t},toHex:function(t){return Tt.isHex(t)?t.toLowerCase():Tt.code.byteArray2hexStr(Tt.crypto.decodeBase58Address(t)).toLowerCase()},fromPrivateKey:function(t){try{return Tt.crypto.pkToAddress(t)}catch(t){return!1}}}}}]),t}();m()(Mt,"providers",jt),m()(Mt,"BigNumber",Bt.a)}]).default;
//# sourceMappingURL=TronWeb.node.js.map

/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js__ = __webpack_require__("../../dist/TronWeb.node.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dist_TronWeb_node_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__ = __webpack_require__("json-stringify-pretty-compact");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_circular_json__ = __webpack_require__("circular-json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_circular_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_circular_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ethers__ = __webpack_require__("ethers");
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

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/helpers/typeof":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "axios":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bignumber.js":
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "circular-json":
/***/ (function(module, exports) {

module.exports = require("circular-json");

/***/ }),

/***/ "elliptic":
/***/ (function(module, exports) {

module.exports = require("elliptic");

/***/ }),

/***/ "ethers":
/***/ (function(module, exports) {

module.exports = require("ethers");

/***/ }),

/***/ "js-sha3":
/***/ (function(module, exports) {

module.exports = require("js-sha3");

/***/ }),

/***/ "json-stringify-pretty-compact":
/***/ (function(module, exports) {

module.exports = require("json-stringify-pretty-compact");

/***/ }),

/***/ "jssha":
/***/ (function(module, exports) {

module.exports = require("jssha");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "source-map-support/register":
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "styled-jsx/style":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "validator":
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map