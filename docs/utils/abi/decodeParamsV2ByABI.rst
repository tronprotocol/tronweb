decodeParamsV2ByABI
===========

Decodes an ABI encoded parameter to its JavaScript type.

-------
Usage
-------

.. code-block:: javascript

  decodeParamsV2ByABI(funABI, data)

--------------
Parameters
--------------

========== ========================================================== ===========================
Parameter  Description                                                Data Type
========== ========================================================== ===========================
funABI     A JSON interface of a function.                            Object 
data       The messages to decode.                                    String 
========== ========================================================== ===========================

-------
Returns
-------

Array of Bignumber

-------
Example
-------

.. code-block:: javascript

  const funcABI = {"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"int256"}],"type":"function"};
  const result = "0x0000000000000000000000000000000000000000000000000000000000000010";
  tronWeb.utils.abi.decodeParamsV2ByABI(funcABI, result)[0].toNumber();
  >16
