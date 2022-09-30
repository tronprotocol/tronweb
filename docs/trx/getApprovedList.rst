getApprovedList
===========

This API function returns a JSON object with the list of accounts that have signed the transaction and the transaction data.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getApprovedList(transaction);

--------------
Parameters
--------------

transaction object after signed

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getApprovedList({'visible': true, 'signature': ['1fd210045f5bdcf375cd478cf46ff735f132281b990bc199acf1952bd438929d1d03e12de5ea7dcb89cff5b8cfc5d161661a5c1fe6a6a2422edb313b9139075300'], 'txID': 'ee188aaf5cf78729d2d14d4db698126da2d75ef78a43837dafd6e6f591d103a2', 'raw_data': {'contract': [{'parameter': {'value': {'amount': 125000000, 'owner_address': 'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP', 'to_address': 'TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ'}, 'type_url': 'type.googleapis.com/protocol.TransferContract'}, 'type': 'TransferContract'}], 'ref_block_bytes': 'c251', 'ref_block_hash': '5c685c92bf035e72', 'expiration': 1578299967000, 'timestamp': 1578299909600}, 'raw_data_hex': '0a02c25122085c685c92bf035e7240988c89d0f72d5a68080112640a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412330a1541859009fd225692b11237a6ffd8fdba2eb7140cca121541bf97a54f4b829c4e9253b26024b1829e1a3b112018c0b2cd3b70e0cb85d0f72d'}).then(console.log)
  >{
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
