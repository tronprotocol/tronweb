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
