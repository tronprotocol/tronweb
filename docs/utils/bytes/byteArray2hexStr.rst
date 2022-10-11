byteArray2hexStr
===========

Convert an array of bytes to a hex string.

-------
Usage
-------

.. code-block:: javascript

  byteArray2hexStr(byteArray)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
byteArray  data to convert   Number Array
========== ================= ==============

-------
Returns
-------

Hex String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.byteArray2hexStr([73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115])
  >'49206C6F7665206461726B20636F6D6564696573'

