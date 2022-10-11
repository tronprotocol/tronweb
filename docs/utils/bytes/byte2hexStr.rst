byte2hexStr
===========

Convert byte to hex string.

-------
Usage
-------

.. code-block:: javascript

  byte2hexStr(byte)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
byte       data to convert   String
========== ================= ==========

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.byte2hexStr(21)
  >'15'

  tronWeb.utils.bytes.byte2hexStr(33)
  >'21'

  tronWeb.utils.bytes.byte2hexStr(78)
  >'4E'
