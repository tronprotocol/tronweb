multiSign
===========

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.multiSign(transaction, privateKey, permissionId)

--------------
Parameters
--------------
================= ================================================================================== ============
Parameter	        Description	                                                                       Data Type
================= ================================================================================== ============
transaction       The transaction JSON object	                                                       JSON
privateKey        The signer's private key                                                           String
permissionId      Specifies which permission to use. Default is 0, which is the owner permission.	   Integer32
================= ================================================================================== ============

The parameter permissionId designates the permission type, with Owner ID = 0, Witness ID = 1, and the Active ID incremented from 2 onwards. When the contract is executed, the ID is used to specify which permission to use. For details on Java-Tron permissionId, please refer to the `Multi-Signature guide <https://developers.tron.network/docs/multi-signature>`_.

.. note:: 
  The transaction ID changes every time during signing since the permission ID is hashed with the original transaction ID.

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  const tradeobj = await tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(100), 3, "ENERGY", "415d73f56d93a9380a100d2a340dd30dc3df6e0746", "415d73f56d93a9380a100d2a340dd30dc3df6e0746", 0);
  const signedtxn = await tronWeb.trx.multiSign(tradeobj, privateKey,0);
  console.log(signedtxn)
  >{
    "txID": "0502452a4d60e10624168e4dfbd30f549619c1a4231a5f1b23b2fdee7271122f",
    "raw_data": {
      "contract": [
        {
          "parameter": {
            "value": {
              "frozen_duration": 3,
              "frozen_balance": 100000000,
              "owner_address": "415d73f56d93a9380a100d2a340dd30dc3df6e0746"
            },
            "type_url": "type.googleapis.com/protocol.FreezeBalanceContract"
          },
          "type": "FreezeBalanceContract",
          "Permission_id": 0
        }
      ],
      "ref_block_bytes": "0029",
      "ref_block_hash": "085b2efaf56ed4ab",
      "expiration": 1555112526000,
      "timestamp": 1555112466675
    },
    "raw_data_hex": "0a0200292208085b2efaf56ed4ab40b081b89fa12d5a58080b12540a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e467265657a6542616c616e6365436f6e7472616374121e0a15415d73f56d93a9380a100d2a340dd30dc3df6e07461080c2d72f180370f3b1b49fa12d",
    "signature": [
      "91d1b6d562b7aec2dc7ab52d82841ebb92d2288b01e04bd0075e0499559353ade4e74246d9ea002dec12e3246f7ae05714a1787b8c3670446cc6891a1cb9b56600",
      "4ca79b721e4965189335a9d8324a207297bbf52f90cdd5be778716817db13b2a678eacdb83b1ad38d6823606bf51b41a9810da4a8618361e2251205382b357eb00",
      "672920c0e277aa84225e9441468cd425c85748599968842c7a39a0b7ddb6bc14e9dde4eb6d00464d0e411dd24be7ac7cdfbfcd21ca72bfbf7021bcfe4080e47800"
    ]
  }
