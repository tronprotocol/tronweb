getBlock
===========

Query a block information by the block height or the blcok ID

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlock();

--------------
Parameters
--------------

==================  ==================================================  ==========================
Parameter           Description                                         Data Type
==================  ==================================================  ==========================
Block Height	      Height of the Block                                 Integer
Block ID	          Block header hash number                            String
Left Blank	        Will return the default block                                  
==================  ==================================================  ==========================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //Example 1
  >tronWeb.trx.getBlock(12345).then(result => {console.log(result)});
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

  //Example 2
  >tronWeb.trx.getBlock('000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764').then(result => {console.log(result)});
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

  //Example 3
  >tronWeb.trx.getBlock('').then(result => {console.log(result)});
  >{
    blockID: '0000000000000000de1aa88295e1fcf982742f773e0419c5a9c134c994a9059e',
    block_header: {
      raw_data: {
        txTrieRoot: 'ea97ca7ac977cf2765093fa0e4732e561dc4ff8871c17e35fd2bcabb8b5f821d',
        witness_address: '41206e65772073797374656d206d75737420616c6c6f77206578697374696e672073797374656d7320746f206265206c696e6b656420746f67657468657220776974686f757420726571756972696e6720616e792063656e7472616c20636f6e74726f6c206f7220636f6f7264696e6174696f6e',
        parentHash: '957dc2d350daecc7bb6a38f3938ebde0a0c1cedafe15f0edae4256a2907449f6'
      }
    },
    transactions: [
      {
        txID: 'abda6c8b1e8954dbe1d5a06a774a3e6923b003d29bb4ce286998f23452e3b04a',
        raw_data: [Object],
        raw_data_hex: '5a6f0801126b0a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e7472616374123a0a173078303030303030303030303030303030303030303030121541f16412b9a17ee9408646e2a21e16478f72ed1e9518ffffa7ec85afd1b101'
      },

  ... // Contains the block contents (transactions, IDs, hashes, timestamps, etc.)
