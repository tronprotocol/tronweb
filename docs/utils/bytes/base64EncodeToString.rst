base64EncodeToString
===========

Encode a bytes array to a base64 string.

-------
Usage
-------

.. code-block:: javascript

  base64EncodeToString(bytes)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
bytes      data to convert   String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.base64EncodeToString([73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115]);
  >'SSBsb3ZlIGRhcmsgY29tZWRpZXM='
