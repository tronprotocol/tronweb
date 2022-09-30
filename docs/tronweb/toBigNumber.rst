toBigNumber
==============

Convert a given number or hexadecimal string to a BigNumber

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.toBigNumber()

--------------
Parameters
--------------

Number | String - number in hexadecimal format

-------
Returns
-------

BigNumber

-------
Example
-------

.. code-block:: javascript

  var value = tronWeb.toBigNumber('200000000000000000000001');
  console.log(value.toNumber())
  >2.0000000000000002e+23
  console.log(value.toString(10))
  >200000000000000000000001