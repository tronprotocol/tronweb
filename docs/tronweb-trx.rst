.. _tronweb-trx:

=================
tronWeb.trx
=================

------------------------------------------------------------------------------

getAccount
=================

Get account information.

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
  tronWeb.trx.getAccount('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result => console.log(result))
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
  tronWeb.trx.getAccount('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result => console.log(result))
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
  tronWeb.trx.getAccountResources('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result => console.log(result))
  >{
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
  tronWeb.trx.getAccountResources('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result => console.log(result))
  >{
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

  tronWeb.trx.getApprovedList({'visible': true, 'signature': ['1fd210045f5bdcf375cd478cf46ff735f132281b990bc199acf1952bd438929d1d03e12de5ea7dcb89cff5b8cfc5d161661a5c1fe6a6a2422edb313b9139075300'], 'txID': 'ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2', 'raw_data': {'contract': [{'parameter': {'value': {'amount': 125000000, 'owner_address': 'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP', 'to_address': 'TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ'}, 'type_url': 'type.googleapis.com/protocol.TransferContract'}, 'type': 'TransferContract'}], 'ref_block_bytes': 'c251', 'ref_block_hash': '5c685c92bf035e72', 'expiration': 1578299967000, 'timestamp': 1578299909600}, 'raw_data_hex': '0a02c25122085c685c92bf035e7240988c89d0f72d5a68080112640a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412330a1541859009fd225692b11237a6ffd8fdba2eb7140cca121541bf97a54f4b829c4e9253b26024b1829e1a3b112018c0b2cd3b70e0cb85d0f72d'}).then(result=>console.log(result))
  >{
    "result": {},
    "approved_list": [
        "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP"
    ],
    "transaction": {
        "result": {
            "result": true
        },
        "txid": "ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2",
        "transaction": {
            "signature": [
                "1fd210045f5bdcf375cd478cf46ff735f132281b990bc199acf1952bd438929d1d03e12de5ea7dcb89cff5b8cfc5d161661a5c1fe6a6a2422edb313b9139075300"
            ],
            "txID": "ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2",
            "raw_data": {
                "contract": [
                    {
                        "parameter": {
                            "value": {
                                "amount": 125000000,
                                "owner_address": "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP",
                                "to_address": "TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ"
                            },
                            "type_url": "type.googleapis.com/protocol.TransferContract"
                        },
                        "type": "TransferContract"
                    }
                ],
                "ref_block_bytes": "c251",
                "ref_block_hash": "5c685c92bf035e72",
                "expiration": 1578299967000,
                "timestamp": 1578299909600
            },
            "raw_data_hex": "0a02c25122085c685c92bf035e7240988c89d0f72d5a68080112640a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412330a1541859009fd225692b11237a6ffd8fdba2eb7140cca121541bf97a54f4b829c4e9253b26024b1829e1a3b112018c0b2cd3b70e0cb85d0f72d"
        }
    }
  }


------------------------------------------------------------------------------

getBalance
=================

Get the account's balance of TRX, and display the TRX balance in SUN.


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
  tronWeb.trx.getBalance('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(console.log)
  >124971674

  // Parameter HexString
  tronWeb.trx.getBalance('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(console.log)
  >124971674

------------------------------------------------------------------------------

getBandwidth
=================

Query the Bandwidth information for the account.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBandwidth(address);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - address
     - target address to query.
     - String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //Example 1
  tronWeb.trx.getBandwidth('TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2').then(console.log)
  >1500

  //Example 2
  tronWeb.trx.getBandwidth('41D3FD1B6F3F3A86303E2925844456C49876C4561F').then(console.log)
  >1500

------------------------------------------------------------------------------

getBlock
=================

Query a block information by the block height or the block ID.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlock(Block Height | Block ID | Left Blank);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Block Height
     - Height of the Block
     - Integer
   * - Block ID
     - Block header hash number
     - String
   * - Left Blank
     - Will return the default block
     - 

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //Example 1
  tronWeb.trx.getBlock(12345).then(result => {console.log(result)});
  > {
    blockID: '000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764',
    block_header: {
      raw_data: {
        number: 12345,
        txTrieRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        witness_address: '414b4778beebb48abe0bc1df42e92e0fe64d0c8685',
        parentHash: '0000000000003038c0a3aa1806236bc5b281633728b5fe8a14a51062522e651d',
        timestamp: 1529928585000
      },
      witness_signature: 'cb889103aa9ce691d39df8030b54b50b12b77984684281f3490e0b802cbc364c13af773ede8d9314add0fa4d247165be82fa28721f17493c88761b7039ba1c1100'
    }
  }

  //Example 2
  tronWeb.trx.getBlock('000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764').then(result => {console.log(result)});
  > {
    blockID: '000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764',
    block_header: {
      raw_data: {
        number: 12345,
        txTrieRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        witness_address: '414b4778beebb48abe0bc1df42e92e0fe64d0c8685',
        parentHash: '0000000000003038c0a3aa1806236bc5b281633728b5fe8a14a51062522e651d',
        timestamp: 1529928585000
      },
      witness_signature: 'cb889103aa9ce691d39df8030b54b50b12b77984684281f3490e0b802cbc364c13af773ede8d9314add0fa4d247165be82fa28721f17493c88761b7039ba1c1100'
    }
  }

  //Example 3
  tronWeb.trx.getBlock('').then(result => {console.log(result)});
  > {
    blockID: '0000000000000000de1aa88295e1fcf982742f773e0419c5a9c134c994a9059e',
    block_header: {
      raw_data: {
        txTrieRoot: 'ea97ca7ac977cf2765093fa0e4732e561dc4ff8871c17e35fd2bcabb8b5f821d',
        witness_address: '41206e65772073797374656d206d75737420616c6c6f77206578697374696e672073797374656d7320746f206265206c696e6b656420746f67657468657220776974686f757420726571756972696e6720616e792063656e7472616c20636f6e74726f6c206f7220636f6f7264696e6174696f6e',
        parentHash: '957dc2d350daecc7bb6a38f3938ebde0a0c1cedafe15f0edae4256a2907449f6'
      }
    },
    transactions: [
      {
        txID: 'abda6c8b1e8954dbe1d5a06a774a3e6923b003d29bb4ce286998f23452e3b04a',
        raw_data: [Object],
        raw_data_hex: '5a6f0801126b0a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e7472616374123a0a173078303030303030303030303030303030303030303030121541f16412b9a17ee9408646e2a21e16478f72ed1e9518ffffa7ec85afd1b101'
      },

  ... // Contains the block contents (transactions, IDs, hashes, timestamps, etc.)

------------------------------------------------------------------------------

getBlockByHash
=================

Query a block information by the blcok ID.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockByHash(blockHash);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - blockHash
     - target block hash
     - String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getBlockByHash('00000000006acfc007dc3ec1d8022c1388268ce7bbd836015558103ee4fb75b5').then(result => {console.log(result)});
  > {
    blockID: '00000000006acfc007dc3ec1d8022c1388268ce7bbd836015558103ee4fb75b5',
    block_header: {
      raw_data: {
        number: 7000000,
        txTrieRoot: '16b4b520748c59e5bfdd1b61ca596d74f9bf3df836c359e36a6528ffa5fb2cdb',
        witness_address: '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
        parentHash: '00000000006acfbf335be34db135169d9e632d5e464f1573c5980152acf45cb3',
        version: 6,
        timestamp: 1551102291000
      },
      witness_signature: '2dbe28c99d22e871604f06457aca3474ae07b5f58f6bc28d3bebe09d27793d535a55350df433e582272432602638fc2b79518c8f745a35151cbea07b00c6ed6101'
    },
    transactions: [
      {
        ret: [Array],
        signature: [Array],
        txID: '0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2',
        raw_data: [Object],
        raw_data_hex: '0a02cfbe2208071499db194adbc440a8fe9da7922d5af001081f12eb010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412b5010a1541880e4776dfcf38dfe00d399d31738abc773634e8121541eb8f23b15acbc0245a4dbbd820b9bde368b02d6122840149774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680708dc59aa7922d900180ade204'
      },
      
      ... // Contains the block contents (transactions, IDs, hashes, timestamps, etc.)

------------------------------------------------------------------------------

getBlockByNumber
=================

Query a block information by the block height.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockByNumber(blockID)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - blockID
     - target block
     - Integer

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getBlockByNumber(12345).then(result => {console.log(result)});
  > {
    blockID: '000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764',
    block_header: {
      raw_data: {
        number: 12345,
        txTrieRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        witness_address: '414b4778beebb48abe0bc1df42e92e0fe64d0c8685',
        parentHash: '0000000000003038c0a3aa1806236bc5b281633728b5fe8a14a51062522e651d',
        timestamp: 1529928585000
      },
      witness_signature: 'cb889103aa9ce691d39df8030b54b50b12b77984684281f3490e0b802cbc364c13af773ede8d9314add0fa4d247165be82fa28721f17493c88761b7039ba1c1100'
    }
  }

------------------------------------------------------------------------------

getBlockRange
=================

Query the block information by range.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockRange(Starting Block,Ending Block);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Starting Block
     - Block number of the beginning of the range.
     - Integer
   * - Ending Block
     - Block number of the end of the range.
     - Integer

-------
Returns
-------

Object Array


-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getBlockRange(15816492,15816493).then(result => {console.log(result)});
  > [
    {
      blockID: '0000000000f1572c60fe671e379f4cb3dcc4245aa6eca50edbfb64c66a3672c7',
      block_header: {
        raw_data: [Object],
        witness_signature: 'f7b17ae291128adde41f0349b70f2b1fba72b2f7260650e27e231e9a8ceae112353bce76237409d7f256c4f401114234abf521e666890e9f3d090bcc99ae723501'
      },
      transactions: [
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object]
      ]
    },
    {
      blockID: '0000000000f1572d90c32bcaec30eb2fb72df772c5c4fda23b5a79ddba6c3e62',
      block_header: {
        raw_data: [Object],
        witness_signature: 'eba61099d8e498f43ab57de081dbefb28cee9b6a4ceb1a298830969b47877c4538d771232eb8e68a01e651f4a256c0611f32fc29a039cd838a9d96bc42e4eb6300'
      },
      transactions: [
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object],
        [Object], [Object], [Object], [Object], [Object]
      ]
    }
  ]

------------------------------------------------------------------------------

getBlockTransactionCount
=================

Retrieves the count of transactions within a block.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBlockTransactionCount(Block Height)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Block Height
     - The height of the block you wish to obtain transaction count data for.
     - Integer | string

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getBlockTransactionCount(16012520).then(console.log);
  >35
  tronWeb.trx.getBlockTransactionCount("0000000000f454e84edbee2365fbf1bf34bc98283ded06e68311bb6e5bea3cf6").then(console.log);
  >35

------------------------------------------------------------------------------

getBrokerage
=================

Get SR brokerage ratio.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBrokerage(address)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - address
     - account address
     - String

-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getBrokerage("TBtrUZ2DXdsBGhpquSPkoEcD2KbWx2rZvE").then(console.log)
  >20

------------------------------------------------------------------------------

getChainParameters
=================

Query the parameters of the blockchain used for witnessses to create a proposal.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getChainParameters();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Arrays

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getChainParameters();
  >[ { key: 'getMaintenanceTimeInterval', value: 21600000 },
    { key: 'getAccountUpgradeCost', value: 9999000000 },
    { key: 'getCreateAccountFee', value: 100000 },
    { key: 'getTransactionFee', value: 10 },
    { key: 'getAssetIssueFee', value: 1024000000 },
    { key: 'getWitnessPayPerBlock', value: 32000000 },
    { key: 'getWitnessStandbyAllowance', value: 115200000000 },
    { key: 'getCreateNewAccountFeeInSystemContract' },
    { key: 'getCreateNewAccountBandwidthRate', value: 1 },
    { key: 'getAllowCreationOfContracts', value: 1 },
    { key: 'getRemoveThePowerOfTheGr', value: -1 },
    { key: 'getEnergyFee', value: 10 },
    { key: 'getExchangeCreateFee', value: 1024000000 },
    { key: 'getMaxCpuTimeOfOneTx', value: 50 },
    { key: 'getAllowUpdateAccountName' },
    { key: 'getAllowSameTokenName', value: 1 },
    { key: 'getAllowDelegateResource', value: 1 },
    { key: 'getTotalEnergyLimit', value: 100000000000 },
    { key: 'getAllowTvmTransferTrc10', value: 1 },
    { key: 'getTotalEnergyCurrentLimit', value: 100000000000 },
    { key: 'getAllowMultiSign' },
    { key: 'getAllowAdaptiveEnergy' },
    { key: 'getTotalEnergyTargetLimit', value: 6944444 },
    { key: 'getTotalEnergyAverageUsage' },
    { key: 'getUpdateAccountPermissionFee', value: 100000000 },
    { key: 'getMultiSignFee', value: 1000000 } ]

------------------------------------------------------------------------------

getConfirmedTransaction
=================

Gets a confirmed transaction by transaction ID.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getConfirmedTransaction(Transaction ID);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Transaction ID
     - Transaction ID
     - String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getConfirmedTransaction("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2").then(console.log);
  >"ret": [
    {
      "contractRet": "SUCCESS"
    }
  ],
  "signature": [
    "220307de6341f7b59ff9563f50db3ab23ae53df0548aacdc6b569b094463cddd81a0a1e3e06b19bf344f94e25e8e5625374e81232ce8fb404db447666562661600"
  ],
  "txID": "0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2",
  "raw_data": {
    "contract": [
      {
        "parameter": {
          "value": {
            "data": "49774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680",
            "owner_address": "41880e4776dfcf38dfe00d399d31738abc773634e8",
            "contract_address": "41eb8f23b15acbc0245a4dbbd820b9bde368b02d61"
          },
          "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
        },
        "type": "TriggerSmartContract"
      }
    ],
    "ref_block_bytes": "cfbe",
    "ref_block_hash": "071499db194adbc4",
    "expiration": 1551102345000,
    "fee_limit": 10000000,
    "timestamp": 1551102288525
  },
  "raw_data_hex": "0a02cfbe2208071499db194adbc440a8fe9da7922d5af001081f12eb010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412b5010a1541880e4776dfcf38dfe00d399d31738abc773634e8121541eb8f23b15acbc0245a4dbbd820b9bde368b02d6122840149774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680708dc59aa7922d900180ade204"
  }

------------------------------------------------------------------------------

getContract
=================

Returns the details of the contract at the specified address.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getContract(address);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - address
     - Smart Contract Address
     - String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getContract("TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3").then(console.log)
  >{ bytecode: ...,
    name: 'TronBet',
    origin_address: '419a536539b2bbdbadb5d2d45afcc1979065b4370c',
    abi:
    { entrys:
        [ [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object],
          [Object] ] },
    contract_address: '412ec5f63da00583085d4c2c5e8ec3c8d17bde5e28' }

------------------------------------------------------------------------------

getCurrentBlock
=================

Return the block information of the latest block.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getCurrentBlock()

--------------
Parameter
--------------

N/A

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getCurrentBlock().then(result=>console.log(result))
  > {
    blockID: '00000000000dc73a584b91846ed22d8359f1cf45407c9159b4bac9f1e2b018de',
    block_header: {
      raw_data: {
        number: 902970,
        txTrieRoot: '6ada20705dc3b74d089dc8188792d0162747d634fd6deec60717c1b4fc518af0',
        witness_address: '41f16412b9a17ee9408646e2a21e16478f72ed1e95',
        parentHash: '00000000000dc739de1b856885cd8b5a8837bbd0cfd433833bee19e7b5466bd1',
        version: 9,
        timestamp: 1578303678000
      },
      witness_signature: 'b81af83a8a0c65bfa7d9224a0ba3c653dce338f1e2147e68d3a7b66194dfaffc719f7d03db719b1065059bdcdbe97652b28662df594279db849000b69c222fc900'
    },
    transactions: [
      {
        ret: [Array],
        signature: [Array],
        txID: '90be204670e96c06ed4e0e0a4d456afe6cec09febde545b097dbdad1f05dfe0c',
        raw_data: [Object],
        raw_data_hex: '0a02c738220885a8d77bfd78c7db40a0f2eed1f72d5a6d081f12690a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412340a154113b34f700df122b6ba91e3660bb677d0a919a223121541ca21da4a68a41244830072fdd8190cba5e08fb9322043d1f890270ceb0ebd1f72d9001c0843d'
      },
      {
        ret: [Array],
        signature: [Array],
        txID: '0d148d1e2ca701103660211a0ce520b6b9fec5a59adc8a85b0da9b522230fab5',
        raw_data: [Object],
        raw_data_hex: '0a02c7392208de1b856885cd8b5a40d889efd1f72d5a9301081f128e010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412590a15416144eecc1ae0b4f51cfb6379137d8b5d04f75b46121541cd95a6792ce3b444a7c763eee30f66f73ab76d87188092f40122246898f82b000000000000000000000000000000000000000000000000000000000000001970b1b8ebd1f72d900180c2d72f'
      }
    ]
  }

------------------------------------------------------------------------------

getExchangeByID
=================

Query Exchange by id.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getExchangeByID(exchange id);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - exchange id
     - exchange id to query
     - Number

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getExchangeByID(1).then(result=>console.log(result))
  > {
    exchange_id: 1,
    creator_address: '410ca7c49aa44d26aabfe7f594c645cf9f17a4ff70',
    create_time: 1575754887000,
    first_token_id: '31303030303033',
    first_token_balance: 999902,
    second_token_id: '5f',
    second_token_balance: 200020000000
  }

------------------------------------------------------------------------------

getNodeInfo
=================

Get the node info.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getNodeInfo();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getNodeInfo().then(result=>console.log(result))
  > {
    activeConnectCount: 1,
    beginSyncNum: 988331,
    block: 'Num:988332,ID:00000000000f14ac2df439b094ee3011f6944416de895d76030eb556cada772c',
    cheatWitnessInfoMap: {},
    configNodeInfo: {
      activeNodeSize: 1,
      allowAdaptiveEnergy: 1,
      allowCreationOfContracts: 1,
      backupListenPort: 10001,
      backupMemberSize: 0,
      backupPriority: 6,
      codeVersion: '3.6.5',
      dbVersion: 2,
      discoverEnable: false,
      listenPort: 16666,
      maxConnectCount: 30,
      maxTimeRatio: 5,
      minParticipationRate: 0,
      minTimeRatio: 0,
      p2pVersion: '1',
      passiveNodeSize: 0,
      sameIpMaxConnectCount: 2,
      sendNodeSize: 0,
      supportConstant: true,
      versionName: 'Odyssey-v3.6.2-210-g5b6b40f79',
      versionNum: '11171'
    },
    currentConnectCount: 1,
    machineInfo: {
      cpuCount: 8,
      cpuRate: 0.006535947712418301,
      deadLockThreadCount: 0,
      deadLockThreadInfoList: [],
      freeMemory: 29074096128,
      javaVersion: '1.8.0_181',
      jvmFreeMemory: 22410225552,
      jvmTotalMemoery: 22576889856,
      memoryDescInfoList: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
      osName: 'Linux 4.14.109-99.92.amzn2.x86_64',
      processCpuRate: 0.007625272331154684,
      threadCount: 132,
      totalMemory: 33069928448
    },
    passiveConnectCount: 0,
    peerList: [
      {
        active: true,
        avgLatency: 171,
        blockInPorcSize: 0,
        connectTime: 1575594733742,
        disconnectTimes: 0,
        headBlockTimeWeBothHave: 0,
        headBlockWeBothHave: 'Num:240,ID:00000000000000f0b0ad46de952b5c48f97fa4944a2a776ce80d3389335da06c',
        host: '34.215.253.209',
        inFlow: 215274,
        lastBlockUpdateTime: 1575594739897,
        lastSyncBlock: '',
        localDisconnectReason: '',
        needSyncFromPeer: false,
        needSyncFromUs: false,
        nodeCount: 0,
        nodeId: '75b47073fd226a762cd6ee874d9e7a6c22eb34284e2db4f63777855f3fc4a1e6a2455974531ba730ce2d9f946485a394fcb870db61abcaf7c02ddef186ce67d6',
        port: 16666,
        remainNum: 0,
        remoteDisconnectReason: '',
        score: 0,
        syncBlockRequestedSize: 0,
        syncFlag: false,
        syncToFetchSize: 0,
        syncToFetchSizePeekNum: -1,
        unFetchSynNum: 0
      }
    ],
    solidityBlock: 'Num:988332,ID:00000000000f14ac2df439b094ee3011f6944416de895d76030eb556cada772c',
    totalFlow: 215274
  }

------------------------------------------------------------------------------

getReward
=================

Query voted and block reward.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getReward(address)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - latest
     - HexString or Base58 address String to query
     - String

-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getReward("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ").then(result=>console.log(result))
  >295623

  tronWeb.trx.getReward("41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result))
  >295623

------------------------------------------------------------------------------

getSignWeight
=================

Query the current signatures total weight of a transaction after sign.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getSignWeight(transaction object);

--------------
Parameter
--------------

Object

-------
Returns
-------

Object

The output is a JSON object listing accounts that have already signed the transaction, the addresses & weights of all owners, the threshold, the current weight with their transaction IDs, and the hex of the raw data of the transaction.


-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getSignWeight({'visible': true, 'signature': ['1fd210045f5bdcf375cd478cf46ff735f132281b990bc199acf1952bd438929d1d03e12de5ea7dcb89cff5b8cfc5d161661a5c1fe6a6a2422edb313b9139075300'], 'txID': 'ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2', 'raw_data': {'contract': [{'parameter': {'value': {'amount': 125000000, 'owner_address': 'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP', 'to_address': 'TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ'}, 'type_url': 'type.googleapis.com/protocol.TransferContract'}, 'type': 'TransferContract'}], 'ref_block_bytes': 'c251', 'ref_block_hash': '5c685c92bf035e72', 'expiration': 1578299967000, 'timestamp': 1578299909600}, 'raw_data_hex': '0a02c25122085c685c92bf035e7240988c89d0f72d5a68080112640a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412330a1541859009fd225692b11237a6ffd8fdba2eb7140cca121541bf97a54f4b829c4e9253b26024b1829e1a3b112018c0b2cd3b70e0cb85d0f72d'}).then(result=>console.log(result))
  > {
    result: {},
    approved_list: [ 'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP' ],
    permission: { keys: [ [Object] ], threshold: 1, permission_name: 'owner' },
    current_weight: 1,
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

getTokenByID
=================

Query TRC10 token information by the token id.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTokenByID(tokenID);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - tokenID
     - token ID to query
     - String or Number

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example 1
  tronWeb.trx.getTokenByID(1002000).then(result => {console.log(result)});
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
  tronWeb.trx.getTokenByID('1002000').then(result => {console.log(result)});
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

------------------------------------------------------------------------------

getTokenFromID
=================

Query TRC10 token information by the token id.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTokenFromID(tokenID);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - tokenID
     - The token ID to query
     - String or Number


-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example 1
  tronWeb.trx.getTokenFromID(1002000).then(result => {console.log(result)});
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
  tronWeb.trx.getTokenFromID("1002000").then(result => {console.log(result)});
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

------------------------------------------------------------------------------

getTokenListByName
===================

Query the list of TRC10 tokens by name.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTokenListByName(tokenName);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - tokenName
     - The tokenName to query.
     - String

-------
Returns
-------

Object Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getTokenListByName("BTT").then(result => {console.log(result)});
  > [
    {
      owner_address: '4113189bb13f1ec4f45c88526bd05482f482c06a11',
      name: 'BTT',
      abbr: 'BTT',
      total_supply: 100000000000000,
      frozen_supply: [ [Object] ],
      trx_num: 1000000,
      num: 1,
      start_time: 1547456580180,
      end_time: 1547715780180,
      description: 'BitTorrent',
      url: 'BitTorrent',
      id: '1001927'
    },
    {
      owner_address: '41f4204dec09b1899444d851dd54fbfc21397e20ab',
      name: 'BTT',
      abbr: 'BTT',
      total_supply: 999000000000000000,
      frozen_supply: [ [Object] ],
      trx_num: 1000000,
      precision: 6,
      num: 1000000,
      start_time: 1549987200000,
      end_time: 1550073600000,
      description: 'BTT Candy',
      url: 'www.bittorrent.com',
      id: '1002083'
    },
    {
      owner_address: '41d2bcae5375057098726f8b8d839c8037499d38c5',
      name: 'BTT',
      abbr: 'BTT',
      total_supply: 1000000000000000000,
      frozen_supply: [ [Object] ],
      trx_num: 1000000,
      precision: 6,
      num: 244000000,
      start_time: 1555948800000,
      end_time: 1577376000000,
      description: 'BTT',
      url: 'COM',
      id: '1002334'
    }
  ]

------------------------------------------------------------------------------

getTokensIssuedByAddress
==============================

Query the TRC10 token issue information of an account.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTokensIssuedByAddress(tokenAddress);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - tokenAddress
     - The token address to query
     - String (HexString or Base58)

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example 1
  tronWeb.trx.getTokensIssuedByAddress("TF5Bn4cJCT6GVeUgyCN4rBhDg42KBrpAjg").then(result => {console.log(result)});
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
  tronWeb.trx.getTokensIssuedByAddress("4137fa1a56eb8c503624701d776d95f6dae1d9f0d6").then(result => {console.log(result)});
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

------------------------------------------------------------------------------

getTransaction
=================

Query the transaction information by transaction id.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTransaction(transaction id);

--------------
Parameter
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

  tronWeb.trx.getTransaction("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2").then(result => {console.log(result)});
  > {
    ret: [ { contractRet: 'SUCCESS' } ],
    signature: [
      '220307de6341f7b59ff9563f50db3ab23ae53df0548aacdc6b569b094463cddd81a0a1e3e06b19bf344f94e25e8e5625374e81232ce8fb404db447666562661600'
    ],
    txID: '0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2',
    raw_data: {
      contract: [ [Object] ],
      ref_block_bytes: 'cfbe',
      ref_block_hash: '071499db194adbc4',
      expiration: 1551102345000,
      fee_limit: 10000000,
      timestamp: 1551102288525
    },
    raw_data_hex: '0a02cfbe2208071499db194adbc440a8fe9da7922d5af001081f12eb010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412b5010a1541880e4776dfcf38dfe00d399d31738abc773634e8121541eb8f23b15acbc0245a4dbbd820b9bde368b02d6122840149774683000000000000000000000000ce3747fa895a899209c10ef1b4a41141b51b8a48e7636a372dc6d1fa95122bc282de912888dace410099e5c28d9a86ec9421be5800000000000000000000000000000000000000000000000000000000005029840000000000000000000000000000000000000000000000000000000000989680708dc59aa7922d900180ade204'
  }

------------------------------------------------------------------------------

getTransactionFromBlock
==========================

Returns a transaction based on a block hash or number and the transactions index position.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTransactionFromBlock(Block height | Number)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Block height
     - A block number or hash.	
     - Integer / String
   * - Number
     - The transactions index position.	
     - Integer

-------
Returns
-------

Object | Object Array

-------
Example
-------

.. code-block:: javascript

// example 1
tronWeb.trx.getTransactionFromBlock(16213568).then(console.log)
>[{object1},{object2}...]

// example 2
tronWeb.trx.getTransactionFromBlock("0000000000f76640a8735af072da5aa741ea983ceb87888030dc8535daa79362").then(console.log)
>[{object1},{object2}...]

// example 3
tronWeb.trx.getTransactionFromBlock(16213568,1).then(console.log)
>{ ret: [ { contractRet: 'SUCCESS' } ],
  signature:
   [ 'c73ae891ece8d83724d81d19e796f9486b6eb6436e26278cc1ab153c4768f04b5bff5c7f5f49dff1ad08dea6cbde06fbe4d16616033cccefd7e346faf1eeeee901' ],
  txID:
   'df9343f44a38613581335ec9c6a176f533593a0818a6b615e2b8f56a202d9026',
  raw_data:
   { contract: [ [Object] ],
     ref_block_bytes: '662c',
     ref_block_hash: '292dddfd299d380a',
     expiration: 1578896229000,
     fee_limit: 6000000,
     timestamp: 1578896170650 },
  raw_data_hex:
   '0a02662c2208292dddfd299d380a408885b2ecf92d5ab301081f12ae010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412790a1541b22b30c7a270788398579af95fa7e7530c7b517a121541e42d76d15b7ecd27a92cc9551738c2635c63b71c188084af5f2244a3082be900000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000000709abdaeecf92d9001809bee02' }

------------------------------------------------------------------------------

getTransactionInfo
===================

Gets the details for a transaction, including the fees and virtual machine events for a transaction.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getTransactionInfo(Transaction ID);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Transaction ID
     - Transaction ID
     - String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.getTransactionInfo("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2");
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
        note: '63616c6c' } ] }

------------------------------------------------------------------------------

getUnconfirmedBalance
===============================

Query unconfirmed balance.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedBalance(address);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - address
     - The target address
     - String(HexString or Base58)



-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  //Parameter Base58
  tronWeb.trx.getUnconfirmedBalance('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result=>console.log(result))
  >29340074430
          
  //Parameter HexString
  tronWeb.trx.getUnconfirmedBalance('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result=>console.log(result))
  >29340074430

------------------------------------------------------------------------------

getUnconfirmedBrokerage
===============================

Query unconfirmed brokerage by address.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedBrokerage(address)

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

  //Parameter Base58
  tronWeb.trx.getUnconfirmedBrokerage("TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH").then(result=>console.log(result))
  >20

  //Parameter HexString
  tronWeb.trx.getUnconfirmedBrokerage("4178C842EE63B253F8F0D2955BBC582C661A078C9D").then(result=>console.log(result))
  >20

------------------------------------------------------------------------------

getUnconfirmedReward
===============================

Query unconfirmed reward by address.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedReward(address)

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

  //Parameter Base58
  tronWeb.trx.getUnconfirmedReward("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ").then(result=>console.log(result))
  >295623
  //Parameter HexString
  tronWeb.trx.getUnconfirmedReward("41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result))
  >295623

------------------------------------------------------------------------------

getUnconfirmedTransactionInfo
===============================

Gets the details for an unconfirmed transaction by txid, including the fees and virtual machine events for an unconfirmed transaction.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedTransactionInfo(txid);

--------------
Parameter
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

  tronWeb.trx.getUnconfirmedTransactionInfo("f6b72dda65682b858c1c1980710aad7955fbf6db91c66840da0f852fc3cc694b").then(result=>console.log(result))
  >{
    id: 'f6b72dda65682b858c1c1980710aad7955fbf6db91c66840da0f852fc3cc694b',
    fee: 47350,
    blockNumber: 16239601,
    blockTimeStamp: 1578974295000,
    contractResult: [
      '0000000000000000000000000000000000000000000000000000000000000000'
    ],
    contract_address: '41a614f803b6fd780986a42c78ec9c7f77e6ded13c',
    receipt: {
      energy_fee: 43900,
      origin_energy_usage: 10241,
      energy_usage_total: 14631,
      net_fee: 3450,
      result: 'SUCCESS'
    },
    log: [
      {
        address: 'a614f803b6fd780986a42c78ec9c7f77e6ded13c',
        topics: [Array],
        data: '0000000000000000000000000000000000000000000000000000000b734e2770'
      }
    ]
  }

------------------------------------------------------------------------------

listExchanges
===============================

Query the list of all the exchange pairs.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listExchanges();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.listExchanges().then(result=>console.log(result))
  > [
    {
      exchange_id: 169,
      creator_address: '419b58a4a128f60eb4d1773ec7d758dc2c2b2db529',
      create_time: 1565450127000,
      first_token_id: '31303030323035',
      first_token_balance: 300,
      second_token_id: '5f',
      second_token_balance: 1003000
    },
    {
      exchange_id: 168,
      creator_address: '4184bc8cdc393b1494e9ff8acd8adedd0ddef4d6f9',
      create_time: 1565112720000,
      first_token_id: '31303031343130',
      first_token_balance: 15,
      second_token_id: '5f',
      second_token_balance: 1000000
    },
    {
      exchange_id: 167,
      creator_address: '41a51137db8cc78d88ee0bf9ecc262209827a37b0c',
      create_time: 1564383945000,
      first_token_id: '31303030343931',
      first_token_balance: 1,
      second_token_id: '5f',
      second_token_balance: 35000
    },
    {
      exchange_id: 166,
      creator_address: '417a60ad62fd9fa8d75de5d2885b93d3cb73420cac',
      create_time: 1558631214000,
      first_token_id: '31303032303030',
      first_token_balance: 5888308906,
      second_token_id: '5f',
      second_token_balance: 220776468
    },
    {
      exchange_id: 165,
      creator_address: '41d2bfc8cafa41af4deaba50a4aa8a625a58da99e0',
      create_time: 1557961326000,
      first_token_id: '31303032303732',
      second_token_id: '5f'
    },
    {
      exchange_id: 164,
      creator_address: '417c393a08da67f2423055403bf04e8e069a1b0874',
      create_time: 1557601935000,
      first_token_id: '31303032303732',
      first_token_balance: 500,
      second_token_id: '31303030343637',
      second_token_balance: 1
    },
    {
      exchange_id: 163,
      creator_address: '41d416c349f1bdd874543837e92bf8d52d1bf9dc89',
      create_time: 1556157114000,
      first_token_id: '31303032333030',
      second_token_id: '5f'
    },
    {
      exchange_id: 162,
      creator_address: '4143e80dfb05bed95fb067c095d1bbb9dfba253cfe',
      create_time: 1556140347000,
      first_token_id: '31303030303031',
      second_token_id: '5f'
    },
    {
      exchange_id: 161,
      creator_address: '41ce0358634860e18afd4c64dd6fbd1a20c2525f46',
      create_time: 1554650454000,
      first_token_id: '31303030313636',
      second_token_id: '5f'
    },
    {
      exchange_id: 160,
      creator_address: '41b6e49b8cff8e804f7a1eaf2632ab30531e210c43',
      create_time: 1553247645000,
      first_token_id: '31303032313833',
      first_token_balance: 95112,
      second_token_id: '5f',
      second_token_balance: 5775780
    },
    {
      exchange_id: 159,
      creator_address: '410ea325d27ae673238751d40ed23ab891c7550691',
      create_time: 1553010984000,
      first_token_id: '31303031393533',
      first_token_balance: 71093611,
      second_token_id: '5f',
      second_token_balance: 1049702
    },
    {
      exchange_id: 158,
      creator_address: '41c79450b6d7b10f43fc5f73bd713743e1192320c6',
      create_time: 1550673372000,
      first_token_id: '31303032303736',
      first_token_balance: 90,
      second_token_id: '5f',
      second_token_balance: 4931926
    },
    {
      exchange_id: 157,
      creator_address: '4167e39013be3cdd3814bed152d7439fb5b6791409',
      create_time: 1549990299000,
      first_token_id: '31303030353737',
      second_token_id: '5f'
    },
    {
      exchange_id: 156,
      creator_address: '412e3ccafe037cdd4af3f73f96372e853023ab3fb0',
      create_time: 1549575003000,
      first_token_id: '31303031373931',
      first_token_balance: 18578,
      second_token_id: '5f',
      second_token_balance: 349842
    },
    {
      exchange_id: 155,
      creator_address: '41397f3fdcca6c0bda5560f9f4278796499be4e564',
      create_time: 1549048041000,
      first_token_id: '31303032303532',
      first_token_balance: 774936605,
      second_token_id: '5f',
      second_token_balance: 1290428256
    },
    {
      exchange_id: 154,
      creator_address: '41397f3fdcca6c0bda5560f9f4278796499be4e564',
      create_time: 1548966993000,
      first_token_id: '31303032303030',
      second_token_id: '5f'
    },
    {
      exchange_id: 153,
      creator_address: '4167e39013be3cdd3814bed152d7439fb5b6791409',
      create_time: 1548612846000,
      first_token_id: '31303030363434',
      second_token_id: '31303030313730'
    },
    {
      exchange_id: 152,
      creator_address: '41108080205042d308bc12363aa31ec8df290a15c1',
      create_time: 1547310510000,
      first_token_id: '31303030383937',
      first_token_balance: 11,
      second_token_id: '5f',
      second_token_balance: 13449
    },
    {
      exchange_id: 151,
      creator_address: '41b1be92548a027e589dfd37749926bc2f85d573c5',
      create_time: 1547309574000,
      first_token_id: '31303030383937',
      second_token_id: '5f'
    },
    {
      exchange_id: 150,
      creator_address: '416daabcc22c97dbc7b47f51e5cb36c2105b122965',
      create_time: 1547204358000,
      first_token_id: '31303030323334',
      first_token_balance: 136410,
      second_token_id: '5f',
      second_token_balance: 30159
    },
    {
      exchange_id: 149,
      creator_address: '41be6c7bac47d1ed2fbc857bb100cfa6469b525f7c',
      create_time: 1546953918000,
      first_token_id: '31303030313237',
      first_token_balance: 65975,
      second_token_id: '5f',
      second_token_balance: 165
    },
    {
      exchange_id: 148,
      creator_address: '4120b26cb89183b629edb813ff77ef7c64bf92970a',
      create_time: 1546934727000,
      first_token_id: '31303031383735',
      first_token_balance: 5911373,
      second_token_id: '5f',
      second_token_balance: 2073944
    },
    {
      exchange_id: 147,
      creator_address: '416c0214c9995c6f3a61ab23f0eb84b0cde7fd9c7c',
      create_time: 1546670979000,
      first_token_id: '31303031383732',
      first_token_balance: 240392,
      second_token_id: '5f',
      second_token_balance: 726967
    },
    {
      exchange_id: 146,
      creator_address: '41638884377b9992c7134dcc5f139396f7c97786a0',
      create_time: 1546620510000,
      first_token_id: '31303030333836',
      first_token_balance: 14,
      second_token_id: '5f',
      second_token_balance: 17830018
    },
    {
      exchange_id: 145,
      creator_address: '41c1374fffdd72092284dcca3eef51c2290febb79f',
      create_time: 1546513677000,
      first_token_id: '31303031303731',
      second_token_id: '5f'
    },
    {
      exchange_id: 144,
      creator_address: '418b3c49c4bac957e832b3df2c380b96857ce952c9',
      create_time: 1546046892000,
      first_token_id: '31303031343634',
      first_token_balance: 52323,
      second_token_id: '5f',
      second_token_balance: 13340
    },
    {
      exchange_id: 143,
      creator_address: '4194607f7fd0b918cb9ec58154e7ac648d713edbf3',
      create_time: 1545710133000,
      first_token_id: '31303030393335',
      first_token_balance: 60,
      second_token_id: '5f',
      second_token_balance: 141976985
    },
    {
      exchange_id: 142,
      creator_address: '4139e1c361472c1910bc2b754925b31c94d1bef808',
      create_time: 1545661773000,
      first_token_id: '31303031383130',
      first_token_balance: 11841,
      second_token_id: '5f',
      second_token_balance: 30265648
    },
    {
      exchange_id: 141,
      creator_address: '41a3025e05e32c86fde0e6d72aeca1d54821dfa809',
      create_time: 1545639135000,
      first_token_id: '31303030313035',
      first_token_balance: 289,
      second_token_id: '5f',
      second_token_balance: 1168703
    },
    {
      exchange_id: 140,
      creator_address: '41991b3b219a46e2fe8c3347b4d0f8fa6e58ac962f',
      create_time: 1545416847000,
      first_token_id: '31303031373837',
      first_token_balance: 24837918,
      second_token_id: '5f',
      second_token_balance: 7415057
    },
    {
      exchange_id: 139,
      creator_address: '411f15d86126796818a266a22a9a305d8f6fa2240e',
      create_time: 1545398592000,
      first_token_id: '31303031323337',
      first_token_balance: 2920,
      second_token_id: '5f',
      second_token_balance: 509520
    },
    {
      exchange_id: 138,
      creator_address: '4119f668b07af221ac64fb8e14123ae308d92dae6c',
      create_time: 1545375999000,
      first_token_id: '31303030303838',
      first_token_balance: 453229919,
      second_token_id: '5f',
      second_token_balance: 204518
    },
    {
      exchange_id: 137,
      creator_address: '4139e1c361472c1910bc2b754925b31c94d1bef808',
      create_time: 1545288351000,
      first_token_id: '31303030353236',
      second_token_id: '5f'
    },
    {
      exchange_id: 136,
      creator_address: '4139e1c361472c1910bc2b754925b31c94d1bef808',
      create_time: 1545276588000,
      first_token_id: '31303030353236',
      first_token_balance: 5260,
      second_token_id: '5f',
      second_token_balance: 4695844
    },
    {
      exchange_id: 135,
      creator_address: '41d1ad41d430a5486e679e6fdf20bd096585a4d84c',
      create_time: 1545204297000,
      first_token_id: '31303031313332',
      first_token_balance: 20055,
      second_token_id: '5f',
      second_token_balance: 9950
    },
    {
      exchange_id: 134,
      creator_address: '41f90484ea93e94f2b92479d3d8b8dbadda6ddef3e',
      create_time: 1545132417000,
      first_token_id: '31303031353238',
      first_token_balance: 69118,
      second_token_id: '5f',
      second_token_balance: 922969
    },
    {
      exchange_id: 133,
      creator_address: '41ebc0a97f420d1b0386fda5e17387892492e8d7fc',
      create_time: 1544715147000,
      first_token_id: '31303031343832',
      first_token_balance: 147,
      second_token_id: '5f',
      second_token_balance: 2019874
    },
    {
      exchange_id: 132,
      creator_address: '4181753000bfaab278cf354c159bf40f55947ca3e0',
      create_time: 1544610156000,
      first_token_id: '31303031303433',
      first_token_balance: 138490,
      second_token_id: '5f',
      second_token_balance: 8831
    },
    {
      exchange_id: 131,
      creator_address: '414620e74e85c2950ed6f373eb130687472df9adf4',
      create_time: 1544489421000,
      first_token_id: '31303031363132',
      first_token_balance: 113945,
      second_token_id: '5f',
      second_token_balance: 17293
    },
    {
      exchange_id: 130,
      creator_address: '4136655da6fd15571adc7a8cf7dbfa53283e94fe02',
      create_time: 1544479374000,
      first_token_id: '31303030333735',
      first_token_balance: 5850,
      second_token_id: '5f',
      second_token_balance: 2000000
    },
    {
      exchange_id: 129,
      creator_address: '4124443254e2d1f3e1f55521d518bd875138f4173c',
      create_time: 1544439993000,
      first_token_id: '31303030333232',
      first_token_balance: 678427562,
      second_token_id: '5f',
      second_token_balance: 221215040820
    },
    {
      exchange_id: 128,
      creator_address: '4123ecabe27eaf7fe85ac359d8b3758425d4a8ea36',
      create_time: 1544416536000,
      first_token_id: '31303030373631',
      first_token_balance: 852888,
      second_token_id: '5f',
      second_token_balance: 25299485
    },
    {
      exchange_id: 127,
      creator_address: '4142ff7e95d352d29a1c362badcdc1faffb817b5dc',
      create_time: 1544277150000,
      first_token_id: '31303031363132',
      first_token_balance: 24932448,
      second_token_id: '5f',
      second_token_balance: 7091841
    },
    {
      exchange_id: 126,
      creator_address: '418bb7d3020f16267adaf6625af34b9998409b2be7',
      create_time: 1544276328000,
      first_token_id: '31303031323336',
      first_token_balance: 2,
      second_token_id: '31303031333134',
      second_token_balance: 10
    },
    {
      exchange_id: 125,
      creator_address: '418bb7d3020f16267adaf6625af34b9998409b2be7',
      create_time: 1544275992000,
      first_token_id: '31303031323336',
      first_token_balance: 1,
      second_token_id: '31303030343531',
      second_token_balance: 1
    },
    {
      exchange_id: 124,
      creator_address: '4136655da6fd15571adc7a8cf7dbfa53283e94fe02',
      create_time: 1544225304000,
      first_token_id: '31303030333735',
      second_token_id: '5f'
    },
    {
      exchange_id: 123,
      creator_address: '41b6f741fabed5dcda0d7f6e64c4d4d22791c442dd',
      create_time: 1544221737000,
      first_token_id: '31303031343937',
      first_token_balance: 2001518,
      second_token_id: '5f',
      second_token_balance: 259
    },
    {
      exchange_id: 122,
      creator_address: '418b3c49c4bac957e832b3df2c380b96857ce952c9',
      create_time: 1544221563000,
      first_token_id: '31303031343730',
      first_token_balance: 3175116,
      second_token_id: '5f',
      second_token_balance: 999542
    },
    {
      exchange_id: 121,
      creator_address: '41da4767c10bc97024cedf87c06872af796afae390',
      create_time: 1544192619000,
      first_token_id: '31303031333639',
      first_token_balance: 7396,
      second_token_id: '5f',
      second_token_balance: 290
    },
    {
      exchange_id: 120,
      creator_address: '41da4767c10bc97024cedf87c06872af796afae390',
      create_time: 1544187906000,
      first_token_id: '31303031323336',
      first_token_balance: 3368,
      second_token_id: '5f',
      second_token_balance: 101
    },
    {
      exchange_id: 119,
      creator_address: '4142ff7e95d352d29a1c362badcdc1faffb817b5dc',
      create_time: 1544181714000,
      first_token_id: '31303031363132',
      first_token_balance: 9461273,
      second_token_id: '5f',
      second_token_balance: 1079637
    },
    {
      exchange_id: 118,
      creator_address: '412f390abf349ce1b43cc0a54bec8412fd869bac92',
      create_time: 1544177766000,
      first_token_id: '31303031363132',
      first_token_balance: 96,
      second_token_id: '31303030363435',
      second_token_balance: 1076224
    },
    {
      exchange_id: 117,
      creator_address: '411c20125d084cf4bfcebe3a7ae6180bdc2f9a233e',
      create_time: 1544141409000,
      first_token_id: '31303030303137',
      second_token_id: '5f'
    },
    {
      exchange_id: 116,
      creator_address: '41f98cf4d04984946dfc544709f7225b28b720b5ec',
      create_time: 1544018934000,
      first_token_id: '31303030323334',
      first_token_balance: 72495,
      second_token_id: '5f',
      second_token_balance: 34064
    },
    {
      exchange_id: 115,
      creator_address: '41f98cf4d04984946dfc544709f7225b28b720b5ec',
      create_time: 1544018553000,
      first_token_id: '31303030323334',
      first_token_balance: 46945,
      second_token_id: '5f',
      second_token_balance: 11768
    },
    {
      exchange_id: 114,
      creator_address: '4113113615b0f13a0432e912deb87f36554b3f5475',
      create_time: 1544017818000,
      first_token_id: '31303031333430',
      first_token_balance: 1082305898,
      second_token_id: '5f',
      second_token_balance: 139721836
    },
    {
      exchange_id: 113,
      creator_address: '4113113615b0f13a0432e912deb87f36554b3f5475',
      create_time: 1544017269000,
      first_token_id: '31303031333430',
      second_token_id: '5f'
    },
    {
      exchange_id: 112,
      creator_address: '417161546510f1ecb2a3e7493d58d2ac6592b9c5dd',
      create_time: 1543993233000,
      first_token_id: '31303031363535',
      first_token_balance: 30082937,
      second_token_id: '5f',
      second_token_balance: 541475918
    },
    {
      exchange_id: 111,
      creator_address: '41345c7b663f875e46355ddbd31558123789374ef0',
      create_time: 1543933074000,
      first_token_id: '31303030313631',
      second_token_id: '5f'
    },
    {
      exchange_id: 110,
      creator_address: '41d1ad41d430a5486e679e6fdf20bd096585a4d84c',
      create_time: 1543908411000,
      first_token_id: '31303030383937',
      first_token_balance: 467,
      second_token_id: '5f',
      second_token_balance: 11261939
    },
    {
      exchange_id: 109,
      creator_address: '41f49eb6ae7b895a3dda0e7ef61cc45ed592c8488c',
      create_time: 1543864563000,
      first_token_id: '31303031363238',
      first_token_balance: 132995591,
      second_token_id: '5f',
      second_token_balance: 2406560
    },
    {
      exchange_id: 108,
      creator_address: '4150ecfe72b92e9f98769f08fe9625bc9e21b2d35b',
      create_time: 1543670421000,
      first_token_id: '31303031363130',
      first_token_balance: 2189887,
      second_token_id: '5f',
      second_token_balance: 78310
    },
    {
      exchange_id: 107,
      creator_address: '41754619fee340fd37bb028a5d79571315d051ef33',
      create_time: 1543621374000,
      first_token_id: '31303031343436',
      first_token_balance: 3,
      second_token_id: '5f',
      second_token_balance: 225650
    },
    {
      exchange_id: 106,
      creator_address: '4174ca8e56e602d93fb58f171d413412974cdd08e1',
      create_time: 1543616433000,
      first_token_id: '31303031333136',
      first_token_balance: 448,
      second_token_id: '5f',
      second_token_balance: 18988049
    },
    {
      exchange_id: 105,
      creator_address: '4174ca8e56e602d93fb58f171d413412974cdd08e1',
      create_time: 1543616346000,
      first_token_id: '31303031333136',
      second_token_id: '5f'
    },
    {
      exchange_id: 104,
      creator_address: '4174ca8e56e602d93fb58f171d413412974cdd08e1',
      create_time: 1543616046000,
      first_token_id: '31303031333136',
      second_token_id: '5f'
    },
    {
      exchange_id: 103,
      creator_address: '4159a1638613372c2695203f4dbaf5e4cd78d5f790',
      create_time: 1543614111000,
      first_token_id: '31303030373438',
      first_token_balance: 1777777777765,
      second_token_id: '31303030303137',
      second_token_balance: 25385
    },
    {
      exchange_id: 102,
      creator_address: '4174ca8e56e602d93fb58f171d413412974cdd08e1',
      create_time: 1543614012000,
      first_token_id: '31303031333136',
      second_token_id: '5f'
    },
    {
      exchange_id: 101,
      creator_address: '415a9292cea1bd4238fbe707534907038bd1a6755b',
      create_time: 1543594473000,
      first_token_id: '31303030343838',
      first_token_balance: 1964,
      second_token_id: '5f',
      second_token_balance: 2266529569
    },
    {
      exchange_id: 100,
      creator_address: '41023044d7f5ba82d9a5608164adccd39f797082d1',
      create_time: 1543547445000,
      first_token_id: '31303031363039',
      first_token_balance: 5264731,
      second_token_id: '5f',
      second_token_balance: 2275603
    },
    {
      exchange_id: 99,
      creator_address: '4161f415a42debb070edbd824e25fbb3426daeb599',
      create_time: 1543508223000,
      first_token_id: '31303030343735',
      first_token_balance: 332,
      second_token_id: '5f',
      second_token_balance: 754268
    },
    {
      exchange_id: 98,
      creator_address: '4117c97850c5c0d7e6d16820ed1f4e055c8b2591aa',
      create_time: 1543498947000,
      first_token_id: '31303031363035',
      first_token_balance: 14205468,
      second_token_id: '5f',
      second_token_balance: 67364935
    },
    {
      exchange_id: 97,
      creator_address: '4176ebd81b3cfd696c7bfae5e00d6f38cf91af1530',
      create_time: 1543489488000,
      first_token_id: '31303031363032',
      first_token_balance: 18,
      second_token_id: '5f',
      second_token_balance: 7923281
    },
    {
      exchange_id: 96,
      creator_address: '41b7b4d9efc3409aaf2fd949c051238c4895a19efb',
      create_time: 1543481325000,
      first_token_id: '31303031313839',
      first_token_balance: 345537,
      second_token_id: '5f',
      second_token_balance: 221374480
    },
    {
      exchange_id: 95,
      creator_address: '41c90cd47591080b2f642e55c7f1f2e3e4130095ab',
      create_time: 1543234791000,
      first_token_id: '31303030353332',
      first_token_balance: 1318483667,
      second_token_id: '5f',
      second_token_balance: 884781069
    },
    {
      exchange_id: 94,
      creator_address: '4171a8bfd3e100913e2536fbd42726a2930d42fb16',
      create_time: 1543230528000,
      first_token_id: '31303031333637',
      first_token_balance: 209764,
      second_token_id: '5f',
      second_token_balance: 6751
    },
    {
      exchange_id: 93,
      creator_address: '41580d525dcbd85ee40811d45e7b2719758e3a70df',
      create_time: 1543201917000,
      first_token_id: '31303030353739',
      first_token_balance: 6774034,
      second_token_id: '5f',
      second_token_balance: 368777627
    },
    {
      exchange_id: 92,
      creator_address: '415c57072d1eb0245af4f16e874f31ff953d9e0009',
      create_time: 1543066155000,
      first_token_id: '31303030343531',
      second_token_id: '31303030323331'
    },
    {
      exchange_id: 91,
      creator_address: '415c57072d1eb0245af4f16e874f31ff953d9e0009',
      create_time: 1542991677000,
      first_token_id: '31303030343531',
      second_token_id: '31303030323331'
    },
    {
      exchange_id: 90,
      creator_address: '41c9c72e054abf6627abefb3a7b5b419db809578f2',
      create_time: 1542892581000,
      first_token_id: '31303030343735',
      first_token_balance: 101021327,
      second_token_id: '5f',
      second_token_balance: 83
    },
    {
      exchange_id: 89,
      creator_address: '41bed1b87522a030ddbaefda941049da6845bcf644',
      create_time: 1542840075000,
      first_token_id: '5f',
      first_token_balance: 3000,
      second_token_id: '31303031343932',
      second_token_balance: 1
    },
    {
      exchange_id: 88,
      creator_address: '415c57072d1eb0245af4f16e874f31ff953d9e0009',
      create_time: 1542821142000,
      first_token_id: '31303030343531',
      second_token_id: '31303030333137'
    },
    {
      exchange_id: 87,
      creator_address: '41decb272a4e58eab4b93089114baeb5392e39310b',
      create_time: 1542771717000,
      first_token_id: '31303030393839',
      first_token_balance: 1598922,
      second_token_id: '5f',
      second_token_balance: 187639735
    },
    {
      exchange_id: 86,
      creator_address: '413f6a4b17ad58ebb800d60b610e458c05106b2aed',
      create_time: 1542764622000,
      first_token_id: '31303030343136',
      first_token_balance: 64298682,
      second_token_id: '5f',
      second_token_balance: 55324240
    },
    {
      exchange_id: 85,
      creator_address: '4186c913138760abd0f1e1b3054d54604023d9332f',
      create_time: 1542753666000,
      first_token_id: '31303031343931',
      second_token_id: '31303030303138'
    },
    {
      exchange_id: 84,
      creator_address: '4186c913138760abd0f1e1b3054d54604023d9332f',
      create_time: 1542753045000,
      first_token_id: '31303031343931',
      second_token_id: '5f'
    },
    {
      exchange_id: 83,
      creator_address: '41ba2013128c132f69fbbdb68aca915934abfb0c66',
      create_time: 1542694608000,
      first_token_id: '31303031343237',
      first_token_balance: 2057,
      second_token_id: '5f',
      second_token_balance: 2011467
    },
    {
      exchange_id: 82,
      creator_address: '411e506debd2771cbf2041352b118024d62c40e943',
      create_time: 1542683454000,
      first_token_id: '31303030373737',
      first_token_balance: 299552182,
      second_token_id: '5f',
      second_token_balance: 19744981
    },
    {
      exchange_id: 81,
      creator_address: '41cc7e433a2fbc23a856c07ac9758bf46c7e735d16',
      create_time: 1542677382000,
      first_token_id: '31303030393831',
      first_token_balance: 5775673,
      second_token_id: '5f',
      second_token_balance: 304007438
    },
    {
      exchange_id: 80,
      creator_address: '412c6344e539654b490a92c4a6543671ca45c12919',
      create_time: 1542670002000,
      first_token_id: '31303031343434',
      first_token_balance: 71286,
      second_token_id: '5f',
      second_token_balance: 270
    },
    {
      exchange_id: 79,
      creator_address: '4120885e77a1b5d7a6bca7fba408c9d1cfe72f511a',
      create_time: 1542658530000,
      first_token_id: '31303031333434',
      first_token_balance: 406293,
      second_token_id: '5f',
      second_token_balance: 21
    },
    {
      exchange_id: 78,
      creator_address: '41890900bae71bbbedc06ad1a0c9bd5fad0e4a1e48',
      create_time: 1542655233000,
      first_token_id: '31303031303133',
      first_token_balance: 1815715,
      second_token_id: '5f',
      second_token_balance: 56202096
    },
    {
      exchange_id: 77,
      creator_address: '41775db7f2a7a6a24c951b1bc51e8538a491dc3162',
      create_time: 1542648789000,
      first_token_id: '31303031343531',
      first_token_balance: 10564,
      second_token_id: '5f',
      second_token_balance: 130542
    },
    {
      exchange_id: 76,
      creator_address: '412451fd27fd2bf2fb6aef08030ad412fe05113fe0',
      create_time: 1542643413000,
      first_token_id: '31303030343935',
      second_token_id: '5f'
    },
    {
      exchange_id: 75,
      creator_address: '416f5e792932b91d945b3a8e58530e92d1ace5b3db',
      create_time: 1542636042000,
      first_token_id: '31303031333436',
      first_token_balance: 3000000,
      second_token_id: '31303031323734',
      second_token_balance: 791652
    },
    {
      exchange_id: 74,
      creator_address: '41a6abd8cf33e18c985f481d52bd06100287281b06',
      create_time: 1542634257000,
      first_token_id: '31303031313037',
      first_token_balance: 692481,
      second_token_id: '5f',
      second_token_balance: 1445690508849
    },
    {
      exchange_id: 73,
      creator_address: '415eb394c217794b896c11dec41f156e0b43fe388f',
      create_time: 1542609660000,
      first_token_id: '31303030363731',
      first_token_balance: 19054114,
      second_token_id: '5f',
      second_token_balance: 199695146
    },
    {
      exchange_id: 72,
      creator_address: '4123ecabe27eaf7fe85ac359d8b3758425d4a8ea36',
      create_time: 1542606510000,
      first_token_id: '31303031313536',
      first_token_balance: 9614605,
      second_token_id: '5f',
      second_token_balance: 14798180
    },
    {
      exchange_id: 71,
      creator_address: '4175c0e3dab0892bd45580eb2c2e107f6b08ea6d3b',
      create_time: 1542603054000,
      first_token_id: '31303030393435',
      first_token_balance: 863812,
      second_token_id: '5f',
      second_token_balance: 13827351884
    },
    {
      exchange_id: 70,
      creator_address: '417cdf602eac0c7506db589625441816c4490eb3cd',
      create_time: 1542599436000,
      first_token_id: '31303031343434',
      first_token_balance: 314120423,
      second_token_id: '5f',
      second_token_balance: 767070384
    },
    ... 69 more items
  ]

------------------------------------------------------------------------------

listExchangesPaginated
===============================

Query the list of the exchange pairs by pagination.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listExchangesPaginated(Limit, Offset);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Limit
     - The amount of exchanges returned.	
     - Number
   * - Offset
     - The index of the start exchange.
     - Number

-------
Returns
-------

Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.listExchangesPaginated(2, 0).then(result => console.log(result));
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

------------------------------------------------------------------------------

listNodes
===============================

Query the list of nodes connected to the machine.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listNodes();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.listNodes().then(result => {console.log(result)});
  > [
    '185.137.233.109:18888', '222.209.83.50:18888',   '68.107.129.186:18888',
    '52.53.189.99:18888',    '65.29.155.251:18888',   '47.92.120.210:18888',
    '95.217.38.79:18888',    '47.90.243.148:18888',   '47.90.214.183:18888',
    '47.89.178.46:18888',    '47.88.225.9:18888',     '47.254.27.69:18888',
    '13.124.62.58:18888',    '220.76.92.67:18888',    '47.89.183.28:18888',
    '47.90.244.251:18888',   '18.221.34.0:18888',     '52.229.200.231:18888',
    '47.90.252.11:18888',    '18.224.157.94:18888',   '47.89.243.195:18888',
    '8.208.8.242:18888',     '47.252.76.45:18888',    '18.231.88.120:18888',
    '47.90.189.19:18888',    '138.201.200.145:28888', '47.74.35.73:18888',
    '13.237.186.239:18888',  '84.239.4.144:18888',    '47.75.74.31:18888',
    '95.164.54.98:18888',    '47.245.3.27:18888',     '13.210.151.5:18888',
    '47.254.77.236:18888',   '54.77.48.61:5001',      '47.74.229.70:18888',
    '106.75.250.172:18888',  '47.90.189.194:18888',   '61.74.109.22:18888',
    '18.237.66.156:18888',   '192.169.81.142:18888',  '34.247.231.60:18888',
    '13.229.103.17:18888',   '47.254.71.253:18888',   '47.74.45.99:18888',
    '103.214.144.65:18888',  '47.75.246.83:18888',    '47.74.242.55:18888',
    '47.90.240.187:18888',   '18.182.120.69:18888',   '82.77.66.43:18888',
    '82.217.113.172:18888',  '13.231.114.67:18888',   '77.237.249.180:18888',
    '77.237.249.182:18888',  '188.93.90.3:18888',     '47.254.68.153:18888',
    '39.115.219.191:18888',  '3.10.70.76:18888',      '18.184.239.103:18888',
    '138.201.220.222:28888', '84.239.4.57:18888',     '84.239.4.44:18888',
    '13.75.127.122:18888',   '13.229.226.142:18888',  '3.218.137.187:18888',
    '18.221.236.66:18888',   '52.15.93.92:18888',     '47.52.108.145:18888',
    '47.75.193.143:18888',   '54.180.146.193:18888',  '47.74.224.123:18888',
    '34.222.78.94:18888',    '47.75.65.115:18888',    '47.91.19.201:18888',
    '210.242.27.237:18888',  '94.130.255.100:18888',  '47.245.6.111:18888',
    '34.222.185.204:18888',  '52.63.185.80:18888',    '35.154.204.119:18888',
    '3.115.19.254:18888',    '47.89.182.29:18888',    '47.89.251.167:18888',
    '82.192.82.6:18888',     '18.196.99.16:18888',    '50.225.198.67:6757',
    '138.201.200.145:18888', '47.88.60.225:18888',    '8.208.10.74:18888',
    '149.202.210.187:18888', '159.203.181.175:18888', '52.50.149.227:5001',
    '47.89.242.50:18888',    '47.74.49.108:18888',    '47.75.249.119:18888',
    '47.254.157.51:18888',   '35.167.163.158:18888',  '123.57.67.69:18888',
    '173.255.212.68:18888',
    ... 195 more items
  ]

------------------------------------------------------------------------------

listProposals
===============================

Query all the proposals.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listProposals();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Object Array


-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.listProposals().then(result => {console.log(result)});
  > [
    {
      proposal_id: 28,
      proposer_address: '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
      parameters: [ [Object] ],
      expiration_time: 1572955200000,
      create_time: 1572682965000,
      approvals: [
        '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
        '41de9c3c2276abe2da70a7cdb34a205ecf7750d063',
        '41d25855804e4e65de904faf3ac74b0bdfc53fac76',
        '4184399fc6a98edc11a6efb146e86a3e153d0a0933',
        '4124443254e2d1f3e1f55521d518bd875138f4173c',
        '41496e85711fa3b7ba5a093af635269a67230ac2c1',
        '4167e39013be3cdd3814bed152d7439fb5b6791409',
        '411103d62d8299e90fa011b4ce7fc6ba151e5f1a23',
        '41c189fa6fc9ed7a3580c3fe291915d5c6a6259be7',
        '4178c842ee63b253f8f0d2955bbc582c661a078c9d',
        '4192c5d96c3b847268f4cb3e33b87ecfc67b5ce3de'
      ],
      state: 'DISAPPROVED'
    },
    {
      proposal_id: 27,
      proposer_address: '41d376d829440505ea13c9d1c455317d51b62e4ab6',
      parameters: [ [Object], [Object] ],
      expiration_time: 1572933600000,
      create_time: 1572673746000,
      approvals: [
        '41d376d829440505ea13c9d1c455317d51b62e4ab6',
        '41de9c3c2276abe2da70a7cdb34a205ecf7750d063',
        '41a4475dbd14feb2221f303fc33dc8d0a08f25f445',
        '4184399fc6a98edc11a6efb146e86a3e153d0a0933',
        '4167e39013be3cdd3814bed152d7439fb5b6791409',
        '4124443254e2d1f3e1f55521d518bd875138f4173c',
        '41496e85711fa3b7ba5a093af635269a67230ac2c1',
        '411103d62d8299e90fa011b4ce7fc6ba151e5f1a23',
        '41c189fa6fc9ed7a3580c3fe291915d5c6a6259be7',
        '4178c842ee63b253f8f0d2955bbc582c661a078c9d',
        '415863f6091b8e71766da808b1dd3159790f61de7d',
        '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
        '41d25855804e4e65de904faf3ac74b0bdfc53fac76',
        '4138e3e3a163163db1f6cfceca1d1c64594dd1f0ca',
        '41b3eec71481e8864f0fc1f601b836b74c40548287',
        '41f29f57614a6b201729473c837e1d2879e9f90b8e',
        '41bac7378c4265ad2739772337682183b8864f517a',
        '4118e2e1c6cdf4b74b7c1eb84682e503213a174955',
        '41e40302d6b5e889bfbd395ed884638d7f03ee3f87',
        '41c81107148e5fa4b4a2edf3d5354db6c6be5b5549',
        '418a445facc2aa94d72292ebbcb2a611e9fd8a6c6e',
        '41c05142fd1ca1e03688a43585096866ae658f2cb2',
        '412d7bdb9846499a2e5e6c5a7e6fb05731c83107c7',
        '4192c5d96c3b847268f4cb3e33b87ecfc67b5ce3de'
      ],
      state: 'APPROVED'
    },
      ... //more items

------------------------------------------------------------------------------

listSuperRepresentatives
===============================

Query the list of the witnesses.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listSuperRepresentatives();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Object Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.listSuperRepresentatives().then(result => {console.log(result)});
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

------------------------------------------------------------------------------

listTokens
===============================

Query the list of the TRC 10 tokens by pagination.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listTokens(Limit, Offset);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - Limit
     - The amount of tokens returned.	
     - Number
   * - Offset
     - The index of the start token.	
     - Number

-------
Returns
-------

Object Array

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.listTokens(2,0).then(result => {console.log(result)});
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

------------------------------------------------------------------------------

sendRawTransaction
===============================

Broadcasts a signed raw transaction to the network.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendRawTransaction(signedTransaction);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - signedTransaction
     - The signed transaction object	
     - JSON

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  const tradeobj = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",1);
  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
  const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
  console.log(receipt)
  >{ result: true,
    transaction:
    { visible: false,
      txID:
        'f3c9aa2b4d122979f92a658be1804560f949a89c8b5d30e15b2d003712d72c92',
      raw_data:
        { contract: [Array],
          ref_block_bytes: '63c3',
          ref_block_hash: '0d248c2bc3eb218c',
          expiration: 1580983653000,
          timestamp: 1580983593572 },
      raw_data_hex:
        '0a0263c322080d248c2bc3eb218c4088a5e0cf812e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a15417946f66d0fc67924da0ac9936183ab3b07c811261215418cb2ab880d4fa7b33c9645a2276dc9b192902e2d186470e4d4dccf812e',
      signature:
        [ '9aa0ca0a54b4bdfdc454f5c906eb65131eed75551b93185cc78027eec86059e55c78ec1d0f28021d136fb8b446864a47736d2b29b74b4ce08e69a6a0167292e300' ] } }

------------------------------------------------------------------------------

sendHexTransaction
===============================

Broadcast the protobuf encoded transaction hex string after sign


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendHexTransaction(signedHexTransaction);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - signedHexTransaction
     - The protobuf encoded transaction hex after sign	
     - Hex String

-------
Example
-------

.. code-block:: javascript

  const receipt = await tronWeb.trx.sendHexTransaction("0A8A010A0202DB2208C89D4811359A28004098A4E0A6B52D5A730802126F0A32747970652E676F6F676C65617069732E636F6D2F70726F746F636F6C2E5472616E736665724173736574436F6E747261637412390A07313030303030311215415A523B449890854C8FC460AB602DF9F31FE4293F1A15416B0580DA195542DDABE288FEC436C7D5AF769D24206412418BF3F2E492ED443607910EA9EF0A7EF79728DAAAAC0EE2BA6CB87DA38366DF9AC4ADE54B2912C1DEB0EE6666B86A07A6C7DF68F1F9DA171EEE6A370B3CA9CBBB00");

------------------------------------------------------------------------------

sendToken
===============================

Sends TRC10 token from one address to another. Will create and broadcast the transaction if a private key is provided.

.. warning:: 
  Do not use this in any web / user-facing applications. This will expose the private key.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendToken();

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - to
     - Address to send TRX to.	
     - String
   * - amount
     - Amount of TRX to send.	
     - String
   * - tokenID
     - Name of the token, matching the exact capitalization.	
     - String
   * - privateKey
     - Optionally provide a private key to sign the transaction
     - String

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example1
  tronWeb.trx.sendToken("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr",1000,'100010');

  //example2 
  tronWeb.trx.sendToken("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 1000,'100010','from_address_private');
  { result: true,
  transaction:
    { visible: false,
      txID:
      '7d3e08aed30e47d7f03062282ecaba9ac18164a5a2aa0830a6f4af8620c9b8ea',
      raw_data:
      { contract: [Array],
        ref_block_bytes: 'b4c2',
        ref_block_hash: '653e58b56f0a0c06',
        expiration: 1579076202000,
        timestamp: 1579076144747 },
      raw_data_hex:
      '0a02b4c22208653e58b56f0a0c064090dc9ac2fa2d5a730802126f0a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e736665724173736574436f6e747261637412390a07313030303030311215417946f66d0fc67924da0ac9936183ab3b07c811261a1541d3136787e667d1e055d2cd5db4b5f6c880563049200a70eb9c97c2fa2d',
      signature:
      [ '29d1db1203a3eb163b2602181cd77b1bbf1010bd66490b9f023d5cfbf22950892103ffefaf5c85d6894bd2baa27975d2ce456d121210a44a618791a2d36d82b301' ] } }

------------------------------------------------------------------------------

sendTransaction
===============================

Sends TRX from one address to another. Will create and broadcast the transaction if a private key is provided.

.. warning:: 
  Do not use this in any web / user-facing applications. This will expose the private key.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendTransaction();

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - to
     - Address to send TRX to, converted to a hex string.	
     - Hex String
   * - amount
     - Amount of TRX to send (units in SUN)	
     - Integer (units in SUN)
   * - privateKey
     - Optionally provide a private key to sign the transaction. If left blank, will use the address associated with the private key.	
     - 

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  //example1
  tronWeb.trx.sendTransaction("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 1000);

  //example2 
  tronWeb.trx.sendTransaction("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 1000,from_address_private);
  >{ result: true,
    transaction:
    { visible: false,
      txID:
        'f8f70731df59b4d7d8159df705f0f7289cd2a037187dda043e28c77287b12e11',
      raw_data:
        { contract: [Array],
          ref_block_bytes: 'b3e2',
          ref_block_hash: '3778f8d30f91eb00',
          expiration: 1579075530000,
          timestamp: 1579075470470 },
      raw_data_hex:
        '0a02b3e222083778f8d30f91eb004090daf1c1fa2d5a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15417946f66d0fc67924da0ac9936183ab3b07c81126121541d3136787e667d1e055d2cd5db4b5f6c88056304918e807708689eec1fa2d',
      signature:
        [ 'd0839fd236016149da98ddd3dcd2f1dfcfd11aabee8a27ffae50b1323ed4ad6a259c2d48c983c7d0c786e373d2a90c48adc91f33b82be07efffaa7d57e4d3f6000' ] } }

------------------------------------------------------------------------------

sign
===============================

Sign a provided transaction object or a hex formatted string.

.. warning:: 
  Do not use this in any web / user-facing applications. This will expose the private key.


-------
Usage
-------

.. code-block:: javascript

  // sign a transaction
  tronWeb.trx.sign(transaction, privateKey);

  // or
  // sign a Hex formatted string
  tronWeb.trx.sign(str, privateKey)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - transaction / Hex formatted string
     - The transaction object / hex formatted string	
     - JSON / String
   * - privateKey
     - The private key used for signing. Optional. The default value is the private key passed in when constructing tronweb object.	
     - String

-------
Returns
-------

Object | String

-------
Example
-------

sign a transaction

.. code-block:: javascript

  const tradeobj = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",1);  
  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
  console.log(signedtxn)
  >{ visible: false,
    txID:
    'cbf76171dcf5f8fe00b4911a1a6cc4d2a4448e3348f44d240ca20af06025d0f2',
    raw_data:
    { contract: [ [Object] ],
      ref_block_bytes: '6394',
      ref_block_hash: '8ad966a9b0b6a5d1',
      expiration: 1580983512000,
      timestamp: 1580983453441 },
    raw_data_hex:
    '0a02639422088ad966a9b0b6a5d140c0d7d7cf812e5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a15417946f66d0fc67924da0ac9936183ab3b07c811261215418cb2ab880d4fa7b33c9645a2276dc9b192902e2d186470818ed4cf812e',
    signature:
    [ '47b1f77b3e30cfbbfa41d795dd34475865240617dd1c5a7bad526f5fd89e52cd057c80b665cc2431efab53520e2b1b92a0425033baee915df858ca1c588b0a1800' ] }

sign a string message

.. code-block:: javascript

  var str = "helloworld"; 
  var HexStr = tronWeb.toHex(str);
  var signedStr = await tronWeb.trx.sign(HexStr, privateKey);
  console.log(signedStr)
  >0xe89b777b011b678c9f52e464117f8a8a2193f2cb8d37cbb9e1bd7bd8905fb79046185ea458fab36ed387d60b0842b59b15c7a419797575986492d0271a91d9e71b
  
------------------------------------------------------------------------------

signMessageV2
===============================

Sign a plaintext string.

The `sign <#sign>`_ interface is to sign the Hex format string, and the signature verification uses `verifyMessage <#verifyMessage>`_ interface. But signMessageV2 can sign a plaintext string. Please use the `verifyMessageV2 <#verifyMessageV2>`_ interface for signature verification.


-------
Usage
-------

.. code-block:: javascript

  // Call directly，privatekey is needed in this way
  TronWeb.Trx.signMessageV2(message, privateKey)

  // Called via the instantiated tronWeb object
  tronWeb.trx.signMessageV2(message, privateKey);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - message
     - Message to be signed	
     - Bytes / String
   * - privateKey
     - The private key used for signing, optional parameter. Default to use the private key passed in when building tronweb object.	
     - String

-------
Returns
-------

String - the signature.



-------
Example
-------

.. code-block:: javascript

  var messge = 'hello world';
  var signature = await tronWeb.trx.signMessageV2(messge);
  console.log(signature);
  >0x1d1b0779da653630d29fc4f1ea1e5a109a30d52e21e7657fa896d2fccc3b430b14089377e13b6ed35ef371a1c91873773d568219d1100fa8595e5f2eec39e3e41c

------------------------------------------------------------------------------

timeUntilNextVoteCycle
===============================

Query the time interval till the next vote round.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.timeUntilNextVoteCycle();

--------------
Parameter
--------------

N/A

-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  tronWeb.trx.timeUntilNextVoteCycle().then(console.log)
  >1579068000

------------------------------------------------------------------------------

multiSign
===============================


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.multiSign(transaction, privateKey, permissionId)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - transaction
     - The transaction JSON object	
     - JSON
   * - privateKey
     - The signer's private key		
     - String
   * - permissionId
     - Specifies which permission to use. Default is 0, which is the owner permission.		
     - Integer32

The parameter permissionId designates the permission type, with Owner ID = 0, Witness ID = 1, and the Active ID incremented from 2 onwards. When the contract is executed, the ID is used to specify which permission to use. For details on Java-Tron permissionId, please refer to the `Multi-Signature guide <https://developers.tron.network/docs/multi-signature>`_.


.. note:: 
  The transaction ID changes every time during signing since the permission ID is hashed with the original transaction ID.


-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  const tradeobj = await tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(100), 3, "ENERGY", "415d73f56d93a9380a100d2a340dd30dc3df6e0746", "415d73f56d93a9380a100d2a340dd30dc3df6e0746", 0);
  const signedtxn = await tronWeb.trx.multiSign(tradeobj, privateKey,0);
  console.log(signedtxn)
  >{
    "txID": "0502452a4d60e10624168e4dfbd30f549619c1a4231a5f1b23b2fdee7271122f",
    "raw_data": {
      "contract": [
        {
          "parameter": {
            "value": {
              "frozen_duration": 3,
              "frozen_balance": 100000000,
              "owner_address": "415d73f56d93a9380a100d2a340dd30dc3df6e0746"
            },
            "type_url": "type.googleapis.com/protocol.FreezeBalanceContract"
          },
          "type": "FreezeBalanceContract",
          "Permission_id": 0
        }
      ],
      "ref_block_bytes": "0029",
      "ref_block_hash": "085b2efaf56ed4ab",
      "expiration": 1555112526000,
      "timestamp": 1555112466675
    },
    "raw_data_hex": "0a0200292208085b2efaf56ed4ab40b081b89fa12d5a58080b12540a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e467265657a6542616c616e6365436f6e7472616374121e0a15415d73f56d93a9380a100d2a340dd30dc3df6e07461080c2d72f180370f3b1b49fa12d",
    "signature": [
      "91d1b6d562b7aec2dc7ab52d82841ebb92d2288b01e04bd0075e0499559353ade4e74246d9ea002dec12e3246f7ae05714a1787b8c3670446cc6891a1cb9b56600",
      "4ca79b721e4965189335a9d8324a207297bbf52f90cdd5be778716817db13b2a678eacdb83b1ad38d6823606bf51b41a9810da4a8618361e2251205382b357eb00",
      "672920c0e277aa84225e9441468cd425c85748599968842c7a39a0b7ddb6bc14e9dde4eb6d00464d0e411dd24be7ac7cdfbfcd21ca72bfbf7021bcfe4080e47800"
    ]
  }

------------------------------------------------------------------------------

verifyMessage
===============================

verify signature of a hex formatted string.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.verifyMessage(hexMsg, signedMsg, address)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - hexMsg
     - hex formatted string	
     - String
   * - signedMsg
     - signature of the string		
     - String
   * - address
     - signature address(base58 or hex)	
     - String

-------
Returns
-------

bool - true if verify successfully, else return error

-------
Example
-------

.. code-block:: javascript

  // sign a string message

  var str = "helloworld"; 
  // convert to hex format and remove the beginning "0x"
  var hexStrWithout0x = tronWeb.toHex(str).replace(/^0x/, '');
  // conert hex string to byte array
  var byteArray = tronWeb.utils.code.hexStr2byteArray(hexStrWithout0x)
  // keccak256 computing, then remove "0x" 
  var strHash= tronWeb.sha3(byteArray).replace(/^0x/, '');
  // sign 
  var signedStr = await tronWeb.trx.sign(strHash);
  var tail = signedStr.substring(128, 130);
  if(tail == '01')
  {
      signedStr = signedStr.substring(0,128)+'1c';
  }
  else if(tail == '00')
  {
      signedStr = signedStr.substring(0,128)+'1b';
  }
    

  // verify the signature
  var res = await tronWeb.trx.verifyMessage(strHash,signedStr,'TPNcZ1j55FrGpsaw6K6rVjuL4HfT8ZbBf7')
  console.log(res);
  >true

------------------------------------------------------------------------------

verifyMessageV2
===============================

The plaintext string can be signed through the `signMessageV2 <#signMessageV2>` interface, and then the signature can be verified through this interface.

-------
Usage
-------

.. code-block:: javascript

  // Call directly
  TronWeb.Trx.verifyMessageV2(message, signature)

  // Called via the instantiated tronWeb object
  tronWeb.trx.verifyMessageV2(message, signature)

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - message
     - the signed string	
     - String
   * - signature
     - Signature to be verified	
     - String

-------
Returns
-------

String - the signed address in base58 format


-------
Example
-------

.. code-block:: javascript

  var str = "helloworld"; 
  var signature = await tronWeb.trx.signMessageV2(messge);
  var base58Address = await tronWeb.trx.verifyMessageV2(messge, signature);

------------------------------------------------------------------------------

_signTypedData
===============================

Sign the typed data value with types data structure for domain using the `TIP-712 specification <https://github.com/tronprotocol/tips/issues/443>`_.

.. warning:: 

  Experimental feature (this method name will change)

  This is still an experimental feature. If using it, please specify the exact version of tronweb you are using (e.g. specify "4.3.0", not "^4.3.0") as the method name will be renamed from _signTypedData to signTypedData once it has been used in the field a bit.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx._signTypedData( domain, types, value, privateKey);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 25 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - domain
     - Domain separator. This field is to prevent collisions with other transactions on the network or messages with the same structure.	
     - JSON
   * - types
     - Type definition of Typed Data	
     - JSON
   * - value
     - The value of Typed Data	
     - JSON
   * - privateKey
     - The private key used for signing. Optional. The default value is the private key passed in when constructing tronweb object.	
     - String

-------
Returns
-------

String - Signature to the typed data


-------
Example
-------

.. code-block:: javascript

  // All properties on a domain are optional
  const domain = {
    name: 'TRON Mail',
    version: '1',
    chainId: '0x2b6653dc',
    verifyingContract: 'TUe6BwpA7sVTDKaJQoia7FWZpC9sK8WM2t'
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' }
    ]
  };

  // The data to sign
  const value = {
    from: {
      name: 'Cow',
      wallet: 'TUg28KYvCXWW81EqMUeZvCZmZw2BChk1HQ'
    },
    to: {
      name: 'Bob',
      wallet: 'TT5rFsXYCrnzdE2q1WdR9F2SuVY59A4hoM'
    },
    contents: 'Hello, Bob!'
  };

  const signature = await tronWeb.trx._signTypedData(domain, types, value);
  // signing result: 0x72cc671f38be492773e2cd44c64535ab8825d8ab7b0e580ee45731d00fc0aa5a385bf816505e6c53864bc8539677f7c6a6ece907c94e02d473d392e364cfd5691c


------------------------------------------------------------------------------

verifyTypedData
===============================

Verify the signature of the typed data value with types data structure for domain using the `TIP-712 specification <https://github.com/tronprotocol/tips/issues/443>`_.


-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.verifyTypedData(domain, types, value, signature, address);

--------------
Parameter
--------------

.. list-table::
   :widths: 25 50 25
   :header-rows: 1

   * - Parameter
     - Description
     - Data Type
   * - domain
     - Domain separator. This field is to prevent collisions with other transactions on the network or messages with the same structure.	
     - JSON
   * - types
     - Type definition of Typed Data	
     - JSON
   * - value
     - The value of Typed Data
     - JSON
   * - signature
     - Signature to be verified
     - String
   * - address
     - Signed account address (Base58 format or Hex format)
     - String

-------
Returns
-------

bool - true if verify successfully, else return error Signature does not match.


-------
Example
-------

.. code-block:: javascript

  // All properties on a domain are optional
  const domain = {
    name: 'TRON Mail',
    version: '1',
    chainId: '0x2b6653dc',
    verifyingContract: 'TUe6BwpA7sVTDKaJQoia7FWZpC9sK8WM2t'
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' }
    ]
  };

  // The data to sign
  const value = {
    from: {
      name: 'Cow',
      wallet: 'TUg28KYvCXWW81EqMUeZvCZmZw2BChk1HQ'
    },
    to: {
      name: 'Bob',
      wallet: 'TT5rFsXYCrnzdE2q1WdR9F2SuVY59A4hoM'
    },
    contents: 'Hello, Bob!'
  };

  const signature = await tronWeb.trx._signTypedData(domain, types, value);

  const result = await tronWeb.trx.verifyTypedData(domain, types, value, signature);
  // verification result: true
