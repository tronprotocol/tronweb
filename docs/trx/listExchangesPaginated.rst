listExchangesPaginated
===========

Query the list of the exchange pairs by pagination.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listExchangesPaginated(Limit, Offset);

--------------
Parameters
--------------

============= ================================= ======================
Parameter     Description                       Data Type
============= ================================= ======================
Limit         The amount of exchanges returned.	Number
Offset        The index of the start exchange.	Number
============= ================================= ======================


-------
Returns
-------

Object array

-------
Example
-------

.. code-block:: javascript

  > tronWeb.trx.listExchangesPaginated(2, 0).then(result => console.log(result));
  > [
    {
      exchange_id: 1,
      creator_address: '41f596e85bfd042744f76880979a133da0728679d9',
      create_time: 1539673398000,
      first_token_id: '31303030353634',
      first_token_balance: 174,
      second_token_id: '5f',
      second_token_balance: 85199
    },
    {
      exchange_id: 2,
      creator_address: '41cd3444bd2d493628b14d6dcec93181e15f94d169',
      create_time: 1541678472000,
      first_token_id: '31303031333035',
      first_token_balance: 128,
      second_token_id: '5f',
      second_token_balance: 15102
    }
  ]
