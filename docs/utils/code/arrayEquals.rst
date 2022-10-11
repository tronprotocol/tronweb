arrayEquals
===========

Compare two arrays to see if they are equal.

-------
Usage
-------

.. code-block:: javascript

  arrayEquals(array1, array2, strict)

--------------
Parameters
--------------

========== =========================== ==========
Parameter  Description                 Data Type
========== =========================== ==========
array1     first array to be compared  Array
array2     second array to be compared Array
strict     compare mode                Boolean           
========== =========================== ==========

-------
Returns
-------

Boolean

-------
Example
-------

.. code-block:: javascript

  const a = [78, 112, 87, 69, 99, 65];
  const b = [78, 112, 69, 99, 65];

  tronWeb.utils.code.arrayEquals(a, a);
  >true

  tronWeb.utils.code.arrayEquals(a, b);
  >false