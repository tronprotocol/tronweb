encode58
===========

Converts text to base-58 string.

-------
Usage
-------

.. code-block:: javascript

  encode58(buffer)

--------------
Parameters
--------------

============== ============================== ===================
Parameter      Description                    Data Type
============== ============================== ===================
buffer         data to encode                 Buffer/ String
============== ============================== ===================

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  // example 1
  let input = Buffer.from('0xbf7e698', 'utf-8');

  tronWeb.utils.base58.encode58(input)
  >'cnTsZgYWJRAw'

  // example 2
  tronWeb.utils.base58.encode58('0xbf7e698')
  >'BLw3T83'
