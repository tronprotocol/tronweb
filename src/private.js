import {signTransaction} from './utils/crypto'
import {utils} from 'ethers'
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
export function parseAbi(abiArray,{owner_address,contract_address}){

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
                //console.log('triggerCallBackParams::', triggerCallBackParams);
                let res = await _this.triggerSmartContract(triggerCallBackParams);
                if (res.constant_result) {
                    let coder = new utils.AbiCoder();
                    if (res.constant_result.length) {
                        //let value = res.constant_result[0];
                        let constantArr = res.constant_result.map((item) => {
                            return ('0x' + item);
                        })
                        //console.log(paramOutputTypes, constantArr);
                        res.constant_result = coder.decode(paramOutputTypes, constantArr[0]);
                    }
                }
                return res;

            }

            returnObj[item.name].sendTransaction = async function (transaction, pk) {
                const sign_Transaction = await signTransaction(pk, transaction)

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