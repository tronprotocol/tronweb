getBlockByHash
===========

Query a block information by the blcok ID.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockByHash(blockHash);

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

  >tronWeb.trx.getBlockByHash('00000000006acfc007dc3ec1d8022c1388268ce7bbd836015558103ee4fb75b5').then(result => {console.log(result)});
  >{
    blockID: '00000000006acfc007dc3ec1d8022c1388268ce7bbd836015558103ee4fb75b5',
    block_header: {
      raw_data: {
        number: 7000000,
        txTrieRoot: '16b4b520748c59e5bfdd1b61ca596d74f9bf3df836c359e36a6528ffa5fb2cdb',
        witness_address: '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
        parentHash: '00000000006acfbf335be34db135169d9e632d5e464f1573c5980152acf45cb3',
        version: 6,
        timestamp: 1551102291000
      },
      witness_signature: '2dbe28c99d22e871604f06457aca3474ae07b5f58f6bc28d3bebe09d27793d535a55350df433e582272432602638fc2b79518c8f745a35151cbea07b00c6ed6101'
    },
    transactions: [
      {
        ret: [Array],
        signature: [Array],
        txID: '0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2',
        raw_data: [Object],
        raw_data_hex: '0a02cfbe2208071499db194adbc440a8fe9da7922d5af001081f12eb010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412b5010a1541880e4776dfcf38dfe00d399d31738abc773634e8121541eb8f23b15acbc0245a4dbbd820b9bde368b02d6122840149774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680708dc59aa7922d900180ade204'
      },
      
      ... // Contains the block contents (transactions, IDs, hashes, timestamps, etc.)
  }