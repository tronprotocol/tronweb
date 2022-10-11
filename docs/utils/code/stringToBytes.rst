stringToBytes
===========

Convert a string to an array of bytes.

-------
Usage
-------

.. code-block:: javascript

  stringToBytes(str)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
str        data to convert   String
========== ================= ==========

-------
Returns
-------

Byte Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.stringToBytes('Қࡀпω')
  >[210, 154, 224, 161, 128, 208, 191, 207, 137]