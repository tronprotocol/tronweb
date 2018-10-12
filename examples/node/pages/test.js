const TronWeb = require('../../../dist/TronWeb.node.js');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.shasta.trongrid.io');
const solidityNode = new HttpProvider('https://api.shasta.trongrid.io');
const eventServer = 'https://api.shasta.trongrid.io';
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const sampleAbi = 
'[{"constant":true,"inputs":[],"name":"res2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacci","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"number","type":"uint256"},{"name":"id","type":"uint256"}],"name":"fibonacciNotify","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"res","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getResult","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"para","type":"uint256"},{"name":"para2","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"input","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"Notify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"res","type":"uint256"}],"name":"Test","type":"event"}]';
const sampleBytecode = '608060405234801561001057600080fd5b50604051604080610241833981016040528051602090910151016001556102058061003c6000396000f30060806040526004361061006c5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633930659c811461007157806361047ff414610098578063664c0568146100b05780636f10e285146100cb578063de292789146100e0575b600080fd5b34801561007d57600080fd5b506100866100f5565b60408051918252519081900360200190f35b3480156100a457600080fd5b506100866004356100fb565b3480156100bc57600080fd5b5061008660043560243561013e565b3480156100d757600080fd5b506100866101cd565b3480156100ec57600080fd5b506100866101d3565b60015481565b600081151561010c57506000610139565b816001141561011d57506001610139565b610129600283036100fb565b610135600184036100fb565b0190505b919050565b6000610149836100fb565b6000819055604080518481526020810186905280820183905290519192507f334a8c740d1d71d154a511bfb57e8f17149a2536f6acb3e8750aedbcbc8fc247919081900360600190a160015460408051918252517f63a242a632efe33c0e210e04e4173612a17efa4f16aa4890bc7e46caece80de09181900360200190a192915050565b60005481565b600054905600a165627a7a72305820f90acbc10d8331cabb20277e5a0c07830d2ab13f389e95a1048c28837f58c04b0029';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);

async function getContract(){
  let res = await tronWeb.contract().at("413c7a6fd5ee0e037b199fe6ae674387e5a37e236b");
  console.log(res);
}

async function deploy_contract(){
  let contract_instance = await tronWeb.contract().new({
    abi:JSON.parse(sampleAbi),
    bytecode:sampleBytecode,
    parameters:[7,8,6]
  })

  console.log(contract_instance.address);//it is a hex string
}

async function triggercontract(){
  let contractInstance = await tronWeb.contract().at("4155f6fb5b41c95b8a672006478807a5ad199be06f");
  //watch event 监听事件
  contractInstance["Notify"]().watch(function(err, res) {
    console.log("error " + err);
    console.log('eventResult:',res);
  });

  contractInstance["Test"]().watch(function(err, res) {
    console.log("error " + err);
    console.log('eventResult:',res);
  });
  let args = {
    callValue:0,
    shouldPollResponse: true
  }

  let result  = await contractInstance["fibonacciNotify"].apply(this, [9,2] ).send(args);
}
// getContract();
deploy_contract();
// var abiarr = JSON.parse(sampleAbi);
// var rta = abiarr.find(
//   (it) => {
//     return it.type === 'constrr';
//   }
// ).inputs;
// var res = rta;
// console.log(rta.length);
// var arr2 = [4,6];


// triggercontract();
