getAccount
===========

Get account information

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getAccount(address)

--------------
Parameters
--------------

String(HexString or Base58)


-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //Parameter Base58
  >tronWeb.trx.getAccount('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(console.log)
  >{
    address: '41bf97a54f4b829c4e9253b26024b1829e1a3b1120',
    balance: 29887074430,
    frozen: [ { frozen_balance: 12000000, expire_time: 1577615814000 } ],
    create_time: 1575710031000,
    latest_opration_time: 1577356614000,
    latest_consume_free_time: 1577356614000,
    account_resource: {
      frozen_balance_for_energy: { frozen_balance: 12000000, expire_time: 1577588400000 },
      latest_consume_time_for_energy: 1577342304000
    },
    owner_permission: { permission_name: 'owner', threshold: 1, keys: [ [Object] ] },
    active_permission: [
      {
        type: 'Active',
        id: 2,
        permission_name: 'active',
        threshold: 1,
        operations: '7fff1fc0033e0100000000000000000000000000000000000000000000000000',
        keys: [Array]
      }
    ],
    assetV2: [ { key: '1000001', value: 0 } ],
    free_asset_net_usageV2: [ { key: '1000001', value: 0 } ]
  }

  //Parameter HexString      
  >tronWeb.trx.getAccount('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(console.log)
  >{
    address: '41bf97a54f4b829c4e9253b26024b1829e1a3b1120',
    balance: 29340074430,
    frozen: [ { frozen_balance: 12000000, expire_time: 1577615814000 } ],
    create_time: 1575710031000,
    latest_opration_time: 1578635577000,
    latest_consume_time: 1578635577000,
    latest_consume_free_time: 1577356614000,
    account_resource: {
      frozen_balance_for_energy: { frozen_balance: 12000000, expire_time: 1577588400000 },
      latest_consume_time_for_energy: 1578047682000
    },
    owner_permission: { permission_name: 'owner', threshold: 1, keys: [ [Object] ] },
    active_permission: [
      {
        type: 'Active',
        id: 2,
        permission_name: 'active12323',
        threshold: 2,
        operations: '7fff1fc0033e0000000000000000000000000000000000000000000000000000',
        keys: [Array]
      }
    ],
    assetV2: [ { key: '1000001', value: 1000000000 } ],
    free_asset_net_usageV2: [ { key: '1000001', value: 0 } ]
  }
