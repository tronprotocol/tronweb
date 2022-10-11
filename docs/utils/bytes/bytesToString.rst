bytesToString
===========

Convert byte to string.

-------
Usage
-------

.. code-block:: javascript

  bytesToString(arr)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
arr        data to convert   Array String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.bytesToString([78, 112, 87, 69, 99, 65])
  >'NpWEcA'

  tronWeb.utils.bytes.bytesToString([1178, 2112, 1087, 969])
  >'Қࡀпω'