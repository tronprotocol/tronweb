getUnconfirmedBrokerage
===========

Query unconfirmed brokerage

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedBrokerage(address)

--------------
Parameters
--------------

String(HexString or Base58)

-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  //Parameter Base58
  >tronWeb.trx.getUnconfirmedBrokerage("TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH").then(result=>console.log(result))
  >20

  //Parameter HexString
  >tronWeb.trx.getUnconfirmedBrokerage("4178C842EE63B253F8F0D2955BBC582C661A078C9D").then(result=>console.log(result))
  >20
