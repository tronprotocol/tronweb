decode58
===========

Converts base-58 string to Buffer.

-------
Usage
-------

.. code-block:: javascript

  decode58(string)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
string     data to decode    String
========== ================= ==========

-------
Returns
-------

Buffer/ Array of number

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.base58.decode58('cnTsZgYWJRAw')
  >[48, 120, 98, 102, 55, 101, 54, 57, 56]
