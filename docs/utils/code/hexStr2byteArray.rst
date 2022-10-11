hexStr2byteArray
===========

Verify that an hex char is a valid hex char.

-------
Usage
-------

.. code-block:: javascript

  hexStr2byteArray(str, strict)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
str        data to check     String
strict     compare mode      Boolean
========== ================= ==========

-------
Returns
-------

Byte Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.hexStr2byteArray('49206C6F7665206461726B20636F6D6564696573')
  >[73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115]