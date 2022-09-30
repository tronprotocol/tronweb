getTokenByID
===========

Query TRC10 token information by the token id.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTokenByID(tokenID);

--------------
Parameters
--------------

String or Number

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example 1
  > tronWeb.trx.getTokenByID(1002000).then(result => {console.log(result)});
  > {
    owner_address: '4137fa1a56eb8c503624701d776d95f6dae1d9f0d6',
    name: 'BitTorrent',
    abbr: 'BTT',
    total_supply: 990000000000000000,
    trx_num: 1,
    precision: 6,
    num: 1,
    start_time: 1548000000000,
    end_time: 1548000001000,
    description: 'Official Token of BitTorrent Protocol',
    url: 'www.bittorrent.com',
    id: '1002000'
  }

  //example 2
  > tronWeb.trx.getTokenByID('1002000').then(result => {console.log(result)});
  > {
    owner_address: '4137fa1a56eb8c503624701d776d95f6dae1d9f0d6',
    name: 'BitTorrent',
    abbr: 'BTT',
    total_supply: 990000000000000000,
    trx_num: 1,
    precision: 6,
    num: 1,
    start_time: 1548000000000,
    end_time: 1548000001000,
    description: 'Official Token of BitTorrent Protocol',
    url: 'www.bittorrent.com',
    id: '1002000'
  }
