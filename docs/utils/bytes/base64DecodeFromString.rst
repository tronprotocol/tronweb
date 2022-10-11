base64DecodeFromString
===========

Decode a base64 string.

-------
Usage
-------

.. code-block:: javascript

  base64DecodeFromString(string64)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
string64   data to convert   String
========== ================= ==============

-------
Returns
-------

Number Array

-------
Example
-------

.. code-block:: javascript

  let result = tronWeb.utils.bytes.base64DecodeFromString('SSBsb3ZlIGRhcmsgY29tZWRpZXM=');
  tronWeb.utils.bytes.bytesToString(result);
  >'I love dark comedies'
