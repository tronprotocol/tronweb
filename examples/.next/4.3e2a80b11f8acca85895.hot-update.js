webpackHotUpdate(4,{

/***/ "../src/private.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseAbi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethers__ = __webpack_require__("../node_modules/ethers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ethers__);


async function timeInterval(eventName,ms,fn) {
    let timerName = eventName+'_timer';

   return await new Promise((resolve) => {
        window[timerName] =setInterval(()=>{
           fn.then((result)=>{
               resolve(result);
           })
        }, ms);
    });
}
function parseAbi(abiArray,{owner_address,contract_address}){

    let _this = this;
    let returnObj = {};
    returnObj.abi = abiArray;
    abiArray.forEach((item)=>{
        if(item.type =='function') {
            returnObj[item.name] = async function () {
                let arrInputs = item.inputs;
                let arrOutputs = item.outputs;
                let params = [];
                let paramInputTypes = [];
                let paramInputValues = [];
                let paramOutputTypes = [];
                let function_selector = item.name;
                let otherParams = {};
                arrInputs.forEach((itemInput) => {
                    paramInputTypes.push(itemInput.type);
                })
                arrOutputs.forEach((itemOutput) => {
                    paramOutputTypes.push(itemOutput.type);
                })
                function_selector += `(${paramInputTypes.join(',')})`;
                params.push(paramInputTypes, paramInputValues);

                for (let i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'object') {
                        otherParams = arguments[i];
                    } else {
                        paramInputValues.push(arguments[i])
                    }
                }
                let triggerCallBackParams = {
                    owner_address,
                    contract_address,
                    function_selector,
                    parameter: params,
                    fee_limit: otherParams.fee_limit,
                    call_value: otherParams.call_value,
                }
                console.log(otherParams.fee_limit)
                let res = await _this.triggerSmartContract(triggerCallBackParams);
                if (res.constant_result) {
                    let coder = new __WEBPACK_IMPORTED_MODULE_1_ethers__["utils"].AbiCoder();
                    if (res.constant_result.length) {
                        //let value = res.constant_result[0];
                        let constantArr = res.constant_result.map((item) => {
                            return ('0x' + item);
                        })
                        res.constant_result = coder.decode(paramOutputTypes, constantArr[0]);
                    }
                }
                return res;

            }

            returnObj[item.name].sendTransaction = async function (transaction, pk) {
                const sign_Transaction = await Object(__WEBPACK_IMPORTED_MODULE_0__utils_crypto__["signTransaction"])(pk, transaction)

                const sendResult = await _this.sendRawTransaction(sign_Transaction);

                return sendResult;
            }
        }
        if(item.type =='event'){
            returnObj[item.name] =  function({contractAddress = contract_address,eventName,blockNum,transactionId}={}) {
                contractAddress = _this.fromHex(contractAddress);
                let _self = this;
                return {
                    async fn(){
                        let {data} =await  _this.getEventResult({
                            contractAddress,
                            eventName,
                            blockNum,
                            transactionId
                        })
                        return data;
                    },
                    watch(callback){
                         this.fn().then((data)=>{
                             callback('',data)
                         }).catch((e)=>{
                             callback(e.toString())
                         })
                         _self.timer =setInterval(()=>{
                             this.fn().then((data)=>{
                                 callback('',data)
                             }).catch((e)=>{
                                 callback(e.toString())
                             })
                         }, 3000);

                    },
                    async get(callback){
                        this.fn().then((data)=>{
                            callback('',data)
                        }).catch((e)=>{
                            callback(e.toString())
                        })
                    },
                    stopWatching(){
                         clearInterval(_self.timer)
                    }

                }
            }
        }
    })
    return returnObj;
}

/***/ })

})
//# sourceMappingURL=4.3e2a80b11f8acca85895.hot-update.js.map