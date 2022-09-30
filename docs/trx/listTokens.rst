listTokens
===========

Query the list of the TRC 10 tokens by pagination.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listTokens(Limit, Offset);

--------------
Parameters
--------------

=========== =============================== =============
Parameter	  Description	                    Data Type
=========== =============================== =============
Limit       The amount of tokens returned.	Number
Offset      The index of the start token.   Number
=========== =============================== =============

-------
Returns
-------

Object array

-------
Example
-------

.. code-block:: javascript

  > tronWeb.trx.listTokens(2,0).then(result => {console.log(result)});
  > [
    {
      owner_address: '416b1171698969a36e5eb2eb6ea7aa9204d5e10cfc',
      name: '!!!!GOLDCOIN',
      abbr: 'GOLD',
      total_supply: 9000000000000000000,
      trx_num: 1000000,
      num: 1000,
      start_time: 1556094180182,
      end_time: 1871799840182,
      description: 'GOLD',
      url: 'https://goldchain.xyz',
      id: '1002341'
    },
    {
      owner_address: '418f82a73b283c7bf8515fa3cc2c0399d4d593e2e3',
      name: '!!!!GoldSpot!!!!',
      abbr: 'Gold',
      total_supply: 99000000000,
      frozen_supply: [ [Object] ],
      trx_num: 1000000,
      num: 100,
      start_time: 1559106000646,
      end_time: 1609451940646,
      description: 'GoldSpot follow the price of gold in the blockchain!!! Owners will get AGS (aGoldSpot) drop monthly. GoldSpot will be upgraded to a trc20 in 2020. Invest in the gold market!!! Global Gold Traders!!',
      url: 'www.goldspot.eu',
      id: '1002467'
    }
  ]
