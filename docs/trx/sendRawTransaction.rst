sendRawTransaction
===========

Broadcasts a signed raw transaction to the network.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendRawTransaction(signedTransaction);

--------------
Parameters
--------------

================== ============================== =========
Parameter	         Description                    Data Type
================== ============================== =========
signedTransaction  The signed transaction object	Object
================== ============================== =========

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  const tradeobj = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",1);
  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
  const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
  console.log(receipt)
  >{ result: true,
    transaction:
    { visible: false,
      txID:
        'f3c9aa2b4d122979f92a658be1804560f949a89c8b5d30e15b2d003712d72c92',
      raw_data:
        { contract: [Array],
          ref_block_bytes: '63c3',
          ref_block_hash: '0d248c2bc3eb218c',
          expiration: 1580983653000,
          timestamp: 1580983593572 },
      raw_data_hex:
        '0a0263c322080d248c2bc3eb218c4088a5e0cf812e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a15417946f66d0fc67924da0ac9936183ab3b07c811261215418cb2ab880d4fa7b33c9645a2276dc9b192902e2d186470e4d4dccf812e',
      signature:
        [ '9aa0ca0a54b4bdfdc454f5c906eb65131eed75551b93185cc78027eec86059e55c78ec1d0f28021d136fb8b446864a47736d2b29b74b4ce08e69a6a0167292e300' ] } }
