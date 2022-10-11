hexChar2byte
===========

Convert an hex char to a byte.

-------
Usage
-------

.. code-block:: javascript

  hexChar2byte(char)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
char       data to convert   char
========== ================= ==========

-------
Returns
-------

byte

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.hexChar2byte('0')
  >0

  tronWeb.utils.code.hexChar2byte('D')
  >13

  tronWeb.utils.code.hexChar2byte('d')
  >13

  tronWeb.utils.code.hexChar2byte('7')
  >7
