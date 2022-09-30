getConfirmedTransaction
===========

Gets a confirmed transaction by transaction ID.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getConfirmedTransaction(transactionID);

--------------
Parameters
--------------

String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getConfirmedTransaction("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2").then(console.log);
  >{
    "ret": [
      {
        "contractRet": "SUCCESS"
      }
    ],
    "signature": [
      "220307de6341f7b59ff9563f50db3ab23ae53df0548aacdc6b569b094463cddd81a0a1e3e06b19bf344f94e25e8e5625374e81232ce8fb404db447666562661600"
    ],
    "txID": "0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2",
    "raw_data": {
      "contract": [
        {
          "parameter": {
            "value": {
              "data": "49774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680",
              "owner_address": "41880e4776dfcf38dfe00d399d31738abc773634e8",
              "contract_address": "41eb8f23b15acbc0245a4dbbd820b9bde368b02d61"
            },
            "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
          },
          "type": "TriggerSmartContract"
        }
      ],
      "ref_block_bytes": "cfbe",
      "ref_block_hash": "071499db194adbc4",
      "expiration": 1551102345000,
      "fee_limit": 10000000,
      "timestamp": 1551102288525
    },
    "raw_data_hex": "0a02cfbe2208071499db194adbc440a8fe9da7922d5af001081f12eb010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412b5010a1541880e4776dfcf38dfe00d399d31738abc773634e8121541eb8f23b15acbc0245a4dbbd820b9bde368b02d6122840149774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680708dc59aa7922d900180ade204"
  }