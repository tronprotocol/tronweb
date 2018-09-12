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
  //或是
  import TronWeb from 'tronweb'
  const api_url = 'http://52.44.75.99:8090'  //请求的http服务地址
  const event_server = 'http://52.44.75.99:18889' //请求合约事件服务地址
  const tronWeb = new TronWeb(api_url,event_server)
  tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';  //测试地址
  tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';  //测试私钥
  getBalance();
  //因为每次调用均需要去请求http服务，不会同步获取结果，需要 ES7标准的 async 和 await
  //获取某个地址下的账户余额
  async getBalance(){
    const data = await tronWeb.getBalance(address);
    console.log(data);
  }

  //或是 使用promise写法
  getBalance(){
    tronWeb.getBalance(address).then(res=>{
      console.log(res);
    })
  }
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

