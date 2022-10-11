encodeParamsV2ByABI
===========

Encodes a function parameters based on its JSON interface object.

-------
Usage
-------

.. code-block:: javascript

  encodeParamsV2ByABI(funABI, args)

--------------
Parameters
--------------

========== ========================================================== ===========================
Parameter  Description                                                Data Type
========== ========================================================== ===========================
funABI     A JSON interface of a function.                            Object 
args       The messages to encode.                                    String Array 
========== ========================================================== ===========================


-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  const funABI = {
      "constant": true,
      "inputs": [
          {
              "name": "",
              "type": "int256"
          }
      ],
      "name": "test",
      "outputs": [
          {
              "name": "",
              "type": "int256"
          }
      ],
      "type": "function"
  };
  const args = [
      "1"
  ];

  tronWeb.utils.abi.encodeParamsV2ByABI(funABI, args);

  >'0x0000000000000000000000000000000000000000000000000000000000000001'
