// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
/**
 *  BigNumber
 *
 *  A wrapper around the BN.js object. We use the BN.js library
 *  because it is used by elliptic, so it is required regardles.
 *
 */
import bn_js from "bn.js";

import {
    isHexString,
    isArrayish,
    hexlify,
    defineReadOnly,
    isType,
    setType,
    checkNew
} from "./ethersUtils";
// var BN = new bn_js.default.BN(-1);
var BN = new bn_js(-1);
function toHex(bn) {
    var value = bn.toString(16);
    if (value[0] === '-') {
        if ((value.length % 2) === 0) {
            return '-0x0' + value.substring(1);
        }
        return "-0x" + value.substring(1);
    }
    if ((value.length % 2) === 1) {
        return '0x0' + value;
    }
    return '0x' + value;
}
function toBN(value) {
    return _bnify(bigNumberify(value));
}
function toBigNumber(bn) {
    return new BigNumber(toHex(bn));
}
function _bnify(value) {
    var hex = value._hex;
    if (hex[0] === '-') {
        return (new bn_js(hex.substring(3), 16)).mul(BN);
    }
    return new bn_js(hex.substring(2), 16);
}
var BigNumber = /** @class */ (function () {
    function BigNumber(value) {
        checkNew(this, BigNumber);
        setType(this, 'BigNumber');
        if (typeof (value) === 'string') {
            if (isHexString(value)) {
                if (value == '0x') {
                    value = '0x0';
                }
                defineReadOnly(this, '_hex', value);
            }
            else if (value[0] === '-' && isHexString(value.substring(1))) {
                defineReadOnly(this, '_hex', value);
            }
            else if (value.match(/^-?[0-9]*$/)) {
                if (value == '') {
                    value = '0';
                }
                defineReadOnly(this, '_hex', toHex(new bn_js(value)));
            }
            else {
                throw new Error('invalid BigNumber string value');
            }
        }
        else if (typeof (value) === 'number') {
            if (parseInt(String(value)) !== value) {
                throw new Error('underflow');
            }
            try {
                defineReadOnly(this, '_hex', toHex(new bn_js(value)));
            }
            catch (error) {
                throw new Error('overflow');
            }
        }
        else if (value instanceof BigNumber) {
            defineReadOnly(this, '_hex', value._hex);
        }
        else if (value.toHexString) {
            defineReadOnly(this, '_hex', toHex(toBN(value.toHexString())));
        }
        else if (value._hex && isHexString(value._hex)) {
            defineReadOnly(this, '_hex', value._hex);
        }
        else if (isArrayish(value)) {
            defineReadOnly(this, '_hex', toHex(new bn_js(hexlify(value).substring(2), 16)));
        }
        else {
            throw new Error('invalid BigNumber value');
        }
    }
    BigNumber.prototype.fromTwos = function (value) {
        return toBigNumber(_bnify(this).fromTwos(value));
    };
    BigNumber.prototype.toTwos = function (value) {
        return toBigNumber(_bnify(this).toTwos(value));
    };
    BigNumber.prototype.abs = function () {
        if (this._hex[0] === '-') {
            return toBigNumber(_bnify(this).mul(BN));
        }
        return this;
    };
    BigNumber.prototype.add = function (other) {
        return toBigNumber(_bnify(this).add(toBN(other)));
    };
    BigNumber.prototype.sub = function (other) {
        return toBigNumber(_bnify(this).sub(toBN(other)));
    };
    BigNumber.prototype.div = function (other) {
        var o = bigNumberify(other);
        if (o.isZero()) {
            throw new Error('division by zero');
        }
        return toBigNumber(_bnify(this).div(toBN(other)));
    };
    BigNumber.prototype.mul = function (other) {
        return toBigNumber(_bnify(this).mul(toBN(other)));
    };
    BigNumber.prototype.mod = function (other) {
        return toBigNumber(_bnify(this).mod(toBN(other)));
    };
    BigNumber.prototype.pow = function (other) {
        return toBigNumber(_bnify(this).pow(toBN(other)));
    };
    BigNumber.prototype.maskn = function (value) {
        return toBigNumber(_bnify(this).maskn(value));
    };
    BigNumber.prototype.eq = function (other) {
        return _bnify(this).eq(toBN(other));
    };
    BigNumber.prototype.lt = function (other) {
        return _bnify(this).lt(toBN(other));
    };
    BigNumber.prototype.lte = function (other) {
        return _bnify(this).lte(toBN(other));
    };
    BigNumber.prototype.gt = function (other) {
        return _bnify(this).gt(toBN(other));
    };
    BigNumber.prototype.gte = function (other) {
        return _bnify(this).gte(toBN(other));
    };
    BigNumber.prototype.isZero = function () {
        return _bnify(this).isZero();
    };
    BigNumber.prototype.toNumber = function () {
        try {
            return _bnify(this).toNumber();
        }
        catch (error) {
            throw new Error('overflow');
        }
        return null;
    };
    BigNumber.prototype.toString = function () {
        return _bnify(this).toString(10);
    };
    BigNumber.prototype.toHexString = function () {
        return this._hex;
    };
    BigNumber.isBigNumber = function (value) {
        return isType(value, 'BigNumber');
    };
    return BigNumber;
}());

export default BigNumber;
export function bigNumberify(value) {
    if (BigNumber.isBigNumber(value)) {
        return value;
    }
    return new BigNumber(value);
}
// exports.bigNumberify = bigNumberify;
