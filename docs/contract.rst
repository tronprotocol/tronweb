
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