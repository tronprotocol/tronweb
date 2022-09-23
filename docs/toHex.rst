toHex
=========

Convert any value to HEX

.. note:: 
  This function does not convert TRX addresses to Hex. If you wish to specifically convert TRX addresses to HEX, please use tronWeb.address.toHex instead.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.toHex()

--------------
Parameters
--------------

String | Number | Object | Array | BigNumber 

The value to be converted to HEX.
If it is an object or array type, it will first be converted to a string using JSON.stringify.
If BigNumber is passed in, you will get the HEX of the corresponding Number.

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.toHex("abcABC")
  >"0x616263414243"
  tronWeb.toHex({abc:"ABC"})
  >"0x7b22616263223a22414243227d"