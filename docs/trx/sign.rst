sign
===========

Sign a provided transaction object or a hex formatted string

.. warning:: 
  Do not use this in any web / user-facing applications. This will expose the private key.

-------
Usage
-------

.. code-block:: javascript

  // sign a transaction
  tronWeb.trx.sign(transaction, privateKey);

  // or
  // sign a Hex formatted string
  tronWeb.trx.sign(str, privateKey)

--------------
Parameters
--------------

==================================== ============================================================================================================================  =================
Parameter                            Description                                                                                                                   Data Type
==================================== ============================================================================================================================  =================
transaction / Hex formatted string   The transaction object / hex formatted string                                                                                 JSON / String
privateKey                           The private key used for signing. Optional. The default value is the private key passed in when constructing tronweb object.  String
==================================== ============================================================================================================================  =================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  // sign a transaction
  const tradeobj = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",1);  
  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
  console.log(signedtxn)
  >{ visible: false,
    txID:
    'cbf76171dcf5f8fe00b4911a1a6cc4d2a4448e3348f44d240ca20af06025d0f2',
    raw_data:
    { contract: [ [Object] ],
      ref_block_bytes: '6394',
      ref_block_hash: '8ad966a9b0b6a5d1',
      expiration: 1580983512000,
      timestamp: 1580983453441 },
    raw_data_hex:
    '0a02639422088ad966a9b0b6a5d140c0d7d7cf812e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a15417946f66d0fc67924da0ac9936183ab3b07c811261215418cb2ab880d4fa7b33c9645a2276dc9b192902e2d186470818ed4cf812e',
    signature:
    [ '47b1f77b3e30cfbbfa41d795dd34475865240617dd1c5a7bad526f5fd89e52cd057c80b665cc2431efab53520e2b1b92a0425033baee915df858ca1c588b0a1800' ] }

  // sign a string message
  var str = "helloworld"; 
  var HexStr = tronWeb.toHex(str);
  var signedStr = await tronWeb.trx.sign(HexStr, privateKey);
  console.log(signedStr)

  >0xe89b777b011b678c9f52e464117f8a8a2193f2cb8d37cbb9e1bd7bd8905fb79046185ea458fab36ed387d60b0842b59b15c7a419797575986492d0271a91d9e71b
