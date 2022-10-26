.. _tronweb-transactionBuilder:

===========================
tronWeb.transactionBuilder
===========================

tronweb.transactionBuilder intro

------------------------------------------------------------------------------

addUpdateData
=====================

add memo to an unsigned transaction

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.addUpdateData(unsignedTransaction,memo);


----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - unsignedTransaction
     - unsigned transaction object
     - JSON
   * - memo
     - memo info
     - string

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  > var txn = await tronWeb.transactionBuilder.sendTrx("TUoHaVjx7n5xz8LwPRDckgFrDWhMhuSuJM", 100, "TUznHJfHe6gdYY7gvWmf6bNZHuPHDZtowf");
  > var nexTxn = await tronWeb.transactionBuilder.addUpdateData(txn,"test");
  > var signedtxn = await tronWeb.trx.sign(nexTxn, privateKey);
  > console.log(nexTxn)
  >{
    visible: false,
    txID: "8c3a4b4c20cfdf8df340905949a8241aee639492e0c4d73f1bf18847346444f1",
    raw_data: {
      contract: [ [Object] ],
      data: "74657374", // this is the HexString of memo
      expiration: 1628073045000,
      ref_block_bytes: "7254",
      ref_block_hash: "c45fff3a6a0347cc",
      timestamp: 1628072986845
    },
    raw_data_hex: "0a0272542208c45fff3a6a0347cc4088d8dc85b12f5204746573745a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541d0b69631440f0a494bb51f7eee68ff5c593c00f0121541ce8a0cf0c16d48bcf22825f6053248df653c89ca186470dd91d985b12f"
  }

.. note::
  The Transaction hash(Transaction ID) will be changed after "addUpdateData" was executed as a new transaction object is generated. Please use the newly generated Transactions for subsequent processes like sign or broadcast. thanks.


------------------------------------------------------------------------------

applyForSR
=====================

Create an unsigned transaction that apply to be an SR and this account balance needs to be at least 9999trx, it will consume 9999trx.

----------
Usage
----------

.. code-block:: javascript
  
  // Format
  tronWeb.transactionBuilder.applyForSR(address, url, options)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - address
     - account address apply for SR in hex format(hexstring or base58)
     - string
   * - url
     - SR URL link
     - string
   * - options
     - The permission Id,optional, for multi-signature use
     - number

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript

  >tronWeb.transactionBuilder.applyForSR("41BF97A54F4B829C4E9253B26024B1829E1A3B1120","www.fortest.com").then(result=>console.log(result))
  41bf97a54f4b829c4e9253b26024b1829e1a3b1120 false
  41bf97a54f4b829c4e9253b26024b1829e1a3b1120 false
  41bf97a54f4b829c4e9253b26024b1829e1a3b1120
  Promise { <pending> }
  > {
    visible: false,
    txID: '388172e15216a6eb216a11ed312c3794ce50dd85873e83767b6c5bea1da78b43',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '499a',
      ref_block_hash: '05853c8ec7523765',
      expiration: 1580963556000,
      timestamp: 1580963496941
    },
    raw_data_hex: '0a02499a220805853c8ec752376540a0d595c6812e5a620805125e0a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5769746e657373437265617465436f6e747261637412280a1541bf97a54f4b829c4e9253b26024b1829e1a3b1120120f7777772e666f72746573742e636f6d70ed8792c6812e'
  }

------------------------------------------------------------------------------

createAsset
=====================

Create an unsigned transaction that issue trc10 token, equivalent to createToken.

----------
Usage
----------

.. code-block:: javascript
  
  const trc_options = {
    name : "test",//Token name, default string
    abbreviation : "tt",//Token name abbreviation, default string
    description : "fortest",//Token description, default string
    url : "www.baidu.com",//Token official website url, default string
    totalSupply : 100000,//Token total supply
    trxRatio : 1, // Define the price by the ratio of trx_num/num
    tokenRatio : 1, // Define the price by the ratio of trx_num/num
    saleStart : 1581047830000,//ICO start time
    saleEnd : 1681047110000,//ICO end time
    freeBandwidth : 0, // The creator's "donated" bandwidth for use by token holders
    freeBandwidthLimit : 0, // Out of `totalFreeBandwidth`, the amount each token holder get
    frozenAmount : 0, //Token staked supply
    frozenDuration : 0,
    // for now there is no default for the following values
    precision : 6,//Precision of issued tokens
    permission_id : 1//Optional, for multi-signature use
  }
  tronWeb.transactionBuilder.createAsset(trc_options, issuerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - trc_options
     - trc_options
     - object
   * - issuerAddress
     - format:hexstring or base58
     - string

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript

  const trc_10_options = {
    name : "test",
    abbreviation : "tt",
    description : "fortest",
    url : "www.baidu.com",
    totalSupply : 100000,
    trxRatio : 1, 
    tokenRatio : 1, 
    saleStart : 1581064352000,
    saleEnd : 1681047110000,
    freeBandwidth : 0, 
    freeBandwidthLimit : 0, 
    frozenAmount : 0,
    frozenDuration : 0,
    precision : 6
  }
  undefined
  > tronWeb.transactionBuilder.createAsset(trc_10_options,"41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: 'abfb7d021a36194b631f395fcfde625c053ea54348551ae83cb2b068f597e835',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'ccdd',
      ref_block_hash: 'dcfd491f536c5c4a',
      expiration: 1581064395000,
      timestamp: 1581064336498
    },
    raw_data_hex: '0a02ccdd2208dcfd491f536c5c4a40f8b1a0f6812e5a8b0108061286010a2f747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e41737365744973737565436f6e747261637412530a1541bf97a54f4b829c4e9253b26024b1829e1a3b11201204746573741a02747420a08d063001380640014880e29df6812e50f082ddb1f630a20107666f7274657374aa010d7777772e62616964752e636f6d70f2e89cf6812e'
  }

------------------------------------------------------------------------------


createProposal
=====================

Create an unsigned transaction that create proposal

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.createProposal(parameters, issuerAddress, options)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - parameters
     - Proposal parameters
     - array
   * - issuerAddress
     - Creator address(format:hexstring or base58)
     - string
   * - options
     - Optional, permission_id for multi-signature use
     - number

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  > tronWeb.transactionBuilder.createProposal([{"key":32,"value":1},{"key":33,"value":11}],"41BF97A54F4B829C4E9253B26024B1829E1A3B1120",1).then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: '771d2fe10099dd2d48e9f874bc7c17a5882c77bca2622fbb695cc59327e1bc08',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'ba3b',
      ref_block_hash: 'e09ff41b96e649f1',
      expiration: 1581050079000,
      timestamp: 1581050021547
    },
    raw_data_hex: '0a02ba3b2208e09ff41b96e649f14098ceb6ef812e5a5e0810125a0a33747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e50726f706f73616c437265617465436f6e747261637412230a1541bf97a54f4b829c4e9253b26024b1829e1a3b112012040820100112040821100b70ab8db3ef812e'
  }

------------------------------------------------------------------------------

.. _createSmartContract:

createSmartContract
=====================

Create an unsigned transaction that deploy smart contract

----------
Usage
----------

.. code-block:: javascript
  
  const options = {
    feeLimit: 1000000000,//The maximum TRX burns for resource consumption（1TRX = 1,000,000SUN）
    callValue: 0,//The TRX transfer to the contract for each call（1TRX = 1,000,000SUN）
    tokenId:"",//The id of trc10 token transfer to the contract (Optional)
    tokenValue:0,//The amount of trc10 token transfer to the contract for each call (Optional)
    userFeePercentage: 10,//Consume user's resource percentage. It should be an integer between [0, 100]. if 0, means it does not consume user's resource until the developer's resource has been used up
    originEnergyLimit: 10,//The maximum resource consumption of the creator in one execution or creation
    abi:"{\"entrys\":[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"bytes3[2]\"}],\"name\":\"bar\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"}]}",//Abi string
    bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060da806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063fce353f6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b5060a9600480360381019080806040019060028060200260405190810160405280929190826002602002808284378201915050505050919291929050505060ab565b005b505600a165627a7a723058202071fb665ee1935fc34d4da0b135d893fe493a26f309e9888084c4842c3ce66b0029",//Bytecode, default hexString
    parameters: "",//The list of the parameters of the constructor, It should be converted hexString after encoded according to ABI encoder. If constructor has no parameter, this can be optional
    name:"Foo",//Contract name string
    permissionId:1//Optional, for multi-signature use
  };
  tronWeb.transactionBuilder.createSmartContract(options,issuerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - options
     - options
     - object
   * - issuerAddress
     - format:hexstring or base58
     - string

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  const l_args = {
    feeLimit: 1000000000,
    callValue: 0,
    tokenId:"",
    tokenValue:0,
    userFeePercentage: 10,
    originEnergyLimit: 10,
    abi:"{\"entrys\":[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"bytes3[2]\"}],\"name\":\"bar\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"}]}",
    bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060da806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063fce353f6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b5060a9600480360381019080806040019060028060200260405190810160405280929190826002602002808284378201915050505050919291929050505060ab565b005b505600a165627a7a723058202071fb665ee1935fc34d4da0b135d893fe493a26f309e9888084c4842c3ce66b0029",
    parameters: "",
    name:"Foo",
    permissionId:1
  };
  tronWeb.transactionBuilder.createSmartContract(l_args,"41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result));
  //Return
  {
    visible: false,
    txID: '6c3b978b0971bf4692411d73f5cc90c43016540fd43e606d5d07e28e494e4a1d',
    contract_address: '412b676c1e8d4905de6e3b2a8b807aa09ab298e153',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'caa6',
      ref_block_hash: 'f58a2b9828611d88',
      expiration: 1581062694000,
      fee_limit: 1000000000,
      timestamp: 1581062634939
    },
    raw_data_hex: '0a02caa62208f58a2b9828611d8840f0c8b8f5812e5aa803081e12a1030a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e747261637412ec020a1541bf97a54f4b829c4e9253b26024b1829e1a3b112012d2020a1541bf97a54f4b829c4e9253b26024b1829e1a3b11201a1a0a1810011a03626172220b1a096279746573335b325d30024001229302608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060da806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063fce353f6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b5060a9600480360381019080806040019060028060200260405190810160405280929190826002602002808284378201915050505050919291929050505060ab565b005b505600a165627a7a723058202071fb665ee1935fc34d4da0b135d893fe493a26f309e9888084c4842c3ce66b0029300a3a03466f6f400a280170bbfbb4f5812e90018094ebdc03'
  }

------------------------------------------------------------------------------

createToken
=====================

Create an unsigned transaction that issue trc10 token

----------
Usage
----------

.. code-block:: javascript
  
  const trc_options = {
    name : "test",//Token name, default string
    abbreviation : "tt",//Token name abbreviation, default string
    description : "fortest",//Token description, default string
    url : "www.baidu.com",//Token official website url, default string
    totalSupply : 100000,//Token total supply
    trxRatio : 1, // Define the price by the ratio of trx_num/num
    tokenRatio : 1, // Define the price by the ratio of trx_num/num
    saleStart : 1581047830000,//ICO start time
    saleEnd : 1681047110000,//ICO end time
    freeBandwidth : 0, // The creator's "donated" bandwidth for use by token holders
    freeBandwidthLimit : 0, // Out of `totalFreeBandwidth`, the amount each token holder get
    frozenAmount : 0, //Token staked supply
    frozenDuration : 0,
    // for now there is no default for the following values
    precision : 6,//Precision of issued tokens
    permission_id : 1//Optional, for multi-signature use
  }
  tronWeb.transactionBuilder.createToken(trc_options, issuerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - options
     - options
     - object
   * - issuerAddress
     - format:hexstring or base58
     - string

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  > const trc_options = {
    name : "test",
    abbreviation : "tt",
    description : "fortest",
    url : "www.baidu.com",
    totalSupply : 100000,
    trxRatio : 1, 
    tokenRatio : 1, 
    saleStart : 1581047830000,
    saleEnd : 1681047110000,
    freeBandwidth : 0, 
    freeBandwidthLimit : 0, 
    frozenAmount : 0,
    frozenDuration : 0,
    precision : 6
  }
  undefined
  >tronWeb.transactionBuilder.createToken(trc_options,"41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: '5a2b16c0436dddd6378a29087ba1e924b9a55f6bc2978554a0830cf741b1c03e',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'b756',
      ref_block_hash: '64bdb1724356ee49',
      expiration: 1581047856000,
      timestamp: 1581047797358
    },
    raw_data_hex: '0a02b756220864bdb1724356ee494080f7aeee812e5a8b0108061286010a2f747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e41737365744973737565436f6e747261637412530a1541bf97a54f4b829c4e9253b26024b1829e1a3b11201204746573741a02747420a08d0630013806400148f0abadee812e50f082ddb1f630a20107666f7274657374aa010d7777772e62616964752e636f6d70eeacabee812e'
  }

------------------------------------------------------------------------------

deleteProposal
=====================

Create a transaction that deletes a proposal

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.deleteProposal(proposalID, issuerAddress, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - proposalID
     - integer type proposal id
     - Integer
   * - issuerAddress
     - proposal issuer address in hex string
     - string
   * - options
     - Optional, permission_id for multi-signature use
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  //example 1
  > tronWeb.transactionBuilder.deleteProposal(1, "41010D3A8E0D80F8C83148240202DD178DF495B7BD", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '1152c19215aaefffe166cf9fcd6a299b06f532f8ec4b62b9804338fbe533308d',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '03cf',
      ref_block_hash: 'ec181002d427df4c',
      expiration: 1581332046000,
      timestamp: 1581331986337
    },
    raw_data_hex: '0a0203cf2208ec181002d427df4c40b0c1f0f5822e5a54081212500a33747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e50726f706f73616c44656c657465436f6e747261637412190a1541010d3a8e0d80f8c83148240202dd178df495b7bd100170a1efecf5822e'
  }

  //example 2
  > tronWeb.transactionBuilder.deleteProposal(1, "TA4mXQ6rMNSBcvd9Kn9LLFS4bbX8b27RCS", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '512a758fc5b87615b10c28f840d72f977286384e77959a421c2470bd580f2845',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '04bb',
      ref_block_hash: 'ca274c26abdb1fc6',
      expiration: 1581332754000,
      timestamp: 1581332694494
    },
    raw_data_hex: '0a0204bb2208ca274c26abdb1fc640d0dc9bf6822e5a54081212500a33747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e50726f706f73616c44656c657465436f6e747261637412190a1541010d3a8e0d80f8c83148240202dd178df495b7bd100170de8b98f6822e'
  }

------------------------------------------------------------------------------

extendExpiration
=====================

Extend unsigned transaction expiration time in seconds.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.extendExpiration(transaction, extension);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - transaction
     - The transaction object
     - JSON
   * - extension
     - Extension of the expiration time in seconds
     - Integer

----------
Returns
----------

object

.. note::
   The Transaction hash(Transaction ID) will be changed after "extendExpiration" was executed as a new transaction object is generated. Please use the newly generated Transactions for subsequent processes like sign or broadcast. thanks.

----------
Example
----------

.. code-block:: javascript
  
  > const transaction = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR");  
  > const extendExpirationObj =  await tronWeb.transactionBuilder.extendExpiration(transaction, 500);
  > const signedtxn = await tronWeb.trx.sign(extendExpirationObj, privateKey);
  console.log(extendExpirationObj);
  > {txID: "a33e940480202c8d38c65a571a699be4e082e40776bab0000103c8cca63f6cb4", raw_data: {}, raw_data_hex: "0a02c9bc2208a506a5de6e7a02c040d0c48fd3822e5a650801…d4fa7b33c9645a2276dc9b192902e2d186470e7b1edd2822e", visible: false}
  txID: "a33e940480202c8d38c65a571a699be4e082e40776bab0000103c8cca63f6cb4"
  raw_data: {contract: Array(1), ref_block_bytes: "c9bc", ref_block_hash: "a506a5de6e7a02c0", expiration: 1581259154000, timestamp: 1581258594535}
  raw_data_hex: "0a02c9bc2208a506a5de6e7a02c040d0c48fd3822e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a15417946f66d0fc67924da0ac9936183ab3b07c811261215418cb2ab880d4fa7b33c9645a2276dc9b192902e2d186470e7b1edd2822e"
  visible: false
  __proto__: Object

------------------------------------------------------------------------------

freezeBalance
=====================

Creates a stake TRX transaction.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.freezeBalance(amount, duration, resource, ownerAddress, receiverAddress, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - amount
     - Amount of TRX (in SUN) to stake.
     - Integer
   * - duration
     - Length in Days to stake TRX for. Minimum of 3 days.
     - Integer
   * - resource
     - Resource that you're staking TRX in order to obtain. Must be either "BANDWIDTH" or "ENERGY".
     - String
   * - ownerAddress (optional)
     - Address of the owner of the TRX to be staked (defaults to caller's default address).
     - String
   * - receiverAddress
     - Address of other user receiving the resource.
     - String
   * - options
     - Optional, permission_id for multi-signature use.
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  //example 1
  > tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(100), 3, "ENERGY", "4115B95D2D2CBCE1B815BA4D2711A3BEA02CBB37F3", "4115B95D2D2CBCE1B815BA4D2711A3BEA02CBB37F3", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '98c21fe22afd4e0badb68f118b1598bbbdf7b7b66028146e48a351e87e3c606a',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'cce3',
      ref_block_hash: 'b356b0ba8cf551ad',
      expiration: 1581261075000,
      timestamp: 1581261017724
    },
    raw_data_hex: '0a02cce32208b356b0ba8cf551ad40b8e484d4822e5a5a080b12560a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e467265657a6542616c616e6365436f6e747261637412200a154115b95d2d2cbce1b815ba4d2711a3bea02cbb37f31080c2d72f1803500170fca481d4822e'
  }
          
  //example 2
  > tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(100), 3, "ENERGY", "TBx5FQGFeLUHPFMkn3BaFxxfVwLy7ffE5k", "TBx5FQGFeLUHPFMkn3BaFxxfVwLy7ffE5k", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: 'acd5988278e27fd5e818eab0d197e8f622c8fd9428457ec7233837a5ba40aacf',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'ccfc',
      ref_block_hash: 'e7ce28d6d85e7e0c',
      expiration: 1581261150000,
      timestamp: 1581261090636
    },
    raw_data_hex: '0a02ccfc2208e7ce28d6d85e7e0c40b0ae89d4822e5a5a080b12560a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e467265657a6542616c616e6365436f6e747261637412200a154115b95d2d2cbce1b815ba4d2711a3bea02cbb37f31080c2d72f1803500170ccde85d4822e'
  }

------------------------------------------------------------------------------

injectExchangeTokens
=====================

Create a transaction to inject tokens into an exchange pair based on Bancor protocol.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.injectExchangeTokens(exchangeID, tokenID, tokenAmount, ownerAddress, options)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - exchangeID
     - non-negative integer exchange id.
     - Integer
   * - tokenID
     - Token id of the token inject.
     - String
   * - tokenAmount
     - The number of token inject.
     - Integer
   * - ownerAddress
     - The address of the creator of the exchange pair.
     - String
   * - options
     - Optional, permission_id for multi-signature use.
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  // Example 1
  > tronWeb.transactionBuilder.injectExchangeTokens(1, "1000003",10000,"410ca7c49aa44d26aabfe7f594c645cf9f17a4ff70",1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: 'cdac0a375d5042042aef204301d67181bb83390ba060b11033a7913221af0ebb',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'ce03',
      ref_block_hash: '620c5f8f84ac6944',
      expiration: 1581261939000,
      timestamp: 1581261879534
    },
    raw_data_hex: '0a02ce032208620c5f8f84ac694440b8c2b9d4822e5a60082a125c0a33747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e45786368616e6765496e6a656374436f6e747261637412250a15410ca7c49aa44d26aabfe7f594c645cf9f17a4ff7010011a073130303030303320904e70eef1b5d4822e'
  } 

  //Example 2
  > tronWeb.transactionBuilder.injectExchangeTokens(1, "1000003",10000,"TB8865sqTQ3qxWqhNQRCBov3KtPXFRPccK",1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: 'a05cace199e2a1d39410adfac5f17a18e63f43bdc78b5840f63a083cbcfa6cb9',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '72a2',
      ref_block_hash: 'd85b910374acd2ed',
      expiration: 1581388404000,
      timestamp: 1581388345878
    },
    raw_data_hex: '0a0272a22208d85b910374acd2ed40a0aae090832e5a60082a125c0a33747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e45786368616e6765496e6a656374436f6e747261637412250a15410ca7c49aa44d26aabfe7f594c645cf9f17a4ff7010011a073130303030303320904e7096e4dc90832e'
  }

------------------------------------------------------------------------------

purchaseAsset
=====================

equivalent to purchaseToken

------------------------------------------------------------------------------

purchaseToken
=====================

Creates an unsigned ICO token purchase transaction

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.purchaseToken(issuerAddress, tokenID, amount, buyer, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - issuerAddress
     - Address issuing the Token.
     - String
   * - tokenID
     - Name of the token, matching the exact capitalization.
     - String
   * - amount
     - Amount of tokens to buy.
     - Integer
   * - buyer
     - Optional address purchasing the tokens.
     - String
   * - options
     - Optional, permission_id for multi-signature use.
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  // Example 1
  >tronWeb.transactionBuilder.purchaseToken("41bf97a54f4b829c4e9253b26024b1829e1a3b1120", "1000088", 100,"41010D3A8E0D80F8C83148240202DD17
  8DF495B7BD", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '9ffe34c87be9e803ca219c05a1e976cdbc1ee63459335a43fbdc290b616fe09f',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '6ce6',
      ref_block_hash: 'e123937572ed7ab5',
      expiration: 1581384000000,
      timestamp: 1581383940593
    },
    raw_data_hex: '0a026ce62208e123937572ed7ab54080c4d38e832e5a7b080912770a3a747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e506172746963697061746541737365744973737565436f6e747261637412390a1541010d3a8e0d80f8c83148240202dd178df495b7bd121541bf97a54f4b829c4e9253b26024b1829e1a3b11201a0731303030303838206470f1f3cf8e832e'
  }

  // Example 2
  > tronWeb.transactionBuilder.purchaseToken("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ", "1000088", 100,"TPnBjYQEMo4Yd4866KCzXdi4a169KGd63n", 1).
  then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: 'b86ac32d981d56ce7aef1461a6e8455c4176d2cb5daa5860d16d3132210ac49b',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '6cfb',
      ref_block_hash: '5ff675a58150b8e0',
      expiration: 1581384063000,
      timestamp: 1581384004388
    },
    raw_data_hex: '0a026cfb22085ff675a58150b8e04098b0d78e832e5a7b080912770a3a747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e506172746963697061746541737365744973737565436f6e747261637412390a1541977c20977f412c2a1aa4ef3d49fee5ec4c31cdfb121541bf97a54f4b829c4e9253b26024b1829e1a3b11201a0731303030303838206470a4e6d38e832e'
  }

------------------------------------------------------------------------------

sendAsset
=====================

Creates an unsigned TRC10 token transfer transaction

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.sendAsset(to, amount, tokenID, from, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - to
     - Address to send Token to.
     - hexString
   * - amount
     - Amount of Token to send.
     - Integer
   * - tokenID
     - ID of the token.
     - String
   * - from
     - Optional address that is transferring the Tokens.	
     - hexString
   * - options
     - Optional, permission_id for multi-signature use.
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.sendAsset("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 100, "1000086", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
  >{
      "visible": false,
      "txID": "0de6f3f2178045456f907ad16c9c67096f47a0b0aee0beafbf9e76f47cce5e2a",
      "raw_data": {
          "contract": [
              {
                  "parameter": {
                      "value": {
                          "amount": 100,
                          "asset_name": "31303030303836",
                          "owner_address": "418840e6c55b9ada326d211d818c34a994aeced808",
                          "to_address": "41d3136787e667d1e055d2cd5db4b5f6c880563049"
                      },
                      "type_url": "type.googleapis.com/protocol.TransferAssetContract"
                  },
                  "type": "TransferAssetContract"
              }
          ],
          "ref_block_bytes": "088e",
          "ref_block_hash": "78d48563585bc6e8",
          "expiration": 1581306912000,
          "timestamp": 1581306853656
      },
      "raw_data_hex": "0a02088e220878d48563585bc6e84080baf2e9822e5a730802126f0a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e736665724173736574436f6e747261637412390a07313030303038361215418840e6c55b9ada326d211d818c34a994aeced8081a1541d3136787e667d1e055d2cd5db4b5f6c88056304920647098f2eee9822e"
  }



------------------------------------------------------------------------------

sendToken
=====================

Creates an unsigned TRC10 token transfer transaction

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.sendToken(to, amount, tokenID, from, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - to
     - Address to send Token to.
     - hexString
   * - amount
     - Amount of Token to send.
     - Integer
   * - tokenID
     - Name of the token, matching the exact capitalization
     - String
   * - from
     - Optional address that is transferring the Tokens.	
     - hexString
   * - options
     - Optional, permission_id for multi-signature use.
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript

  tronWeb.transactionBuilder.sendToken("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 100, "1000086", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
  >{
      "visible": false,
      "txID": "0de6f3f2178045456f907ad16c9c67096f47a0b0aee0beafbf9e76f47cce5e2a",
      "raw_data": {
          "contract": [
              {
                  "parameter": {
                      "value": {
                          "amount": 100,
                          "asset_name": "31303030303836",
                          "owner_address": "418840e6c55b9ada326d211d818c34a994aeced808",
                          "to_address": "41d3136787e667d1e055d2cd5db4b5f6c880563049"
                      },
                      "type_url": "type.googleapis.com/protocol.TransferAssetContract"
                  },
                  "type": "TransferAssetContract"
              }
          ],
          "ref_block_bytes": "088e",
          "ref_block_hash": "78d48563585bc6e8",
          "expiration": 1581306912000,
          "timestamp": 1581306853656
      },
      "raw_data_hex": "0a02088e220878d48563585bc6e84080baf2e9822e5a730802126f0a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e736665724173736574436f6e747261637412390a07313030303038361215418840e6c55b9ada326d211d818c34a994aeced8081a1541d3136787e667d1e055d2cd5db4b5f6c88056304920647098f2eee9822e"
  }

------------------------------------------------------------------------------

sendTrx
=====================

Creates an unsigned TRX transfer transaction

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.sendTrx(to, amount, from, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - to
     - Address to send TRX to, converted to a hex string.
     - hexString
   * - amount
     - Amount of TRX (units in SUN) to send.
     - Integer (units in SUN)
   * - from
     - Optional address that is transferring the Tokens. If left blank, will use the address associated with the private key.	
     - hexString
   * - options
     - The permissions Id
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.sendTrx("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 100, "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
  >{
      "visible": false,
      "txID": "9f62a65d0616c749643c4e2620b7877efd0f04dd5b2b4cd14004570d39858d7e",
      "raw_data": {
          "contract": [
              {
                  "parameter": {
                      "value": {
                          "amount": 100,
                          "owner_address": "418840e6c55b9ada326d211d818c34a994aeced808",
                          "to_address": "41d3136787e667d1e055d2cd5db4b5f6c880563049"
                      },
                      "type_url": "type.googleapis.com/protocol.TransferContract"
                  },
                  "type": "TransferContract"
              }
          ],
          "ref_block_bytes": "0add",
          "ref_block_hash": "6c2763abadf9ed29",
          "expiration": 1581308685000,
          "timestamp": 1581308626092
      },
      "raw_data_hex": "0a020add22086c2763abadf9ed2940c8d5deea822e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a15418840e6c55b9ada326d211d818c34a994aeced808121541d3136787e667d1e055d2cd5db4b5f6c880563049186470ac89dbea822e"
  }


------------------------------------------------------------------------------

tradeExchangeTokens
=====================

Trade tokens on a bancor style exchange.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.tradeExchangeTokens(exchangeID, tokenName, tokenAmountSold, tokenAmountExpected, ownerAddress, options)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - exchangeID
     - non-negative integer exchange id
     - Integer
   * - tokeID
     - tokeID
     - String
   * - tokenAmountSold
     - amount of token actually sold
     - Integer
   * - tokenAmountExpected
     - amount of token expected
     - Integer
   * - ownerAddress
     - token owner address in hex
     - hexString
   * - options
     - The permissions Id
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.tradeExchangeTokens(1, "1000003",1000,1000,"410ca7c49aa44d26aabfe7f594c645cf9f17a4ff70",1).then(result => console.log(result));
  >{
      "visible": false,
      "txID": "545ed6a5eb793fe5903ec177761b2504147e010875644fce321f0dbb28799456",
      "raw_data": {
          "contract": [
              {
                  "parameter": {
                      "value": {
                          "exchange_id": 1,
                          "token_id": "31303030303033",
                          "expected": 1000,
                          "owner_address": "410ca7c49aa44d26aabfe7f594c645cf9f17a4ff70",
                          "quant": 1000
                      },
                      "type_url": "type.googleapis.com/protocol.ExchangeTransactionContract"
                  },
                  "type": "ExchangeTransactionContract"
              }
          ],
          "ref_block_bytes": "c778",
          "ref_block_hash": "db086b31f0f10f69",
          "expiration": 1581650238000,
          "timestamp": 1581650180365
      },
      "raw_data_hex": "0a02c7782208db086b31f0f10f6940b0b4cd8d842e5a68082c12640a38747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e45786368616e67655472616e73616374696f6e436f6e747261637412280a15410ca7c49aa44d26aabfe7f594c645cf9f17a4ff7010011a073130303030303320e80728e807708df2c98d842e"
  }

------------------------------------------------------------------------------

triggerConfirmedConstantContract
==================================

Trigger the read-only function of the contract ( they are the contract function which decorated by the pure and view modifiers), the query result is a non-solidified state.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.triggerConfirmedConstantContract(contractAddress,functions, options,parameter,issuerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - contractAddress
     - The smart contract address.
     - hexString
   * - function
     - Function call, must not leave a blank space
     - String
   * - options
     - Permission id, feeLimit, callValue
     - JSON
   * - parameter
     - The parameter passed to 'function'
     - Array
   * - issuerAddress
     - token owner address in hex
     - hexString

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  const parameter = []
  const options = {
    feeLimit:100000000,
    callValue:0
  }
  const transaction = await tronWeb.transactionBuilder.triggerConfirmedConstantContract("419e62be7f4f103c36507cb2a753418791b1cdc182", "name()", options,
      parameter,"417946F66D0FC67924DA0AC9936183AB3B07C81126");
  >{
      "result": {
          "result": true
      },
      "transaction": {
          "visible": false,
          "txID": "72db144b8594a3f0ae01e89bc04f72eaede81d6b8ab3898f7c49279c9e8dcdac",
          "raw_data": {
              "contract": [
                  {
                      "parameter": {
                          "value": {
                              "data": "a9059cbb000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e679775590000000000000000000000000000000000000000000000000000000000000064",
                              "owner_address": "417946f66d0fc67924da0ac9936183ab3b07c81126",
                              "contract_address": "419e62be7f4f103c36507cb2a753418791b1cdc182"
                          },
                          "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                      },
                      "type": "TriggerSmartContract"
                  }
              ],
              "ref_block_bytes": "0cc5",
              "ref_block_hash": "d250de868585420b",
              "expiration": 1581310149000,
              "fee_limit": 1000000000,
              "timestamp": 1581310092216
          },
          "raw_data_hex": "0a020cc52208d250de868585420b408883b8eb822e5aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a15417946f66d0fc67924da0ac9936183ab3b07c811261215419e62be7f4f103c36507cb2a753418791b1cdc1822244a9059cbb000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e67977559000000000000000000000000000000000000000000000000000000000000006470b8c7b4eb822e90018094ebdc03"
      }
  }

------------------------------------------------------------------------------

triggerConstantContract
=========================

Trigger the read-only function of the contract ( they are the contract function which decorated by the pure and view modifiers), the query result is a solidified state.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.triggerConstantContract(contractAddress,functions, options,parameter,issuerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - contractAddress
     - The smart contract address.
     - hexString
   * - function
     - Function call, must not leave a blank space
     - String
   * - options
     - Permission id
     - JSON
   * - parameter
     - The parameter passed to 'function'
     - Array
   * - issuerAddress
     - token owner address in hex
     - hexString

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  const parameter1 = [{ type: 'address', value: 'TV3nb5HYFe2xBEmyb3ETe93UGkjAhWyzrs' }, { type: 'uint256', value: 100 }];
  const transaction = await tronWeb.transactionBuilder.triggerConstantContract("419e62be7f4f103c36507cb2a753418791b1cdc182", "transfer(address,uint256)", {}, parameter1, "417946F66D0FC67924DA0AC9936183AB3B07C81126");
  >{
      "result": {
          "result": true
      },
      "energy_used": 29631,
      "constant_result": [
          "0000000000000000000000000000000000000000000000000000000000000000"
      ],
      "logs": [
          {
              "address": "9e62be7f4f103c36507cb2a753418791b1cdc182",
              "data": "0000000000000000000000000000000000000000000000000000000000000064",
              "topics": [
                  "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  "0000000000000000000000007946f66d0fc67924da0ac9936183ab3b07c81126",
                  "000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e67977559"
              ]
          }
      ],
      "transaction": {
          "ret": [
              {}
          ],
          "visible": false,
          "txID": "5c280444c82f3050e4b0c672ab98bae264830d80b09db6c861b31699f6bcaaa8",
          "raw_data": {
              "contract": [
                  {
                      "parameter": {
                          "value": {
                              "data": "a9059cbb000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e679775590000000000000000000000000000000000000000000000000000000000000064",
                              "owner_address": "417946f66d0fc67924da0ac9936183ab3b07c81126",
                              "contract_address": "419e62be7f4f103c36507cb2a753418791b1cdc182"
                          },
                          "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                      },
                      "type": "TriggerSmartContract"
                  }
              ],
              "ref_block_bytes": "3d8f",
              "ref_block_hash": "316b196f79afe0dc",
              "expiration": 1649655780000,
              "timestamp": 1649655730243
          },
          "raw_data_hex": "0a023d8f2208316b196f79afe0dc40a0a596b981305aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a15417946f66d0fc67924da0ac9936183ab3b07c811261215419e62be7f4f103c36507cb2a753418791b1cdc1822244a9059cbb000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e67977559000000000000000000000000000000000000000000000000000000000000006470c3a093b98130"
      }
  }

------------------------------------------------------------------------------

triggerSmartContract
=====================

returns TransactionExtention, which contains the unsigned Transaction

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.triggerSmartContract(contractAddress,functions, options,parameter,issuerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - contractAddress
     - The smart contract address.
     - hexString
   * - function
     - Function call, must not leave a blank space
     - String
   * - options
     - To set feeLimit, callValue, tokenValue and tokenId ,Permission_id value.
     - JSON
   * - parameter
     - The parameter passed to 'function'
     - Array
   * - issuerAddress
     - token owner address in hex
     - hexString

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  var parameter = [{type:'address',value:'TV3nb5HYFe2xBEmyb3ETe93UGkjAhWyzrs'},{type:'uint256',value:100}];
  var options = {
          feeLimit:100000000,
          callValue:0,
          tokenValue:10,
          tokenId:1000001
      };
  const transaction = await tronWeb.transactionBuilder.triggerSmartContract("419e62be7f4f103c36507cb2a753418791b1cdc182", "transfer(address,uint256)", options,
      parameter,"417946F66D0FC67924DA0AC9936183AB3B07C81126");
  >{
      "result": {
          "result": true
      },
      "transaction": {
          "visible": false,
          "txID": "482b1a3b61894f75ea25bd10b14335a4db86c7e2c642ae07abc5a8ae45fb0027",
          "raw_data": {
              "contract": [
                  {
                      "parameter": {
                          "value": {
                              "data": "a9059cbb000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e679775590000000000000000000000000000000000000000000000000000000000000064",
                              "token_id": 1000001,
                              "owner_address": "417946f66d0fc67924da0ac9936183ab3b07c81126",
                              "call_token_value": 10,
                              "contract_address": "419e62be7f4f103c36507cb2a753418791b1cdc182"
                          },
                          "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                      },
                      "type": "TriggerSmartContract"
                  }
              ],
              "ref_block_bytes": "3a27",
              "ref_block_hash": "83ca272ba6030b83",
              "expiration": 1581935001000,
              "fee_limit": 100000000,
              "timestamp": 1581934943649
          },
          "raw_data_hex": "0a023a27220883ca272ba6030b8340a8fbb195852e5ab401081f12af010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374127a0a15417946f66d0fc67924da0ac9936183ab3b07c811261215419e62be7f4f103c36507cb2a753418791b1cdc1822244a9059cbb000000000000000000000000d148171f1ceeeb40d668c47d70e7e94e679775590000000000000000000000000000000000000000000000000000000000000064280a30c1843d70a1bbae95852e900180c2d72f"
      }
  }

------------------------------------------------------------------------------

unfreezeBalance
=====================

Creates an unsigned unfreeze TRX transaction. This unfreezes TRX for the specified resource. If you unfreeze for BANDWIDTH, it removes TRON POWER, which also removes VOTES. If the bandwidth is already spent, the account will be negative for bandwidth.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.unfreezeBalance(resource, ownerAddress, receiverAddress, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - resource
     - Specifying the resource type. Must be either "BANDWIDTH" or "ENERGY".
     - String
   * - address (optional)
     - Address of the owner of the TRX to be unstaked (defaults to caller's default address).(format:hexstring or base58)
     - String
   * - receiver address
     - Address of user in which the resource is being removed from, due to unstake.(hexstring or base58)
     - String
   * - options
     - The permission Id,for multi-signature use
     - Number

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  >tronWeb.transactionBuilder.unfreezeBalance("BANDWIDTH","41BF97A54F4B829C4E9253B26024B1829E1A3B1120","41BF97A54F4B829C4E9253B26024B1829E1A3B1120",1).then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: '2ba070338263eecbec034aac62a0a9b906a033ac34eb3e183cc7ccc2c4d1fb20',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'afa9',
      ref_block_hash: 'd25a977d06b9fb63',
      expiration: 1581312834000,
      timestamp: 1581312774685
    },
    raw_data_hex: '0a02afa92208d25a977d06b9fb6340d0f3dbec822e5a53080c124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e556e667265657a6542616c616e6365436f6e747261637412170a1541bf97a54f4b829c4e9253b26024b1829e1a3b1120709da4d8ec822e'
  }

------------------------------------------------------------------------------

updateSetting
=====================

Create an unsigned transaction that update the consume_user_resource_percent parameter of a smart contract

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.updateSetting(contract_address,consume_user_resource_percent,owner_address, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - contract_address
     - Smart Contract address string(format: hexstring or base58)
     - String
   * - consume_user_resource_percent
     - The percentage of smart contract execution fee paid for by smart contract user. Also known as User Pay Ratio.
     - Number
   * - owner_address
     - Smart contract creator's address(format: hexstring or base58)
     - String
   * - options
     - The permission Id
     - Number

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  >tronWeb.transactionBuilder.updateSetting("TBQ8ubHnwWAZvHVPJevnKpEfabetDdaQdQ",40,"TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ",1).then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: 'eb9ce3d85c033e16e4dd0058d2bdff06857379b534839193bf982c05adebd271',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '19c3',
      ref_block_hash: '610212ce583a92aa',
      expiration: 1581320133000,
      timestamp: 1581320074559
    },
    raw_data_hex: '0a0219c32208610212ce583a92aa4088b399f0822e5a6a082112660a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e55706461746553657474696e67436f6e747261637412300a1541bf97a54f4b829c4e9253b26024b1829e1a3b11201215410faf1b6bce9e815555544aea9d350f9d3dc6d3ba182870bfea95f0822e'
  }

------------------------------------------------------------------------------

updateAsset
=====================

Create an unsigned transaction that update trc10 token information,equivalent to createtoken

----------
Usage
----------

.. code-block:: javascript
  
  const options = {
    description:"justfortest",//The description of token, default String
    url:"www.cctv.com",//The token's website url, default String
    freeBandwidth:1000000,//Each token holder's free bandwidth,default number
    freeBandwidthLimit:100,//The total free bandwidth of the token
    permissionId:1//Optional, for multi-signature use
  }
  tronWeb.transactionBuilder.updateAsset(options, issuerAddress)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - options
     - a object that contain some parameters
     - Object
   * - issuerAddress
     - address of the token issuer,format: hexstring or base58
     - String

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  > const createasset = {
    description:"justfortest",
    url:"www.cctv.com",
    freeBandwidth:1000000,
    freeBandwidthLimit:100,
    permissionId:1
  }
  >tronWeb.transactionBuilder.updateAsset(createasset,"TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ").then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: '009e8b45c34fbccf86d3f8d1f5e52d694c40b14550289a49048e9ba64799520f',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '21ca',
      ref_block_hash: '65b258d979c2d3f8',
      expiration: 1581326298000,
      timestamp: 1581326241240
    },
    raw_data_hex: '0a0221ca220865b258d979c2d3f84090d791f3822e5a72080f126c0a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5570646174654173736574436f6e747261637412380a1541bf97a54f4b829c4e9253b26024b1829e1a3b1120120b6a757374666f72746573741a0c7777772e636374762e636f6d20c0843d2864280170d89b8ef3822e'
  }

------------------------------------------------------------------------------

updateBrokerage
=====================

Create an unsigned transaction that updates the Super representative brokerage

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.updateBrokerage(brokerage,ownerAddress);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - brokerage
     - An integer which defines percentage of the brokerage
     - Number
   * - ownerAddress
     - Account address
     - String

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  >tronWeb.transactionBuilder.updateBrokerage(100,"414A193C92CD631C1911B99CA964DA8FD342F4CDDD").then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: '754bfc80cf42aa3154fda717262b0ade47ff64b108ad0fdc5f9236d5d4b0ae8a',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'c466',
      ref_block_hash: '150f95204fc606c0',
      expiration: 1581328767000,
      timestamp: 1581328708518
    },
    raw_data_hex: '0a02c4662208150f95204fc606c04098b0a8f4822e5a55083112510a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e55706461746542726f6b6572616765436f6e747261637412190a15414a193c92cd631c1911b99ca964da8fd342f4cddd106470a6e7a4f4822e'
  }

------------------------------------------------------------------------------

updateEnergyLimit
=====================


----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.updateEnergyLimit(contract_address, origin_energy_limit, owner_address,options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - contract_address
     - Smart Contract address,format:hestring or base58
     - String
   * - origin_energy_limit
     - The maximum resource consumption of the creator in one execution or creation
     - Number
   * - owner_address
     - Smart contract creator's address,format:hestring or base58
     - String
   * - options
     - Optional, for multi-signature use
     - Number

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  > tronWeb.transactionBuilder.updateEnergyLimit("TBQ8ubHnwWAZvHVPJevnKpEfabetDdaQdQ",30,"TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ",1).then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: 'b17022e101f964e0f1b413e0862ca8a3ca6c7e48f39b1765103ca59bd3a84f0a',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '2782',
      ref_block_hash: '6309a83565218acf',
      expiration: 1581330690000,
      timestamp: 1581330630613
    },
    raw_data_hex: '0a02278222086309a83565218acf40d0df9df5822e5a6e082d126a0a36747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e557064617465456e657267794c696d6974436f6e747261637412300a1541bf97a54f4b829c4e9253b26024b1829e1a3b11201215410faf1b6bce9e815555544aea9d350f9d3dc6d3ba181e70d58f9af5822e'
  }

------------------------------------------------------------------------------

updateToken
=====================

Create an unsigned transaction that update trc10 token information

----------
Usage
----------

.. code-block:: javascript

  const options = {
    description:"justfortest",//The description of token, default String
    url:"www.cctv.com",//The token's website url, default String
    freeBandwidth:1000000,//Each token holder's free bandwidth,default number
    freeBandwidthLimit:100,//The total free bandwidth of the token
    permissionId:1//Optional, for multi-signature use
  }
  tronWeb.transactionBuilder.updateToken(options, issuerAddress)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - options
     - a object that contain some parameters
     - Object
   * - issuerAddress
     - address of the token issuer,format: hexstring or base58
     - String

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  > const createasset = {
    description:"justfortest",
    url:"www.cctv.com",
    freeBandwidth:1000000,
    freeBandwidthLimit:100,
    permissionId:1
  }
  >tronWeb.transactionBuilder.updateToken(createasset,"TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ").then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: '009e8b45c34fbccf86d3f8d1f5e52d694c40b14550289a49048e9ba64799520f',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '21ca',
      ref_block_hash: '65b258d979c2d3f8',
      expiration: 1581326298000,
      timestamp: 1581326241240
    },
    raw_data_hex: '0a0221ca220865b258d979c2d3f84090d791f3822e5a72080f126c0a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5570646174654173736574436f6e747261637412380a1541bf97a54f4b829c4e9253b26024b1829e1a3b1120120b6a757374666f72746573741a0c7777772e636374762e636f6d20c0843d2864280170d89b8ef3822e'
  }

------------------------------------------------------------------------------

vote
=====================

Create an unsigned transaction that vote for witnesses

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.vote( votes = {srAddress : voteCount}, voterAddress = this.tronWeb.defaultAddress.hex);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - votes
     - dictionary of SR address : vote count key-value pair (SR address format: hexstring or base58)
     - Object
   * - voterAddress
     - voter address,format:hexstring or base58
     - String
   * - option
     - The permission Id,optional, for multi-signature use
     - Number

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  >tronWeb.transactionBuilder.vote({"TGj1Ej1qRzL9feLTLhjwgxXF4Ct6GTWg2U":1,"TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH":1},"TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ",1).then(result=>console.log(result))
  Promise { <pending> }
  > {
    visible: false,
    txID: 'e214267985087a1820a8533586f5c7db010084f8caa109f967a57e8fbc035a1b',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '1dca',
      ref_block_hash: 'cb1fd6e2719cef8c',
      expiration: 1581399042000,
      timestamp: 1581398984483
    },
    raw_data_hex: '0a021dca2208cb1fd6e2719cef8c40d0cfe995832e5a860108041281010a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e566f74655769746e657373436f6e7472616374124d0a1541bf97a54f4b829c4e9253b26024b1829e1a3b112012190a15414a193c92cd631c1911b99ca964da8fd342f4cddd100112190a154178c842ee63b253f8f0d2955bbc582c661a078c9d100170a38ee695832e'
  }

------------------------------------------------------------------------------

voteProposal
=====================

Create an unsigned transaction that to approve a proposal

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.voteProposal(proposalID, hasApproval, voterAddress, options)

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - proposalID
     - integer type proposal id
     - Integer
   * - hasApproval
     - Approving the proposal or not. Can only be "true" or "false".
     - String
   * - issuerAddress
     - The address that makes the approve action ,format:hexstring or base58
     - String
   * - options
     - The permission Id
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  >tronWeb.transactionBuilder.voteProposal(32,true,"TNDFkUNA2TukukC1Moeqj61pAS53NFchGF", 1).then(result=>console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: 'e214267985087a1820a8533586f5c7db010084f8caa109f967a57e8fbc035a1b',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '1dca',
      ref_block_hash: 'cb1fd6e2719cef8c',
      expiration: 1581399042000,
      timestamp: 1581398984483
    },
    raw_data_hex: '0a021dca2208cb1fd6e2719cef8c40d0cfe995832e5a860108041281010a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e566f74655769746e657373436f6e7472616374124d0a1541bf97a54f4b829c4e9253b26024b1829e1a3b112012190a15414a193c92cd631c1911b99ca964da8fd342f4cddd100112190a154178c842ee63b253f8f0d2955bbc582c661a078c9d100170a38ee695832e'
  }

------------------------------------------------------------------------------

withdrawBlockRewards
=====================

Creates an unsigned Super Representative award balance withdrawal transaction.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.withdrawBlockRewards(address, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - address
     - Optional address of SR’s withdrawal account.
     - String
   * - options
     - Optional, permission_id for multi-signature use.
     - Object

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
  
  //Example 1
  >tronWeb.transactionBuilder.withdrawBlockRewards("41f1a0466076c57c9f6d07decc86021ddbf8bae0b2", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '148f2813c2ad76a2f487b3ef402401f7907a8157d9edd60d50f122a8b324dc4e',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '37d9',
      ref_block_hash: 'c1d5f084d21183b5',
      expiration: 1581343245000,
      timestamp: 1581343187719
    },
    raw_data_hex: '0a0237d92208c1d5f084d21183b540c8859cfb822e5a53080d124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e576974686472617742616c616e6365436f6e747261637412170a1541f1a0466076c57c9f6d07decc86021ddbf8bae0b27087c698fb822e'
  }
          
  //Example 2
  >tronWeb.transactionBuilder.withdrawBlockRewards("TXzorPLynzrRLyfMNXHsGU86doJCad3bQi", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '04959cc5e0f1836b92e99063ff5d632293cb4cfef9b443ce493253c8b99f2a8a',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '38cf',
      ref_block_hash: 'f15243134137dc9c',
      expiration: 1581343983000,
      timestamp: 1581343924685
    },
    raw_data_hex: '0a0238cf2208f15243134137dc9c40988bc9fb822e5a53080d124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e576974686472617742616c616e6365436f6e747261637412170a1541f1a0466076c57c9f6d07decc86021ddbf8bae0b270cdc3c5fb822e'
  }

------------------------------------------------------------------------------

withdrawExchangeTokens
=========================

Create a transaction to withdraw tokens from an exchange pair based on Bancor protocol.

----------
Usage
----------

.. code-block:: javascript
  
  tronWeb.transactionBuilder.withdrawExchangeTokens(exchangeID, tokenID, tokenAmount, ownerAddress, options);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - exchangeID
     - non-negative integer exchange id.
     - Integer
   * - tokenID
     - Token id of the token inject.
     - String
   * - tokenAmount
     - The number of token withdraw.
     - Integer
   * - ownerAddress
     - The address of the creator of the exchange pair.
     - String
   * - options
     - Optional, permission_id for multi-signature use.
     - Integer

----------
Returns
----------

object

----------
Example
----------

.. code-block:: javascript
    
  //Example 1
  > tronWeb.transactionBuilder.withdrawExchangeTokens(1, "1000003", 100, "410ca7c49aa44d26aabfe7f594c645cf9f17a4ff70", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: '560b803647f39b87a76623c4428102d1d96d18367b7f679412cc810029499a71',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '6e55',
      ref_block_hash: '96fe9781aef670d8',
      expiration: 1581385101000,
      timestamp: 1581385042932
    },
    raw_data_hex: '0a026e55220896fe9781aef670d840c8dd968f832e5a61082b125d0a35747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e45786368616e67655769746864726177436f6e747261637412240a15410ca7c49aa44d26aabfe7f594c645cf9f17a4ff7010011a0731303030303033206470f497938f832e'
  }

  // Example 2
  > tronWeb.transactionBuilder.withdrawExchangeTokens(1, "1000003", 100, "TB8865sqTQ3qxWqhNQRCBov3KtPXFRPccK", 1).then(result => console.log(result));
  Promise { <pending> }
  > {
    visible: false,
    txID: 'a776c9009655b72c4ad4858d391e25a522d753d9e40197f24703adda41dc3c77',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: '6e7b',
      ref_block_hash: '413bf5de7cf22452',
      expiration: 1581385215000,
      timestamp: 1581385155940
    },
    raw_data_hex: '0a026e7b2208413bf5de7cf224524098d89d8f832e5a61082b125d0a35747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e45786368616e67655769746864726177436f6e747261637412240a15410ca7c49aa44d26aabfe7f594c645cf9f17a4ff7010011a0731303030303033206470e48a9a8f832e'
  }

------------------------------------------------------------------------------

updateAccountPermissions
=========================

----------
Usage
----------

.. code-block:: javascript
  
  let ownerAddress = 'your address';
  let ownerPk = 'your private key';
  let ownerPermission = { type: 0, permission_name: 'owner' };
  ownerPermission.threshold = 2;
  ownerPermission.keys  = [];

  let activePermission = { type: 2, permission_name: 'active0' };
  activePermission.threshold = 3;
  activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
  activePermission.keys = [];

  ownerPermission.keys.push({ address: 'address1', weight: 1 });
  ownerPermission.keys.push({ address: 'address2', weight: 1 });
  activePermission.keys.push({ address: 'address1', weight: 1 });
  activePermission.keys.push({ address: 'address2', weight: 1 });

  const updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(ownerAddress, ownerPermission, null, [activePermission]);

----------
Parameters
----------

.. list-table::
   :widths: 10 25 10
   :header-rows: 1

   * - Argument
     - Description
     - Type
   * - owner_address
     - The address is the owner who will update permission. If not pass, value will be the default address you set in tronWeb.
     - String
   * - ownerPermissions
     - | {
       |  type: 0,
       |  permission_name: 'owner',
       |  threshold: 2,
       |  keys: [
       |   {
       |    address: 'xxxxxxxx',
       |    weight: 1
       |   },
       |   {
       |    address: 'xxxxxxxx',
       |    weight: 1
       |   }
       |  ]
       | }
       | type: has to be 0 which means owner.
     - Object
   * - witnessPermissions
     - | {
       |  type: 1,
       |  permission_name: 'witness'
       | }
       | Normal user has to pass null value. This parameter could be used only for super representative who will generate blocks.
     - Object
   * - activesPermissions
     - | [{
       |  type: 2,
       |  permission_name: 'active0',
       |  threshold: 2,
       |  operations: '7fff1fc0037e0000000000000000000000000000000000000000000000000000',
       |  keys: [
       |   {
       |    address: 'xxxxxxxx',
       |    weight: 1
       |   },
       |   {
       |    address: 'xxxxxxxx',
       |    weight: 1
       |   }
       |  ]
       | }]
       | Type has to be 2 which means active permission.
     - Array

--------------------
Example Output Data
--------------------

.. code-block:: javascript
  
  {
    "visible": false,
    "txID": "7f06b2e887dd9703ad481c6a7cafc1cd8857b354d0c45ebdf5eb82bfd0cf6d68",
    "raw_data": {
      "contract": [
        {
          "parameter": {
            "value": {
              "owner": {
                "keys": [
                  {
                    "address": "413dd5ec509f7f5bf381070b7bbac66d24b4631bd4",
                    "weight": 1
                  },
                  {
                    "address": "410a0e30b7e7a75a0a4f74388e456406edeb557134",
                    "weight": 1
                  },
                  {
                    "address": "414d66511bf52280f9be386747e53f172e15b01815",
                    "weight": 1
                  }
                ],
                "threshold": 3,
                "permission_name": "owner"
              },
              "owner_address": "413dd5ec509f7f5bf381070b7bbac66d24b4631bd4",
              "actives": [
                {
                  "operations": "7fff1fc0037e0000000000000000000000000000000000000000000000000000",
                  "keys": [
                    {
                      "address": "413dd5ec509f7f5bf381070b7bbac66d24b4631bd4",
                      "weight": 1
                    },
                    {
                      "address": "410a0e30b7e7a75a0a4f74388e456406edeb557134",
                      "weight": 1
                    },
                    {
                      "address": "414d66511bf52280f9be386747e53f172e15b01815",
                      "weight": 1
                    }
                  ],
                  "threshold": 3,
                  "type": "Active",
                  "permission_name": "active0"
                }
              ]
            },
            "type_url": "type.googleapis.com/protocol.AccountPermissionUpdateContract"
          },
          "type": "AccountPermissionUpdateContract"
        }
      ],
      "ref_block_bytes": "000b",
      "ref_block_hash": "07653cf4b79aa839",
      "expiration": 1565312682000,
      "timestamp": 1565312624396
    },
    "raw_data_hex": "0a02000b220807653cf4b79aa839409090a09fc72d5abc02082e12b7020a3c747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e4163636f756e745065726d697373696f6e557064617465436f6e747261637412f6010a15413dd5ec509f7f5bf381070b7bbac66d24b4631bd4125a1a056f776e657220033a190a15413dd5ec509f7f5bf381070b7bbac66d24b4631bd410013a190a15410a0e30b7e7a75a0a4f74388e456406edeb55713410013a190a15414d66511bf52280f9be386747e53f172e15b01815100122800108021a0761637469766530200332207fff1fc0037e00000000000000000000000000000000000000000000000000003a190a15413dd5ec509f7f5bf381070b7bbac66d24b4631bd410013a190a15410a0e30b7e7a75a0a4f74388e456406edeb55713410013a190a15414d66511bf52280f9be386747e53f172e15b018151001708cce9c9fc72d"
  }

