
================
tronweb.contract
================

tronweb.contract intro

------------------------------------------------------------------------------

trigger a contract
=====================

Trigger a smart contract.

| Use ``call`` to execute a ``pure`` or ``view`` smart contract method.
| Use ``send`` to execute a ``non-pure`` or ``modify`` smart contract method.
| Please refer to method.call(), method.send().

------------------------------------------------------------------------------

tronweb.contract.new
=====================

Deploy a smart contract.

----------
Usage
----------

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

----------
Parameters
----------

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

----------
Returns
----------

Object

----------
Example
----------

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

------------------------------------------------------------------------------

tronweb.contract.at
=====================

Query a smart contract.

----------
Usage
----------

.. code-block:: javascript

  tronWeb.contract().at("contractAddress");

----------
Parameters
----------

String

----------
Returns
----------

Object

----------
Example
----------

.. code-block:: javascript

  //Example 1
  async function getContract(){
      let res = await tronWeb.contract().at("410d5a65c8ba668840dc1e7edfcd9445760dfb6dc8");
      console.log(res);
  }
  getContract();// Execute the function

  //Example 2
  async function getContract(){
      let res = await tronWeb.contract().at("TBBp5VF2q73hfMUoyxr138Kx3kbsi6HQRS");
      console.log(res);
  }
  getContract();// Execute the function