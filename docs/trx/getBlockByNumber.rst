getBlockByNumber
===========

Query a block information by the block height.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockByNumber(blockID)

--------------
Parameters
--------------

Integer

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getBlockByNumber(12345).then(result => {console.log(result)});
  >{
    blockID: '000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764',
    block_header: {
      raw_data: {
        number: 12345,
        txTrieRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        witness_address: '414b4778beebb48abe0bc1df42e92e0fe64d0c8685',
        parentHash: '0000000000003038c0a3aa1806236bc5b281633728b5fe8a14a51062522e651d',
        timestamp: 1529928585000
      },
      witness_signature: 'cb889103aa9ce691d39df8030b54b50b12b77984684281f3490e0b802cbc364c13af773ede8d9314add0fa4d247165be82fa28721f17493c88761b7039ba1c1100'
    }
  }
