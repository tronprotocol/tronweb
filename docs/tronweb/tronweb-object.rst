
=================================
tronweb object
=================================

Create an instance of the tronWeb javascript library. In addition to the utility functions, it includes all related modules.

-------
Returns
-------

Object


.. warning::
    Due to the upgrade of the Trongrid product, all Tongrid API access requests must include the API Key parameter. If the Trongrid service is used in Tronweb, the API Key parameter must be set in Tronweb before normal use. The latest Tronweb 3.2.6 version already supports setting API Key parameters, please refer to the following example or refer to `Tronweb Github <https://github.com/tronprotocol/tronweb>`_. For API Key application and use, please refer to document. If the Trongrid service is not used in Tronweb, there is no need to add the API Key.


.. code-block:: javascript

    // The latest version 3.2.6 of Tronweb can set API Key parameters through the setHeader method
    //Example 1
    const TronWeb = require('tronweb')
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    const privateKey = "your private key";
    const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
    tronWeb.setHeader({"TRON-PRO-API-KEY": 'your api key'});

    > tronWeb.trx
    > tronWeb.transactionBuilder
    > tronWeb.utils


    //Example 2
    const TronWeb = require('tronweb')
    const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        headers: { "TRON-PRO-API-KEY": 'your api key' },
        privateKey: 'your private key'
    })
