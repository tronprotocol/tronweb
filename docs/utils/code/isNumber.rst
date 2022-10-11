isNumber
===========

Verify that an numeric char is a number.

-------
Usage
-------

.. code-block:: javascript

  isNumber(char)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
char       data to check     String
========== ================= ==========

-------
Returns
-------

Number either 1/0

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.isNumber('0')
  >1

  tronWeb.utils.code.isHexChar('Z')
  >0