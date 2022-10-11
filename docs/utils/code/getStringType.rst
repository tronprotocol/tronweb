getStringType
===========

Return the type of a string.

-------
Usage
-------

.. code-block:: javascript

  getStringType(str)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
str        data to check     String
========== ================= ==========

-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.getStringType('bf7e69851988c80e5484e52f4f6aca99479458b6')
  >1

  tronWeb.utils.code.getStringType('4136b9c3690c3be15a4ad697965b1e5e088ae131f2')
  >3

  tronWeb.utils.code.getStringType('3534')
  >2

  tronWeb.utils.code.getStringType('ERC20Token')
  >3

  tronWeb.utils.code.getStringType(3.45)
  >-1