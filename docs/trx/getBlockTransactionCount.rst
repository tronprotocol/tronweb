getBlockTransactionCount
===========

Retrieves the count of transactions within a block.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockTransactionCount()

--------------
Parameters
--------------

==================  ==========================================================================  ==========================
Parameter           Description                                                                 Data Type
==================  ==========================================================================  ==========================
Block Height        The height of the block you wish to obtain transaction count data for.      Integer/string
==================  ==========================================================================  ==========================

-------
Returns
-------

number

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getBlockTransactionCount(16012520).then(console.log);
  >35

  >tronWeb.trx.getBlockTransactionCount("0000000000f454e84edbee2365fbf1bf34bc98283ded06e68311bb6e5bea3cf6").then(console.log);
  >35
