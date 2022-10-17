
=================
tronweb object
=================

Create an instance of the tronWeb javascript library. In addition to the utility functions, it includes all related modules.

-------
Returns
-------

Object

-------
Example
-------

.. note:: 
  Due to the upgrade of the Trongrid product, all Tongrid API access requests must include the API Key parameter. If the Trongrid service is used in Tronweb, the API Key parameter must be set in Tronweb before normal use. The latest Tronweb 3.2.6 version already supports setting API Key parameters, please refer to the following example or refer to `Tronweb Github <https://github.com/tronprotocol/tronweb>`_. For API Key application and use, please refer to `document <https://developers.tron.network/reference#api-key>`_.
  If the Trongrid service is not used in Tronweb, there is no need to add the API Key.

.. code-block:: javascript

  // The latest version 3.2.6 of Tronweb can set API Key parameters through the setHeader method
  //Example 1
  const TronWeb = require('tronweb')
  const HttpProvider = TronWeb.providers.HttpProvider;
  const fullNode = new HttpProvider("https://api.trongrid.io");
  const solidityNode = new HttpProvider("https://api.trongrid.io");
  const eventServer = new HttpProvider("https://api.trongrid.io");
  const privateKey = "your private key";
  const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
  tronWeb.setHeader({"TRON-PRO-API-KEY": 'your api key'});

  > tronWeb.trx
  > tronWeb.transactionBuilder
  > tronWeb.utils


  //Example 2
  const TronWeb = require('tronweb')
  const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { "TRON-PRO-API-KEY": 'your api key' },
      privateKey: 'your private key'
  })

------------------------------------------------------------------------------

address
=================================

Object that allows you to convert between hex / base58 and privatekey representations of a TRON address.

.. note:: 
  If you wish to convert generic data to hexadecimal strings, please use the function tronWeb.toHex.

------------------------------------------------------------------------------

tronWeb.address.toHex
=======================

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
===========================

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
==================================

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