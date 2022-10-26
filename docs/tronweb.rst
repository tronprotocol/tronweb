.. _tronweb:

=================
tronWeb
=================

Create an instance of the tronWeb javascript library. In addition to the utility functions, it includes all related modules.

------------------------------------------------------------------------------

tronWeb object
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

-------
tronWeb.address.toHex
-------

Convert Base58 format addresses to Hex.

^^^^^^^^^^^
Usage
^^^^^^^^^^^

.. code-block:: javascript

  tronWeb.address.toHex()

^^^^^^^^^^^
Parameters
^^^^^^^^^^^

address-base58 format

^^^^^^^^^^^
Returns
^^^^^^^^^^^

String

^^^^^^^^^^^
Example
^^^^^^^^^^^

.. code-block:: javascript

  tronWeb.address.toHex("TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL")
  > "418840E6C55B9ADA326D211D818C34A994AECED808"

------------------------------------------------------------------------------

-------
tronWeb.address.fromHex
-------

Convert Hexstring format address to Base58 format address.

^^^^^^^^^^^
Usage
^^^^^^^^^^^

.. code-block:: javascript

  tronWeb.address.fromHex()

^^^^^^^^^^^
Parameters
^^^^^^^^^^^

address-hexstring format

^^^^^^^^^^^
Returns
^^^^^^^^^^^

String

^^^^^^^^^^^
Example
^^^^^^^^^^^

.. code-block:: javascript
  
  tronWeb.address.fromHex("418840E6C55B9ADA326D211D818C34A994AECED808")
  > "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL"

------------------------------------------------------------------------------

-------
tronWeb.address.fromPrivateKey
-------

Derive its corresponding address based on the private key.


^^^^^^^^^^^
Usage
^^^^^^^^^^^

.. code-block:: javascript

  tronWeb.address.fromPrivateKey()

^^^^^^^^^^^
Parameters
^^^^^^^^^^^

privateKey

^^^^^^^^^^^
Returns
^^^^^^^^^^^

String

^^^^^^^^^^^
Example
^^^^^^^^^^^

.. code-block:: javascript
  
  tronWeb.address.fromPrivateKey("3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145")
  > "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL"

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
     - | The fingerprint field appears in the last data of the previous query. 
       | After specifying the corresponding field content this time, subsequent data will be returned. 
       | If there is no this field in the last data of the query, it means that there is no more data.
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


------------------------------------------------------------------------------

isConnected
==============================

Checks if TronWeb is connected to the nodes and event server.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.isConnected()

--------------
Parameters
--------------

N/A

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.isConnected();
  >{
    "fullNode": true,
    "solidityNode": true,
    "eventServer": true
  }
  
------------------------------------------------------------------------------

setHeader
==============================

Set the API Key parameters of all TronWeb API requests.

.. note:: 
  It needs to be set only when using the Trongrid service. For API Key parameter application and use, please refer to `document <https://developers.tron.network/reference#api-key>`_.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.setHeader({"TRON-PRO-API-KEY": 'your api key'});

--------------
Parameters
--------------

Object

-------
Returns
-------

No return value

-------
Example
-------

.. code-block:: javascript
  
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey)
  tronWeb.setHeader({ "TRON-PRO-API-KEY": '25f66928-0b70-48cd-9ac6-da6f8247c663' });
  
------------------------------------------------------------------------------

setDefaultBlock
==============================

Sets the default block used as a reference for tronWeb.trx.getBlock, tronWeb.trx.getBlockTransactionCount, tronWeb.trx.getTransactionFromBlock.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.setDefaultBlock('blockID');

--------------
Parameters
--------------

Possible input values can be 'latest', 'earliest', left blank or block number.

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - latest
     - The reference block is the latest block;
     - String
   * - earliest
     - The reference block is the genesis block;
     - String
   * - left blank
     - No reference block
     -  
   * - block number
     - The reference block is the corresponding block.	
     - 0 or the positive integer

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.setDefaultBlock('latest');
  >'latest'

  tronWeb.setDefaultBlock();
  >false

  tronWeb.setDefaultBlock('earliest');
  >'Earliest'

  tronWeb.setDefaultBlock(585367);
  >undefined
  
------------------------------------------------------------------------------

setPrivateKey
==============================

Set a private key used with the TronWeb instance, used for obtaining the address, signing transactions, and getting balances.

.. warning:: 
  Do not use this with any web/user facing TronWeb instances. This will leak the private key.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.setPrivateKey('da146...f0d0');

--------------
Parameters
--------------

String

-------
Returns
-------

No return value

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.setPrivateKey('AD71C52E0FC0AB0DFB13B3B911624D4C1AB7BDEFAD93F36B6EF97DC955577509');
  >undefined
  tronWeb.defaultPrivateKey
  >'AD71C52E0FC0AB0DFB13B3B911624D4C1AB7BDEFAD93F36B6EF97DC955577509'
  
------------------------------------------------------------------------------

setAddress
==============================

Sets the address used with all TronWeb API's. Will not sign any transactions.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.setAddress();

--------------
Parameters
--------------

String(HexString or Base58)


-------
Returns
-------

No return value



-------
Example
-------

.. code-block:: javascript
  
  //example 1
  tronWeb.setAddress('TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2');
  …
  tronWeb.defaultAddress
  >{
    hex: '41d3fd1b6f3f3a86303e2925844456c49876c4561f',
    base58: 'TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2'
  }

  //example 2
  tronWeb.setAddress('41d3fd1b6f3f3a86303e2925844456c49876c4561f');
  …
  tronWeb.defaultAddress
  >{
    hex: '41d3fd1b6f3f3a86303e2925844456c49876c4561f',
    base58: 'TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2'
  }
  
------------------------------------------------------------------------------

sha3
==============================

Helper function that will sha3 any value using keccak256.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.sha3(String, Object)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - String
     - The string that needs to be hashed using Keccak-256 SHA3 algorithm
     - String
   * - Object
     - Optional setting. If you want to parse a hex string in hex format. Need to set encoding to hex. Because 0x is ignored by default in JS.
     - Object

-------
Returns
-------

String - The result hashed using the Keccak-256 SHA3 algorithm.

-------
Example
-------

.. code-block:: javascript
  
  var hash = tronWeb.sha3("some string to be hashed");
  >0xc4b9bbe7eb8797cf2818085dbcd6ea6662b3261c28810c318e079c8d0c691da6
  var hashOfHash = tronWeb.sha3(hash,{encoding:'hex'})
  console.log(hashOfHash)
  >0xc4b9bbe7eb8797cf2818085dbcd6ea6662b3261c28810c318e079c8d0c691da6
  
------------------------------------------------------------------------------

toAscii
==============================

Convert HEX string to ASCII3 string.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.toAscii(hexString)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - hexString
     - hexadecimal string
     - String

-------
Returns
-------

String - The ASCII value corresponding to the given hexadecimal string.

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.toAscii("0x74726f6e")
  >"tron"
  
------------------------------------------------------------------------------

toBigNumber
==============================

Convert a given number or hexadecimal string to a BigNumber.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.toBigNumber(amount)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - amount
     - number in hexadecimal format
     - Number | String

-------
Returns
-------

BigNumber - BigNumber instance

-------
Example
-------

.. code-block:: javascript
  
  var value = tronWeb.toBigNumber('200000000000000000000001');
  console.log(value.toNumber())
  >2.0000000000000002e+23
  console.log(value.toString(10))
  >200000000000000000000001
  
------------------------------------------------------------------------------

toDecimal
==============================

Convert a hexadecimal to a decimal number.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.toDecimal(value)

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
     - Hex string
     - String

-------
Returns
-------

Number - The hexadecimal value represented by the passed in string.

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.toDecimal('0x15')
  >21
  
------------------------------------------------------------------------------

toHex
==============================

Convert any value to HEX.

.. note:: 
  This function does not convert TRX addresses to Hex. If you wish to specifically convert TRX addresses to HEX, please use tronWeb.address.toHex instead.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.toHex(value)

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
     - | The value to be converted to HEX.
       | If it is an object or array type, it will first be converted to a string using JSON.stringify.
       | If BigNumber is passed in, you will get the HEX of the corresponding Number.
     - String | Number | Object | Array | BigNumber

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.toHex("abcABC")
  >"0x616263414243"
  tronWeb.toHex({abc:"ABC"})
  >"0x7b22616263223a22414243227d"
  
------------------------------------------------------------------------------

toSun
==============================

Helper function that will convert a value in TRX to SUN. (1 SUN = 0.000001 TRX).

-------
Usage
-------

.. code-block:: javascript

  tronWeb.toSun(trx)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - trx
     - value in TRX to convert to SUN
     - Number

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.toSun(10)
  >"10000000"
  
------------------------------------------------------------------------------

toUtf8
==============================

Helper function that will convert HEX to UTF8.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.toUtf8(hex)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - hex
     - value to convert to UTF8
     - String

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript
  
  tronWeb.toUtf8("0x74657374")
  >'test'
  
------------------------------------------------------------------------------

BigNumber
==============================

Convert a given number or hexadecimal string to a BigNumber.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.BigNumber(amount)

--------------
Parameters
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - amount
     - number in hexadecimal format
     - Number | String | BigNumber

-------
Returns
-------

BigNumber-BigNumber instance

-------
Example
-------

.. code-block:: javascript
  
  var value = tronWeb.BigNumber('200000000000000000000001');
  console.log(value.toNumber())
  >2.0000000000000002e+23
  console.log(value.toString(10))
  >200000000000000000000001

.. note:: 
  `TronWeb v4.0.0 <https://github.com/tronprotocol/tronweb/releases/tag/v4.0.0>`_ updated bignumber.js to v9.0.1, which is a breaking change.

  If you get a result after triggerConstantContract or call method, do not use tronWeb.BigNumber(result) which will get null. Thus：
  TronWeb v4.0.0 and later：tronWeb.toBigNumber(result) or tronWeb.BigNumber(result._hex)
  TronWeb version before v4.0.0：tronWeb.BigNumber(result)