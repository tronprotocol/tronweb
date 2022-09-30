getTransactionInfo
===========

Gets the details for a transaction, including the fees and virtual machine events for a transaction.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTransactionInfo(transactionID);

--------------
Parameters
--------------

String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getTransactionInfo("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2");
  >{ id:
    '0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2',
    fee: 4110,
    blockNumber: 7000000,
    blockTimeStamp: 1551102291000,
    contractResult: [ '' ],
    contract_address: '41eb8f23b15acbc0245a4dbbd820b9bde368b02d61',
    receipt:
    { origin_energy_usage: 38627,
      energy_usage_total: 38627,
      net_fee: 4110,
      result: 'SUCCESS' },
    log:
    [ { address: '2ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        topics: [Array],
        data:
          '000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000989680000000000000000000000000000000000000000000000000000000000000001900000000000000000000000000000000000000000000000000000000009e34000000000000000000000000000000000000000000000000000000000000000000' } ],
    internal_transactions:
    [ { hash:
          '9979a48f80e2478f98711f3e9ea1214b9215c40ad6746c9d4b6950e824ef8d49',
        caller_address: '41eb8f23b15acbc0245a4dbbd820b9bde368b02d61',
        transferTo_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '6e9822a93be15373a6a630cb619b8c905cfcfe12451e14505d3f3996503b6921',
        caller_address: '41eb8f23b15acbc0245a4dbbd820b9bde368b02d61',
        transferTo_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '7a60b8da13fab49a8b74e779c319673b283084c4d3ab764b5c0d4daec6cec0f3',
        caller_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        transferTo_address: '41af16843d1b471364576015e4062cdc3f2628eb62',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '7e9fdeef92d6fc916061d54ee2febdcd00789aa2aba767665ad454f236c1b14f',
        caller_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        transferTo_address: '4121a06340817106582d3afa3b2561bbe94cf2bd80',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '1122aa511d7a6d03bd9a760d8718b6b4a75e30dea84bd4e1bd682d1f846d53bb',
        caller_address: '4121a06340817106582d3afa3b2561bbe94cf2bd80',
        transferTo_address: '41ce3747fa895a899209c10ef1b4a41141b51b8a48',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          'b572d44ee89ed376c4aebb7b07c2839d93a745bc887be4299351cb205dbde7c3',
        caller_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        transferTo_address: '41af16843d1b471364576015e4062cdc3f2628eb62',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '6cdd8fb92aab8dd2b243c73905ec32455b732cab0eaa7acf63c0a637b6fcdeb5',
        caller_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        transferTo_address: '4121a06340817106582d3afa3b2561bbe94cf2bd80',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          'f779cbb64fb591920fd1a3a5874f34b703c69303a53c048c1e8dd8e1085d3665',
        caller_address: '4121a06340817106582d3afa3b2561bbe94cf2bd80',
        transferTo_address: '411a44e676d4864660d984f6d1f4eb06d0f5cc5208',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '575d9e67fe92eed1dae43dfed81ddf9c867228e37b764c556e921fd0b2cb7bc8',
        caller_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28',
        transferTo_address: '4121a06340817106582d3afa3b2561bbe94cf2bd80',
        callValueInfo: [Array],
        note: '63616c6c' },
      { hash:
          '1b61a5a8348084fb8ebdbf108fe871b06198cf6b7ae3963087f68aa672a978c0',
        caller_address: '4121a06340817106582d3afa3b2561bbe94cf2bd80',
        transferTo_address: '411a44e676d4864660d984f6d1f4eb06d0f5cc5208',
        callValueInfo: [Array],
        note: '63616c6c' } ] 
    }
