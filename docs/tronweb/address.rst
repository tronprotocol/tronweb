
=================================
address
=================================

Object that allows you to convert between hex / base58 and privatekey representations of a TRON address.

.. note:: 
  If you wish to convert generic data to hexadecimal strings, please use the function tronWeb.toHex.

------------------------------------------------------------------------------

tronWeb.address.toHex
----------------------

Convert Base58 format addresses to Hex

-------
Usage
-------

.. code-block:: javascript

    tronWeb.address.toHex()

--------------
Parameters
--------------

address-base58 format

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.address.toHex("TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL")
  > "418840E6C55B9ADA326D211D818C34A994AECED808"

------------------------------------------------------------------------------

tronWeb.address.fromHex
--------------------------

Convert Hexstring format address to Base58 format address


-------
Usage
-------

.. code-block:: javascript

  tronWeb.address.fromHex()

--------------
Parameters
--------------

address-hexstring format


-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.address.fromHex("418840E6C55B9ADA326D211D818C34A994AECED808")
  > "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL"

------------------------------------------------------------------------------

tronWeb.address.fromPrivateKey
---------------------------------

Derive its corresponding address based on the private key


-------
Usage
-------

.. code-block:: javascript

  tronWeb.address.fromPrivateKey()

--------------
Parameters
--------------

privateKey

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.address.fromPrivateKey("3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145")
  > "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL"