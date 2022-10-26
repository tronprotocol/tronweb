.. _tronweb-utils:

=======================
tronWeb.utils
=======================

-------------------------------------------------------------------

abi
=============

-------------------------------------------------------------------

encodeParams
=============

Encodes a function parameters based on its JSON interface object.

-------
Usage
-------

.. code-block:: javascript

  encodeParams(types, values)

--------------
Parameters
--------------

========== ========================================================== ===========================
Parameter  Description                                                Data Type
========== ========================================================== ===========================
types      An array with types or a JSON interface of a function.     String Array 
values     The messages to encode.                                    String Array 
========== ========================================================== ===========================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  // example 1
  const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
  const values = [
      'Pi Day N00b Token',
      'PIE',
      18,
      '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
      0
  ];

  tronWeb.utils.abi.encodeParams(types, values);
  >'0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';


  //example 2
  const ADDRESS_HEX = '41928c9af0651632157ef27a2cf17ca72c575a4d21';
  const ADDRESS_BASE58 = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
  const types = ['string', 'address', 'address'];
  const values = ['Onwer', ADDRESS_HEX, ADDRESS_BASE58];
  
  tronWeb.utils.abi.encodeParams(types, values);
  >'0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d21000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d2100000000000000000000000000000000000000000000000000000000000000054f6e776572000000000000000000000000000000000000000000000000000000'

------------------------------------------------------------------------------

decodeParams
=============

Decodes an ABI encoded parameter to its JavaScript type.

-------
Usage
-------

.. code-block:: javascript

  decodeParams(names, types, output, ignoreMethodHash);

--------------
Parameters
--------------

=========================== ============================== ===========================
Parameter                   Description                    Data Type
=========================== ============================== ===========================
names                       Key names of returned object   String Array
types                       Types of values                String Array
output                      The ABI byte code to decode    String
ignoreMethodHash            Is Method Hash ignored         Boolean
=========================== ============================== ===========================

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  // example 1
  const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
  const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';
  tronWeb.utils.abi.decodeParams(types, output);

  >{
      "Token": "Pi Day N00b Token",
      "Graph": "PIE",
      "Qty": 18,
      "Bytes": "0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7",
      "Total": {
          "type": "BigNumber",
          "hex": "0x00"
      }
  }


  // example 2
  const names = ['Token', 'Graph', 'Qty', 'Bytes', 'Total'];
  const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
  const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';
  tronWeb.utils.abi.decodeParams(names, types, output);

  >{
    "Token": "Pi Day N00b Token",
    "Graph": "PIE",
    "Qty": 18,
    "Bytes": "0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7",
    "Total": {
        "type": "BigNumber",
        "hex": "0x00"
    }
  }

-------------------------------------------------------------------

encodeParamsV2ByABI
===========

Encodes a function parameters based on its JSON interface object.

-------
Usage
-------

.. code-block:: javascript

  encodeParamsV2ByABI(funABI, args)

--------------
Parameters
--------------

========== ========================================================== ===========================
Parameter  Description                                                Data Type
========== ========================================================== ===========================
funABI     A JSON interface of a function.                            Object 
args       The messages to encode.                                    String Array 
========== ========================================================== ===========================


-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  const funABI = {
      "constant": true,
      "inputs": [
          {
              "name": "",
              "type": "int256"
          }
      ],
      "name": "test",
      "outputs": [
          {
              "name": "",
              "type": "int256"
          }
      ],
      "type": "function"
  };
  const args = [
      "1"
  ];

  tronWeb.utils.abi.encodeParamsV2ByABI(funABI, args);

  >'0x0000000000000000000000000000000000000000000000000000000000000001'

------------------------------------------------------------------------------

decodeParamsV2ByABI
======================

Decodes an ABI encoded parameter to its JavaScript type.

-------
Usage
-------

.. code-block:: javascript

  decodeParamsV2ByABI(funABI, data)

--------------
Parameters
--------------

========== ========================================================== ===========================
Parameter  Description                                                Data Type
========== ========================================================== ===========================
funABI     A JSON interface of a function.                            Object 
data       The messages to decode.                                    String 
========== ========================================================== ===========================

-------
Returns
-------

Array of Bignumber

-------
Example
-------

.. code-block:: javascript

  const funcABI = {"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"int256"}],"type":"function"};
  const result = "0x0000000000000000000000000000000000000000000000000000000000000010";
  tronWeb.utils.abi.decodeParamsV2ByABI(funcABI, result)[0].toNumber();
  >16

------------------------------------------------------------------------------

accounts
===============================

------------------------------------------------------------------------------

generateAccount
======================

Generate a new account.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.utils.accounts.generateAccount()

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

  tronWeb.utils.accounts.generateAccount();
  >{
      "privateKey": "6CAE71DC02AB46CD9D5D84A19169CD736524AA8FA46D4F82D5A7EC59584C38CB",
      "publicKey": "04688BB83F6A5917366B3AAD9B65DEDD378BD5DC936E5ADF67201A1F5769836CDF1B93C79341C38CF34B74F4E617064B9803551A49DE550BF9457E7296DCF9F841",
      "address": {
          "base58": "TJjeKprLX2cLuwjDgEPLugJsJGnuhDkkj4",
          "hex": "41602872985B8AB5DA1AF9486C6A261E247A0B1256"
      }
  }

------------------------------------------------------------------------------

base58
===============================

------------------------------------------------------------------------------

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

------------------------------------------------------------------------------

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

------------------------------------------------------------------------------

bytes
===============================

------------------------------------------------------------------------------

base64EncodeToString
===========================

Encode a bytes array to a base64 string.

-------
Usage
-------

.. code-block:: javascript

  base64EncodeToString(bytes)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
bytes      data to convert   String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.base64EncodeToString([73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115]);
  >'SSBsb3ZlIGRhcmsgY29tZWRpZXM='

------------------------------------------------------------------------------

base64DecodeFromString
===========================

Decode a base64 string.

-------
Usage
-------

.. code-block:: javascript

  base64DecodeFromString(string64)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
string64   data to convert   String
========== ================= ==============

-------
Returns
-------

Number Array

-------
Example
-------

.. code-block:: javascript

  let result = tronWeb.utils.bytes.base64DecodeFromString('SSBsb3ZlIGRhcmsgY29tZWRpZXM=');
  tronWeb.utils.bytes.bytesToString(result);
  >'I love dark comedies'

------------------------------------------------------------------------------

byte2hexStr
===========

Convert byte to hex string.

-------
Usage
-------

.. code-block:: javascript

  byte2hexStr(byte)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
byte       data to convert   String
========== ================= ==========

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.byte2hexStr(21)
  >'15'

  tronWeb.utils.bytes.byte2hexStr(33)
  >'21'

  tronWeb.utils.bytes.byte2hexStr(78)
  >'4E'

------------------------------------------------------------------------------

byteArray2hexStr
=========================

Convert an array of bytes to a hex string.

-------
Usage
-------

.. code-block:: javascript

  byteArray2hexStr(byteArray)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
byteArray  data to convert   Number Array
========== ================= ==============

-------
Returns
-------

Hex String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.byteArray2hexStr([73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115])
  >'49206C6F7665206461726B20636F6D6564696573'

------------------------------------------------------------------------------

bytesToString
==================

Convert byte to string.

-------
Usage
-------

.. code-block:: javascript

  bytesToString(arr)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
arr        data to convert   Array String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.bytesToString([78, 112, 87, 69, 99, 65])
  >'NpWEcA'

  tronWeb.utils.bytes.bytesToString([1178, 2112, 1087, 969])
  >'Қࡀпω'

------------------------------------------------------------------------------

hextoString
===========

Convert hex to string

-------
Usage
-------

.. code-block:: javascript

  hextoString(hex)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
hex        data to convert   Hex String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.bytes.hextoString('af43ed56aa77')
  >'¯CíVªw'
  
  tronWeb.utils.bytes.hextoString('0xaf43')
  >'¯C'

  tronWeb.utils.bytes.hextoString('49206C6F7665206461726B20636F6D6564696573')
  >'I love dark comedies'

------------------------------------------------------------------------------

code
===============================

------------------------------------------------------------------------------

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

------------------------------------------------------------------------------
bin2String
===========

Convert a byte to a hex string.

Alias function to bytes.bytesToString()

-------
Usage
-------

.. code-block:: javascript

  bin2String(array)

--------------
Parameters
--------------

========== ================= ==============
Parameter  Description       Data Type
========== ================= ==============
array      data to convert   Array String
========== ================= ==============

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.bin2String([78, 112, 87, 69, 99, 65])
  >'NpWEcA'

------------------------------------------------------------------------------

getStringType
=================

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

------------------------------------------------------------------------------

hexChar2byte
==============

Convert an hex char to a byte.

-------
Usage
-------

.. code-block:: javascript

  hexChar2byte(char)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
char       data to convert   char
========== ================= ==========

-------
Returns
-------

byte

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.hexChar2byte('0')
  >0

  tronWeb.utils.code.hexChar2byte('D')
  >13

  tronWeb.utils.code.hexChar2byte('d')
  >13

  tronWeb.utils.code.hexChar2byte('7')
  >7

------------------------------------------------------------------------------

hexStr2byteArray
=====================

Verify that an hex char is a valid hex char.

-------
Usage
-------

.. code-block:: javascript

  hexStr2byteArray(str, strict)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
str        data to check     String
strict     compare mode      Boolean
========== ================= ==========

-------
Returns
-------

Byte Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.hexStr2byteArray('49206C6F7665206461726B20636F6D6564696573')
  >[73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115]
  
------------------------------------------------------------------------------

isHexChar
===========

Verify that an hex char is a valid hex char.

-------
Usage
-------

.. code-block:: javascript

  isHexChar(char)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
char       data to check     char
========== ================= ==========

-------
Returns
-------

Number either 1/0

-------
Example
-------

.. code-block:: javascript


  tronWeb.utils.code.isHexChar('0')
  >1

  tronWeb.utils.code.isHexChar('e')
  >1

  tronWeb.utils.code.isHexChar('D')
  >1

  tronWeb.utils.code.isHexChar('Z')
  >0

  tronWeb.utils.code.isHexChar(66)
  >0
  
------------------------------------------------------------------------------

isNumber
===========

Verify that an numeric char is a number.

-------
Usage
-------

.. code-block:: javascript

  isNumber(char)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
char       data to check     String
========== ================= ==========

-------
Returns
-------

Number either 1/0

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.isNumber('0')
  >1

  tronWeb.utils.code.isHexChar('Z')
  >0

------------------------------------------------------------------------------

stringToBytes
===============

Convert a string to an array of bytes.

-------
Usage
-------

.. code-block:: javascript

  stringToBytes(str)

--------------
Parameters
--------------

========== ================= ==========
Parameter  Description       Data Type
========== ================= ==========
str        data to convert   String
========== ================= ==========

-------
Returns
-------

Byte Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.utils.code.stringToBytes('Қࡀпω')
  >[210, 154, 224, 161, 128, 208, 191, 207, 137]

------------------------------------------------------------------------------

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
  