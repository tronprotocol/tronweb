# TronWeb
* JavaScript SDK that encapsulates the TRON Node HTTP API
* Supports vue or react projects
* Built versions are in the /dist folder

# Installation

* npm: npm install tronweb
* bower: bower install tronweb

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

- 检查地址是否正确
- arguments: 
  * address`string`钱包地址
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
运行结果为：
<p class="demo">
  {"result": true, "message": "Hex string format"}
</p> 




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


## Example
You can run the example with `yarn example` or `npm run-script example`. Don't forget to run `yarn install` beforehand.

## Documentation
* [English](http://doc.tron.network/)
* [Chinese](http://doc.tron.network/)

# GitHub
https://github.com/tronprotocol/tron-web.git

