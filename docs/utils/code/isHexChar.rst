isHexChar
===========

Verify that an hex char is a valid hex char.

-------
Usage
-------

.. code-block:: javascript

  isHexChar(char)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
char       data to check     char
========== ================= ==========

-------
Returns
-------

Number either 1/0

-------
Example
-------

.. code-block:: javascript


  tronWeb.utils.code.isHexChar('0')
  >1

  tronWeb.utils.code.isHexChar('e')
  >1

  tronWeb.utils.code.isHexChar('D')
  >1

  tronWeb.utils.code.isHexChar('Z')
  >0

  tronWeb.utils.code.isHexChar(66)
  >0