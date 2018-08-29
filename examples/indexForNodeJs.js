require('babel-core/register')
const Async = require('async')
const TronWeb = require('../src/index.js')
const api_url = 'http://52.44.75.99:8090'  //请求的http服务地址
const event_server = 'http://52.44.75.99:18889' //请求合约事件服务地址
const tronWeb = new TronWeb(api_url,event_server)
tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY'
tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0'
const getBalance = (cb)=>{
	console.log('====================get balance====================');
	tronWeb.getBalance(tronWeb.defaultAccount).then(res=>{
		consoleEnd(res);
		cb(null,"getBalance")
	})
}

const generateAddressOnClient = (cb)=>{
	console.log('====================generate address on client====================');
	tronWeb.generateAddressOnClient().then(res=>{
		consoleEnd(res)
		cb(null,"generateAddressOnClient")
	})
}

const validateAddress = (cb)=>{
	console.log('====================validate address====================');
	tronWeb.validateAddress(tronWeb.defaultAccount).then(res=>{
		consoleEnd(res)
		cb(null,"validateAddress")
	})
}

const login = (cb)=>{
	console.log('====================login（get address by private key）====================');
	const res = tronWeb.login(tronWeb.defaultPk)
	consoleEnd(res)
	cb(null,"login")
}

const blockNumber = (cb)=>{
	console.log('====================query the latest block====================')
	tronWeb.blockNumber().then(res=>{
		consoleEnd(res)
		cb(null,"blockNumber")
	})
}

const getBlock = (cb)=>{
	console.log('====================query a block by height or hash====================')
	tronWeb.getBlock(333).then(res=>{
		consoleEnd(res)
		cb(null,"getBlock")
	})
}

const getBlockTransactionCount = (cb)=>{
	console.log('====================get the number of transactions in a block====================')
	tronWeb.getBlockTransactionCount(333).then(res=>{
		consoleEnd(res)
		cb(null,"getBlockTransactionCount")
	})
}

const transction = (cb) => {
	console.log('====================send a transaction====================')
	const createTransaction = (cb) => {
		console.log('====================create a transaction====================')
		const to_address = 'TGhepyLuyML5n5jQBTykKqh9od8hQrBDkS'
		tronWeb.createTransaction(to_address,tronWeb.defaultAccount,1000000).then(res=>{
			consoleEnd(res)
			cb(null,res)
		})
	} 
	const signTransaction = (q,cb) => {
		console.log('====================sign transaction====================')
		tronWeb.signTransaction(q,tronWeb.defaultPk).then(res=>{
			consoleEnd(res)
			cb(null,res)
		})	
	}

	const sendRawTransaction = (q,cb) => {
		console.log('====================broadcast transaction====================')
		tronWeb.sendRawTransaction(q).then(res=>{
			consoleEnd(res)
			cb(null,res)
		})	
	}
	Async.waterfall([createTransaction,signTransaction,sendRawTransaction],(err,res)=>{
		cb(null,'transction')
	})
}

const contract = (cb) => {
	console.log('====================contract====================')
	const byteCode = '608060405234801561001057600080fd5b5061014f806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c7fdc70811461005057806361047ff41461007a575b600080fd5b34801561005c57600080fd5b50610068600435610092565b60408051918252519081900360200190f35b34801561008657600080fd5b506100686004356100e0565b600061009d826100e0565b604080518481526020810183905281519293507f71e71a8458267085d5ab16980fd5f114d2d37f232479c245d523ce8d23ca40ed929081900390910190a1919050565b60008115156100f15750600061011e565b81600114156101025750600161011e565b61010e600283036100e0565b61011a600184036100e0565b0190505b9190505600a165627a7a723058208e88cd47ae131179af97eec2ee51201107c09b1f7e55d479262c5ba4ff7b17330029';
	const abi = [{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacciNotify","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacci","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"input","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"Notify","type":"event"}];
	const deployContract = (cb) => {
		console.log('====================deploy a contract====================')
		const options = {
			from:tronWeb.defaultAccount,
			data:byteCode,
			fee_limit:10000000000,
			call_value:0,
			consume_user_resource_percent:30
		};
		tronWeb.contract(abi).new(options,tronWeb.defaultPk)
		.then(res=>{
			consoleEnd(res);
			cb(null,res.address);
		})
		// tronWeb.createTransaction(to_address,tronWeb.defaultAccount,1000000).then(res=>{
		// 	consoleEnd(res)
		// 	cb(null,res)
		// })
	}
	const triggerContract = (address,cb) => {
		console.log('====================trigger a contract====================')
		tronWeb.contract(abi).at(address).then(res=>{
			console.log(res);
			res.fibonacciNotify(7,{fee_limit:700000000000000,call_value:0}).then(res2=>{
				let { transaction,txid,result,constant_result } = res2;
				if(!constant_result){
		            res.fibonacciNotify.sendTransaction(transaction,tronWeb.defaultPk);
		            //监听事件
		            const r = res.Notify();//默认根据合约地址查询，可以输入{eventName:'',blockNum:'',transactionId:''}
	            	r.watch(function(err,result){
		                let eventResult = '';
		                result.forEach((item)=>{
		                    if(item.transaction_id ==transaction.txID){
		                        eventResult = item.result;
		                        r.stopWatching();
		                    }
		                })
		                console.log('eventResult:',eventResult);
		            })
	            }
			})
		})
	}
	Async.waterfall([deployContract,triggerContract],(err,res)=>{
		if(err){
			console.log(err);
		}
		cb(null,'triggerContract')
	}) 
}


Async.series([getBalance,generateAddressOnClient,validateAddress,login,blockNumber,getBlock,
	getBlockTransactionCount,
	transction,contract],(err,result)=>{
	if(err){
		console.log(err)
	}
})

function consoleEnd(res){
	console.log('');
	console.log(res)
	console.log('');
	for (let i = 0 ; i < 4; i++) {
	   let s = '';	
       for (var j = 0 ; j < 3-i; j++) {
           s+=' ';
       }
       for (k = 0 ; k < 2*i+1 ; k++) {
           s+="☆";
       }
       console.log(s)
   	}

   	for (var i = 0 ; i < 3 ; i++) {
   		let s = '';
       	for(var j = 0 ; j <= i ; j++){
           s+=' ';	
       	}
       	for ( var k = 0; k < 5-i*2 ; k ++) {
           s+="☆"
       	}
     	console.log(s);  	
   	}
}

