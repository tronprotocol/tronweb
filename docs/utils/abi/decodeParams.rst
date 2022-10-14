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