=======================
tronweb-utils
=======================

-------------------------------------------------------------------

abi
=============

-------------------------------------------------------------------

encodeParams
=============

Encodes a function parameters based on its JSON interface object.

-------
Usage
-------

.. code-block:: javascript

  encodeParams(types, values)

--------------
Parameters
--------------

========== ========================================================== ===========================
Parameter  Description                                                Data Type
========== ========================================================== ===========================
types      An array with types or a JSON interface of a function.     String Array 
values     The messages to encode.                                    String Array 
========== ========================================================== ===========================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  // example 1
  const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
  const values = [
      'Pi Day N00b Token',
      'PIE',
      18,
      '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
      0
  ];

  tronWeb.utils.abi.encodeParams(types, values);
  >'0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';


  //example 2
  const ADDRESS_HEX = '41928c9af0651632157ef27a2cf17ca72c575a4d21';
  const ADDRESS_BASE58 = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
  const types = ['string', 'address', 'address'];
  const values = ['Onwer', ADDRESS_HEX, ADDRESS_BASE58];
  
  tronWeb.utils.abi.encodeParams(types, values);
  >'0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d21000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d2100000000000000000000000000000000000000000000000000000000000000054f6e776572000000000000000000000000000000000000000000000000000000'

------------------------------------------------------------------------------

decodeParams
=============

Decodes an ABI encoded parameter to its JavaScript type.

-------
Usage
-------

.. code-block:: javascript

  decodeParams(names, types, output, ignoreMethodHash);

--------------
Parameters
--------------

=========================== ============================== ===========================
Parameter                   Description                    Data Type
=========================== ============================== ===========================
names                       Key names of returned object   String Array
types                       Types of values                String Array
output                      The ABI byte code to decode    String
ignoreMethodHash            Is Method Hash ignored         Boolean
=========================== ============================== ===========================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  // example 1
  const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
  const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';
  tronWeb.utils.abi.decodeParams(types, output);

  >{
      "Token": "Pi Day N00b Token",
      "Graph": "PIE",
      "Qty": 18,
      "Bytes": "0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7",
      "Total": {
          "type": "BigNumber",
          "hex": "0x00"
      }
  }


  // example 2
  const names = ['Token', 'Graph', 'Qty', 'Bytes', 'Total'];
  const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
  const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';
  tronWeb.utils.abi.decodeParams(names, types, output);

  >{
    "Token": "Pi Day N00b Token",
    "Graph": "PIE",
    "Qty": 18,
    "Bytes": "0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7",
    "Total": {
        "type": "BigNumber",
        "hex": "0x00"
    }
  }

-------------------------------------------------------------------

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

------------------------------------------------------------------------------

decodeParamsV2ByABI
======================

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
