getTokensIssuedByAddress
===========

Query the TRC10 token issue information of an account.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTokensIssuedByAddress(address);

--------------
Parameters
--------------

String (HexString/Base58)

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example 1
  >tronWeb.trx.getTokensIssuedByAddress("TF5Bn4cJCT6GVeUgyCN4rBhDg42KBrpAjg").then(result => {console.log(result)});
  > {
    BitTorrent: {
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
  }

  //example 2
  >tronWeb.trx.getTokensIssuedByAddress("4137fa1a56eb8c503624701d776d95f6dae1d9f0d6").then(result => {console.log(result)});
  > {
    BitTorrent: {
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
  }
