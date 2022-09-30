setDefaultBlock
================

Sets the default block used as a reference for tronWeb.trx.getBlock, tronWeb.trx.getBlockTransactionCount, tronWeb.trx.getTransactionFromBlock

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.setDefaultBlock('blockID');

--------------
Parameters
--------------

Possible input values can be 'latest', 'earliest', left blank or block number.

==================  ==================================================  ==========================
Parameter           Description                                         Data Type
==================  ==================================================  ==========================
latest	            The reference block is the latest block;            String
earliest	          The reference block is the genesis block;           String
left blank	        No reference block                                  
block number	      The reference block is the corresponding block.	    0 or the positive integer
==================  ==================================================  ==========================

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  >tronWeb.setDefaultBlock('latest');
  'latest'

  > tronWeb.setDefaultBlock();
  false

  > tronWeb.setDefaultBlock('earliest');
  'Earliest'

  > tronWeb.setDefaultBlock(585367);
  undefined