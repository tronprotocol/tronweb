listSuperRepresentatives
===========

Query the list of the witnesses.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listSuperRepresentatives();

--------------
Parameters
--------------

N/A

-------
Returns
-------

Object array

-------
Example
-------

.. code-block:: javascript

  > tronWeb.trx.listSuperRepresentatives().then(result => {console.log(result)});
  > [
    {
      address: '417bdd2efb4401c50b6ad255e6428ba688e0b83f81',
      voteCount: 280515210,
      url: 'https://minergate.com',
      totalProduced: 280912,
      totalMissed: 672,
      latestBlockNum: 16214311,
      latestSlotNum: 526299468,
      isJobs: true
    },
    {
      address: '4138e3e3a163163db1f6cfceca1d1c64594dd1f0ca',
      voteCount: 256034164,
      url: 'https://twitter.com/justinsuntron',
      totalProduced: 549168,
      totalMissed: 1712,
      latestBlockNum: 16214312,
      latestSlotNum: 526299469,
      isJobs: true
    },
    ... //more items
