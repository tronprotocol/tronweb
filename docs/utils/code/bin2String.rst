bin2String
===========

Convert a byte to a hex string.

Alias function to bytes.bytesToString()

-------
Usage
-------

.. code-block:: javascript

  bin2String(array)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
array      data to convert   Array String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.bin2String([78, 112, 87, 69, 99, 65])
  >'NpWEcA'