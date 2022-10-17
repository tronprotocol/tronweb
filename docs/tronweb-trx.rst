
=================
tronweb-trx
=================

------------------------------------------------------------------------------

getAccount
=================

Get account information

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getAccount(address)

--------------
Parameter
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
  > tronWeb.trx.getAccount('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result => console.log(result))
  Promise { <pending> }
  > {
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
  >tronWeb.trx.getAccount('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result => console.log(result))
  Promise { <pending> }
  > {
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
  
------------------------------------------------------------------------------

getAccountResources
=================

Get the account's bandwidth and energy resources.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getAccountResources(address);

--------------
Parameter
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
  >tronWeb.trx.getAccountResources('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result => console.log(result))
  Promise { <pending> }
  > {
    freeNetLimit: 5000,
    NetLimit: 483512,
    assetNetUsed: [ { key: '1000001', value: 0 } ],
    assetNetLimit: [ { key: '1000001', value: 0 } ],
    TotalNetLimit: 43200000000,
    TotalNetWeight: 1072155,
    EnergyLimit: 4949344,
    TotalEnergyLimit: 971444468045,
    TotalEnergyWeight: 2355329
  }
          
  //Parameter HexString
  >tronWeb.trx.getAccountResources('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result => console.log(result))
  Promise { <pending> }
  > {
    freeNetLimit: 5000,
    NetLimit: 448135,
    assetNetUsed: [ { key: '1000001', value: 0 } ],
    assetNetLimit: [ { key: '1000001', value: 0 } ],
    TotalNetLimit: 43200000000,
    TotalNetWeight: 1156792,
    EnergyLimit: 1778164,
    TotalEnergyLimit: 381032718821,
    TotalEnergyWeight: 2571411
  }

------------------------------------------------------------------------------

getApprovedList
=================

This API function returns a JSON object with the list of accounts that have signed the transaction and the transaction data.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getApprovedList(transaction object after signed);

--------------
Parameter
--------------

Object

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  > tronWeb.trx.getApprovedList({'visible': true, 'signature': ['1fd210045f5bdcf375cd478cf46ff735f132281b990bc199acf1952bd438929d1d03e12de5ea7dcb89cff5b8cfc5d161661a5c1fe6a6a2422edb313b9139075300'], 'txID': 'ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2', 'raw_data': {'contract': [{'parameter': {'value': {'amount': 125000000, 'owner_address': 'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP', 'to_address': 'TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ'}, 'type_url': 'type.googleapis.com/protocol.TransferContract'}, 'type': 'TransferContract'}], 'ref_block_bytes': 'c251', 'ref_block_hash': '5c685c92bf035e72', 'expiration': 1578299967000, 'timestamp': 1578299909600}, 'raw_data_hex': '0a02c25122085c685c92bf035e7240988c89d0f72d5a68080112640a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412330a1541859009fd225692b11237a6ffd8fdba2eb7140cca121541bf97a54f4b829c4e9253b26024b1829e1a3b112018c0b2cd3b70e0cb85d0f72d'}).then(result=>console.log(result))
  Promise { <pending> }
  > {
    result: {},
    approved_list: [ 'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP' ],
    transaction: {
      result: { result: true },
      txid: 'ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2',
      transaction: {
        signature: [Array],
        txID: 'ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2',
        raw_data: [Object],
        raw_data_hex: '0a02c25122085c685c92bf035e7240988c89d0f72d5a68080112640a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412330a1541859009fd225692b11237a6ffd8fdba2eb7140cca121541bf97a54f4b829c4e9253b26024b1829e1a3b112018c0b2cd3b70e0cb85d0f72d'
      }
    }
  }


------------------------------------------------------------------------------

getBalance
=================

Get the account's balance of TRX, and display the TRX balance in SUN


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBalance(address);

--------------
Parameter
--------------

String(HexString or Base58)


-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  // Parameter Base58
  > tronWeb.trx.getBalance('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result => console.log(result))
  Promise { <pending> }
  >29887074430

  // Parameter HexString
  > tronWeb.trx.getBalance('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result => console.log(result))
  Promise { <pending> }
  >29340074430
