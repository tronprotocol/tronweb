getBandwidth
===========

Query the Bandwidth information for the account.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBandwidth(address);

--------------
Parameters
--------------

String(HexString or Base58)

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //Example 1
  >tronWeb.trx.getBandwidth('TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2').then(console.log);
  >1500

  //Example 2
  >tronWeb.trx.getBandwidth('41D3FD1B6F3F3A86303E2925844456C49876C4561F').then(console.log);
  >1500
