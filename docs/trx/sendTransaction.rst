sendTransaction
===========

Sends TRX from one address to another. Will create and broadcast the transaction if a private key is provided.

.. warning:: 
  Do not use this in any web / user-facing applications. This will expose the private key.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendTransaction(to, amount, privateKey);

--------------
Parameters
--------------

============= ==================================================================================================================================== =================
Parameter     Description                                                                                                                          Data Type
============= ==================================================================================================================================== =================
to            Address to send TRX to, converted to a hex string.                                                                                   Hex String
amount        Amount of TRX to send (units in SUN)                                                                                                 Integer (units in SUN)
privateKey    Optionally provide a private key to sign the transaction. If left blank, will use the address associated with the private key.       string
============= ==================================================================================================================================== =================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example1
  tronWeb.trx.sendTransaction("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 1000);

  //example2 
  tronWeb.trx.sendTransaction("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 1000,’from_address_private’);
  >{ result: true,
    transaction:
    { visible: false,
      txID:
        'f8f70731df59b4d7d8159df705f0f7289cd2a037187dda043e28c77287b12e11',
      raw_data:
        { contract: [Array],
          ref_block_bytes: 'b3e2',
          ref_block_hash: '3778f8d30f91eb00',
          expiration: 1579075530000,
          timestamp: 1579075470470 },
      raw_data_hex:
        '0a02b3e222083778f8d30f91eb004090daf1c1fa2d5a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15417946f66d0fc67924da0ac9936183ab3b07c81126121541d3136787e667d1e055d2cd5db4b5f6c88056304918e807708689eec1fa2d',
      signature:
        [ 'd0839fd236016149da98ddd3dcd2f1dfcfd11aabee8a27ffae50b1323ed4ad6a259c2d48c983c7d0c786e373d2a90c48adc91f33b82be07efffaa7d57e4d3f6000' ] } }
