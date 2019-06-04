import utils from 'utils';
import Validator from 'paramValidator';

const Types = {
    a: 'address',
    i: 'integer',
    o: 'object',
    f: 'function'
}

const ParamNames = {
    ta: 'to_address',
    oa: 'owner_address',
    a: 'amount',
    pi: 'Permission_id'

}

const noop = new Function;
const defHandlers = {
    v: noop, // post validation
    s: noop, // post set
    r: noop, // pre request
};

function toHex(value) {
    return ApiBuilder.tronWeb.address.toHex(value);
}

function fromUtf8(value) {
    return ApiBuilder.tronWeb.fromUtf8(value);
}

export default class ApiBuilder {

    static tronWeb;

    constructor(
        args,
        options,
        handlers,
        params,
        optionParams,
        node,
        endpoint,
        method
    ) {
        this.injectPromise = utils.promiseInjector(this);
        this.validator = new Validator(ApiBuilder.tronWeb);
        this.args = args;
        this.types = [];
        this.required = [];
        this.defValues = [];
        this.extraValidation = [];
        for (let o in options) {
            let option = options[o]
            if (!Array.isArray(option))
                option = [option]
            this.types.push(Types[o.substring(0, 1)])
            this.required.push(option[0])
            this.defValues.push(option[1])
            this.extraValidation.push(option[2] || {})
        }
        this.types.reverse();
        this.required.reverse();
        this.defValues.reverse();
        this.extraValidation.reverse();
        this.handlers = Object.assign(defHandlers, handlers);
        this.params = params;
        this.optionParams = optionParams;
        this.node = node === 'f' ? 'fullNode' : 'solidityNode';
        this.endpoint = endpoint;
        this.method = method || 'post';
    }

    run() {
        this.keys = Object.keys(this.args).reverse()
        for (let i = 0; i < this.keys.length; i++) {
            if (i > 0 && this.required[i] < 2) {
                for (let k = i - 1; k >= 0; k--) {
                    if (typeof this.args[this.keys[i]] === this.types[k]) {
                        this.args[this.keys[k]] = this.args[this.keys[i]];
                        this.args[this.keys[i]] = this.defValues[this.keys[i]];
                    }
                }
            }
            if (!this.args[this.keys[i]] && this.defValues[i]) {
                this.args[this.keys[i]] = this.defValues[i]
            }
        }

        for (let i = 0; i < this.keys.length; i++) {
            if (this.required[i]) {
                this.validator.notValid([
                    Object.assign({
                        name: this.keys[i],
                        type: this.types[i],
                        value: this.args[this.keys[i]]
                    }, this.extraValidation[i])
                ], err => {
                    this.error = err
                })
            }
            if (this.error) {
                return this.callback(this.error)
            }
        }

        this.handlers.v(this);

        if (this.error) {
            return this.callback(this.error)
        }

        if (!this.args.options)
            this.args.options = {};

        this.data = {}
        for (let o in this.params) {
            if (this.args[o]) {
                this.data[ParamNames[this.params[o]]] = this.fix(o, this.args[o])
            }
        }
        for (let o in this.optionParams) {
            if (this.args.options[o]) {
                this.data[ParamNames[this.optionParams[o]]] = this.fix(o, this.args.options[o])
            }
        }

        this.handlers.s(this);

        if (this.args.callback) {
            this.call()
        } else {
            return this.call()
        }
    }

    fix(name, val) {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i] === name) {
                switch (this.types[i]) {
                    case 'address':
                        return toHex(val)

                }
            }
        }
        return val
    }

    call() {

        this.apiUrl = `wallet${this.node === 'solidityNode' ? 'solidity' : ''}/${this.endpoint}`

        this.handlers.r(this);

        return ApiBuilder.tronWeb[this.node]
            .request(this.apiUrl, this.data, this.method)
            .then(transaction => {
                if (transaction.Error)
                    return this.callback(transaction.Error);
                if (transaction.result && transaction.result.message) {
                    return this.callback(ApiBuilder.tronWeb.toUtf8(transaction.result.message));
                }
                return this.callback(null, transaction);
            }).catch(err => this.callback(err))

    }

    async callback(err, res) {
        if (this.args.callback) {
            this.args.callback(err, res)
        } else if (err) {
            return Promise.reject(err)
        } else {
            return Promise.resolve(res)
        }

    }
}
