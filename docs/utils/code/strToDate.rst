strToDate
===========

Verify that an hex char is a valid hex char.

-------
Usage
-------

.. code-block:: javascript

  strToDate(str)

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

Date Object

-------
Example
-------

.. code-block:: javascript

  let input = '2018-09-23 13-45-03';
  tronWeb.utils.code.strToDate(input).toString();
  >"Sun Sep 23 2018 13:45:03 GMT+0800 (China Standard Time)"