
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

------------------------------------------------------------------------------

fromDecimal
===============

Converts a number, or a string of numbers, into a hexadecimal string.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.fromDecimal(value)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - value
     - value to convert to hexadecimal string
     - Number | String - number

-------
Returns
-------

string

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.fromDecimal("21")
  > "0x15"

------------------------------------------------------------------------------

fromMnemonic
===============

Obtain the address and private key according to the provided mnemonic.

-------
Usage
-------

.. code-block:: javascript

  // Call directly
  TronWeb.fromMnemonic()

  // Called via the instantiated tronWeb object
  tronWeb.fromMnemonic()

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - mnemonic	
     - mnemonic. Separate each mnemonic with a space.	
     - String
   * - path
     -	BIP44 path, optional parameter. If you want to get an account other than index 0, you need to fill in this parameter, and the complete path is required.	
     - String
   * - wordlist	
     - Language type, optional parameter. If the incoming mnemonic is not english(en), you need to fill in the corresponding language type through this parameter, such as zh, ja, it, ...	
     - String

-------
Returns
-------

Object - Returns the obtained account information, including mnemonic, public key, and private key. If the entered BIP44 path does not start with m/44'/195', throw an exception - Error: Invalid tron path provided.

-------
Example
-------

Example 1

.. code-block:: javascript
  
  >tronWeb.fromMnemonic( 'patch left empty genuine rain normal syrup yellow consider moon stock denial')
  {
    mnemonic: {
      phrase: 'patch left empty genuine rain normal syrup yellow consider moon stock denial',
      path: "m/44'/195'/0'/0/0",
      locale: 'en'
    },
    privateKey: '0x0f9148e9be0c5b0213607a6491603891241ec7aa204918018dba691e4269ffe7',
    publicKey: '0x04642b796ba0acf06233e65695b977d28d2cae90fabd70dc0a300a831866b8f46ce5ee0ffa832492ce1b55a6c90463b2a31a03729b212281f6531558145b634ee0',
    address: 'TPiD26cc1vptLxwYmw4waHTPCNgqtZ5SCX'
  }

Example 2

.. code-block:: javascript

  >tronWeb.fromMnemonic( 'patch left empty genuine rain normal syrup yellow consider moon stock denial',"m/44'/195'/0'/0/1")
  {
    mnemonic: {
      phrase: 'patch left empty genuine rain normal syrup yellow consider moon stock denial',
      path: "m/44'/195'/0'/0/1",
      locale: 'en'
    },
    privateKey: '0x5f3ecfca6e51dc70d58bca89d9b8fcb60cf193e0d8943af62311136c3e6504a0',
    publicKey: '0x04df45411faa27c933e10c83305da6f15138a018d2b539d8d4155a7e15f2552f9de3c6a7993e3814b4022a673faa70ad137bcc65857fc40cc0d59218ce28002361',
    address: 'TXzMaz1QU4jKLctDu2QibrWvPtogtYHdW7'
  }

------------------------------------------------------------------------------

fromSun
===============

Helper function that will convert a value in SUN to TRX. (1 SUN = 0.000001 TRX)

-------
Usage
-------

.. code-block:: javascript

  tronWeb.fromSun()

--------------
Parameters
--------------

String or Number

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  > tronWeb.fromSun("1000000")
  '1'

------------------------------------------------------------------------------

fromUtf8
===============

Helper function that will convert UTF8 to HEX

-------
Usage
-------

.. code-block:: javascript

  tronWeb.fromUtf8()

--------------
Parameters
--------------

String

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.fromUtf8("test")
  >"0x74657374"
  
------------------------------------------------------------------------------

getEventByTransactionID
==============================

Will return all events within a transactionID.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.getEventByTransactionID()

--------------
Parameters
--------------

String

-------
Returns
-------

Promise Object(Array)

-------
Example
-------

.. code-block:: javascript
  
  >tronWeb.getEventByTransactionID("78938dc73353a9a2cc45f7e20e4f9344f99e31bfcd5d54337a0bd9f2c8626604").then(result => {console.log(result)})
  Promise { <pending> }
  > [
    {
      block: 693938,
      timestamp: 1577676408000,
      contract: 'TUPz3wD356e3iV337s4cnjQS2weUdhX5ci',
      name: 'RNGUpdated',
      transaction: '78938dc73353a9a2cc45f7e20e4f9344f99e31bfcd5d54337a0bd9f2c8626604',
      result: {
        r: 'fc76c7a74f2154548b78cf4800c62140c0b4c132fe5603ae0529f8e072196d8b',
        afterSeed: '38045f6efcdac2da2389639bf61fd06eb0c3814dcaa99adabf2ca56817ee69ce',
        s: '7db37b185701cb63150bad3604dbc268561ef3dba9115fb991ef27fa7aac5155',
        index: '53866',
        previousSeed: 'a3a67ca0db89f0676c0f9e9e50338d4b5254385299f81f5aa11c25e926461108',
        updater: '0xc2ee6be7f9ea0be9084047e60119204d81b3e658',
        timestamp: '1577676408'
      },
      resourceNode: 'solidityNode'
    }
  ]
  
------------------------------------------------------------------------------

getEventResult
==============================

Returns all events matching the filters.

.. note:: 
  API Change

  Applies Starting From TronWeb 2.1.31

  This new API function differs from the previous function in that it takes in an additional 3 parameters in the optional object input. These additional 3 parameters are onlyConfirmed, onlyUnconfirmed, and fingerprint.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.getEventResult(contractAddress, {}, callback);

--------------
Parameters
--------------

String
Object

The { } input parameter refers to an object that contains 7 parameters whose values can be customized. If the values are not customized, then default values are set in place. The 7 parameters and their descriptions are below:

.. list-table::
   :widths: 25 50
   :header-rows: 1

   * - Options Parameter
     - Description
   * - sinceTimestamp
     - Filter for events since certain timestamp. The sequence of the result is according to the 'sort' field.
   * - eventName
     - Name of the event to filter by.
   * - blockNumber
     - Specific block number to query
   * - size
     - maximum number returned
   * - onlyConfirmed
     - If set to true, only returns confirmed transactions.
   * - onlyUnconfirmed
     - If set to true, only returns unconfirmed transactions.
   * - fingerprint
     - The fingerprint field appears in the last data of the previous query. After specifying the corresponding field content this time, subsequent data will be returned. If there is no this field in the last data of the query, it means that there is no more data
   * - sort
     - Can be 'block_timestamp' for time sequence or '-block_timestamp' for the reverse. Default is '-block_timestamp'.

-------
Returns
-------

Promise Object(Array)

-------
Example
-------

.. code-block:: javascript
  
  > tronWeb.getEventResult("TUPz3wD356e3iV337s4cnjQS2weUdhX5ci",{eventName:"RNGIterated",size:2}).then(result => {console.log(result)})
  Promise { <pending> }
  > [
    {
      block: 615212,
      timestamp: 1577440164000,
      contract: 'TUPz3wD356e3iV337s4cnjQS2weUdhX5ci',
      name: 'RNGIterated',
      transaction: 'a8929bcfb8a7337d6c8c5850b5ed63cdd09ff17bbde46dad07b2c1f20c427e89',
      result: {
        index: '41796',
        rng: '3f7bf1c50a01cbcb980360effa904e0e11880af8daeeb2f8da686b7b3e5d9a50',
        timestamp: '1577440164'
      },
      resourceNode: 'solidityNode'
    },
    {
      block: 615205,
      timestamp: 1577440143000,
      contract: 'TUPz3wD356e3iV337s4cnjQS2weUdhX5ci',
      name: 'RNGIterated',
      transaction: 'fa9e91282de9eb462efabea838c2d0465602312a87ded06524c87d8afafd743d',
      result: {
        index: '41795',
        rng: 'bf190910aa5293ab12f644eb723b5460340e3ec11ac073124147e5fc92ca44d2',
        timestamp: '1577440143'
      },
      resourceNode: 'solidityNode',
      fingerprint: '2TBTeOqO3x2kJDyxT'
    }
  ]
  
------------------------------------------------------------------------------

isAddress
==============================

Helper function that will check if a given address is valid.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.isAddress()

--------------
Parameters
--------------

String

-------
Returns
-------

Boolean

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.isAddress("414fa1f834a47f621957ec2ae7d445da9b3be0bee4")
  >true
  tronWeb.isAddress("THEGR4Aor5pCDVktbbbwgHAE6PQWRfejBf")
  >true