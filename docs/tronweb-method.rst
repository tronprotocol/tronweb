
==============
tronweb.method
==============

tronweb.method intro

------------------------------------------------------------------------------

contract().method
=====================

After creating a contract instance, you can execute the contract's methods.

| Use ``call`` to execute a ``pure`` or ``view`` smart contract method.
| Use ``send`` to execute a ``non-pure`` or ``modify`` smart contract method.
| Please refer to method.call(), method.send().

There are two ways to create a contract instance:

.. code-block:: javascript
    
  //Example 1
  let abi = [...];       
  let instance = await tronWeb.contract(abi,'contractAddress'); 

  //Example 2
  let instance = await tronWeb.contract.at('contractAddress');

------------------------------------------------------------------------------

method.call()
=====================

Use ``call`` to execute a ``pure`` or ``view`` smart contract method. These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.

----------
Usage
----------

.. code-block:: javascript
  
  //Example 1
  let contract = await tronWeb.contract.at('contractAddress'); 
  let result = await contract.function_name(para1,para2,...).call();

  //Example 2
  let contract = await tronWeb.contract.at('contractAddress'); 
  let result = await contract["function_name"](para1,para2,...).call();

----------
Parameters
----------

No need to pass parameters

----------
Returns
----------

Object

----------
Example
----------

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

method.send()
=====================

Use ``send`` to execute a ``non-pure`` or ``modify`` smart contract method on a given smart contract that modify or change values on the blockchain. These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.

----------
Usage
----------

.. code-block:: javascript

  let contract = await tronWeb.contract.at('contractAddress'); 
  let result = await contract.function_name(para1,para2,...).send({
      feeLimit:100_000_000,
      callValue:0,
    tokenId:1000036,
    tokenValue:100,
    shouldPollResponse:true
  });

----------
Parameters
----------

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

----------
Returns
----------

Object

----------
Example
----------

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

method.watch()
=====================

Use watch to listen for events emitted by a smart contract method. You can define functions to be executed when certain events are caught.

----------
Usage
----------

.. code-block:: javascript

  let contract = await tronWeb.contract.at('contractAddress'); 
  contract.eventMethod().watch((err, event) => {
      if (err){
      return console.error('Error with "method" event:', err);
    }
    if (event) { 
        // some function
    }
  });

----------
Parameters
----------

No need to pass parameters

----------
Returns
----------

Object

----------
Example
----------

.. code-block:: javascript

  //Example 1
  async function triggercontract(){
      try {
          let instance = await tronWeb.contract().at('TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK');
        
          instance.Transfer().watch((err, eventResult) => {
              if (err) {
                  return console.error('Error with "method" event:', err);
              }
              if (eventResult) { 
                  console.log('eventResult:',eventResult);
              }
            });

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

  //Example 2
  async function triggercontract(){
      try {
          let instance = await tronWeb.contract().at('TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK');
        
          instance["Transfer"]().watch((err, eventResult) => {
              if (err) {
                  return console.error('Error with "method" event:', err);
              }
              if (eventResult) { 
                  console.log('eventResult:',eventResult);
              }
            });

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

.. list-table::
   :widths: 50 50
   :header-rows: 1
   
   * - Parameter
     - Description
   * - err
     - Error
   * - event
     - Event Name emitted from the Smart Contract.
