getAccountResources
===========

Get the account's bandwidth and energy resources.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getAccountResources(address);

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
  >tronWeb.trx.getAccountResources('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(console.log)
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
  >tronWeb.trx.getAccountResources('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(console.log)
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
