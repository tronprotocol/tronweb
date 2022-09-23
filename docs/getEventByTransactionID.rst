
getEventByTransactionID
========================

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