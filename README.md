# TronWeb


* A jssdk that encapsulates the TRON HTTP request
* It is best to use in Vue or react projects
* If you want to use it in HTML, you need to execute NPM run build and then UMD modules and ES modules will be generated 

# Install
* npm: npm install tronweb
* bower: bower install tronweb


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

