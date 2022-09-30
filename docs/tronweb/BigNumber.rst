BigNumber
===========

Convert a given number or hexadecimal string to a BigNumber

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.BigNumber()

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

  var value = tronWeb.BigNumber('200000000000000000000001');
  console.log(value.toNumber())
  >2.0000000000000002e+23
  console.log(value.toString(10))
  >200000000000000000000001

.. note:: 
  `TronWeb v4.0.0 <https://github.com/tronprotocol/tronweb/releases/tag/v4.0.0>`__ updated bignumber.js to v9.0.1, which is a breaking change.

  If you get a result after triggerConstantContract or call method, do not use tronWeb.BigNumber(result) which will get null. Thus：
  TronWeb v4.0.0 and later：tronWeb.toBigNumber(result) or tronWeb.BigNumber(result._hex)
  TronWeb version before v4.0.0：tronWeb.BigNumber(result)