.. _tronweb-contract:

================
tronWeb.contract
================

**Smart Contract Deployment**

For deploying a smart contract, you can not only use the `tronWeb.transactionBuilder.createSmartContract <createSmartContract>` interface, but also the `tronWeb.contract().new() <tronweb.contract().new>` interface.

**Smart Contract Invocation**

Get smart contract instance

Before calling a smart contract, you need to obtain the smart contract instance first. You can create a contract instance in the following two ways:

.. code-block:: javascript

  //Example 1
  let abi = [...];       
  let instance = await tronWeb.contract(abi,'contractAddress'); 

  //Example 2
  let instance = await tronWeb.contract.at('contractAddress');

Calling smart contract methods

Different types of contract methods need to be invoked by different tronweb apis:

Use ``call`` to execute ``pure`` or ``view`` smart contract methods, please refer to `method.call() <contract.call()>`
Use ``send`` to execute ``non-pure`` or ``modify`` smart contract methods, please refer to `method.send() <contract.send()>` for specific usage instructions.

------------------------------------------------------------------------------


tronWeb.contract
=================

Creates a contract object that wraps an ABI. Allows you to easily call functions on on the contract.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.contract()  

-------
Parameters
-------

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
.. _tronweb.contract().new:

tronweb.contract().new
=========================

Deploy a smart contract.

-------
Usage
-------

.. code-block:: javascript

  let abi = 'some abi for contract';
  let code = 'bytecode';
  async function deploy_contract(){
    let contract_instance = await tronWeb.contract().new({
      abi:JSON.parse(abi),
      bytecode:code,
      feeLimit:1000000000,
      callValue:0,
      userFeePercentage:1,
      originEnergyLimit:10000000,
      parameters:[para1,2,3,...]
    });
    console.log(contract_instance.address);
  }

-------
Parameters
-------

.. list-table::
   :widths: 25 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
     - Option
   * - abi
     - Smart Contract's Application Binary Interface.
     - String
     - Required
   * - bytecode
     - The compiled contract's identifier, used to interact with the Virtual Machine.
     - String
     - Required
   * - feeLimit
     - The maximum SUN consumes by deploying this contract. (1TRX = 1,000,000SUN)
     - Integer, long
     - Optional
   * - allValue
     - Amount of SUN transferred to the contract with this transaction. (1TRX = 1,000,000 SUN)
     - Integer
     - Optional
   * - userFeePercentage
     - The energy consumption percentage specified for the user calling this contract.
     - Integer between 0 and 100
     - Optional
   * - originEnergyLimit
     - The max energy which will be consumed by the owner in the process of execution or creation of the contract, is an integer which should be greater than 0.
     - Integer
     - Optional
   * - parameters
     - Parameter passed to the constructor of the contract.
     - Array
     - Optional, required if constructor needs parameters

.. note::
   for the ``userFeePercentage`` parameter, it is **strongly recommended** to set the integer value between 1 and 99 (inclusive). Setting as 0 could potentially open the contract developer up to an infinite loop time-out attack.

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  let abi = 'some abi for contract';
  let code = 'bytecode';
  async function deploy_contract(){
    let contract_instance = await tronWeb.contract().new({
      abi:JSON.parse(abi),
      bytecode:code,
      feeLimit:1_00_000_000,
      callValue:0,
      userFeePercentage:1,
      originEnergyLimit:10_000_000
      //parameters:[para1,2,3,...]
    });
    console.log(contract_instance.address);
  }

  deploy_contract();// Execute the function
  Promise { <pending> }
  > 414d137bb7f91e8704d712d3967f6a745b9eedd839

-----------------------------------------------------------------------------

Trigger a smart contract
=========================

After creating a contract instance, you can execute the contract's methods.

| Use ``call`` to execute a ``pure`` or ``view`` smart contract method.
| Use ``send`` to execute a ``non-pure`` or ``modify`` smart contract method.
| Please refer to call(), send().

There are two ways to create a contract instance:

.. code-block:: javascript
    
  //Example 1
  let abi = [...];       
  let instance = await tronWeb.contract(abi,'contractAddress'); 

  //Example 2
  let instance = await tronWeb.contract.at('contractAddress');

------------------------------------------------------------------------------

.. _contract.call():

call()
======

Use ``call`` to execute a ``pure`` or ``view`` smart contract method. These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.

-------
Usage
-------

.. code-block:: javascript
  
  //Example 1
  let contract = await tronWeb.contract.at('contractAddress'); 
  let result = await contract.function_name(para1,para2,...).call();

  //Example 2
  let contract = await tronWeb.contract.at('contractAddress'); 
  let result = await contract["function_name"](para1,para2,...).call();

-------
Parameters
-------

No need to pass parameters

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript
  
  //Example 1
  async function triggercontract(){
    let instance = await tronWeb.contract().at('TBBp5VF2q73hfMUoyxr138Kx3kbsi6HQRS');
    let res = await instance.totalSupply().call();
    console.log(res);
  }
  triggercontract();

  //Example 2
  async function triggercontract(){
    let instance = await tronWeb.contract().at('TBBp5VF2q73hfMUoyxr138Kx3kbsi6HQRS');
    let res = await instance["totalSupply"]().call();
    console.log(res);
  }
  triggercontract();

------------------------------------------------------------------------------

.. _contract.send():

send()
======

Use ``send`` to execute a ``non-pure`` or ``modify`` smart contract method on a given smart contract that modify or change values on the blockchain. These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.

-------
Usage
-------

.. code-block:: javascript

  let contract = await tronWeb.contract.at('contractAddress'); 
  let result = await contract.function_name(para1,para2,...).send({
      feeLimit:100_000_000,
      callValue:0,
    tokenId:1000036,
    tokenValue:100,
    shouldPollResponse:true
  });

-------
Parameters
-------

.. list-table::
   :widths: 20 60 20
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type

   * - feeLimit
     - The maximum SUN consumes by calling this contract method. Hard capped at 10000 TRX. (1TRX = 1,000,000SUN)
     - Integer
   * - callValue
     - Amount of TRX transferred with this transaction, measured in SUN (1 TRX = 1,000,000 SUN).
     - Integer
   * - shouldPollResponse
     - If set to TRUE, this will wait until the transaction is confirmed on the solidity node before returning the result.
     - Boolean
   * - tokenId
     - If the function accepts a trc 10 token , then the id of the same
     - String
   * - tokenValue
     - Amount of token sent with the call.
     - Integer

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  async function triggercontract(){
      try {
          let instance = await tronWeb.contract().at('TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK');
          let res = await instance.transfer('TWbcHNCYzqAGbrQteKnseKJdxfzBHyTfuh',500).send({
              feeLimit:100_000_000,
              callValue:0,
              shouldPollResponse:true
          });

          console.log(res);

      } catch (error) {
          console.log(error);
      }
  }

  triggercontract();

------------------------------------------------------------------------------