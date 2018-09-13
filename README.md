# TronWeb

* A JS SDK that encapsulates the TRON HTTP request
* It is best to use in Vue or react projects
* If you want to use it in HTML, you need to execute NPM run build and then UMD modules and ES modules will be generated 

# Installation

First you need to introduce TronWeb into your project, by following the steps below:

* npm: `npm install tronweb`
* bower: `bower install tronweb`

Then you need to instantiate the introduced TronWeb

``` js
  import TronWeb from 'tronweb'
  const api_url = ''  //Requested http service address
  const tronWeb = new TronWeb(api_url)
```

The main network address for our fullnode is http://api.trondapps.org and the test network address is http://testapi.trondapps.org. For custom needs, you can also set up your own private network, but you need to solve cross-domain problems. The `nginx` configuration file is as follows:

```
  upstream fullnodeapi_server {
       ip_hash;
       server 39.105.72.181:8090;
  }
  server {
    listen       80;
    listen       [::]:80;
    server_name  testapi.trondapps.org;
    access_log  /var/log/nginx/server.access.log  main;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 6;
    gzip_types text/css text/javascript application/css application/javascript image/jpeg image/gif image/png;
    gzip_vary on;
    location / {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Headers X-Requested-With,Content-Type,Accept;
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://fullnodeapi_server;
        proxy_redirect off;
    }
    #error_page  404              /404.html;
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
  }
```

## Introduction

## What is Tron-Web?

Based on the TRON chain, Tron-Web encapsulates a layer of APIs that can be used by DAPP developers or exchanges, similar to Ethereum's [web3.js](http://web3.tryblockchain.org/web3-js-in- Action.html). Tron-Web provides a set of web interfaces under the TRON ecosystem.  

### Tron-Web Instance

``` js
  const TronWeb = require('tronweb')
  import TronWeb from 'tronweb'
  const api_url = 'http://52.44.75.99:8090'  //Requested http service address
  const event_server = 'http://52.44.75.99:18889' //Requested contract event service address
  const tronWeb = new TronWeb(api_url,event_server)
  tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';  //Test address
  tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';  //Test private key
  getBalance();
  //Since every call needs to request http service, it will not synchronize the results. Thus, you needs ES7 standard async and wait
  //Get the account balance under an address
  async getBalance(){
    const data = await tronWeb.getBalance(address);
    console.log(data);
  }

  //Or use promise to write
  getBalance(){
    tronWeb.getBalance(address).then(res=>{
      console.log(res);
    })
  }
```

## FAQ

1. Transaction Failure?

A: fee_limit needs to set a quota (no reference value and calculation worth), not too small, otherwise the transaction can not be completed

2. Incorrect parameter type?

A: Ethereum can be automatically converted but TRON must strictly follow the type uint256 (unsigned integer) string. Other types must be passed strictly by type, otherwise the contract method is not executed. Currently, the front end currently types the special value. 



## Tool Methods

The tronweb object provides tool methods for aiding development. The tool methods only need to be instantiated and called. 

### tronWeb.toBigNumber(str)

- Get a very large integer 
- arguments: *str* `string` Large integer in string format (maximum number of js that can be exceeded) 
- return: `string`

``` js
  (()=>{
    const str = '200000000000000000000001';
    const t = tronWeb.toBigNumber(str);
    console.log(t.toString(10))
  })()
```
Operation result:
<p class="demo">
  200000000000000000000001
</p>

### tronWeb.toHex(str)

- Get the hexString of an address account
- arguments: *str*`string` string that needs to be encrypted
- return: `string`

``` js
  (()=>{
    const t = tronWeb.toHex('TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8');
    console.log(t)
  })()
```
Operation result:
<p class="demo">
  41BBC8C05F1B09839E72DB044A6AA57E2A5D414A10
</p>

### tronWeb.fromHex(hexString)

- Restore a hexString
- arguments: 
  * hexString `string` String of wallet after the hexString
- return: `string`

``` js
  (()=>{
    const t = tronWeb.fromHex('41BBC8C05F1B09839E72DB044A6AA57E2A5D414A10');
    console.log(t)
  })()
```
Operation result:
<p class="demo">
    TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8
</p>

### tronWeb.trxToSun(trxCount)

- Convert trx into sun
- arguments: 
  * hexString `string` trx amount
- return: `string`

``` js
  (()=>{
    const t = tronWeb.trxToSun(1);
    console.log(t)
  })()
```
Operation result:
<p class="demo">
    1000000
</p>

### tronWeb.sunToTrx(sunCount)

- Convert sun to trx
- arguments: 
  * sunCount `string` sun amount
- return: `string`

``` js
  (()=>{
    const t = tronWeb.sunToTrx(1000000);
    console.log(t)
  })()
```
Operation result:
<p class="demo">
    1
</p>


## Account Management

### tronWeb.login(privateKey)

- Account Login（Recieve account address via private key）
- arguments: 
  * privateKey `string` private key
- return: `string` 

``` js
  (()=>{
    const address = tronWeb.login('da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0');
    console.log(address);
  })()
```
Operation result:
<p class="demo">
  "TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY"
</p> 

### tronWeb.getBalance(address)

- Get account balance
- arguments: 
  * address `string` address 
- return: `object` 

``` js
  (()=>{
    tronWeb.getBalance().then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation result:
<p class="demo">
  {
    "address": "4149d7c89c24ab0de2830c7fdbaf0d8ab08bf28049",
    "balance": 1000000,
    "create_time": 1534250646000,
    "account_resource": {}
  }
</p> 

### tronWeb.generateAddressOnClient()

- The private key and address are obtained by the local method, although the api is safer. It is recommended to use this method. 
- arguments: null
- return: `object` 

``` js
  (()=>{
    tronWeb.generateAddressOnClient().then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation result:
<p class="demo">
  {
    "privateKey": "5c1e390b8a88d3ab0ee5c74a456cc5c5dbd01589543abdd0e3a10ce4d4e4ddf9",
    "address": "TDTJd2di2TKKm3DJPq5RARf9mNZL66pe1P",
    "hexAddress": "412638b73c5a9603259d17cd9bc77aea0de3d2777c"
  }
</p> 

### tronWeb.validateAddress(address)

- Check if address is correct
- arguments: 
  * address`string`Wallet Address
- return: `object` 

``` js
  (()=>{
    tronWeb.validateAddress(address).then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation result：
<p class="demo">
  {"result": true, "message": "Hex string format"}
</p> 


### tronWeb.updateAccount(account_name,owner_address)

- Modify the account name (only allowed to modify once)
- arguments: 
  * account_name `string` Account Name 
  * owner_address `string` Address 
- return: `object` 

``` js
  (()=>{
    tronWeb.updateAccount('zachary','TYrWfWFGwrWLwNvE4T12aQGeur9UdjQJom').then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation Result:
<p class="demo">
  {"txID":"8d62d51b93d185095434a70db95e330bffc66c9de4f309c278a38e8b8b32939d","raw_data":{"contract":[{"parameter":{"value":{"account_name":"7a61636861727931393839","owner_address":"41fb06b9bb05928825801d4d62ef52cb214bcaac91"},"type_url":"type.googleapis.com/protocol.AccountUpdateContract"},"type":"AccountUpdateContract"}],"ref_block_bytes":"84c4","ref_block_hash":"9678cd04eb63596b","expiration":1532947074000,"timestamp":1532947016618}}
</p> 


## Token Management

### tronWeb.freezeBalance(owner_address,frozen_balance,frozen_duration,resource)

- Freeze the balance to get bandwith or energy
- arguments: 
  * owner_address `string` Address to be frozen 
  * frozen_balance `number` Frozen balance
  * frozen_duration `number` Frozen duration
  * resource `string` Resources acquired after freezing 'BANDWIDTH','ENERGY'
- return: `object` 

``` js
  (()=>{
    let res = await tronWeb.freezeBalance(tronWeb.defaultAccount,1000000,3,'ENERGY');
    this.setState({
        data:res
    })    
  })      
```
Operation result:
<p class="demo">
  {
    "txID": "ef905525f564ca9d72b0676c077e3bf7f3d3ec6f2820e708ad82efe0f3714372",
    "raw_data": {
      "contract": [
        {
          "parameter": {
            "value": {
              "resource": "ENERGY",
              "frozen_duration": 3,
              "frozen_balance": 1000000,
              "owner_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0"
            },
            "type_url": "type.googleapis.com/protocol.FreezeBalanceContract"
          },
          "type": "FreezeBalanceContract"
        }
      ],
      "ref_block_bytes": "7e2e",
      "ref_block_hash": "a2dbc936a42076fe",
      "expiration": 1536312420000,
      "timestamp": 1536312362004
    }
  }
</p>


## Node Query

### tronWeb.listNodes()

- Query api on machine in which node is connected
- @arguments: null
- @return: `object`

``` js
  (()=>{
    tronWeb.listNodes().then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation Result:
<p class="demo">
  {
  "nodes": [
    {"address": {"host": "35322e37382e3132362e3133", "port": 18888}},
    {"address": {"host": "34372e38382e3233302e3133", "port": 18888}},
    {"address": {"host": "38342e3233392e342e3434", "port": 32688}},
    ...
  ]
  }
</p> 


## Block Query

### tronWeb.blockNumber()

- Query newest block
- @arguments: null
- @return: `object`

``` js
  (()=>{
    tronWeb.blockNumber().then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation Result:
<p class="demo">
  {"blockID":"00000000000f89ccb110a269f6d8906caae0f3b8336dcea8490ac900770f03e0","block_header":{"raw_data":{"number":1018316,"txTrieRoot":"0000000000000000000000000000000000000000000000000000000000000000","witness_address":"41b3eec71481e8864f0fc1f601b836b74c40548287","parentHash":"00000000000f89cb194a5a5eb5b7d659e2a44b646f603a19c0ad5a21b3489171","timestamp":1532950878000},"witness_signature":"88df3f09a14553eaf367ba330380cfd9e6bec6c5c28c870aff93dce838f0ed1c378852305c4a4027dd510610875deef85af442a17d1f410d6fe80256d4fc5d9b00"}}
</p> 

### tronWeb.getBlock(hashStringOrBlockNumber)

- Query by block height or hash
- @arguments: 
  * hashStringOrBlockNumber `number` or `string` 
- @return: `object`

``` js
  (()=>{
    tronWeb.getBlock(869015).then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation Result:
<p class="demo">
  {
    "blockID": "00000000000d429759175a43cb3e112d0761ecabf06ef0c253affe1420977651",
    "block_header": {
      "raw_data": {
        "number": 869015,
        "txTrieRoot": "3a51b325df4783649723a8c5d6f09bdfddd2c186a3586f242989c464ae534490",
        "witness_address": "41e40de6895c142ade8b86194063bcdbaa6c9360b6",
        "parentHash": "00000000000d429679bea6d12e9ea903189094d68d7ccd106304d518c08968ef",
        "timestamp": 1532499960000
      },
      "witness_signature": "e590d4dffc4fd41400d144ed84d1e12c53c9d6e022f1fa8bb29e600ad7256b67401cecbb6ad375529d77b5b844b6b87c1a46927888d26bd189ac3f911cb504d001"
    },
    "transactions": [
      {
        "signature": [
          "5b1b5f8ca9fcf38527fc091d74286215286898ca0c5a659423a01de3efed4b080ce4c92397c727cdb9136d290b6e437cc925411ca7594bb91afdc6effb790fb601"
        ],
        "txID": "9d240d0f4e13ad738c7a4345f959e1022df8cff7122f505ac2d290ff8d8db6e5",
        "raw_data": {
          "contract": [
            {
              "parameter": {
                "value": {
                  "amount": 490675654,
                  "owner_address": "414a193c92cd631c1911b99ca964da8fd342f4cddd",
                  "to_address": "412a413a95690306a86e7d1ce612aceea4acb48fdc"
                },
                "type_url": "type.googleapis.com/protocol.TransferContract"
              },
              "type": "TransferContract"
            }
          ],
          "ref_block_bytes": "4295",
          "ref_block_hash": "35df6e30f9d3a5b7",
          "expiration": 1532500254000
        }
      }
    ]
  }
</p> 


### tronWeb.getBlockTransactionCount(hashStringOrBlockNumber)

- Get the number of transactions in a block
- @arguments: 
  * hashStringOrBlockNumber `number` or `string` 
- @return: `object`

``` js
  (()=>{
    tronWeb.getBlockTransactionCount(869015).then(
      res=>{
        console.log(res);
      }
    )
  })()
```
Operation Result:
<p class="demo">
  {
    "count":3
  }
</p> 


## Transaction Management

### tronWeb.createTransaction(to_address,owner_address,amount)

::: tip Important  
  This interface is only responsible for transactions. However, to write data to the blockchain, you need to sign and broadcast two  steps. Otherwise, the transaction cannot be confirmed because the transaction cannot be confirmed.
  <br>Signature Interface [tronWeb.signTransaction(transaction,privacykey,teriminal)](/#tronweb-signtransaction-transaction-privacykey-teriminal)
  <br>Broadcast Interface [tronWeb.sendRawTransaction(signRes)](/#tronweb-sendrawtransaction-signres)
:::

- Create a transfer transaction, if the address to be transferred does not exist, create the account on the blockchain (if the transaction is successful, it will cost 0.1trx)
- arguments: 
  * to_address `string` Transaction Address 
  * owner_address `string` Address from which transaction came 
  * amount `number` The number of transactions, the unit is SUN, 1000000 SUN = 1 TRX  
- return: `object` 

``` js
  (()=>{
    tronWeb.createTransaction('TYrWfWFGwrWLwNvE4T12aQGeur9UdjQJom','TBEWz5zUa7QjvjG3TkXdwwby3HGnkDjfvn',100000).then(res=>{
      console.log(res);
    })
  })()
```

Operation Result:
<p class="demo">
  {"txID":"5d09568658c3433a039f51543d66ea9fd73da9a6358eb4598a6b295a88001364","raw_data":{"contract":[{"parameter":{"value":{"amount":1000000,"owner_address":"415a523b449890854c8fc460ab602df9f31fe4293f","to_address":"4149d7c89c24ab0de2830c7fdbaf0d8ab08bf28049"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"0afb","ref_block_hash":"2cd18aa656137eb6","expiration":1534303419000,"timestamp":1534316612569}}
</p> 


### tronWeb.signTransaction(transaction,privacyKey,teriminal)

- The signature after the transaction results the result
- arguments: 
  * transaction `object` Return result after calling create transaction interface 
  * privacyKey `string` Sender private key
  * teriminal `number` Which end of the signature
- return: `object` 


### tronWeb.sendRawTransaction(signRes)

- 把签名后的结果广播到所有节点
- arguments: signRes `object` 调用签名接口后的返回值
- return: `object` 



### tronWeb.sendTransaction(from,to,amount,privateKey)

- 发送一笔交易到网络，含签名和广播
- arguments: 
  * to_address `string` 交易到的地址 
  * owner_address `string` 交易来自的地址 
  * amount `number` 交易数量，单位为SUN，1000000 SUN = 1 TRX
- return: `object` 

``` js
  (()=>{
    tronWeb.sendTransaction('TJCnKsPa7y5okkXvQAidZBzqx3QyQ6sxMW','TGhepyLuyML5n5jQBTykKqh9od8hQrBDkS',100000,'D95611A9AF2A2A45359106222ED1AFED48853D9A44DEFF8DC7913F5CBA727366').then(res=>{
      console.log(res);
    })
  })()
```

运行结果为：
<p class="demo">
  {
  "result": true, 
  "txID": "0524243711da18044bd59819f4da71e719fc4023d3325159b4f79b69b59957a4",
  "raw_data": {
    "contract": [
      {
        "parameter": {
          "value": {
            "amount": 1000000,
            "owner_address": "41928c9af0651632157ef27a2cf17ca72c575a4d21",
            "to_address": "4149d7c89c24ab0de2830c7fdbaf0d8ab08bf28049"
          },
          "type_url": "type.googleapis.com/protocol.TransferContract"
        },
        "type": "TransferContract"
      }
    ],
    "ref_block_bytes": "17fe",
    "ref_block_hash": "1f722cf060d79faf",
    "expiration": 1535445354000,
    "timestamp": 1535445296092
  },
  "signature": [
    "ede86996ae060432a44b0a7b78f05af74371d22bb5741002e865f3f74f66c6504f2bcab60a6d91f63a392d94863ce1648845bac4950675eea75179e62fdf50e701"
  ]
}
</p> 

### tronWeb.getTransaction(id）

- 通过Id查询交易
- arguments: 
  * id `string` 要查询的id
- return: `object`

``` js
  (()=>{
    tronWeb.getTransaction('f7726f912c6306d0615eb0d8da9adebc59fc5a02e2f87efb036822285185d957').then(
      res=>{
        console.log(res);
      }
    )
  })()
```
运行结果为：

<p class="demo">
  {
    "signature": [
      "8289efe7adef9a26cee8f7b433433256a1253f9de2ff291618c30eb78e47701732f9ef341e486e5f2a4018b778c0637a58a3afcbd57aac0ac98cc15b6ed0f9c800"
    ],
    "txID": "f7726f912c6306d0615eb0d8da9adebc59fc5a02e2f87efb036822285185d957",
    "raw_data": {
      "contract": [
        {
          "parameter": {
            "value": {
              "amount": 1000000,
              "owner_address": "415a523b449890854c8fc460ab602df9f31fe4293f",
              "to_address": "4149d7c89c24ab0de2830c7fdbaf0d8ab08bf28049"
            },
            "type_url": "type.googleapis.com/protocol.TransferContract"
          },
          "type": "TransferContract"
        }
      ],
      "ref_block_bytes": "0afb",
      "ref_block_hash": "2cd18aa656137eb6",
      "expiration": 1534303419000,
      "timestamp": 1534316091306
    }
  }
</p>

## 智能合约

### tronWeb.contract(abiArray).new(options,privateKey)

- 部署合约
- arguments: 
  * abiArray `array` 
  * privateKey `string` 私钥
  * options `object` {from,data,fee_limit,call_value,consume_user_resource_percent} 
  <br>from部署合约的账户地址
  <br>data是compile出来的bytecode
  <br>fee_limit 完成交易所消耗的最大fee
  <br>call_value 每次调用合约花费的fee
  <br>consume_user_resource_percent 指定的使用该合约用户的资源占比，是[0, 100]之间的整数。如果是0，则表示用户不会消耗资源。如果开发者资源消耗完了，才会完全使用用户的资源。  
- return: `object`

其中abiArray和bytecode需要安装工具编译出来：
1. 执行命令 `git clone https://github.com/tronprotocol/tron-demo.git` 
2. 下载完代码之后，`cd SmartContractTools/SimpleWebCompiler`
3. 全局安装`anywhere`启动工具，`npm install -g anywhere` 或 `yarn global add anywhere`，然后在当面路径下执行anywhere命令（鼠标双击直接打开index.html也可以）
4. 此时会自动弹出来一个页面，请按照下图提示操作

  ![/static/img/example.png](./static/img/example.png) 

```
  //示例合约代码
  pragma solidity ^0.4.2;
  contract Fibonacci {
    event Notify(uint input, uint result);
    function fibonacci(uint number) constant returns(uint result) {
        if (number == 0) return 0;
        else if (number == 1) return 1;
        else return Fibonacci.fibonacci(number - 1) + Fibonacci.fibonacci(number - 2);
    }
    function fibonacciNotify(uint number) returns(uint result) {
        result = fibonacci(number);
        Notify(number, result);
    }
  }
```      
运行结果为：

<p class="demo">
  {
    "address": "410a7b5eb67d72405622e0879cfe15214322da7416",
    "abi": [
      {
        "constant": false,
        "inputs": [{"name": "number", "type": "uint256"}],
        "name": "fibonacciNotify",
        "outputs": [{"name": "result", "type": "uint256"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{"name": "number", "type": "uint256"}],
        "name": "fibonacci",
        "outputs": [{"name": "result", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {"indexed": false, "name": "input", "type": "uint256"},
          {"indexed": false, "name": "result", "type": "uint256"}
        ],
        "name": "Notify",
        "type": "event"
      }
    ],
    "transactionHash": "26bd4bcd2d010020bb9e129b6a861b11772a3c8dd609df72c0d3ce52b74d071d",
    "broadCast": true
  }

</p>

### tronWeb.getContract(contractAddress)

- 查询合约
- arguments: 
  * contractAddress `string` 合约地址
- return: `object`

``` js
  (()=>{
    tronWeb.getContract('418be282919ce6c0ab46b183cdbefef12afaeabd82').then(
      res=>{
        console.log(res);
      }
    )
  })()
```
运行结果为：

<p class="demo">
  {
  "bytecode": "608060405234801561001057600080fd5b5061014f806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c7fdc70811461005057806361047ff41461007a575b600080fd5b34801561005c57600080fd5b50610068600435610092565b60408051918252519081900360200190f35b34801561008657600080fd5b506100686004356100e0565b600061009d826100e0565b604080518481526020810183905281519293507f71e71a8458267085d5ab16980fd5f114d2d37f232479c245d523ce8d23ca40ed929081900390910190a1919050565b60008115156100f15750600061011e565b81600114156101025750600161011e565b61010e600283036100e0565b61011a600184036100e0565b0190505b9190505600a165627a7a72305820047c7fefc505e0b3fab1f16d07b210c0386f6d0abe346919ca55bdeee3e292320029",
  "consume_user_resource_percent": 30,
  "origin_address": "41928c9af0651632157ef27a2cf17ca72c575a4d21",
  "abi": {
    "entrys": [
      {
        "outputs": [{"name": "result", "type": "uint256"}],
        "inputs": [{"name": "number", "type": "uint256"}],
        "name": "fibonacciNotify",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "outputs": [{"name": "result", "type": "uint256"}],
        "constant": true,
        "inputs": [{"name": "number", "type": "uint256"}],
        "name": "fibonacci",
        "stateMutability": "View",
        "type": "Function"
      },
      {
        "inputs": [
          {"name": "input", "type": "uint256"},
          {"name": "result", "type": "uint256"}
        ],
        "name": "Notify",
        "type": "Event"
      }
    ]
  },
  "contract_address": "418be282919ce6c0ab46b183cdbefef12afaeabd82"
  }
</p>


### tronWeb.contract(abiArray).at(contractAddress)

- 调用合约
- arguments: 
  * abiArray `array`
  * contractAddress `string` 合约地址 
- return: `object`

``` js
  (()=>{
    let abi = [{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacciNotify","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacci","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"input","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"Notify","type":"event"}];
        let myContract = tronWeb.contract(abi);
        let contractAddress = '418be282919ce6c0ab46b183cdbefef12afaeabd82'
        let contractInstance = await myContract.at(contractAddress);
        let { transaction,txid,result,constant_result } = await contractInstance.fibonacciNotify(7,{
            fee_limit:700000000000000,
            call_value:0
        })
        if(!constant_result){
            let res = await contractInstance.fibonacciNotify.sendTransaction(transaction,this.pk.value);
            //监听事件
            let myEvent = await contractInstance.Notify();//默认根据合约地址查询，可以输入{eventName:'',blockNum:'',transactionId:''}
             myEvent.watch(function(err,result){
                 let eventResult = '';
                 result.forEach((item)=>{
                     if(item.transaction_id ==transaction.txID){
                         eventResult = item.result;
                         myEvent.stopWatching();
                     }
                 })
                 console.log('eventResult:',eventResult);
             });
        }
  })()
```









# Example Usage in React or vue
```
let tronWeb = new TronWeb('https://api.trongrid.io:8090');
tronWeb.setEventServer('https://api.trongrid.io');
tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0'; 

async getBalance(){
        const res = await tronWeb.getBalance(this.account.value);
        this.setState({
            data:res
        })
    }  

```

# GitHub
https://github.com/tronprotocol/tron-web.git
# docs
[document](http://doc.tron.network/)
[官方文档](http://doc.tron.network/)

