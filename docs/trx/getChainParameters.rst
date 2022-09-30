getChainParameters
===========

Query the parameters of the blockchain used for witnessses to create a proposal

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getChainParameters();

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

  >tronWeb.trx.getChainParameters().then(console.log);
  >[
    {"key": "getMaintenanceTimeInterval", "value": 21600000},
    {"key": "getAccountUpgradeCost", "value": 9999000000},
    {"key": "getCreateAccountFee", "value": 100000},
    {"key": "getTransactionFee", "value": 1000},
    {"key": "getAssetIssueFee", "value": 1024000000},
    {"key": "getWitnessPayPerBlock", "value": 16000000},
    {"key": "getWitnessStandbyAllowance", "value": 115200000000},
    {"key": "getCreateNewAccountFeeInSystemContract", "value": 1000000},
    {"key": "getCreateNewAccountBandwidthRate", "value": 1},
    {"key": "getAllowCreationOfContracts", "value": 1},
    {"key": "getRemoveThePowerOfTheGr", "value": -1},
    {"key": "getEnergyFee", "value": 280},
    {"key": "getExchangeCreateFee", "value": 1024000000},
    {"key": "getMaxCpuTimeOfOneTx", "value": 80},
    {"key": "getAllowUpdateAccountName"},
    {"key": "getAllowSameTokenName", "value": 1},
    {"key": "getAllowDelegateResource", "value": 1},
    {"key": "getTotalEnergyLimit", "value": 90000000000},
    {"key": "getAllowTvmTransferTrc10", "value": 1},
    {"key": "getTotalEnergyCurrentLimit", "value": 90000000000},
    {"key": "getAllowMultiSign", "value": 1},
    {"key": "getAllowAdaptiveEnergy"},
    {"key": "getTotalEnergyTargetLimit", "value": 6250000},
    {"key": "getTotalEnergyAverageUsage"},
    {"key": "getUpdateAccountPermissionFee", "value": 100000000},
    {"key": "getMultiSignFee", "value": 1000000},
    {"key": "getAllowAccountStateRoot"},
    {"key": "getAllowProtoFilterNum"},
    {"key": "getAllowTvmConstantinople", "value": 1},
    {"key": "getAllowTvmSolidity059", "value": 1},
    {"key": "getAllowTvmIstanbul", "value": 1},
    {"key": "getAllowShieldedTRC20Transaction", "value": 1},
    {"key": "getForbidTransferToContract"},
    {"key": "getAdaptiveResourceLimitTargetRatio", "value": 10},
    {"key": "getAdaptiveResourceLimitMultiplier", "value": 1000},
    {"key": "getChangeDelegation", "value": 1},
    {"key": "getWitness127PayPerBlock", "value": 160000000},
    {"key": "getAllowMarketTransaction"},
    {"key": "getMarketSellFee"},
    {"key": "getMarketCancelFee"},
    {"key": "getAllowPBFT"},
    {"key": "getAllowTransactionFeePool"},
    {"key": "getMaxFeeLimit", "value": 10000000000},
    {"key": "getAllowOptimizeBlackHole", "value": 1},
    {"key": "getAllowNewResourceModel"},
    {"key": "getAllowTvmFreeze"},
    {"key": "getAllowTvmVote"},
    {"key": "getAllowTvmLondon", "value": 1},
    {"key": "getAllowTvmCompatibleEvm"},
    {"key": "getAllowAccountAssetOptimization"},
    {"key": "getFreeNetLimit", "value": 1500},
    {"key": "getTotalNetLimit", "value": 43200000000},
    {"key": "getAllowHigherLimitForMaxCpuTimeOfOneTx", "value": 1},
    {"key": "getAllowAssetOptimization"}
  ]