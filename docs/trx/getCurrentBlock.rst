getCurrentBlock
===========

Return the block information of the latest block.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getCurrentBlock()

--------------
Parameters
--------------

N/A

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getCurrentBlock().then(console.log)
  >{
    blockID: '00000000000dc73a584b91846ed22d8359f1cf45407c9159b4bac9f1e2b018de',
    block_header: {
      raw_data: {
        number: 902970,
        txTrieRoot: '6ada20705dc3b74d089dc8188792d0162747d634fd6deec60717c1b4fc518af0',
        witness_address: '41f16412b9a17ee9408646e2a21e16478f72ed1e95',
        parentHash: '00000000000dc739de1b856885cd8b5a8837bbd0cfd433833bee19e7b5466bd1',
        version: 9,
        timestamp: 1578303678000
      },
      witness_signature: 'b81af83a8a0c65bfa7d9224a0ba3c653dce338f1e2147e68d3a7b66194dfaffc719f7d03db719b1065059bdcdbe97652b28662df594279db849000b69c222fc900'
    },
    transactions: [
      {
        ret: [Array],
        signature: [Array],
        txID: '90be204670e96c06ed4e0e0a4d456afe6cec09febde545b097dbdad1f05dfe0c',
        raw_data: [Object],
        raw_data_hex: '0a02c738220885a8d77bfd78c7db40a0f2eed1f72d5a6d081f12690a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412340a154113b34f700df122b6ba91e3660bb677d0a919a223121541ca21da4a68a41244830072fdd8190cba5e08fb9322043d1f890270ceb0ebd1f72d9001c0843d'
      },
      {
        ret: [Array],
        signature: [Array],
        txID: '0d148d1e2ca701103660211a0ce520b6b9fec5a59adc8a85b0da9b522230fab5',
        raw_data: [Object],
        raw_data_hex: '0a02c7392208de1b856885cd8b5a40d889efd1f72d5a9301081f128e010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412590a15416144eecc1ae0b4f51cfb6379137d8b5d04f75b46121541cd95a6792ce3b444a7c763eee30f66f73ab76d87188092f40122246898f82b000000000000000000000000000000000000000000000000000000000000001970b1b8ebd1f72d900180c2d72f'
      }
    ]
  }
