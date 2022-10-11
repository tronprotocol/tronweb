hextoString
===========

Convert hex to string

-------
Usage
-------

.. code-block:: javascript

  hextoString(hex)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
hex        data to convert   Hex String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.hextoString('af43ed56aa77')
  >'¯CíVªw'
  
  tronWeb.utils.bytes.hextoString('0xaf43')
  >'¯C'

  tronWeb.utils.bytes.hextoString('49206C6F7665206461726B20636F6D6564696573')
  >'I love dark comedies'