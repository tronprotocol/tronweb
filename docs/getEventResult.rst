
getEventResult
=================

Returns all events matching the filters.

.. warning:: 

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
``contractAddress`` - ``String``

``Options`` - ``Object``

==================  ============
Options             Description
==================  ============
sinceTimestamp      Filter for events since certain timestamp. The sequence of the result is according to the 'sort' field.
eventName           Name of the event to filter by.
blockNumber	        Specific block number to query
size	              maximum number returned
onlyConfirmed     	If set to true, only returns confirmed transactions.
onlyUnconfirmed	    If set to true, only returns unconfirmed transactions.
fingerprint	        The fingerprint field appears in the last data of the previous query. After specifying the corresponding field content this time, subsequent data will be returned. If there is no this field in the last data of the query, it means that there is no more data
sort	              Can be 'block_timestamp' for time sequence or '-block_timestamp' for the reverse. Default is '-block_timestamp'.
==================  ============

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