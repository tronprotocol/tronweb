
=================
tronweb
=================

Create an instance of the tronWeb javascript library. In addition to the utility functions, it includes all related modules.

------------------------------------------------------------------------------

tronweb object
=================

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
=====================

Object that allows you to convert between hex / base58 and privatekey representations of a TRON address.

.. note:: 
  If you wish to convert generic data to hexadecimal strings, please use the function tronWeb.toHex.

------------------------------------------------------------------------------

tronWeb.address.toHex
==========================================

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
==========================================

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
==========================================

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

------------------------------------------------------------------------------

contract
=================================

------------------------------------------------------------------------------

tronWeb.contract
==========================================

Creates a contract object that wraps an ABI. Allows you to easily call functions on on the contract.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.contract()  

--------------
Parameters
--------------

abi:Optionally provide the ABI for a contract.
address:Optionally provide the address for a contract. Hex or Base58 format

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example 1:Create the contract object through contract address and ABI
  let instance = await tronWeb.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}],"TREwN2qRkME9TyQUz8dG6HfjEyKGMPHAS5")

  //example 2:First create an empty contract object, and then specify the contract address by at() function. If the abi is on the chain, at() function will load ABI automatically , else you need to load it manually 
  let instance = await tronWeb.contract().at("TREwN2qRkME9TyQUz8dG6HfjEyKGMPHAS5");

If the contract ABI does not exist on the chain, Please invoke loadAbi function to manually load the contract ABI. An example is as below:

.. code-block:: javascript

  //example 1
  let instance =await tronWeb.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}],"TREwN2qRkME9TyQUz8dG6HfjEyKGMPHAS5")
  let res = await instance.totalSupply().call({_isConstant:true})

  //example 2
  let instance = await tronWeb.contract().at("TREwN2qRkME9TyQUz8dG6HfjEyKGMPHAS5");
  instance.loadAbi([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]);
  let res = await instance.totalSupply().call({_isConstant:true})

------------------------------------------------------------------------------

createAccount
===============

Generate a new privatekey + address combination. This account is not activated on the network.

.. warning::
  This API exposes the private key for the new address. Do not use this in any unsafe environments.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.createAccount()

--------------
Parameters
--------------

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.createAccount()
  >address: {
    base58: "TPbBpRXnt6ztse8XkCLiJstZyqQZvxW2sx", 
    hex: "4195679F3AAF5211991781D49B30525DDDFE9A18DE"}
  privateKey: "08089C24EC3BAEB34254DDF5297CF8FBB8E031496FF67B4EFACA738FF9EBD455"
  publicKey:  "04EE63599802B5D31A29C95CC7DF04F427E8F0A124BED9333F3A80404ACFC3127659C540D0162DEDB81AC5F74B2DEB4962656EFE112B252E54AC3BA1207CD1FB10"
  __proto__: Object

------------------------------------------------------------------------------

createRandom
===============

Generate a random mnemonic (total number 12) and using TRON path "m/44'/195'" by default, return the 0th account address and private key.

-------
Usage
-------

.. code-block:: javascript
  
  // Call directly
  TronWeb.createRandom()

  // Called via the instantiated tronWeb object
  tronWeb.createRandom()

--------------
Parameters
--------------
.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - options
     - | Optional parameter with three fields: 
       | path - BIP44 path 
       | extraEntropy - entropy 
       | locale - the locale
     - Object

-------
Returns
-------

Object - Returns randomly created account information, including mnemonic, public key, and private key. If the entered BIP44 path does not start with m/44'/195', throw an exception - Error: Invalid tron path provided.

-------
Example
-------

Example 1

.. code-block:: javascript

  >tronWeb.createRandom()
  {
    "mnemonic": {
      "phrase": "chimney cloth deny claim play rude love dose apart shove rack stone",
      "path": "m/44'/195'/0'/0/0",
      "locale": "en"
    },
    "privateKey": "0x79092289f3bfde55f079202e3642b2c4ba071d5f0b85d65b1919c8724e94848c",
    "publicKey": "0x0421c47d627bc2d856760dda17b42b726b4bc8f5def76aed0cbcd71566d0ffedfc3904c9c854854a5019b8373d2aed0c6b96ff5f3be07722403088742b0949a6c9",
    "address": "TEFAyPnainfiAJBuhExfMLJeHHxD2DZJmF",
  }

  
Example 2

.. code-block:: javascript

  >tronWeb.createRandom({path: "m/44'/195'/0'/0/0", extraEntropy: '', locale: 'en'})
  {
    mnemonic: {
      phrase: 'dinosaur lemon cause answer push accuse small blind oak abandon afraid record',
      path: "m/44'/195'/0'/0/0",
      locale: 'en'
    },
    privateKey: '0xa067d2f82f5f3de0bd95eedf3c3cfb6c01b6a78e9ceaf7a806afe253afa06b71',
    publicKey: '0x04c09f023b2cb459402126db9432aa16d524501ec62fff73c51fba6c5e44529499e817783abc06484ea1f8217bf61d1670704ca21b07c127cb36a9d2146df59f8d',
    address: 'TXBNANG5bmRt2wN5c94jQfUySLGjms2DCX'
  }

------------------------------------------------------------------------------

fromAscii
===============

Helper function that will convert ASCII to HEX

-------
Usage
-------

.. code-block:: javascript

  tronWeb.fromUtf8(string)

--------------
Parameters
--------------
.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - string
     - String to convert to hex from ASCII.
     - String

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.fromUtf8("test")
  >"74657374"