Tronweb
=================


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

----------------------------------------------

BigNumber
===========

Convert a given number or hexadecimal string to a BigNumber

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.BigNumber()

--------------
Parameters
--------------

Number | String - number in hexadecimal format

-------
Returns
-------

BigNumber

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
  `TronWeb v4.0.0 <https://github.com/tronprotocol/tronweb/releases/tag/v4.0.0>`__ updated bignumber.js to v9.0.1, which is a breaking change.

  If you get a result after triggerConstantContract or call method, do not use tronWeb.BigNumber(result) which will get null. Thus：
  TronWeb v4.0.0 and later：tronWeb.toBigNumber(result) or tronWeb.BigNumber(result._hex)
  TronWeb version before v4.0.0：tronWeb.BigNumber(result)

----------------------------------------------

=================================
contract
=================================

tronWeb.contract
-----------------

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